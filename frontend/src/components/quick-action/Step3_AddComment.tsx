import React, { useState } from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  defaultValue: string;
  onNext: (comment: string) => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

export default function Step3_AddComment({ defaultValue, onNext, onBack, step, totalSteps }: Props) {
  const [comment, setComment] = useState(defaultValue);

  return (
    <StepScreen title="Commentaire (optionnel)" step={step} totalSteps={totalSteps}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Ajoutez des détails si nécessaire..."
        rows={6}
        className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-blue-500 transition-colors"
      />
      <p className="text-sm text-gray-400 text-center">
        Ce champ est facultatif. Laissez vide si aucun détail n'est nécessaire.
      </p>
      <BottomActions onBack={onBack} onNext={() => onNext(comment)} nextLabel="Suivant" />
    </StepScreen>
  );
}
