import React from 'react';
import { useSession } from '../../context/SessionContext';

interface HeaderProps {
  onNavigateHome: () => void;
}

export default function Header({ onNavigateHome }: HeaderProps) {
  const { operator, loginTime, logout } = useSession();

  if (!operator) return null;

  const initials = operator.prenom.charAt(0).toUpperCase();

  const loginTimeStr = loginTime
    ? loginTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
      {/* Avatar + nom */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {initials}
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-gray-800">{operator.prenom}</p>
          {loginTimeStr && (
            <p className="text-xs text-gray-400">Connecté à {loginTimeStr}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Bouton Changer d'opérateur */}
        <button
          onClick={() => { onNavigateHome(); logout(); }}
          className="px-3 py-1.5 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors active:scale-95"
        >
          Changer
        </button>
        {/* Bouton Déconnexion */}
        <button
          onClick={logout}
          className="px-3 py-1.5 text-xs font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors active:scale-95"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
