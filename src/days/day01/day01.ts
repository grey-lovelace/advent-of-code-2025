import Day from "../day.ts";

export default class Day01 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [
    ["sample.txt", 3]
  ];
  expectedPart2Results = () => [
    ["sample3.txt", 6],
    ["sample2.txt", 10],
    ["sample.txt", 6]
  ];

  part1 = (input: string) => parse(input)
  part2 = (input: string) => parse(input, true)
}

const parse = (input: string, countPasses = false) => {
    const instr = input
      .lines()
      .map(line => [line[0], line.slice(1)])
    let times = 0
    let current = 50
    for (const [dir, amount] of instr) {
      let ignoreLeftTurn = current === 0
      current += Number(amount) * (dir === "R" ? 1 : -1 )

      while (current > 99) {
        current -= 100
        if (countPasses && current !== 0) {
          times++
        }
      }
      while (current < 0) {
        current += 100
        if (ignoreLeftTurn) {
          ignoreLeftTurn = false
        } else if (countPasses) {
          times++
        }
      }
      if (current === 0) times++
    }
    return times
  }

if (import.meta.main) {
  new Day01().run();
}
