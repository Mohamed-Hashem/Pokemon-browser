import { memo, useMemo } from "react";
import { getTypeColor } from "../../constants/colors";
import { UI } from "../../constants";

interface PokemonHeaderProps {
    name: string;
    id: number;
    primaryType: string;
}

export default memo(function PokemonHeader({ name, id, primaryType }: PokemonHeaderProps) {
    const backgroundStyle = useMemo(
        () => ({
            background: `linear-gradient(135deg, ${getTypeColor(primaryType)} 0%, #ff6b9d 100%)`,
        }),
        [primaryType]
    );
    return (
        <div className="text-center py-8 px-6" style={backgroundStyle}>
            <h1 className="text-4xl font-bold text-white capitalize mb-2">
                <span role="img" aria-hidden="true">
                    ⚡
                </span>{" "}
                {name}
            </h1>
            <p className="text-white text-lg opacity-90">
                #{String(id).padStart(UI.ID_PADDING, "0")}
            </p>
        </div>
    );
});
