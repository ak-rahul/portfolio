// Barrel export — import any one of these into layout.tsx to swap the background
//
// Usage in app/layout.tsx:
//   import StarryBackground from "@/components/backgrounds/StarfieldBg";
//   import StarryBackground from "@/components/backgrounds/AuroraBg";
//   import StarryBackground from "@/components/backgrounds/ShaderBg";
//   import StarryBackground from "@/components/backgrounds/GridBg";
//
// All 4 are named-default exports so they are plug-and-play replacements.

export { default as StarfieldBg } from "./StarfieldBg";
export { default as AuroraBg }   from "./AuroraBg";
export { default as ShaderBg }   from "./ShaderBg";
export { default as GridBg }     from "./GridBg";
