import Day from "../day.ts";

export default class Day06 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [
    ["sample.txt", 4277556]
  ];
  expectedPart2Results = () => [
    ["sample.txt", 3263827]
  ];

  part1 = (input: string) => {
    const data = input
      .lines()
      .map(line => line.split(/\s+/).filter(x => x !== ""))
      .transposed()
      .map(eq => eq.slice(0,-1).map(Number)[operatorMap[eq.at(-1)! as "+"|"*"]]())
      .sum()
      
    return data
  }

  part2 = (input: string) => {
    const data = input
      .lines()
      .map(line => line.letters())
      .transposed()
      .map(line => line.join(""))
      .join(` `)
      .split("      ")
      .map(line => line.split(/\s+/).filter(x => x !== ""))
      .filter(x => x.length > 0)
      .map(eq => {
        if (["+","*"].includes(eq[0].split("").at(-1)!)) {
          return [eq[0].split("").slice(0,-1).join(""), eq[0].split("").at(-1), ...eq.slice(1)]
        }
        return eq
        }
      )
      .map(eq => [eq[0],...eq.slice(2)].map(Number)[operatorMap[eq.at(1)! as "+"|"*"]]())
      .sum()
      
    return data
  }
}

const operatorMap = {"+": "sum", "*": "product"} as const

if (import.meta.main) {
  new Day06().run();
}
