import { getTypeColor } from "../../constants/colors";
import { UI } from "../../constants";

interface PokemonHeaderProps {
    name: string;
    id: number;
    primaryType: string;
}

export default function PokemonHeader({ name, id, primaryType }: PokemonHeaderProps) {
    return (
        <div
            className="text-center py-8 px-6"
            style={{
                background: `linear-gradient(135deg, ${getTypeColor(primaryType)} 0%, #ff6b9d 100%)`,
            }}
        >
            <h1 className="text-4xl font-bold text-white capitalize mb-2">⚡ {name}</h1>
            <p className="text-white text-lg opacity-90">
                #{String(id).padStart(UI.ID_PADDING, "0")}
            </p>
        </div>
    );
}
