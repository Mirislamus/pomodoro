import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session } from '../typings/types';
import defaultSession from '../consts/session';

interface SessionStore {
  session: Session;
  setSession: <K extends keyof Session>(key: K, value: Session[K]) => void;
  resetSession: () => void;
}

const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      session: { ...defaultSession },
      setSession: <K extends keyof Session>(key: K, value: Session[K]) =>
        set((state) => ({
          session: {
            ...state.session,
            [key]: value,
          },
        })),
      resetSession: () => set({ session: { ...defaultSession } }),
    }),
    {
      name: 'session-storage',
    }
  )
);

export default useSessionStore;
