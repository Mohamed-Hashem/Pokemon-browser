interface BaseExperienceProps {
    experience: number;
}

export default function BaseExperience({ experience }: BaseExperienceProps) {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">Base Experience</h2>
            <p className="text-3xl font-bold text-purple-600">{experience} XP</p>
        </div>
    );
}
