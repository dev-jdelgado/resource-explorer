import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../api/rickAndMorty";
import { useFavorites } from "../hooks/useFavorites";

export default function CharacterDetail() {
    const { id } = useParams();
    const { favorites, toggleFavorite } = useFavorites();

    const { data, isLoading, error } = useQuery({
        queryKey: ["character", id],
        queryFn: () => fetchCharacterById(id!),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading character</p>;

    const isFavorite = favorites.includes(data.id);

    return (
        <div>
        <h1>{data.name}</h1>
        <img src={data.image} alt={data.name} />
        <p>{data.species} - {data.status}</p>
        <button onClick={() => toggleFavorite(data.id)}>
            {isFavorite ? "★ Unfavorite" : "☆ Favorite"}
        </button>
        </div>
    );
}
