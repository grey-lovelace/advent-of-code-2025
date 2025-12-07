import { Grid } from "../../utils/grid.ts";
import Day from "../day.ts";

export default class Day07 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 21]];
  expectedPart2Results = () => [["sample.txt", 40]];

  part1 = (input: string) => traverse(input).timesSplit;
  part2 = (input: string) => traverse(input).timelines;
}

const traverse = (input: string) =>
  input
    .let(Grid.fromString)
    .points
    .reduce((acc, p) => {
      const top = acc.newGrid[p.y - 1]?.[p.x] ?? 0;
      const topLeft = acc.newGrid[p.y - 1]?.[p.x - 1] ?? 0;
      const topRight = acc.newGrid[p.y - 1]?.[p.x + 1] ?? 0;
      let newVal = 0;
      switch (p.val) {
        case "S":
          newVal = 1;
          break;
        case "^":
          if (top > 0) acc.timesSplit++;
          break;
        default:
          newVal += top;
          if (p.east()?.val === "^") newVal += topRight;
          if (p.west()?.val === "^") newVal += topLeft;
      }
      if (!acc.newGrid[p.y]) acc.newGrid[p.y] = [];
      acc.newGrid[p.y][p.x] = newVal;
      return acc;
    }, { newGrid: [] as number[][], timesSplit: 0 })
    .let(({ newGrid, timesSplit }) => ({
      timelines: newGrid.at(-1)!.sum(),
      timesSplit,
    }));

if (import.meta.main) {
  new Day07().run();
}
