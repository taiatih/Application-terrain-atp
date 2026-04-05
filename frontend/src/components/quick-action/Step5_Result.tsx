import React from 'react';
import { ApiResult } from '../../types/app.types';
import BigButton from '../ui/BigButton';

interface Props {
  result: ApiResult | null;
  submitting: boolean;
  onFinish: () => void;
}

function Spinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-lg text-gray-600 font-medium">Envoi en cours...</p>
    </div>
  );
}

function SuccessIcon() {
  return (
    <svg
      className="w-24 h-24 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      className="w-24 h-24 text-red-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default function Step5_Result({ result, submitting, onFinish }: Props) {
  return (
    <div className="flex flex-col justify-center items-center h-full p-6 text-center gap-6">
      {submitting && <Spinner />}

      {!submitting && result && (
        <>
          {result.success ? <SuccessIcon /> : <ErrorIcon />}

          <div>
            <h2
              className={`text-3xl font-bold mb-2 ${
                result.success ? 'text-gray-800' : 'text-red-700'
              }`}
            >
              {result.success ? 'Demande envoyée !' : 'Erreur'}
            </h2>
            <p className="text-lg text-gray-600">{result.message}</p>
          </div>

          <div className="w-full">
            <BigButton
              onClick={onFinish}
              variant={result.success ? 'primary' : 'secondary'}
            >
              Retour à l'accueil
            </BigButton>
          </div>
        </>
      )}
    </div>
  );
}
