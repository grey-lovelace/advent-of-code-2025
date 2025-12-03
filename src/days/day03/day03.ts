import { range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day03 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [
    ["sample.txt", 357]
  ];
  expectedPart2Results = () => [
    ["sample.txt", 3121910778619]
  ];

  part1 = (input: string) => findMaxJoltage(input, 2)
  part2 = (input: string) => findMaxJoltage(input, 12)
}

const findMaxJoltage = (input: string, digits: number) =>
  input
    .lines()
    .map(line => line.split("").map(Number))
    .map(nums => {
      const highTracker = Array(digits).fill(0)
      for (const [i, num] of nums.entries()) {
        for (const [i2, tracker] of highTracker.entries()) {
          if (num > tracker && i < (nums.length-(highTracker.length - 1 - i2))) {
            highTracker[i2] = num
            for (const overwriteI of range(i2+1, highTracker.length-1)) {
              highTracker[overwriteI] = 0
            }
            break
          }
        }
      }
      return Number(highTracker.join(""))
    })
    .sum()

if (import.meta.main) {
  new Day03().run();
}
