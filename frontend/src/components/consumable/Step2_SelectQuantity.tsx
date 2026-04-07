import React, { useState } from 'react';
import { ConsumableConfig } from '../../types/app.types';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  config: ConsumableConfig;
  itemLabel: string;
  unit: string;
  defaultQuantity: number | null;
  onNext: (quantity: number) => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

export default function Step2_SelectQuantity({
  config,
  itemLabel,
  unit,
  defaultQuantity,
  onNext,
  onBack,
  step,
  totalSteps,
}: Props) {
  const isPreset = defaultQuantity !== null && config.quantities.includes(defaultQuantity);
  const [selected, setSelected] = useState<number | null>(isPreset ? defaultQuantity : null);
  const [customRaw, setCustomRaw] = useState<string>(
    defaultQuantity !== null && !isPreset ? String(defaultQuantity) : ''
  );

  const parsedCustom = customRaw !== '' ? parseInt(customRaw, 10) : null;
  const effectiveQty = customRaw !== '' ? parsedCustom : selected;
  const isValid = effectiveQty !== null && !isNaN(effectiveQty) && effectiveQty > 0;

  const handlePreset = (qty: number) => {
    setSelected(qty);
    setCustomRaw('');
  };

  const handleCustomChange = (val: string) => {
    // Accepte uniquement les entiers positifs
    if (val === '' || /^\d+$/.test(val)) {
      setCustomRaw(val);
      setSelected(null);
    }
  };

  return (
    <StepScreen title={`Quantité — ${itemLabel}`} step={step} totalSteps={totalSteps}>
      {/* Grille de quantités rapides */}
      <div className="grid grid-cols-3 gap-3">
        {config.quantities.map((qty) => {
          const isActive = selected === qty && customRaw === '';
          return (
            <button
              key={qty}
              onClick={() => handlePreset(qty)}
              className={[
                'py-5 text-2xl font-bold rounded-xl border-2 transition-all duration-150 active:scale-95',
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-blue-400 hover:bg-blue-50',
              ].join(' ')}
            >
              {qty}
            </button>
          );
        })}
      </div>

      {/* Séparateur */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400 font-medium">ou saisir</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Champ numérique libre */}
      <div className="flex items-center gap-3">
        <input
          type="number"
          inputMode="numeric"
          min={1}
          value={customRaw}
          onChange={(e) => handleCustomChange(e.target.value)}
          placeholder="0"
          className={[
            'flex-1 p-4 text-2xl font-bold text-center border-2 rounded-xl focus:outline-none transition-colors',
            customRaw !== '' && isValid
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 focus:border-blue-400',
          ].join(' ')}
        />
        <span className="text-lg font-semibold text-gray-500 min-w-[60px]">{unit}</span>
      </div>

      {/* Confirmation visuelle */}
      {isValid && (
        <div className="flex justify-center">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full text-base">
            {effectiveQty} {unit} sélectionné{effectiveQty! > 1 ? 's' : ''}
          </span>
        </div>
      )}

      <BottomActions
        onBack={onBack}
        onNext={() => isValid && onNext(effectiveQty!)}
        nextDisabled={!isValid}
        nextLabel="Suivant"
      />
    </StepScreen>
  );
}
