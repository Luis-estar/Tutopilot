import { useParams, useNavigate } from 'react-router-dom';
import { QuizLevel } from '../components/game/QuizLevel';
import { levels } from '../data/levels';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LevelPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const level = levels.find(l => l.id === parseInt(id));

    if (!level) {
        return <div className="text-white text-center mt-20">Nivel no encontrado</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-8 pl-0 hover:pl-2 transition-all"
            >
                <ArrowLeft className="mr-2 w-5 h-5" /> Volver al Mapa
            </Button>

            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">{level.title}</h1>
                <p className="text-xl text-slate-400">{level.description}</p>
            </div>

            <QuizLevel levelData={level} />
        </div>
    );
}
