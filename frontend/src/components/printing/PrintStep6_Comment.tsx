import React from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  comment: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PrintStep6_Comment({ comment, onChange, onNext, onBack }: Props) {
  return (
    <StepScreen title="Commentaire (optionnel)">
      <div className="flex flex-col gap-3">
        <textarea
          value={comment}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Précision, instruction particulière..."
          rows={4}
          className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
        />
        <p className="text-sm text-gray-400 text-center">
          Laissez vide si aucune précision nécessaire.
        </p>
      </div>
      <BottomActions onBack={onBack} onNext={onNext} nextLabel="Récapitulatif" />
    </StepScreen>
  );
}
