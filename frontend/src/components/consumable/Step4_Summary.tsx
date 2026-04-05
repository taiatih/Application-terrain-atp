import React from 'react';
import { ConsumableFormData } from '../../types/app.types';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  formData: ConsumableFormData;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Step4_Summary({ formData, onSubmit, onBack }: Props) {
  return (
    <StepScreen title="Récapitulatif">
      <div className="flex flex-col gap-3 flex-grow">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Consommable
          </p>
          <p className="text-xl font-bold text-gray-900">{formData.itemLabel}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Quantité
          </p>
          <p className="text-xl font-bold text-blue-700">
            {formData.quantity} {formData.unit}
          </p>
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
