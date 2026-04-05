import React, { useState } from 'react';
import Home from './views/Home';
import QuickAction from './views/QuickAction';
import Consumable from './views/Consumable';
import Anomaly from './views/Anomaly';
import Printing from './views/Printing';

export type View = 'home' | 'quick-action' | 'consumable' | 'anomaly' | 'printing';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigate = (view: View) => setCurrentView(view);

  return (
    <main className="h-full w-full max-w-md mx-auto bg-white shadow-xl overflow-hidden">
      {currentView === 'home' && <Home onNavigate={navigate} />}
      {currentView === 'quick-action' && (
        <QuickAction onBackToHome={() => navigate('home')} />
      )}
      {currentView === 'consumable' && (
        <Consumable onBackToHome={() => navigate('home')} />
      )}
      {currentView === 'anomaly' && (
        <Anomaly onBackToHome={() => navigate('home')} />
      )}
      {currentView === 'printing' && (
        <Printing onHome={() => navigate('home')} />
      )}
    </main>
  );
}
