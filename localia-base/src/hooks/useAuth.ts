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
  token: string | null;
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
    token: null,
    loading: false,
    error: null,

    login: async (data: LoginData) => {
      console.log("Enviando login:", data);

      set({ loading: true });

      try {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const json = await res.json();

        console.log("Status:", res.status);
        console.log("Respuesta:", json);

        if (!res.ok) throw new Error(json.message);

        set({
          user: json.user,
          token: json.token,
        });
      } finally {
        set({ loading: false });
      }
    },

    register: async (data: RegisterData) => {
      set({ loading: true });
      try {
        const res = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();

        if (!res.ok) {
          const detailMessage =
            Array.isArray(json.errors) && json.errors.length > 0
              ? json.errors.map((e: { message: string }) => e.message).join(" ")
              : json.message ?? "Registration failed";

          throw new Error(detailMessage);
        }

        set({ user: json.user, token: json.token });
      } catch (err) {
        set({ error: err instanceof Error ? err.message : "Error" });
        throw err; // 🔑 IMPRESCINDIBLE: sin esto, register() nunca "falla" para quien lo llama
      } finally {
        set({ loading: false });
      }
    },

    logout: () => set({ user: null, token: null, error: null }),
  }),
  { name: "auth" }
));