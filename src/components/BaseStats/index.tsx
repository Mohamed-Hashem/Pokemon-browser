import StatProgressBar from "../StatProgressBar";

interface BaseStatsProps {
    stats: Array<{
        stat: { name: string };
        base_stat: number;
    }>;
}

export default function BaseStats({ stats }: BaseStatsProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Base Stats</h2>
            <div className="space-y-3">
                {stats.map((stat) => (
                    <StatProgressBar
                        key={stat.stat.name}
                        name={stat.stat.name}
                        value={stat.base_stat}
                    />
                ))}
            </div>
        </div>
    );
}
