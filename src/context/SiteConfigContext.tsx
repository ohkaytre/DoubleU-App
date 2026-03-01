
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SiteConfig {
  heroHeadline: string;
  heroTagline: string;
  artistBio: string;
  locationNode: string;
  aiInsightsEnabled: boolean;
  preSaveAccess: 'ENABLED' | 'RESTRICTED' | 'DISABLED';
}

const defaultWeight: SiteConfig = {
  heroHeadline: "FADED 405",
  heroTagline: "The definitive late-night drive. Experience the new album 'Faded 405' by DoubleU, streaming globally now.",
  artistBio: "DoubleU (Willy W.) returns with 'Faded 405', a cinematic journey through the neon-soaked highways of the digital subconscious. Merging industrial synth textures with melancholic future-pop melodies, DoubleU captures the essence of nocturnal isolation and electronic transcendence.",
  locationNode: "Los Angeles / Neo-Tokyo",
  aiInsightsEnabled: true,
  preSaveAccess: 'ENABLED',
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultWeight);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  return context;
};
