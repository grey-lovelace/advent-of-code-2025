import { range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day02 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [
    ["sample.txt", 1227775554],
  ];
  expectedPart2Results = () => [
    ["sample.txt", 4174379265],
  ];
  
  part1 = (input: string) => {
    const data = input
      .matchAllAsList(/\d+\-\d+/g)
      .map(pair => pair[0].split("-"))
      .map(pair => range(pair[0].asNumber(), pair[1].asNumber()))
      .flatten()
      .unique()
      .map(num => `${num}`)
      .filter(num => num.length % 2 == 0)
      .map(num => [num.slice(0, num.length/2), num.slice(num.length/2)])
      .filter(([num1,num2]) => num1===num2)
      .map(([num1,num2])=> Number(num1+num2))
      .sum()
    return data
  }
  
  part2 = (input: string) => {
    const data = input
      .matchAllAsList(/\d+\-\d+/g)
      .map(pair => pair[0].split("-"))
      .map(pair => range(pair[0].asNumber(), pair[1].asNumber()))
      .flatten()
      .unique()
      .map(num => `${num}`)
      .filter(num => {
        for (const i of range(1, num.length-1)) {
          const windowed = num.split("").windowed(i);
          if (windowed.every(set => set.join() === windowed[0].join())) {
            return true
          }
        }
      })
      .map(Number)
      .sum()
    return data
  }
}

if (import.meta.main) {
  new Day02().run();
}
