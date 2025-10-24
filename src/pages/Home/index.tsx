import { Suspense, useState } from "react";
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

    return (
        <div className="min-h-screen" style={{ background: GRADIENT_COLORS.BACKGROUND }}>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <PageHeader
                    title="⚡ Pokédex"
                    subtitle="Discover and explore Pokemon with page controls"
                >
                    <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                </PageHeader>

                <Suspense fallback={<GridSkeleton count={PAGE_SIZE} />}>
                    {viewMode === "pagination" ? (
                        <PaginationView page={page} setPage={setPage} />
                    ) : (
                        <InfiniteScrollView />
                    )}
                </Suspense>
            </div>
        </div>
    );
}
