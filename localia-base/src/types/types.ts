// src/types/footer.ts
import type { ReactNode } from 'react';

export interface ContactInfo {
  email: string;
  phone: string;
  addressLines: string[];
}

export interface SocialLink {
  icon: ReactNode; // Permite pasar un SVG o un icono de librería
  href: string;
  platform: string; // Ej: 'facebook', 'instagram'
}