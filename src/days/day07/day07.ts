import { Grid } from "../../utils/grid.ts";
import Day from "../day.ts";

export default class Day07 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 21]];
  expectedPart2Results = () => [["sample.txt", 40]];

  part1 = (input: string) => traverse(input).timesSplit;
  part2 = (input: string) => traverse(input).timelines;
}

const traverse = (input: string, timesSplit = 0) =>
  input
    .let((i) => Grid.fromString(i) as Grid<string | number>)
    .points
    .map((p) => p.also(() => {
      switch (p.val) {
        case "S":
          p.val = 1;
          break;
        case "^":
          if (p.north()?.val ?? 0 > 0) timesSplit++;
          break;
        default:
          p.val = Number(p.north()?.val) || 0;
          if (p.east()?.val === "^") p.val += Number(p.northeast()?.val) || 0;
          if (p.west()?.val === "^") p.val += Number(p.northwest()?.val) || 0;
      }}))
    .let((points) => ({
      timesSplit,
      timelines: points
        .filter((p) => p.y == input.lines().length - 1 && Number(p.val))
        .map((p) => Number(p.val))
        .sum(),
    }));

if (import.meta.main) {
  new Day07().run();
}
