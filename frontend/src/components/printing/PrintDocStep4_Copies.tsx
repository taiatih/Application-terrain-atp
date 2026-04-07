import React from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  copies: number[];
  selected: number;
  onSelect: (n: number) => void;
  onNext: () => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

export default function PrintDocStep4_Copies({ copies, selected, onSelect, onNext, onBack, step, totalSteps }: Props) {
  return (
    <StepScreen title="Nombre d'exemplaires" step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {copies.map((n) => (
            <button
              key={n}
              onClick={() => onSelect(n)}
              className={[
                'py-5 rounded-xl text-2xl font-bold transition-all duration-100 active:scale-95',
                selected === n
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
              ].join(' ')}
            >
              {n}
            </button>
          ))}
        </div>
        {selected > 0 && (
          <p className="text-center text-blue-600 font-semibold text-base">
            {selected} exemplaire{selected > 1 ? 's' : ''} sélectionné{selected > 1 ? 's' : ''}
          </p>
        )}
      </div>
      <BottomActions onBack={onBack} onNext={onNext} nextDisabled={selected < 1} />
    </StepScreen>
  );
}
