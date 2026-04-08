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

/**
 * Compresse une image via canvas : redimensionne à maxWidth et encode en JPEG.
 */
function compressImage(dataUrl: string, maxWidth = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(dataUrl); return; }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export default function AnomalyStep5_Photo({ defaultValue, onNext, onBack, step, totalSteps }: Props) {
  const [preview, setPreview] = useState<string>(defaultValue);
  const [compressing, setCompressing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setCompressing(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const raw = e.target?.result as string;
      const compressed = await compressImage(raw);
      setPreview(compressed);
      setCompressing(false);
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

      {compressing ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Traitement de la photo...</p>
        </div>
      ) : preview ? (
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
        nextDisabled={compressing}
      />
    </StepScreen>
  );
}
