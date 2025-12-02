import Day from "../day.ts";

export default class Day01 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 3]];
  expectedPart2Results = () => [
    ["sample3.txt", 6],
    ["sample2.txt", 10],
    ["sample.txt", 6],
  ];

  part1 = (input: string) => parse(input);
  part2 = (input: string) => parse(input, true);
}

const parse = (input: string, countPasses = false) => {
  return input
    .lines()
    .map((line) => [line[0], line.slice(1)])
    .map(([dir, amount]) => Number(amount) * (dir === "R" ? 1 : -1))
    .reduce((acc, amount) => {
      let newVal = acc.current + amount;
      let passes = Math.abs(Math.floor(newVal / 100));
      newVal = newVal % 100;
      if (newVal < 0) newVal += 100;

      let timesToAdd = 0
      if (newVal === 0) timesToAdd++;
      if (countPasses) {
        // If we ended on zero, we also counted it as a pass, so remove one.
        // If we started on zero, and turned left, we also counted it as a pass, so remove one.
        if (newVal === 0 || (acc.current === 0 && amount < 0)) passes--;
        timesToAdd += Math.max(0, passes);
      }
      return {
        current: newVal,
        times: acc.times + timesToAdd
      }
    }, {
      current: 50,
      times: 0
    }).times
};

if (import.meta.main) {
  new Day01().run();
}
