import { Grid, Point } from "../../utils/grid.ts";
import { range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day07 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [
    ["sample.txt", 21]
  ];
  expectedPart2Results = () => [
    ["sample.txt", 40]
  ];

  part1 = (input: string) => {
    const grid = input
      .let(Grid.fromString)
    const start = grid.points.find(p => p.val==="S")
    let currentPoints = [start]
    let splitCount = 0
    while (currentPoints.length > 0) {
      currentPoints = currentPoints
        .mapNonNull(p => p?.south())
        .mapNonNull(p => {
          if (p?.val === "^") {
            splitCount++
            return [p.east(), p.west()]
          }
          return p
        })
        .flat()
        .unique()
    }
    return splitCount
  }

  part2 = (input: string) => {
    const grid = input
      .let(Grid.fromString)
    const start = grid.points.find(p => p.val==="S")!
    // console.log(start)
    let paths = [{point: start, times: 1}]
    for (const _ of range(0, grid.maxY-1)) {
      paths = paths
        .map(({point, times}) => ({point: point.south()!, times}))
        .filter(({point}) => point !== undefined)
        .map(({point, times}) => {
          if (point.val === "^") {
            return [
              {point: point.east(), times},
              {point: point.west(), times}
            ]
          }
          return [{point, times}]
        })
        .flat()
        .reduce((acc, {point, times}) => {
          const found = acc.find(item => item.point == point)
          if (found) {
            found.times += times
          } else {
            return [...acc, {point, times}]
          }
          return acc
        },[] as {point: Point<string>, times: number}[])
    }
    return paths.map(({times}) => times).sum()
  }
}

if (import.meta.main) {
  new Day07().run();
}
