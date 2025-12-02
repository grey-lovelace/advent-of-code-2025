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
  const instr = input
    .lines()
    .map((line) => [line[0], line.slice(1)])
    .map(([dir, amount]) => Number(amount) * (dir === "R" ? 1 : -1));
  let times = 0;
  let current = 50;
  for (const amount of instr) {
    const startedOnZero = current === 0;
    current += amount;
    let passes = Math.abs(Math.floor(current / 100));
    current = current % 100;
    if (current < 0) current += 100;

    if (current === 0) times++;
    if (countPasses) {
      // If we ended on zero, we also counted it as a pass, so remove one.
      // If we started on zero, and turned left, we also counted it as a pass, so remove one.
      if (current === 0 || (startedOnZero && amount < 0)) passes--;
      times += Math.max(0, passes);
    }
  }
  return times;
};

if (import.meta.main) {
  new Day01().run();
}
