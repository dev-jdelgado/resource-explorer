import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import { useFavorites } from "../hooks/useFavorites";
import { useCallback, useMemo } from "react";

interface Character {
    id: number;
    name: string;
    status: string;
}

interface ApiResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}

export default function CharacterList() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const page = Number(params.get("page") || 1);
    const search = params.get("name") || "";
    const status = params.get("status") || "";
    const showFavorites = params.get("favorites") === "1";

    const { favorites, toggleFavorite } = useFavorites();

    const queryKey = ["character", page, search, status];

    const { data, error, isLoading, refetch, isFetching } = useQuery<ApiResponse, Error>({
        queryKey,
        queryFn: async () => {
        const baseUrl = "https://rickandmortyapi.com/api/character";
        const query = new URLSearchParams();
        query.set("page", String(page));
        if (search) query.set("name", search);
        if (status) query.set("status", status);

        const res = await fetch(`${baseUrl}?${query.toString()}`);
        if (!res.ok) {
            throw new Error("Failed to fetch characters");
        }
        return res.json();
        },
        staleTime: 1000 * 30,
        // keepPreviousData is removed for react-query v5 compatibility
    });

    const updateParam = useCallback(
        (key: string, value: string | undefined) => {
        const newParams = new URLSearchParams(params.toString());
        const currentValue = newParams.get(key) || "";

        if ((value ?? "") === currentValue) {
            return; // No change, skip navigation
        }

        if (value === undefined || value === "") {
            newParams.delete(key);
        } else {
            newParams.set(key, value);
        }

        if (key !== "page") {
            newParams.set("page", "1");
        }

        navigate(
            { pathname: "/character", search: newParams.toString() },
            { replace: false }
        );
        },
        [params, navigate]
    );

    const onSearch = (val: string) => updateParam("name", val || undefined);

    const filteredResults = useMemo(() => {
        const all = data?.results || [];
        if (showFavorites) {
        return all.filter((c) => favorites.includes(c.id));
        }
        return all;
    }, [data, showFavorites, favorites]);

    const pagedResults = filteredResults.slice(0, 18);

    return (
        <div>
        <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
            <SearchBar initialValue={search} onSearch={onSearch} />
            </div>

            <select
                aria-label="Filter by status"
                value={status}
                onChange={(e) => updateParam("status", e.target.value || undefined)}
                className="status-select"
                >
                <option value="">All status</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
            </select>

            <label className="favorite-checkbox-label">
                <input
                    type="checkbox"
                    checked={showFavorites}
                    onChange={(e) => updateParam("favorites", e.target.checked ? "1" : undefined)}
                />
                <span>Favorites</span>
            </label>
        </div>

        {isLoading ? (
            <div className="card">Loading characters…</div>
        ) : error ? (
            <div className="card">
                <p>Error loading characters.</p>
                <button className="btn" onClick={() => refetch()}>
                    Retry
                </button>
            </div>
        ) : (
            <>
            <div
                style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
                }}
            >
                <div className="small">
                {isFetching
                    ? "Updating…"
                    : `Page ${page}${data?.info?.pages ? ` of ${data.info.pages}` : ""}`}
                </div>
                <div className="small">
                    Showing {pagedResults.length} / 18
                </div>
            </div>

            {pagedResults.length === 0 ? (
                <div className="card">No results. Try different search or filters.</div>
                ) : (
                <div className="grid">
                    {pagedResults.map((char) => (
                    <CharacterCard
                        key={char.id}
                        character={char}
                        isFavorite={favorites.includes(char.id)}
                        onToggleFavorite={() => toggleFavorite(char.id)}
                    />
                    ))}
                </div>
            )}

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button
                className="btn"
                disabled={page === 1}
                onClick={() => updateParam("page", String(page - 1))}
                >
                Prev
                </button>
                <button
                className="btn"
                disabled={!data?.info?.next}
                onClick={() => updateParam("page", String(page + 1))}
                >
                Next
                </button>
            </div>
            </>
        )}
        </div>
    );
}
