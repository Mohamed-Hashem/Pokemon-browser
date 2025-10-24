import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPokemonByName } from "../../api/pokemon";
import { DetailSkeleton } from "../../components/SkeletonLoader";
import { getTypeColor, GRADIENT_COLORS } from "../../constants/colors";
import { POKEMON_DETAIL, UI } from "../../constants";
import type { PokemonType } from "../../types";

export default function PokemonDetail() {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();

    if (!name)
        return (
            <div className="p-6" role="alert">
                Missing Pokémon name
            </div>
        );

    return (
        <div
            className="min-h-screen"
            style={{
                background: GRADIENT_COLORS.BACKGROUND,
            }}
        >
            <div className="max-w-4xl mx-auto py-8 px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                    aria-label="Go back"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    <span className="font-medium">Back</span>
                </button>

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
    });

    if (!data) return <DetailSkeleton />;

    const primaryType = data.types[0]?.type.name || "normal";

    return (
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header with gradient */}
            <div
                className="text-center py-8 px-6"
                style={{
                    background: `linear-gradient(135deg, ${getTypeColor(primaryType)} 0%, #ff6b9d 100%)`,
                }}
            >
                <h1 className="text-4xl font-bold text-white capitalize mb-2">⚡ {data.name}</h1>
                <p className="text-white text-lg opacity-90">
                    #{String(data.id).padStart(UI.ID_PADDING, "0")}
                </p>
            </div>

            <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="shrink-0 flex flex-col items-center">
                        <div
                            className="flex items-center justify-center bg-gray-100 rounded-full mb-4"
                            style={{
                                width: `${POKEMON_DETAIL.IMAGE_SIZE}px`,
                                height: `${POKEMON_DETAIL.IMAGE_SIZE}px`,
                            }}
                        >
                            {data.sprites?.front_default ? (
                                <img
                                    src={data.sprites.front_default}
                                    alt={`${data.name} sprite`}
                                    className="w-full h-full object-contain"
                                    loading="eager"
                                />
                            ) : (
                                <div
                                    className="text-sm text-gray-500"
                                    role="img"
                                    aria-label="No image available"
                                >
                                    No image
                                </div>
                            )}
                        </div>

                        {/* Type Badge */}
                        <div className="flex gap-2 mb-4">
                            {data.types.map((t: PokemonType) => (
                                <span
                                    key={t.slot}
                                    className="px-4 py-1 rounded-full text-white text-sm font-medium capitalize"
                                    style={{
                                        backgroundColor: getTypeColor(t.type.name),
                                    }}
                                >
                                    {t.type.name}
                                </span>
                            ))}
                        </div>

                        {/* Height and Weight */}
                        <div className="flex gap-8 text-center">
                            <div>
                                <div className="text-gray-500 text-sm mb-1">⚖️ Height</div>
                                <div className="font-bold text-lg">
                                    {(data.height / UI.HEIGHT_DIVISOR).toFixed(1)} {UI.HEIGHT_UNIT}
                                </div>
                            </div>
                            <div>
                                <div className="text-gray-500 text-sm mb-1">⚖️ Weight</div>
                                <div className="font-bold text-lg">
                                    {(data.weight / UI.WEIGHT_DIVISOR).toFixed(1)} {UI.WEIGHT_UNIT}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4">Base Stats</h2>
                        <div className="space-y-3">
                            {data.stats.map(
                                (stat: { stat: { name: string }; base_stat: number }) => {
                                    const statName = stat.stat.name
                                        .replace("special-", "Sp. ")
                                        .replace("-", " ")
                                        .split(" ")
                                        .map(
                                            (word: string) =>
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                        )
                                        .join(" ");

                                    return (
                                        <div key={stat.stat.name}>
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium text-gray-700">
                                                    {statName}
                                                </span>
                                                <span className="font-bold text-gray-900">
                                                    {stat.base_stat}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${Math.min((stat.base_stat / POKEMON_DETAIL.MAX_STAT_VALUE) * 100, 100)}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>

                        {/* Abilities */}
                        {data.abilities && data.abilities.length > 0 && (
                            <div className="mt-6">
                                <h2 className="text-2xl font-bold mb-3">Abilities</h2>
                                <div className="space-y-2">
                                    {data.abilities.map(
                                        (ability: {
                                            ability: { name: string };
                                            is_hidden: boolean;
                                        }) => (
                                            <div
                                                key={ability.ability.name}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="font-medium capitalize">
                                                    {ability.ability.name.replace("-", " ")}
                                                </span>
                                                {ability.is_hidden && (
                                                    <span className="text-xs text-gray-500">
                                                        (Hidden)
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Base Experience */}
                        {data.base_experience && (
                            <div className="mt-6">
                                <h2 className="text-2xl font-bold mb-2">Base Experience</h2>
                                <p className="text-3xl font-bold text-purple-600">
                                    {data.base_experience} XP
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
