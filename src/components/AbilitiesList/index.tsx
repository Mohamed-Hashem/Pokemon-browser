interface AbilitiesListProps {
    abilities: Array<{
        ability: { name: string };
        is_hidden: boolean;
    }>;
}

export default function AbilitiesList({ abilities }: AbilitiesListProps) {
    if (!abilities || abilities.length === 0) return null;

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-3">Abilities</h2>
            <div className="space-y-2">
                {abilities.map((ability) => (
                    <div key={ability.ability.name} className="flex items-center gap-2">
                        <span className="font-medium capitalize">
                            {ability.ability.name.replace("-", " ")}
                        </span>
                        {ability.is_hidden && (
                            <span className="text-xs text-gray-500">(Hidden)</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
