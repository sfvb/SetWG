// Simple Feature Toggle Framework
// by mateuszsokola
// https://github.com/mateuszsokola/next-feature-toggle-example/blob/main/components/FeatureToggleProvider.tsx
import React from "react";

export const FeatureToggleContext = React.createContext({
  enabledFeatures: [] as string[],
  enableFeature: (featureName: string) => {},
  disableFeature: (featureName: string) => {},
});
