import Day from "../day.ts";

export default class DayTemplate extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 0]];
  expectedPart2Results = () => [
    // ["sample.txt", 0]
  ];
  override runPart1 = true
  override runPart2 = false

  part1 = (input: string) => {
    const data = input
    return data
  }

  part2 = (input: string) => {
    const data = input
    return data
  }
}

if (import.meta.main) {
  new DayTemplate().run();
}
