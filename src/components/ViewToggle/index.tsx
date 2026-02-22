import { memo } from "react";

interface ViewToggleProps {
    currentView: "pagination" | "infinite";
    onViewChange: (view: "pagination" | "infinite") => void;
}

const getButtonClasses = (isActive: boolean) =>
    `cursor-pointer px-6 py-2.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isActive
            ? "bg-gray-900 text-white shadow-md"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
    }`;

export default memo(function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex justify-center gap-3" role="group" aria-label="View mode toggle">
            <button
                onClick={() => onViewChange("pagination")}
                className={getButtonClasses(currentView === "pagination")}
                aria-pressed={currentView === "pagination"}
            >
                Page Controls
            </button>
            <button
                onClick={() => onViewChange("infinite")}
                className={getButtonClasses(currentView === "infinite")}
                aria-pressed={currentView === "infinite"}
            >
                Infinite Scroll
            </button>
        </div>
    );
});
