import React, { Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPokemonByName } from '../api/pokemon'
import Spinner from '../components/Spinner'

export default function PokemonDetail() {
    const { name } = useParams<{ name: string }>()

    if (!name) return <div className="p-6">Missing Pokémon name</div>

    return (
        <div className="p-6">
            <Link to="/" className="text-blue-600 underline">← Back</Link>

            <Suspense fallback={<Spinner />}>
                <DetailInner name={name} />
            </Suspense>
        </div>
    )
}

function DetailInner({ name }: { name: string }) {
    const { data } = useQuery(['pokemon-detail-page', name], () => getPokemonByName(name))

    return (
        <div className="mt-4 max-w-xl bg-white p-6 rounded shadow">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded">
                    {data.sprites?.front_default ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={data.sprites.front_default} alt={data.name} />
                    ) : (
                        <div className="text-sm text-gray-500">No image</div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold capitalize">{data.name}</h2>
                    <p className="mt-2">ID: {data.id}</p>
                    <p className="mt-1">Height: {data.height}</p>
                    <p className="mt-1">Weight: {data.weight}</p>

                    <div className="mt-3">
                        <h4 className="font-semibold">Types</h4>
                        <div className="flex gap-2 mt-2">
                            {data.types.map((t: any) => (
                                <span key={t.slot} className="px-2 py-1 bg-gray-100 rounded text-sm capitalize">{t.type.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
