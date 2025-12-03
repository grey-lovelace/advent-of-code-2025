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
    .reduce((highNumTracker, [batteryIndex, battery]) => {
      const replaceIndex = highNumTracker
        .entries()
        .find(([trackerIndex, trackerNum]) => 
          battery > trackerNum
          // Is it early enough in the bank?
          && batteryIndex <= bank.length - (digits - trackerIndex)
        )?.[0]

      if(replaceIndex == undefined) return highNumTracker
      return [
        ...highNumTracker.slice(0, replaceIndex),
        battery,
        ...Array(digits - replaceIndex - 1).fill(0),
      ];
    }, Array(digits).fill(0))
    .join("")
    .asNumber();

if (import.meta.main) {
  new Day03().run();
}
