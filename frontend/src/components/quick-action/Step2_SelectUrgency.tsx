import React, { useState } from 'react';
import { QuickActionConfig } from '../../types/app.types';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  config: QuickActionConfig;
  onSelect: (id: 'normal' | 'urgent') => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

const URGENCY_BORDER: Record<string, string> = {
  urgent: 'border-orange-400 bg-orange-50 text-orange-700 shadow-md',
  normal: 'border-blue-500 bg-blue-50 text-blue-700 shadow-md',
};

const URGENCY_HOVER: Record<string, string> = {
  urgent: 'border-gray-200 bg-white text-gray-800 hover:border-orange-200 hover:bg-orange-50/30',
  normal: 'border-gray-200 bg-white text-gray-800 hover:border-blue-200 hover:bg-blue-50/30',
};

export default function Step2_SelectUrgency({ config, onSelect, onBack, step, totalSteps }: Props) {
  const [selected, setSelected] = useState('');

  const handleSelect = (id: 'normal' | 'urgent') => {
    setSelected(id);
    setTimeout(() => onSelect(id), 120);
  };

  return (
    <StepScreen title="Niveau d'urgence" step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-3 flex-grow">
        {config.urgencies.map((urgency) => (
          <button
            key={urgency.id}
            onClick={() => handleSelect(urgency.id as 'normal' | 'urgent')}
            className={[
              'w-full py-5 px-6 text-xl font-bold rounded-xl border-2 transition-all duration-150 active:scale-95',
              selected === urgency.id
                ? (URGENCY_BORDER[urgency.id] ?? URGENCY_BORDER.normal)
                : (URGENCY_HOVER[urgency.id] ?? URGENCY_HOVER.normal),
            ].join(' ')}
          >
            {urgency.label}
          </button>
        ))}
      </div>
      <BottomActions onBack={onBack} />
    </StepScreen>
  );
}
