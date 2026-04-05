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
}

export default function PrintStep5_Zone({ zones, selected, onSelect, onNext, onBack }: Props) {
  const toggle = (id: string, label: string) => {
    if (selected === id) onSelect('', '');
    else onSelect(id, label);
  };

  return (
    <StepScreen title="Zone (optionnel)">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-400 text-center">Où doit être utilisée cette impression ?</p>
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => toggle(z.id, z.label)}
            className={[
              'w-full py-4 px-5 rounded-xl text-lg font-semibold text-left transition-all duration-100 active:scale-95',
              selected === z.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
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
