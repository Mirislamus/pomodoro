import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session } from '../typings/types';
import { defaultSession } from '../consts/session';

interface SessionStore {
  session: Session;
  setSession: <K extends keyof Session>(key: K, value: Session[K]) => void;
  patchSession: (patch: Partial<Session>) => void;
  resetSession: () => void;
}

interface LegacySessionV0 extends Partial<Session> {
  shortBrakeCurrentTime?: number;
  longBrakeCurrentTime?: number;
}

const useSessionStore = create<SessionStore>()(
  persist(
    set => ({
      session: { ...defaultSession },
      setSession: (key, value) =>
        set(state => ({
          session: {
            ...state.session,
            [key]: value,
          },
        })),
      patchSession: patch => set(state => ({ session: { ...state.session, ...patch } })),
      resetSession: () => set({ session: { ...defaultSession } }),
    }),
    {
      name: 'session-storage',
      version: 1,
      migrate: persisted => {
        // v0 stored break timers under misspelled keys
        const { shortBrakeCurrentTime, longBrakeCurrentTime, ...session } =
          (persisted as { session?: LegacySessionV0 } | undefined)?.session ?? {};

        return {
          session: {
            ...defaultSession,
            ...session,
            shortBreakCurrentTime: session.shortBreakCurrentTime ?? shortBrakeCurrentTime ?? 0,
            longBreakCurrentTime: session.longBreakCurrentTime ?? longBrakeCurrentTime ?? 0,
          },
        } as SessionStore;
      },
    }
  )
);

export default useSessionStore;
