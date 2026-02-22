import { Suspense, useState, useTransition, useCallback, useMemo } from "react";
import PaginationView from "../../components/PaginationView";
import InfiniteScrollView from "../../components/InfiniteScrollView";
import ViewToggle from "../../components/ViewToggle";
import PageHeader from "../../components/PageHeader";
import { GridSkeleton } from "../../components/SkeletonLoader";
import { PAGE_SIZE } from "../../constants";
import { GRADIENT_COLORS } from "../../constants/colors";

export default function Home() {
    const [viewMode, setViewMode] = useState<"pagination" | "infinite">("pagination");
    const [page, setPage] = useState(1);
    const [, startTransition] = useTransition();

    const handleViewChange = useCallback(
        (view: "pagination" | "infinite") => {
            startTransition(() => setViewMode(view));
        },
        [startTransition]
    );

    const handleSetPage = useCallback(
        (newPage: number) => {
            startTransition(() => setPage(newPage));
        },
        [startTransition]
    );

    const backgroundStyle = useMemo(() => ({ background: GRADIENT_COLORS.BACKGROUND }), []);

    return (
        <div className="min-h-screen" style={backgroundStyle}>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <PageHeader
                    title={
                        <>
                            <span aria-hidden="true">⚡</span> Pokédex
                        </>
                    }
                    subtitle="Discover and explore Pokemon with page controls"
                >
                    <ViewToggle currentView={viewMode} onViewChange={handleViewChange} />
                </PageHeader>

                <Suspense fallback={<GridSkeleton count={PAGE_SIZE} />}>
                    {viewMode === "pagination" ? (
                        <PaginationView page={page} setPage={handleSetPage} />
                    ) : (
                        <InfiniteScrollView />
                    )}
                </Suspense>
            </div>
        </div>
    );
}
