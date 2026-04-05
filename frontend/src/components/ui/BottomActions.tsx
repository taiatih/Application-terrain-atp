import React from 'react';

interface BottomActionsProps {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export default function BottomActions({
  onBack,
  onNext,
  backLabel = 'Retour',
  nextLabel = 'Suivant',
  nextDisabled = false,
}: BottomActionsProps) {
  return (
    <div className="mt-auto pt-6 flex items-center justify-between gap-4">
      {onBack ? (
        <button
          onClick={onBack}
          className="flex-1 py-4 text-lg font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          {backLabel}
        </button>
      ) : (
        <div className="flex-1" />
      )}

      {onNext && (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="flex-1 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
