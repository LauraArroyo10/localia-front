



import { useAuthContext } from '../context/authContext';
export function useAuth() {
  return useAuthContext();
}


//import { useState, useEffect } from 'react';
// const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// // ─── TypeScript: Interfaces ───────────────────────────────────────────────────

// export interface AuthUser {
//   id: string;
//   name: string;
//   email: string;
//   role: "tourist" | "seller" | "admin";
//   avatar?: string;
//   location?: string;
// }

// interface AuthResponse {
//   message: string;
//   user: AuthUser;
//   token: string;
// }

// interface RegisterData {
//   name: string;
//   email: string;
//   password: string;
//   role: "guest" | "tourist" | "seller";
// }

// interface LoginData {
//   email: string;
//   password: string;
// }

// interface UseAuthResult {
//   user: AuthUser | null;
//   loading: boolean;
//   error: string | null;
//   register: (data: RegisterData) => Promise<void>;
//   login: (data: LoginData) => Promise<void>;
//   logout: () => void;
// }

// // ─── Helpers ─────────────────────────────────────────────────────────────────

// const saveSession = (token: string, user: AuthUser) => {
//   localStorage.setItem("token", token);
//   localStorage.setItem("user", JSON.stringify(user));
// };

// const getSavedUser = (): AuthUser | null => {
//   const raw = localStorage.getItem("user");
//   return raw ? (JSON.parse(raw) as AuthUser) : null;
// };

// const clearSession = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
// };

// /**
//  * Custom authentication hook.
//  * Handles login, registration, logout and session persistence.
//  *
//  * @returns {UseAuthResult} user state and authentication functions
//  */
// export function useAuth(): UseAuthResult {
//   const [user, setUser] = useState<AuthUser | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // ─── React Topic: Restore session on mount ────────────────────────────────
//   useEffect(() => {
//     const savedUser = getSavedUser();
//     if (savedUser) {
//       setUser(savedUser);
//     }
//   }, []);

//   // ─── Register ──────────────────────────────────────────────────────────────
//   const register = async (data: RegisterData) => {
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const json: AuthResponse = await response.json();

//       if (!response.ok) {
//         throw new Error(json.message ?? "Registration failed");
//       }

//       saveSession(json.token, json.user);
//       setUser(json.user);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─── Login ────────────────────────────────────────────────────────────────
//   const login = async (data: LoginData) => {
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const json: AuthResponse = await response.json();

//       if (!response.ok) {
//         throw new Error(json.message ?? "Login failed");
//       }

//       saveSession(json.token, json.user);
//       setUser(json.user);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─── Logout ────────────────────────────────────────────────────────────────
//   const logout = () => {
//     clearSession();
//     setUser(null);
//   };

//   return {
//     user,
//     loading,
//     error,
//     register,
//     login,
//     logout,
//   };
  
// }