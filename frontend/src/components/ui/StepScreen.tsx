import React from 'react';

interface StepScreenProps {
  title: string;
  children: React.ReactNode;
  /** Étape courante (1-based) */
  step?: number;
  /** Nombre total d'étapes */
  totalSteps?: number;
  /** Sous-titre optionnel */
  subtitle?: string;
}

export default function StepScreen({
  title,
  children,
  step,
  totalSteps,
  subtitle,
}: StepScreenProps) {
  const showProgress = step !== undefined && totalSteps !== undefined && totalSteps > 1;
  const progress = showProgress ? Math.round((step / totalSteps) * 100) : 0;

  return (
    <div className="flex flex-col h-full p-6">
      {/* Barre de progression */}
      {showProgress && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-blue-600">
              Étape {step} / {totalSteps}
            </span>
            <span className="text-xs text-gray-400">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Titre */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-1 leading-tight">
        {title}
      </h2>

      {/* Sous-titre optionnel */}
      {subtitle && (
        <p className="text-sm text-gray-500 text-center mb-6">{subtitle}</p>
      )}

      {!subtitle && <div className="mb-6" />}

      {/* Contenu */}
      <div className="flex flex-col flex-grow gap-4">{children}</div>
    </div>
  );
}
