import React, { useState } from 'react';
import { AnomalyConfig } from '../../types/app.types';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  config: AnomalyConfig;
  defaultValue: string;
  onNext: (zone: string, zoneLabel: string) => void;
  onBack: () => void;
}

export default function AnomalyStep4_SelectZone({ config, defaultValue, onNext, onBack }: Props) {
  const [selected, setSelected] = useState<string>(defaultValue);

  const handleNext = () => {
    const zoneLabel = config.zones.find((z) => z.id === selected)?.label ?? '';
    onNext(selected, zoneLabel);
  };

  return (
    <StepScreen title="Zone concernée">
      <p className="text-sm text-gray-400 text-center -mt-2">
        Optionnel — laissez vide si non applicable.
      </p>
      <div className="flex flex-col gap-3">
        {config.zones.map((zone) => {
          const isActive = selected === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => setSelected(isActive ? '' : zone.id)}
              className={[
                'w-full py-4 text-lg font-semibold rounded-xl border-2 transition-all duration-150 active:scale-95',
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-blue-400 hover:bg-blue-50',
              ].join(' ')}
            >
              {zone.label}
            </button>
          );
        })}
      </div>
      <BottomActions onBack={onBack} onNext={handleNext} nextLabel="Suivant" />
    </StepScreen>
  );
}
