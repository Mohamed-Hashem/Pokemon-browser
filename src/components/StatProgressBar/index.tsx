import { memo, useMemo } from "react";

interface StatProgressBarProps {
    name: string;
    value: number;
}

export default memo(function StatProgressBar({ name, value }: StatProgressBarProps) {
    const formattedName = useMemo(
        () =>
            name
                .replace("special-", "Sp. ")
                .replace("-", " ")
                .split(" ")
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
        [name]
    );

    const percentage = useMemo(() => Math.min((value / 255) * 100, 100), [value]);

    const barStyle = useMemo(() => ({ width: `${percentage}%` }), [percentage]);

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">{formattedName}</span>
                <span className="font-bold text-gray-900">{value}</span>
            </div>
            <div
                className="w-full bg-gray-200 rounded-full h-2"
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={255}
                aria-label={`${formattedName}: ${value} out of 255`}
            >
                <div
                    className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                    style={barStyle}
                ></div>
            </div>
        </div>
    );
});
