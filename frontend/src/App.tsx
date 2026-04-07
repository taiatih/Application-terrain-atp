import React, { useState, useEffect, useRef } from 'react';
import { SessionProvider, useSession } from './context/SessionContext';
import LoginScreen from './views/LoginScreen';
import Home from './views/Home';
import QuickAction from './views/QuickAction';
import Consumable from './views/Consumable';
import Anomaly from './views/Anomaly';
import Printing from './views/Printing';
import Header from './components/ui/Header';
import ExpiryBanner from './components/ui/ExpiryBanner';

export type View = 'home' | 'quick-action' | 'consumable' | 'anomaly' | 'printing';

function FadeView({ children, viewKey }: { children: React.ReactNode; viewKey: string }) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(children);
  const prevKey = useRef(viewKey);

  useEffect(() => {
    if (prevKey.current !== viewKey) {
      // Fade out, swap content, fade in
      setVisible(false);
      const t = setTimeout(() => {
        setContent(children);
        prevKey.current = viewKey;
        setVisible(true);
      }, 150);
      return () => clearTimeout(t);
    } else {
      setVisible(true);
    }
  }, [viewKey, children]);

  return (
    <div
      className="h-full transition-opacity duration-150 ease-in-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {content}
    </div>
  );
}

function AppContent() {
  const { operator } = useSession();
  const [currentView, setCurrentView] = useState<View>('home');

  const navigate = (view: View) => setCurrentView(view);
  const goHome = () => setCurrentView('home');

  if (!operator) {
    return <LoginScreen />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'quick-action':
        return <QuickAction onBackToHome={goHome} />;
      case 'consumable':
        return <Consumable onBackToHome={goHome} />;
      case 'anomaly':
        return <Anomaly onBackToHome={goHome} />;
      case 'printing':
        return <Printing onHome={goHome} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-white shadow-xl overflow-hidden relative">
      {/* Bannière déconnexion imminente */}
      <ExpiryBanner />

      {/* Header global */}
      <Header onNavigateHome={goHome} />

      {/* Contenu avec transition fade */}
      <main className="flex-1 overflow-y-auto">
        <FadeView viewKey={currentView}>
          {renderView()}
        </FadeView>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
}
