import React from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';
import { PrintingDocumentType } from '../../types/app.types';

interface Props {
  documentTypes: PrintingDocumentType[];
  selected: string;
  onSelect: (id: string, label: string) => void;
  onNext: () => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

export default function PrintDocStep2_SelectType({
  documentTypes, selected, onSelect, onNext, onBack, step, totalSteps,
}: Props) {
  return (
    <StepScreen title="Type de document" step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-3">
        {documentTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id, t.label)}
            className={[
              'w-full px-5 py-4 rounded-xl text-left border-2 transition-all duration-150 active:scale-95',
              selected === t.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/30',
            ].join(' ')}
          >
            <div className={`text-lg font-bold ${selected === t.id ? 'text-blue-700' : 'text-gray-800'}`}>
              {t.label}
            </div>
            <div className={`text-sm mt-0.5 ${selected === t.id ? 'text-blue-500' : 'text-gray-500'}`}>
              {t.description}
            </div>
          </button>
        ))}
      </div>
      <BottomActions onBack={onBack} onNext={onNext} nextDisabled={!selected} />
    </StepScreen>
  );
}
