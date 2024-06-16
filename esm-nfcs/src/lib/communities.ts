export const Communities = {
  0: "AI",
  1: "Art",
  2: "Decentralized Social",
  3: "DeSci",
  4: "Longevity",
  5: "Neurotech",
  6: "Network States",
  7: "Public Goods",
  8: "Real World Crypto",
  9: "Zero Knowledge Cryptography"
} as const;

export type CommunityId = keyof typeof Communities;

export const CommunityThemes: Record<CommunityId, string> = {
  0: "green",
  1: "red",
  2: "pink",
  3: "yellow",
  4: "blue",
  5: "sky",
  6: "teal",
  7: "orange",
  8: "emerald",
  9: "purple"
}