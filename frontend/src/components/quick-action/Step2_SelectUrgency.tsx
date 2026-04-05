import React from 'react';
import { QuickActionConfig } from '../../types/app.types';
import BigButton from '../ui/BigButton';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  config: QuickActionConfig;
  onSelect: (id: 'normal' | 'urgent') => void;
  onBack: () => void;
}

const URGENCY_STYLES: Record<string, string> = {
  urgent: 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 focus:ring-orange-400',
  normal: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500',
};

export default function Step2_SelectUrgency({ config, onSelect, onBack }: Props) {
  return (
    <StepScreen title="Niveau d'urgence">
      {config.urgencies.map((urgency) => (
        <button
          key={urgency.id}
          onClick={() => onSelect(urgency.id as 'normal' | 'urgent')}
          className={[
            'w-full py-5 px-6 text-xl font-bold rounded-xl shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'transition-colors duration-100',
            URGENCY_STYLES[urgency.id] ?? URGENCY_STYLES.normal,
          ].join(' ')}
        >
          {urgency.label}
        </button>
      ))}
      <BottomActions onBack={onBack} />
    </StepScreen>
  );
}
