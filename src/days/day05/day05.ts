import { between } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day05 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 3]];
  expectedPart2Results = () => [["sample.txt", 14]];

  part1 = (input: string) => {
    const { freshIds, availableIds } = input.let(parseIds);
    return availableIds.count((id) =>
      freshIds.some(([start, end]) => between(id, start, end))
    );
  };

  part2 = (input: string) =>
    input
      .let(parseIds)
      .freshIds
      .toSorted((ids1, ids2) => ids1[0] - ids2[0])
      .let((freshIds) => freshIds.reduce((acc, [start, end]) => ({
          amount:
            acc.amount +
            Math.max(0, 1 + end - Math.max(start, acc.maxEnd + 1)),
          maxEnd: Math.max(end, acc.maxEnd),
        }),
        { amount: 0, maxEnd: 0 }
      ))
      .amount;
}

const parseIds = (input: string) =>
  input.paragraphs().let(([fresh, available]) => ({
    freshIds: fresh.lines().map((line) => line.split("-").map(Number)),
    availableIds: available.lines().map(Number),
  }));

if (import.meta.main) {
  new Day05().run();
}
