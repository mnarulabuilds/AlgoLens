/** Returns true when every element is >= the previous one. */
export function isSorted(arr: number[]): boolean {
  if (arr.length <= 1) return true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

/** Single pass of bubble sort (one outer-loop iteration). */
export function bubbleSortPass(arr: number[]): number[] {
  const result = [...arr];
  const n = result.length;
  for (let j = 0; j < n - 1; j++) {
    if (result[j] > result[j + 1]) {
      [result[j], result[j + 1]] = [result[j + 1], result[j]];
    }
  }
  return result;
}
