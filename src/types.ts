/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Sponsor {
  id: string;
  name: string;
  logoType: 'text' | 'svg' | 'image';
  logoText?: string;
  tagline?: string;
  siteUrl: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  phone: string;
  description: string;
  bgColor?: string;
  textColor?: string;
}

export interface Supporter {
  id: string;
  name: string;
  logoType: 'text' | 'svg' | 'image';
  logoText?: string;
  tagline?: string;
  siteUrl: string;
  instagram: string;
  whatsapp: string;
  phone: string;
  description: string;
}

export interface Director {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  initials: string;
}
