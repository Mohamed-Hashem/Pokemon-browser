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
            <h2 className="text-3xl font-bold mb-4">Abilities</h2>
            <div className="space-y-3">
                {abilities.map((ability) => (
                    <div key={ability.ability.name} className="p-2 bg-gray-100 rounded-full w-fit">
                        <span className="p-2 py-2 text-sm rounded-full font-normal text-gray-800 hover:bg-white transition-colors ">
                            {ability.ability.name.replace(/-/g, " ")}
                        </span>
                        {ability.is_hidden && (
                            <span className="text-sm text-gray-400 ml-2">(Hidden)</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
