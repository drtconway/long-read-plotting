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

export class UnionFind {
    parent: { [key: string]: string };
    rank: { [key: string]: number };
  
    constructor() {
      this.parent = {};
      this.rank = {};
    }
    find(s: string): string {
      if (!(s in this.parent)) {
        this.parent[s] = s;
        this.rank[s] = 0;
        return s;
      }
      const sp = this.parent[s];
      if (s !== sp) {
        this.parent[s] = this.find(sp);
      }
      return this.parent[s];
    }
    union(x: string, y: string): string {
      const xr = this.find(x);
      const yr = this.find(y);
      if (xr === yr) {
        return xr;
      }
      let res = null;
      if (this.rank[xr] < this.rank[yr]) {
        this.parent[xr] = yr;
        res = yr;
      } else if (this.rank[xr] > this.rank[yr]) {
        this.parent[yr] = xr;
        res = xr;
      } else {
        this.parent[yr] = xr;
        this.rank[xr] += 1;
        res = xr;
      }
      return res;
    }
  }