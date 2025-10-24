import { Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPokemonByName } from '../../api/pokemon'
import { DetailSkeleton } from '../../components/SkeletonLoader'
import type { PokemonType } from '../../types'

export default function PokemonDetail() {
    const { name } = useParams<{ name: string }>()

    if (!name) return <div className="p-6" role="alert">Missing Pokémon name</div>

    return (
        <div className="p-6">
            <Link
                to="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
                aria-label="Go back to Pokémon list"
            >
                ← Back
            </Link>

            <Suspense fallback={<DetailSkeleton />}>
                <DetailInner name={name} />
            </Suspense>
        </div>
    )
}

function DetailInner({ name }: { name: string }) {
    const { data } = useQuery({
        queryKey: ['pokemon-detail-page', name],
        queryFn: () => getPokemonByName(name)
    })

    if (!data) return <DetailSkeleton />

    return (
        <article className="mt-4 max-w-xl bg-white p-6 rounded shadow">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded">
                    {data.sprites?.front_default ? (
                        <img
                            src={data.sprites.front_default}
                            alt={`${data.name} sprite`}
                            className="w-full h-full object-contain"
                            loading="eager"
                        />
                    ) : (
                        <div className="text-sm text-gray-500" role="img" aria-label="No image available">
                            No image
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold capitalize" id="pokemon-name">{data.name}</h2>
                    <dl className="mt-2 space-y-1">
                        <div>
                            <dt className="inline font-medium">ID: </dt>
                            <dd className="inline">{data.id}</dd>
                        </div>
                        <div>
                            <dt className="inline font-medium">Height: </dt>
                            <dd className="inline">{data.height}</dd>
                        </div>
                        <div>
                            <dt className="inline font-medium">Weight: </dt>
                            <dd className="inline">{data.weight}</dd>
                        </div>
                    </dl>

                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Types</h3>
                        <div className="flex gap-2" role="list">
                            {data.types.map((t: PokemonType) => (
                                <span
                                    key={t.slot}
                                    className="px-3 py-1 bg-gray-100 rounded text-sm capitalize"
                                    role="listitem"
                                >
                                    {t.type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
