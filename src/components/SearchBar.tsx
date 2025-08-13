import { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";

interface Props {
    initialValue: string;
    onSearch: (value: string) => void;
}

export default function SearchBar({ initialValue, onSearch }: Props) {
    const [value, setValue] = useState(initialValue);

    // Create debounced function once
    const debouncedSearch = useMemo(
        () =>
            debounce((searchValue: string) => {
                console.log(`[Debounce Triggered after 400ms] Searching for: "${searchValue}"`);
                onSearch(searchValue);
            }, 400),
        [onSearch]
    );

    useEffect(() => {
        if (value !== initialValue) {
            debouncedSearch(value);
        }
    }, [value, initialValue, debouncedSearch]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <input
            value={value}
            onChange={(e) => {
                console.log(`[Input Change] Value: "${e.target.value}"`);
                setValue(e.target.value);
            }}
            placeholder="Search characters..."
            className="search-input"
        />
    );
}
