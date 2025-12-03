import Day from "../day.ts";

export default class Day03 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 357]];
  expectedPart2Results = () => [["sample.txt", 3121910778619]];

  part1 = (input: string) => findTotal(input, 2);
  part2 = (input: string) => findTotal(input, 12);
}

const findTotal = (input: string, digits: number) =>
  input
    .lines()
    .map((line) => line.split("").map(Number))
    .map((bank) => findMaxJoltage(bank, digits))
    .sum();

const findMaxJoltage = (bank: number[], digits: number) =>
  bank
    .entries()
    .reduce((acc, [batteryIndex, battery]) => {
      for (const [trackerIndex, tracker] of acc.entries()) {
        const isEarlyEnoughInBank =
          batteryIndex <= bank.length - (digits - trackerIndex);
        if (isEarlyEnoughInBank && battery > tracker) {
          return [
            ...acc.slice(0, trackerIndex),
            battery,
            ...Array(digits - trackerIndex - 1).fill(0),
          ];
        }
      }
      return acc;
    }, Array(digits).fill(0))
    .join("")
    .asNumber();

if (import.meta.main) {
  new Day03().run();
}
