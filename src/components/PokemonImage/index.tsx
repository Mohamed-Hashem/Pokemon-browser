import { memo } from "react";

interface PokemonImageProps {
    name: string;
    imageUrl?: string;
}

export default memo(function PokemonImage({ name, imageUrl }: PokemonImageProps) {
    return (
        <div className="flex items-center justify-center bg-gray-100 rounded-full mb-4 w-50 h-50">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={`${name} sprite`}
                    className="w-full h-full object-contain"
                    loading="eager"
                />
            ) : (
                <div className="text-sm text-gray-500" role="img" aria-label="No image available">
                    No image
                </div>
            )}
        </div>
    );
});
