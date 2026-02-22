import { Suspense, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPokemonByName } from "../../api/pokemon";
import { DetailSkeleton } from "../../components/SkeletonLoader";
import { GRADIENT_COLORS } from "../../constants/colors";
import { CACHE_TIME } from "../../constants";
import BackButton from "../../components/BackButton";
import PokemonHeader from "../../components/PokemonHeader";
import PokemonImage from "../../components/PokemonImage";
import TypeBadges from "../../components/TypeBadges";
import PhysicalStats from "../../components/PhysicalStats";
import BaseStats from "../../components/BaseStats";
import AbilitiesList from "../../components/AbilitiesList";
import BaseExperience from "../../components/BaseExperience";

export default function PokemonDetail() {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();

    const goBack = useCallback(() => navigate(-1), [navigate]);

    const backgroundStyle = useMemo(() => ({ background: GRADIENT_COLORS.BACKGROUND }), []);

    if (!name)
        return (
            <div className="p-6" role="alert">
                Missing Pokémon name
            </div>
        );

    return (
        <div className="min-h-screen" style={backgroundStyle}>
            <div className="max-w-4xl mx-auto py-8 px-4">
                <BackButton onClick={goBack} />

                <Suspense fallback={<DetailSkeleton />}>
                    <DetailInner name={name} />
                </Suspense>
            </div>
        </div>
    );
}

function DetailInner({ name }: { name: string }) {
    const { data } = useQuery({
        queryKey: ["pokemon-detail-page", name],
        queryFn: () => getPokemonByName(name),
        staleTime: CACHE_TIME.POKEMON_DETAIL_STALE_TIME,
    });

    if (!data) return <DetailSkeleton />;

    const primaryType = data.types[0]?.type.name || "normal";

    return (
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <PokemonHeader name={data.name} id={data.id} primaryType={primaryType} />

            <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left: Image and Basic Info */}
                    <div className="shrink-0 flex flex-col items-center">
                        <PokemonImage name={data.name} imageUrl={data.sprites?.front_default} />
                        <TypeBadges types={data.types} />
                        <PhysicalStats height={data.height} weight={data.weight} />
                    </div>

                    {/* Right: Detailed Stats */}
                    <div className="flex-1">
                        <BaseStats stats={data.stats} />
                        <AbilitiesList abilities={data.abilities} />
                        {data.base_experience && (
                            <BaseExperience experience={data.base_experience} />
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
