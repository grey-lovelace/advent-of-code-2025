import { Grid } from "../../utils/grid.ts";
import { range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day07 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 21]];
  expectedPart2Results = () => [["sample.txt", 40]];

  part1 = (input: string) => traverse(input).timesSplit;
  part2 = (input: string) => traverse(input).timelines;
}

const traverse = (input: string) => {
  const grid = Grid.fromString(input);
  const start = grid.points.find((p) => p.val === "S")!;
  let timesSplit = 0;
  return range(0, grid.maxY - 1)
    .reduce((currentPoints) =>
      currentPoints
        .map(({ point, timelines }) => ({ point: point.south()!, timelines }))
        .flatMap(({ point, timelines }) =>
          point.val === "^"
            ? [
                { point: point.east()!, timelines },
                { point: point.west()!, timelines },
              ].also(() => timesSplit++)
            : [{ point, timelines }]
        )
        .groupedBy(
          ({ point }) => point.toString(),
          (currentPoint) => currentPoint
        )
        .values()
        .map((pointGroup) => ({
          point: pointGroup[0].point,
          timelines: pointGroup.map((pg) => pg.timelines).sum(),
        })),
      [{ point: start, timelines: 1 }]
    )
    .let((paths) => ({
      timesSplit,
      timelines: paths.map(({ timelines }) => timelines).sum(),
    }));
};

if (import.meta.main) {
  new Day07().run();
}
