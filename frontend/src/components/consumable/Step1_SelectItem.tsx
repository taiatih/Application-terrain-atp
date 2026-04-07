import React, { useState } from 'react';
import { ConsumableConfig } from '../../types/app.types';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  config: ConsumableConfig;
  onSelect: (id: string, label: string, unit: string) => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

export default function Step1_SelectItem({ config, onSelect, onBack, step, totalSteps }: Props) {
  const [selected, setSelected] = useState('');

  const handleSelect = (id: string, label: string, unit: string) => {
    setSelected(id);
    setTimeout(() => onSelect(id, label, unit), 120);
  };

  return (
    <StepScreen title="Quel consommable ?" step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-3 flex-grow">
        {config.items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelect(item.id, item.label, item.unit)}
            className={[
              'w-full py-4 px-5 rounded-xl text-lg font-semibold text-left border-2 transition-all duration-150 active:scale-95',
              selected === item.id
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                : 'border-gray-200 bg-white text-gray-800 hover:border-blue-200 hover:bg-blue-50/30',
            ].join(' ')}
          >
            {item.label}
          </button>
        ))}
      </div>
      <BottomActions onBack={onBack} backLabel="Accueil" />
    </StepScreen>
  );
}
