import { POKEMON_DETAIL } from "../../constants";

interface StatProgressBarProps {
    name: string;
    value: number;
}

export default function StatProgressBar({ name, value }: StatProgressBarProps) {
    const formattedName = name
        .replace("special-", "Sp. ")
        .replace("-", " ")
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const percentage = Math.min((value / POKEMON_DETAIL.MAX_STAT_VALUE) * 100, 100);

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">{formattedName}</span>
                <span className="font-bold text-gray-900">{value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}
