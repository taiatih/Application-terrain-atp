import React, { useState, useRef } from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  defaultValue: string;
  onNext: (photoBase64: string) => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

export default function AnomalyStep5_Photo({ defaultValue, onNext, onBack, step, totalSteps }: Props) {
  const [preview, setPreview] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <StepScreen title="Photo de l'anomalie" step={step} totalSteps={totalSteps}>
      <p className="text-sm text-gray-400 text-center -mt-2">
        Optionnel — prenez une photo ou importez une image.
      </p>

      {preview ? (
        <div className="flex flex-col items-center gap-3">
          <img
            src={preview}
            alt="Aperçu anomalie"
            className="w-full max-h-64 object-cover rounded-xl border border-gray-200 shadow"
          />
          <button
            onClick={handleRemove}
            className="text-sm text-red-500 font-semibold hover:underline"
          >
            Supprimer la photo
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full py-10 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 text-lg font-medium hover:border-blue-400 hover:text-blue-500 transition-colors active:scale-95"
        >
          📷 Appuyer pour ajouter une photo
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleChange}
      />

      <BottomActions
        onBack={onBack}
        onNext={() => onNext(preview)}
        nextLabel="Suivant"
      />
    </StepScreen>
  );
}
