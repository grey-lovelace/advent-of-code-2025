import { Grid, stringToGrid } from "../../utils/grid.ts";
import Day from "../day.ts";

export default class Day04 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 13]];
  expectedPart2Results = () => [["sample.txt", 43]];

  part1 = (input: string) =>
    input.let(stringToGrid).let(findRemovableRolls).length;

  part2 = (input: string) => {
    const grid = stringToGrid(input);
    let rollsRemoved = 0;
    let rolls = findRemovableRolls(grid);
    while (rolls.length > 0) {
      rollsRemoved += rolls.length;
      rolls.forEach((point) => (point.val = "."));
      rolls = findRemovableRolls(grid);
    }
    return rollsRemoved;
  };
}

const findRemovableRolls = (grid: Grid<string>) =>
  grid.points.filter(
    (point) =>
      point.val === "@" &&
      point.adjPoints(true).filter((adj) => adj.val === "@").length < 4
  );

if (import.meta.main) {
  new Day04().run();
}
