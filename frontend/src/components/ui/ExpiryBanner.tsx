import React from 'react';
import { useSession } from '../../context/SessionContext';

export default function ExpiryBanner() {
  const { isExpiring, graceSecondsLeft, logout, setFormActive } = useSession();

  if (!isExpiring) return null;

  const handleFinish = () => {
    setFormActive(false);
    logout();
  };

  const handleContinue = () => {
    // L'opérateur reconnaît l'avertissement — on ne fait rien, le timer continue
    // mais on pourrait ici prolonger si besoin futur
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-orange-500 text-white px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-lg flex-shrink-0">⚠️</span>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight">Session expirée</p>
            <p className="text-xs opacity-90 leading-tight truncate">
              Déconnexion dans {graceSecondsLeft}s — terminez ou annulez votre saisie
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleContinue}
            className="px-3 py-1.5 text-xs font-bold bg-white text-orange-600 rounded-lg active:scale-95"
          >
            OK
          </button>
          <button
            onClick={handleFinish}
            className="px-3 py-1.5 text-xs font-bold bg-orange-700 text-white rounded-lg active:scale-95"
          >
            Quitter
          </button>
        </div>
      </div>
    </div>
  );
}
