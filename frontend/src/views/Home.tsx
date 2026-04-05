import React from 'react';
import { View } from '../App';

// --- Icônes SVG inline fidèles à l'infographie ---

const IconActionRapide = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="32" cy="32" r="27" stroke="currentColor" strokeWidth="3" fill="none"/>
    <path d="M36 13L21 34h13l-4 17 19-23H36L40 13z" fill="currentColor"/>
  </svg>
);

const IconConsommables = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M32 4L8 16v16l24 12 24-12V16L32 4z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="none"/>
    <path d="M8 16l24 12 24-12" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M32 28v24" stroke="currentColor" strokeWidth="3"/>
    <path d="M20 10l12 6 12-6" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
  </svg>
);

const IconAnomalie = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M32 5L3 57h58L32 5z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="none"/>
    <line x1="32" y1="25" x2="32" y2="40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="32" cy="49" r="2.8" fill="currentColor"/>
  </svg>
);

const IconImpression = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="10" y="22" width="44" height="22" rx="4" stroke="currentColor" strokeWidth="3" fill="none"/>
    <rect x="18" y="34" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <line x1="23" y1="41" x2="41" y2="41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="23" y1="47" x2="35" y2="47" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 22V10a2 2 0 012-2h24a2 2 0 012 2v12" stroke="currentColor" strokeWidth="2.5"/>
    <circle cx="46" cy="31" r="2.5" fill="currentColor"/>
  </svg>
);

// --- Composant bouton module ---

interface ModuleButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ModuleButton: React.FC<ModuleButtonProps> = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    className="
      flex flex-col items-center justify-center gap-3
      bg-white rounded-2xl border border-blue-100
      w-full aspect-square
      shadow-sm
      transition-all duration-150
      active:scale-95 active:shadow-none
      hover:border-blue-300 hover:shadow-md
      cursor-pointer
    "
  >
    <div className="w-14 h-14 text-blue-600 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-sm font-semibold text-gray-800 tracking-wide">
      {label}
    </span>
  </button>
);

// --- Vue principale ---

interface HomeProps {
  onNavigate: (view: View) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <div className="pt-12 pb-8 px-6 text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight leading-tight">
          Assistant Atelier
        </h1>
        <p className="mt-2 text-sm text-gray-500 leading-snug max-w-xs mx-auto">
          Application terrain mobile pour digitaliser<br />
          les demandes opérationnelles en entrepôt
        </p>
      </div>

      {/* Grille 2×2 */}
      <div className="flex-1 px-5">
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <ModuleButton
            label="Action Rapide"
            icon={<IconActionRapide />}
            onClick={() => onNavigate('quick-action')}
          />
          <ModuleButton
            label="Consommables"
            icon={<IconConsommables />}
            onClick={() => onNavigate('consumable')}
          />
          <ModuleButton
            label="Anomalie"
            icon={<IconAnomalie />}
            onClick={() => onNavigate('anomaly')}
          />
          <ModuleButton
            label="Impression"
            icon={<IconImpression />}
            onClick={() => onNavigate('printing')}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <span className="text-xs text-gray-300 tracking-widest uppercase">MVP v1.0</span>
      </div>

    </div>
  );
}
