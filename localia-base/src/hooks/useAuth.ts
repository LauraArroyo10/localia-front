import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

/**
 * Define los tipos de usuario que se usan en la sesión.
 * Este archivo no documenta los tipos en detalle según la regla,
 * pero mantiene la estructura usada por el store de auth.
 */

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: "tourist" | "seller" | "guest";
    avatar?: string;
    location?: string;
    business?: {
        id: string;
        name: string;
    };
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
    updateUser: (updatedUser: Partial<AuthUser>) => void;
}

/**
 * Store global de autenticación para la app.
 * Maneja login, registro, logout y actualización del usuario.
 * Persiste token y usuario en storage para mantener sesión después de recargar.
 */

export const useAuth = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            loading: false,
            error: null,

            /**
             * Inicia sesión usando el endpoint de auth y guarda el token.
             * Actualiza el usuario con el negocio asociado que trae la API.
             */
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
                        user: {
                            ...json.user,
                            business: json.business,
                        },
                        token: json.token,
                    });
                } catch (err) {
                    set({ error: err instanceof Error ? err.message : "Error en el login" });
                    throw err;
                } finally {
                    set({ loading: false });
                }
            },

            /**
             * Registra un nuevo usuario en el backend y guarda la sesión.
             * Mejora el mensaje de error cuando la API devuelve errores estructurados.
             */
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
                                ? json.errors
                                        .map((e: { message: string }) => e.message)
                                        .join(" ")
                                : (json.message ?? "Registration failed");

                        throw new Error(detailMessage);
                    }

                    set({ user: json.user, token: json.token });
                } catch (err) {
                    set({ error: err instanceof Error ? err.message : "Error" });
                    throw err;
                } finally {
                    set({ loading: false });
                }
            },

            /**
             * Cierra sesión en el cliente borrando usuario y token.
             */
            logout: () => set({ user: null, token: null, error: null }),

            /**
             * Actualiza campos del usuario actual sin tocar el resto del estado.
             */
            updateUser: (updatedUser) => 
                set((state) => ({
                    user: state.user ? { ...state.user, ...updatedUser } : null
                })),
        }),
        { name: "auth" },
    ),
);