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
}

export default function PrintDocStep2_SelectType({ documentTypes, selected, onSelect, onNext, onBack }: Props) {
  return (
    <StepScreen title="Type de document">
      <div className="flex flex-col gap-3">
        {documentTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id, t.label)}
            className={[
              'w-full px-5 py-4 rounded-xl text-left transition-all duration-100 active:scale-95',
              selected === t.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
            ].join(' ')}
          >
            <div className="text-lg font-bold">{t.label}</div>
            <div className={`text-sm mt-0.5 ${selected === t.id ? 'text-blue-100' : 'text-gray-500'}`}>
              {t.description}
            </div>
          </button>
        ))}
      </div>
      <BottomActions onBack={onBack} onNext={onNext} nextDisabled={!selected} />
    </StepScreen>
  );
}
