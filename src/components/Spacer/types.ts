export enum Space {
  XXXS = 2,
  XXS = 4,
  XS = 8,
  S = 12,
  M = 16,
  L = 20,
  XL = 24,
  XXL = 32,
  XXXL = 40,
  XXL2 = 64,
}

// TODO: fix enum types
export interface SpacerProps {
  m?: Space;
  mt?: Space;
  mr?: Space;
  mb?: Space;
  ml?: Space;
  mx?: Space;
  my?: Space;
  p?: Space;
  pt?: Space;
  pr?: Space;
  pb?: Space;
  pl?: Space;
  px?: Space;
  py?: Space;
}
