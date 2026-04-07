import React from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';
import { PrintingZone } from '../../types/app.types';

interface Props {
  zones: PrintingZone[];
  selected: string;
  onSelect: (id: string, label: string) => void;
  onNext: () => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

export default function PrintStep5_Zone({
  zones, selected, onSelect, onNext, onBack, step, totalSteps,
}: Props) {
  const toggle = (id: string, label: string) => {
    if (selected === id) onSelect('', '');
    else onSelect(id, label);
  };

  return (
    <StepScreen title="Zone (optionnel)" subtitle="Où doit être utilisée cette impression ?" step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-3">
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => toggle(z.id, z.label)}
            className={[
              'w-full py-4 px-5 rounded-xl text-lg font-semibold text-left border-2 transition-all duration-150 active:scale-95',
              selected === z.id
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                : 'border-gray-200 bg-white text-gray-800 hover:border-blue-200 hover:bg-blue-50/30',
            ].join(' ')}
          >
            {z.label}
          </button>
        ))}
      </div>
      <BottomActions onBack={onBack} onNext={onNext} nextLabel="Suivant" />
    </StepScreen>
  );
}
