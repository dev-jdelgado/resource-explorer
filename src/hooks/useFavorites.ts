import { useState, useEffect } from "react";

const FAVORITES_KEY = "favorites";

export function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(FAVORITES_KEY);
        if (saved) setFavorites(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id: number) => {
        setFavorites(favs =>
        favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]
        );
    };

    return { favorites, toggleFavorite };
}
