// Simple Feature Toggle Framework
// by mateuszsokola
// https://github.com/mateuszsokola/next-feature-toggle-example/blob/main/components/FeatureToggleProvider.tsx
import React, { useState } from "react";
import { FeatureToggleContext } from "../context/FeatureToggleContext";

type Props = {
  enabledFeatures?: string[];
  children: any;
};

export const FeatureToggle = ({ children, enabledFeatures = [] }: Props) => {
  const [activeFeatures, setFeatures] = useState<string[]>(enabledFeatures);

  const enableFeature = (featureName: string) => {
    setFeatures([...activeFeatures, featureName]);
  };

  const disableFeature = (featureName: string) => {
    setFeatures(activeFeatures.filter((feature) => feature !== featureName));
  };

  return (
    <FeatureToggleContext.Provider
      value={{ enabledFeatures: activeFeatures, enableFeature, disableFeature }}
    >
      {children}
    </FeatureToggleContext.Provider>
  );
};
