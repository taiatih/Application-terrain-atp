import React, { useState } from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  quantities: number[];
  selected: number | null;
  onSelect: (q: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PrintLabelStep4_Quantity({ quantities, selected, onSelect, onNext, onBack }: Props) {
  const [custom, setCustom] = useState('');

  const handleCustom = (v: string) => {
    const num = parseInt(v, 10);
    setCustom(v);
    if (!isNaN(num) && num > 0) onSelect(num);
  };

  const handleQuick = (q: number) => {
    setCustom('');
    onSelect(q);
  };

  return (
    <StepScreen title="Quantité d'étiquettes">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {quantities.map((q) => (
            <button
              key={q}
              onClick={() => handleQuick(q)}
              className={[
                'py-4 rounded-xl text-xl font-bold transition-all duration-100 active:scale-95',
                selected === q && custom === ''
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
              ].join(' ')}
            >
              {q}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors">
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={999}
            value={custom}
            onChange={(e) => handleCustom(e.target.value)}
            placeholder="Autre quantité"
            className="flex-1 text-xl outline-none bg-transparent"
          />
          <span className="text-gray-400 text-base">étiquettes</span>
        </div>
        {selected !== null && (
          <p className="text-center text-blue-600 font-semibold text-base">
            {selected} étiquette{selected > 1 ? 's' : ''} sélectionnée{selected > 1 ? 's' : ''}
          </p>
        )}
      </div>
      <BottomActions onBack={onBack} onNext={onNext} nextDisabled={!selected || selected < 1} />
    </StepScreen>
  );
}
