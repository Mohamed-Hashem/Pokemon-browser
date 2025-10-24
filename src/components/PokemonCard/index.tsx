import { Suspense, memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPokemonByName } from '../../api/pokemon'
import { Link } from 'react-router-dom'
import { PokemonCardSkeleton } from '../SkeletonLoader'

interface Props {
    name: string
}

const PokemonCardInner = memo(({ name }: Props) => {
    const { data } = useQuery({
        queryKey: ['pokemon-detail', name],
        queryFn: () => getPokemonByName(name),
        staleTime: 1000 * 60 * 30, // Pokemon data rarely changes - 30 min cache
    })

    if (!data) return <PokemonCardSkeleton />

    const sprite = data.sprites?.front_default

    return (
        <Link
            to={`/pokemon/${name}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            aria-label={`View details for ${name}`}
        >
            <div className="flex items-center justify-center h-28">
                {sprite ? (
                    <img
                        src={sprite}
                        alt={`${name} sprite`}
                        className="w-20 h-20 object-contain"
                        loading="lazy"
                        width="80"
                        height="80"
                    />
                ) : (
                    <div className="text-sm text-gray-500" role="img" aria-label="No image available">
                        No image
                    </div>
                )}
            </div>
            <h3 className="mt-3 text-center capitalize font-medium">{name}</h3>
        </Link>
    )
})

PokemonCardInner.displayName = 'PokemonCardInner'

export default memo(function PokemonCard({ name }: Props) {
    return (
        <Suspense fallback={<PokemonCardSkeleton />}>
            <PokemonCardInner name={name} />
        </Suspense>
    )
})
