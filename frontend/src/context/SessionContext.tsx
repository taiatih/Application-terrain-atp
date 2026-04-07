import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export interface Operator {
  id: string;
  prenom: string;
  badge: string;
}

interface SessionConfig {
  autoLogoutTimes: string[]; // ex: ["12:00", "17:00"]
  gracePeriodSeconds: number;
}

interface SessionState {
  operator: Operator | null;
  loginTime: Date | null;
  isExpiring: boolean;       // true = dans la fenêtre de grâce avant déconnexion
  isFormActive: boolean;     // true = une saisie est en cours dans un module
  graceSecondsLeft: number;  // secondes restantes dans la fenêtre de grâce
  login: (operator: Operator) => void;
  logout: () => void;
  setFormActive: (active: boolean) => void;
}

const SessionContext = createContext<SessionState | null>(null);

export function useSession(): SessionState {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [h, m] = timeStr.split(':').map(Number);
  return { hours: h, minutes: m };
}

function msUntilNext(timeStr: string): number {
  const now = new Date();
  const { hours, minutes } = parseTime(timeStr);
  const target = new Date(now);
  target.setHours(hours, minutes, 0, 0);
  if (target <= now) {
    // Déjà passé aujourd'hui → prochain occurrence demain
    target.setDate(target.getDate() + 1);
  }
  return target.getTime() - now.getTime();
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [operator, setOperator] = useState<Operator | null>(null);
  const [loginTime, setLoginTime] = useState<Date | null>(null);
  const [isExpiring, setIsExpiring] = useState(false);
  const [isFormActive, setIsFormActiveState] = useState(false);
  const [graceSecondsLeft, setGraceSecondsLeft] = useState(0);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig>({
    autoLogoutTimes: ['12:00', '17:00'],
    gracePeriodSeconds: 60,
  });

  const logoutTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const graceTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const graceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Charger la config de session depuis le backend
  useEffect(() => {
    fetch('/api/session-config')
      .then((r) => r.json())
      .then((data: SessionConfig) => setSessionConfig(data))
      .catch(() => {/* utilise les valeurs par défaut */});
  }, []);

  const clearAllTimers = useCallback(() => {
    logoutTimers.current.forEach(clearTimeout);
    logoutTimers.current = [];
    if (graceTimer.current) clearInterval(graceTimer.current);
    if (graceTimeout.current) clearTimeout(graceTimeout.current);
    graceTimer.current = null;
    graceTimeout.current = null;
  }, []);

  const forceLogout = useCallback(() => {
    clearAllTimers();
    setIsExpiring(false);
    setIsFormActiveState(false);
    setGraceSecondsLeft(0);
    setOperator(null);
    setLoginTime(null);
  }, [clearAllTimers]);

  const triggerExpiry = useCallback(() => {
    // Vérifier si une saisie est en cours via ref pour éviter la stale closure
    setIsFormActiveState((currentlyActive) => {
      if (!currentlyActive) {
        // Pas de saisie en cours → déconnexion immédiate
        setTimeout(forceLogout, 0);
      } else {
        // Saisie en cours → fenêtre de grâce
        const graceSecs = sessionConfig.gracePeriodSeconds;
        setIsExpiring(true);
        setGraceSecondsLeft(graceSecs);

        graceTimer.current = setInterval(() => {
          setGraceSecondsLeft((s) => {
            if (s <= 1) {
              if (graceTimer.current) clearInterval(graceTimer.current);
              return 0;
            }
            return s - 1;
          });
        }, 1000);

        graceTimeout.current = setTimeout(() => {
          forceLogout();
        }, graceSecs * 1000);
      }
      return currentlyActive;
    });
  }, [forceLogout, sessionConfig.gracePeriodSeconds]);

  // Programmer les timers de déconnexion automatique
  const scheduleLogoutTimers = useCallback(() => {
    clearAllTimers();
    sessionConfig.autoLogoutTimes.forEach((timeStr) => {
      const ms = msUntilNext(timeStr);
      const t = setTimeout(() => {
        triggerExpiry();
        // Re-programmer pour le lendemain
        const daily = setTimeout(() => triggerExpiry(), 24 * 60 * 60 * 1000);
        logoutTimers.current.push(daily);
      }, ms);
      logoutTimers.current.push(t);
    });
  }, [sessionConfig.autoLogoutTimes, clearAllTimers, triggerExpiry]);

  // Démarrer les timers quand l'opérateur se connecte
  useEffect(() => {
    if (operator) {
      scheduleLogoutTimers();
    } else {
      clearAllTimers();
      setIsExpiring(false);
      setGraceSecondsLeft(0);
    }
    return () => clearAllTimers();
  }, [operator, scheduleLogoutTimers, clearAllTimers]);

  const login = useCallback((op: Operator) => {
    setOperator(op);
    setLoginTime(new Date());
    setIsExpiring(false);
    setIsFormActiveState(false);
  }, []);

  const logout = useCallback(() => {
    forceLogout();
  }, [forceLogout]);

  const setFormActive = useCallback((active: boolean) => {
    setIsFormActiveState(active);
    // Si on annule la grâce parce que l'utilisateur a terminé/annulé
    if (!active && isExpiring) {
      forceLogout();
    }
  }, [isExpiring, forceLogout]);

  return (
    <SessionContext.Provider
      value={{
        operator,
        loginTime,
        isExpiring,
        isFormActive,
        graceSecondsLeft,
        login,
        logout,
        setFormActive,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
