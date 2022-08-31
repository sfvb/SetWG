export type FeatureArray = [string, boolean];

export const fetchFeatures = (): FeatureArray[] => {
  const features = [] as FeatureArray[];
  features.push(["pause_game", process.env.NEXT_PUBLIC_FF_PAUSE_GAME === 'true']);
  return features;
};
