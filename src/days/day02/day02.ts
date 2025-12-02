import { range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day02 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 1227775554]];
  expectedPart2Results = () => [["sample.txt", 4174379265]];

  part1 = (input: string) => findInvalidNumbers(input, /^(.*)\1$/);
  part2 = (input: string) => findInvalidNumbers(input, /^(.*)\1+$/);
}

const findInvalidNumbers = (input: string, validation: RegExp) =>
  input
    .matchAllAsList(/(?<start>\d+)\-(?<end>\d+)/g)
    .map((i) => i["groups"]!)
    .map(({start, end}) => range(start.asNumber(), end.asNumber()))
    .flatten()
    .unique()
    .map(String)
    .filter(validation.test.bind(validation))
    .toNums()
    .sum();

if (import.meta.main) {
  new Day02().run();
}
