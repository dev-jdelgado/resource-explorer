import { Link } from "react-router-dom";

interface Props {
  character: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function CharacterCard({ character, isFavorite, onToggleFavorite }: Props) {
    return (
        <div className="card" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <img src={character.image} alt={character.name} width={72} height={72} style={{ borderRadius: 8 }} />
        <div style={{ flex: 1 }}>
            <Link to={`/character/${character.id}`} className="link">
            <h3 style={{ margin: "0 0 4px 0" }}>{character.name}</h3>
            </Link>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
            {character.species} • {character.status} • {character.gender}
            </div>
        </div>
        <div>
            <button
            aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
            onClick={onToggleFavorite}
            className="btn"
            title={isFavorite ? "Remove favorite" : "Add favorite"}
            >
            {isFavorite ? "★" : "☆"}
            </button>
        </div>
        </div>
    );
}
