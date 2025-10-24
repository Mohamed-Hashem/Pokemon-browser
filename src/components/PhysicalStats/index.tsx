import { UI } from "../../constants";

interface PhysicalStatsProps {
    height: number;
    weight: number;
}

export default function PhysicalStats({ height, weight }: PhysicalStatsProps) {
    return (
        <div className="flex gap-8 text-center">
            <div>
                <div className="text-gray-500 text-sm mb-1">⚖️ Height</div>
                <div className="font-bold text-lg">
                    {(height / UI.HEIGHT_DIVISOR).toFixed(1)} {UI.HEIGHT_UNIT}
                </div>
            </div>
            <div>
                <div className="text-gray-500 text-sm mb-1">⚖️ Weight</div>
                <div className="font-bold text-lg">
                    {(weight / UI.WEIGHT_DIVISOR).toFixed(1)} {UI.WEIGHT_UNIT}
                </div>
            </div>
        </div>
    );
}
