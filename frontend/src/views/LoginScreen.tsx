import React, { useState, useEffect, useRef } from 'react';
import { useSession, Operator } from '../context/SessionContext';

interface OperatorOption {
  id: string;
  prenom: string;
  badge: string;
}

export default function LoginScreen() {
  const { login } = useSession();
  const [operators, setOperators] = useState<OperatorOption[]>([]);
  const [scanBuffer, setScanBuffer] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [mode, setMode] = useState<'scan' | 'manual'>('scan');
  const [scanError, setScanError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Charger la liste des opérateurs
  useEffect(() => {
    fetch('/api/operators')
      .then((r) => r.json())
      .then((data) => setOperators(data.operators || []))
      .catch(() => setOperators([]));
  }, []);

  // Focus automatique sur le champ caché pour capturer le scan DataWedge
  useEffect(() => {
    if (mode === 'scan' && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [mode]);

  // Résolution du badge scanné
  const resolveBadge = async (badge: string) => {
    if (!badge.trim()) return;
    setIsLoading(true);
    setScanError('');
    try {
      const res = await fetch(`/api/operators/${encodeURIComponent(badge.trim())}`);
      const data = await res.json();
      if (data.success && data.operator) {
        login(data.operator as Operator);
      } else {
        setScanError(data.message || 'Badge non reconnu.');
        setScanBuffer('');
        setTimeout(() => {
          if (hiddenInputRef.current) hiddenInputRef.current.focus();
        }, 100);
      }
    } catch {
      setScanError('Impossible de contacter le serveur. Réessayez.');
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion du scan DataWedge (keystroke + Enter)
  const handleScanKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value) {
        resolveBadge(value);
        setScanBuffer('');
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  // Validation fallback manuel
  const handleManualLogin = () => {
    if (!selectedId) return;
    const op = operators.find((o) => o.id === selectedId);
    if (op) login(op);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      {/* Logo / Titre */}
      <div className="mb-10 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-white">
            <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="3" fill="none"/>
            <path d="M32 14 L32 32 L44 38" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">Assistant Atelier</h1>
        <p className="text-sm text-gray-400 mt-1">Identifiez-vous pour continuer</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {mode === 'scan' ? (
          <>
            {/* Champ invisible pour capturer le scan DataWedge */}
            <input
              ref={hiddenInputRef}
              type="text"
              value={scanBuffer}
              onChange={(e) => setScanBuffer(e.target.value)}
              onKeyDown={handleScanKeyDown}
              className="opacity-0 absolute w-0 h-0 pointer-events-none"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
            />

            {/* Zone de scan visuelle */}
            <div
              className="flex flex-col items-center gap-4 cursor-pointer"
              onClick={() => hiddenInputRef.current?.focus()}
            >
              <div className="w-24 h-24 border-4 border-blue-400 border-dashed rounded-2xl flex items-center justify-center bg-blue-50 animate-pulse">
                <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-blue-500">
                  <rect x="8" y="16" width="4" height="32" fill="currentColor"/>
                  <rect x="16" y="16" width="2" height="32" fill="currentColor"/>
                  <rect x="22" y="16" width="6" height="32" fill="currentColor"/>
                  <rect x="32" y="16" width="2" height="32" fill="currentColor"/>
                  <rect x="38" y="16" width="4" height="32" fill="currentColor"/>
                  <rect x="46" y="16" width="2" height="32" fill="currentColor"/>
                  <rect x="52" y="16" width="4" height="32" fill="currentColor"/>
                </svg>
              </div>
              <p className="text-base font-semibold text-gray-700 text-center">
                {isLoading ? 'Identification en cours...' : 'Scannez votre badge'}
              </p>
              <p className="text-xs text-gray-400 text-center">
                Appuyez sur la gâchette du terminal et pointez votre badge
              </p>
            </div>

            {/* Message d'erreur scan */}
            {scanError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
                {scanError}
              </div>
            )}

            {/* Séparateur */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200"/>
              <span className="text-xs text-gray-400">ou</span>
              <div className="flex-1 h-px bg-gray-200"/>
            </div>

            {/* Bouton fallback manuel */}
            <button
              onClick={() => { setMode('manual'); setScanError(''); }}
              className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Sélectionner mon nom manuellement
            </button>
          </>
        ) : (
          <>
            <h2 className="text-base font-bold text-gray-700 mb-4 text-center">
              Qui êtes-vous ?
            </h2>

            {/* Liste déroulante */}
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors bg-white appearance-none"
            >
              <option value="">-- Sélectionnez votre nom --</option>
              {operators.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.prenom}
                </option>
              ))}
            </select>

            {/* Bouton valider */}
            <button
              onClick={handleManualLogin}
              disabled={!selectedId}
              className="mt-4 w-full py-4 bg-blue-600 text-white text-lg font-bold rounded-xl disabled:bg-gray-200 disabled:text-gray-400 transition-colors active:scale-95"
            >
              Valider
            </button>

            {/* Retour scan */}
            <button
              onClick={() => { setMode('scan'); setSelectedId(''); }}
              className="mt-3 w-full py-3 text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              ← Retour au scan
            </button>
          </>
        )}
      </div>

      <p className="mt-8 text-xs text-gray-300 tracking-widest uppercase">MVP v1.0</p>
    </div>
  );
}
