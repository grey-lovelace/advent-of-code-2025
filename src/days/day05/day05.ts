import { between, range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day05 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 3]];
  expectedPart2Results = () => [["sample.txt", 14]];

  part1 = (input: string) => {
    const [fresh, available] = input.paragraphs();
    const freshIds = fresh.lines().map((line) => line.split("-").map(Number));
    return available
      .lines()
      .map(Number)
      .count((id) => freshIds.some(([start, end]) => between(id, start, end)));
  };

  part2 = (input: string) => {
    const data = input
      .paragraphs()[0]
      .lines()
      .map((line) => line.split("-").map(Number))
      .toSorted((freshIds1, freshIds2) => freshIds1[0] - freshIds2[0]);
    let counter = 0;
    const ranges: number[][] = [];
    data.forEach((freshIds) => {
      let start = freshIds[0];
      for (const range of ranges) {
        if (range[1] >= start) start = range[1] + 1;
      }
      const end = freshIds[1];
      if (end - start >= 0) {
        counter += end - start + 1;
      }
      ranges.push([start, end]);
    });
    return counter;
  };
}

if (import.meta.main) {
  new Day05().run();
}
