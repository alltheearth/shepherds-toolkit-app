import { Volume2, MousePointerClick, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import {
  useEnglishLearning,
  type EnglishLevel,
  type AudioSpeed,
  type AudioAccent,
  type HintTrigger,
} from '../../context/EnglishLearningContext';

const levels: { id: EnglishLevel; label: string; description: string }[] = [
  { id: 'A1', label: 'A1 · Iniciante', description: 'Reconheço palavras e expressões bem simples.' },
  { id: 'A2', label: 'A2 · Básico', description: 'Entendo frases do dia a dia sobre temas comuns.' },
  { id: 'B1', label: 'B1 · Intermediário', description: 'Acompanho textos sobre assuntos conhecidos, com alguma dificuldade.' },
  { id: 'B2', label: 'B2 · Intermediário avançado', description: 'Entendo textos mais complexos, mas travo em expressões idiomáticas.' },
  { id: 'C1', label: 'C1 · Avançado', description: 'Domino a maior parte do vocabulário e das construções gramaticais.' },
  { id: 'C2', label: 'C2 · Proficiente', description: 'Quero só refinar nuances raras e vocabulário arcaico/literário.' },
];

const EnglishSettings = () => {
  const { settings, setLevel, setHintTrigger, setAudioSpeed, setAudioAccent } = useEnglishLearning();

  return (
    <div className="space-y-6">
      {/* Nível de inglês */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-ink mb-1 flex items-center gap-2">
          <Sparkles size={16} className="text-accent" />
          Nível de inglês
        </h3>
        <p className="text-xs text-ink-faint mb-4">
          Usado para calibrar as explicações de gramática e vocabulário nos versículos em inglês.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {levels.map((level) => {
            const isActive = settings.level === level.id;
            return (
              <button
                key={level.id}
                onClick={() => setLevel(level.id)}
                className={`text-left p-3 rounded-md border-2 transition-colors ${
                  isActive
                    ? 'border-accent bg-accent-soft'
                    : 'border-border hover:bg-surface-hover'
                }`}
              >
                <div className={`text-sm font-semibold ${isActive ? 'text-accent-hover dark:text-ink' : 'text-ink'}`}>
                  {level.label}
                </div>
                <p className="text-xs text-ink-muted mt-0.5">{level.description}</p>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Como mostrar as dicas */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-ink mb-1 flex items-center gap-2">
          <MousePointerClick size={16} className="text-accent" />
          Como mostrar as dicas de inglês
        </h3>
        <p className="text-xs text-ink-faint mb-4">
          Controla quando a explicação gramatical aparece ao ler um versículo.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {(
            [
              { id: 'onClick', label: 'Só ao clicar', description: 'O ícone fica discreto; a explicação só abre quando você clicar nele.' },
              { id: 'auto', label: 'Destacar automaticamente', description: 'Palavras acima do seu nível já aparecem sublinhadas, como no Word Wise da Kindle.' },
            ] as { id: HintTrigger; label: string; description: string }[]
          ).map((option) => {
            const isActive = settings.hintTrigger === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setHintTrigger(option.id)}
                className={`text-left p-3 rounded-md border-2 transition-colors ${
                  isActive ? 'border-accent bg-accent-soft' : 'border-border hover:bg-surface-hover'
                }`}
              >
                <div className={`text-sm font-semibold ${isActive ? 'text-accent-hover dark:text-ink' : 'text-ink'}`}>
                  {option.label}
                </div>
                <p className="text-xs text-ink-muted mt-0.5">{option.description}</p>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Áudio */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-ink mb-1 flex items-center gap-2">
          <Volume2 size={16} className="text-accent" />
          Áudio
        </h3>
        <p className="text-xs text-ink-faint mb-4">
          Preferências usadas ao ouvir o versículo e as explicações em inglês.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">Velocidade da narração</label>
            <div className="flex gap-2">
              {(['slow', 'normal'] as AudioSpeed[]).map((speed) => (
                <button
                  key={speed}
                  onClick={() => setAudioSpeed(speed)}
                  className={`px-3 py-1.5 rounded-md text-sm border-2 transition-colors ${
                    settings.audioSpeed === speed
                      ? 'border-accent bg-accent-soft text-accent-hover dark:text-ink font-medium'
                      : 'border-border text-ink-muted hover:bg-surface-hover'
                  }`}
                >
                  {speed === 'slow' ? 'Devagar (recomendado p/ iniciantes)' : 'Normal'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">Sotaque</label>
            <div className="flex gap-2">
              {(['us', 'uk'] as AudioAccent[]).map((accent) => (
                <button
                  key={accent}
                  onClick={() => setAudioAccent(accent)}
                  className={`px-3 py-1.5 rounded-md text-sm border-2 transition-colors ${
                    settings.audioAccent === accent
                      ? 'border-accent bg-accent-soft text-accent-hover dark:text-ink font-medium'
                      : 'border-border text-ink-muted hover:bg-surface-hover'
                  }`}
                >
                  {accent === 'us' ? 'Americano' : 'Britânico'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnglishSettings;
