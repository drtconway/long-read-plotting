/*
   Copyright 2024 Thomas Conway

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { depermute } from "./utils";

export interface KeyedItem {
    key: string;
};

export type Comparator<T> = (a: T, b: T) => number;

export interface ColumnSpecificationStr<T> {
  kind: "str";
  title: string;
  field: keyof T;
  value: (item: T) => string;
  sort?: Comparator<T>;
}

export interface ColumnSpecificationNum<T> {
  kind: "num";
  title: string;
  field: keyof T;
  value: (item: T) => number;
  sort?: Comparator<T>;
}

export type ColumnSpecification<T> = ColumnSpecificationStr<T> | ColumnSpecificationNum<T>;

function cmpStr(a: string, b: string): number {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return +1;
  }
  return 0;
}

function cmpNum(a: number, b: number): number {
  return a - b;
}

export function makeComparator<T>(spec: ColumnSpecification<T>): Comparator<T> {
  if (spec.sort) {
    return spec.sort;
  }
  if (spec.kind == "str") {
    return (a: T, b: T) => {
      const ak = spec.value(a);
      const bk = spec.value(b);
      return cmpStr(ak, bk);
    };
  } else {
    return (a: T, b: T) => {
      const ak = spec.value(a);
      const bk = spec.value(b);
      return cmpNum(ak, bk);
    };
  }
}

export function maybeFlipComparator<T>(cmp: Comparator<T>, ascending: boolean): Comparator<T> {
  if (ascending) {
    return cmp;
  } else {
    return (a: T, b: T) => cmp(b, a);
  }
}

export function sortInPlace<T>(xs: T[], spec: ColumnSpecification<T>, ascending: boolean) {
  const cmp = maybeFlipComparator(makeComparator(spec), ascending);

  function permCmp(i: number, j: number): number {
    return cmp(xs[i], xs[j]) || (ascending ? i - j : j - i);
  }

  const perm: number[] = new Array(xs.length);
  for (let i = 0; i < xs.length; ++i) {
    perm[i] = i;
  }
  perm.sort(permCmp);
  depermute(xs, perm);
}

export function stableSort<T>(xs: T[], spec: ColumnSpecification<T>, ascending: boolean): T[] {
    const cmp = maybeFlipComparator(makeComparator(spec), ascending);
  
    function permCmp(i: number, j: number): number {
      return cmp(xs[i], xs[j]) || (ascending ? i - j : j - i);
    }
  
    const perm: number[] = new Array(xs.length);
    for (let i = 0; i < xs.length; ++i) {
      perm[i] = i;
    }
    perm.sort(permCmp);
    const res: T[] = [];
    perm.forEach((i) => res.push(xs[i]));
    return res;
}