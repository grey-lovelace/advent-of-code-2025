import Day from "../day.ts";

export default class Day06 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 4277556]];
  expectedPart2Results = () => [["sample.txt", 3263827]];

  part1 = (input: string) =>
    input
      .lines()
      .map((line) => line.split(/\s+/).filter((x) => x !== ""))
      .transposed()
      .map((eq) =>
        eq.slice(0, -1).map(Number)[operatorMap[eq.at(-1)! as "+" | "*"]]()
      )
      .sum();

  part2 = (input: string) => {
    const lines = input.lines();
    return lines
      .map((line) => line.letters())
      .transposed()
      .map((line) => line.join(""))
      .join(" ")
      .split(RegExp(` {${lines.length + 1},}`))
      .map((line) => ({
        operation: operatorMap[line.replaceAll(/[^+*]/g, "") as "+" | "*"],
        values: line.replaceAll(/[+*]/g, " ").findNumbers(),
      }))
      .map(({ operation, values }) => values[operation]())
      .sum();
  };
}

const operatorMap = { "+": "sum", "*": "product" } as const;

if (import.meta.main) {
  new Day06().run();
}
