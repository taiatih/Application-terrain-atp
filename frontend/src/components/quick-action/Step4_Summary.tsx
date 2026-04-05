import React from 'react';
import { QuickActionFormData } from '../../types/app.types';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  formData: QuickActionFormData;
  onSubmit: () => void;
  onBack: () => void;
}

const URGENCY_LABELS: Record<string, string> = {
  normal: 'Normal',
  urgent: 'Urgent',
};

const URGENCY_COLORS: Record<string, string> = {
  normal: 'text-blue-700 bg-blue-50',
  urgent: 'text-orange-700 bg-orange-50',
};

export default function Step4_Summary({ formData, onSubmit, onBack }: Props) {
  return (
    <StepScreen title="Récapitulatif">
      <div className="flex flex-col gap-3 flex-grow">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Type d'action
          </p>
          <p className="text-xl font-bold text-gray-900">{formData.typeLabel}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Urgence
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-lg font-bold ${
              URGENCY_COLORS[formData.urgency] ?? 'text-gray-700 bg-gray-100'
            }`}
          >
            {URGENCY_LABELS[formData.urgency] ?? formData.urgency}
          </span>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Commentaire
          </p>
          <p className="text-lg text-gray-700 italic">
            {formData.comment?.trim() || 'Aucun commentaire'}
          </p>
        </div>
      </div>

      <BottomActions onBack={onBack} onNext={onSubmit} nextLabel="Envoyer" />
    </StepScreen>
  );
}
