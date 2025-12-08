export const orthogonalDirections = ["north", "east", "south", "west"] as const;
export const diagonalDirections = [
  "northeast",
  "southeast",
  "northwest",
  "southwest",
] as const;
export const directions = [...orthogonalDirections, ...diagonalDirections];
export type OrthogonalDirection = (typeof orthogonalDirections)[number];
export type DiagonalDirection = (typeof diagonalDirections)[number];
export type Direction = OrthogonalDirection | DiagonalDirection;

export const turn = (currentDir: OrthogonalDirection, turnAmount: number) =>
  directions.at(
    (directions.indexOf(currentDir)! + turnAmount) % directions.length
  )!;
export const turnR = (currentDir: OrthogonalDirection) => turn(currentDir, 1);
export const turnL = (currentDir: OrthogonalDirection) => turn(currentDir, -1);
