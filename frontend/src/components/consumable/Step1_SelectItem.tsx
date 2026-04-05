import React from 'react';
import { ConsumableConfig } from '../../types/app.types';
import BigButton from '../ui/BigButton';
import StepScreen from '../ui/StepScreen';

interface Props {
  config: ConsumableConfig;
  onSelect: (id: string, label: string, unit: string) => void;
  onBack: () => void;
}

export default function Step1_SelectItem({ config, onSelect, onBack }: Props) {
  return (
    <StepScreen title="Quel consommable ?">
      {config.items.map((item) => (
        <BigButton
          key={item.id}
          onClick={() => onSelect(item.id, item.label, item.unit)}
        >
          {item.label}
        </BigButton>
      ))}
      <div className="mt-auto pt-4">
        <button
          onClick={onBack}
          className="w-full py-4 text-lg font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          Accueil
        </button>
      </div>
    </StepScreen>
  );
}
