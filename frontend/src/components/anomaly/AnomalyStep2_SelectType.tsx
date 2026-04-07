import React, { useState } from 'react';
import { AnomalyConfig } from '../../types/app.types';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  config: AnomalyConfig;
  onSelect: (id: string, label: string) => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

export default function AnomalyStep2_SelectType({ config, onSelect, onBack, step, totalSteps }: Props) {
  const [selected, setSelected] = useState('');

  const handleSelect = (id: string, label: string) => {
    setSelected(id);
    // Légère pause pour montrer le feedback visuel avant de passer à l'étape suivante
    setTimeout(() => onSelect(id, label), 120);
  };

  return (
    <StepScreen title="Type d'anomalie" step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-3 flex-grow">
        {config.types.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelect(t.id, t.label)}
            className={[
              'w-full py-4 px-5 rounded-xl text-lg font-semibold text-left border-2 transition-all duration-150 active:scale-95',
              selected === t.id
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                : 'border-gray-200 bg-white text-gray-800 hover:border-blue-200 hover:bg-blue-50/30',
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </div>
      <BottomActions onBack={onBack} nextDisabled={true} />
    </StepScreen>
  );
}
