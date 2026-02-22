import { memo } from "react";
import { getTypeColor } from "../../constants/colors";
import type { PokemonType } from "../../types";

interface TypeBadgesProps {
    types: PokemonType[];
}

export default memo(function TypeBadges({ types }: TypeBadgesProps) {
    return (
        <div className="flex gap-2 mb-4">
            {types.map((t) => (
                <span
                    key={t.slot}
                    className="px-4 py-1 rounded-full text-white text-sm font-medium capitalize"
                    style={{
                        backgroundColor: getTypeColor(t.type.name),
                    }}
                >
                    {t.type.name}
                </span>
            ))}
        </div>
    );
});
