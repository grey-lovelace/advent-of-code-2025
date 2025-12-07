import { Grid, Point } from "../../utils/grid.ts";
import { range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day07 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 21]];
  expectedPart2Results = () => [["sample.txt", 40]];

  part1 = (input: string) => traverse(input);
  part2 = (input: string) => traverse(input, true);
}

const traverse = (input: string, timelines = false) => {
  const grid = Grid.fromString(input);
  const start = grid.points.find((p) => p.val === "S")!;
  let paths = [{ point: start, times: 1 }];
  let timesSplit = 0;
  range(0, grid.maxY - 1).forEach(() => {
    paths = paths
      .map(({ point, times }) => ({ point: point.south()!, times }))
      .flatMap(({ point, times }) =>
        point.val == "^"
          ? [
              { point: point.east()!, times },
              { point: point.west()!, times },
            ].also(() => timesSplit++)
          : [{ point, times }]
      )
      .reduce((acc, { point, times }) => {
        const found = acc.find((item) => item.point === point);
        if (!found) return [...acc, { point, times }];
        found.times += times;
        return acc;
      }, [] as { point: Point<string>; times: number }[]);
  });
  return timelines ? paths.map(({ times }) => times).sum() : timesSplit;
};

if (import.meta.main) {
  new Day07().run();
}
