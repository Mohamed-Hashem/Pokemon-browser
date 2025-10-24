import { Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPokemonByName } from '../../api/pokemon'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner'

interface Props {
    name: string
}

function PokemonCardInner({ name }: Props) {
    const { data } = useQuery({
        queryKey: ['pokemon-detail', name],
        queryFn: () => getPokemonByName(name)
    })

    const sprite = data?.sprites?.front_default

    return (
        <Link to={`/pokemon/${name}`} className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center justify-center h-28">
                {sprite ? (
                    <img src={sprite} alt={name} className="w-20 h-20 object-contain" />
                ) : (
                    <div className="text-sm text-gray-500">No image</div>
                )}
            </div>
            <h3 className="mt-3 text-center capitalize font-medium">{name}</h3>
        </Link>
    )
}

export default function PokemonCard({ name }: Props) {
    return (
        <Suspense fallback={<div className="p-4 bg-white rounded-lg"><Spinner /></div>}>
            <PokemonCardInner name={name} />
        </Suspense>
    )
}
