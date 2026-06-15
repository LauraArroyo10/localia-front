import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "tourist" | "seller" | "guest";
  avatar?: string;
  location?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "guest" | "tourist" | "seller";
}

interface AuthStore {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuth = create<AuthStore>()(persist(
  (set) => ({
    user: null,
    loading: false,
    error: null,

   login: async (data: LoginData) => {
    set({ loading: true });
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const json = await res.json();
        console.log("login response:", json); // ← aquí
        if (!res.ok) throw new Error(json.message ?? "Login failed");
        set({ user: json.user });
    } catch (err) {
        set({ error: err instanceof Error ? err.message : "Error" });
    } finally {
        set({ loading: false });
    }
},

    register: async (data: RegisterData) => {
      set({ loading: true });
      try {
        const res = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-TYPE": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message ?? "Registration failed");
        set({ user: json.user });
      } catch (err) {
        set({ error: err instanceof Error ? err.message : "Error" });
      } finally {
        set({ loading: false });
      }
    },

    logout: () => set({ user: null, error: null }),
  }),
  { name: "auth" }
));
