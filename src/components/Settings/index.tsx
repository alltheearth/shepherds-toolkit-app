import { useState } from 'react';
import { Settings as SettingsIcon, Languages } from 'lucide-react';
import EnglishSettings from './EnglishSettings';

type SettingsCategory = 'english';

const categories: { id: SettingsCategory; name: string; icon: typeof Languages }[] = [
  { id: 'english', name: 'Inglês', icon: Languages },
];

const Settings = () => {
  const [active, setActive] = useState<SettingsCategory>('english');

  return (
    <div className="flex-1 flex overflow-hidden bg-bg">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="text-accent" size={22} />
            <h1 className="text-lg font-semibold text-ink">Configurações</h1>
          </div>

          <div className="flex gap-6">
            <nav className="w-48 flex-shrink-0 space-y-0.5">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = active === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActive(category.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-accent-soft text-accent-hover font-medium dark:text-ink'
                        : 'text-ink-muted hover:bg-surface-hover hover:text-ink'
                    }`}
                  >
                    <Icon size={16} className="flex-shrink-0" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex-1 min-w-0">
              {active === 'english' && <EnglishSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
