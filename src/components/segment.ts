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

export interface RawSegment {
  readid: string;
  chrom: string;
  pos: number;
  strand: string;
  offset: number;
  rlen: number;
  qlen: number;
};

export interface Segment extends RawSegment {
  id: string;
};

export function slug(seg: RawSegment): string {
  return `${seg.readid}-${seg.chrom}-${seg.pos}-${seg.strand}-${seg.offset}-${seg.rlen}-${seg.qlen}`;
}

export function makeSegment(seg: RawSegment): Segment {
  return {id: slug(seg), ...seg};
}

export type SegmentGroupInfo = {
  grp: string;
  grpMin: number;
  grpMax: number;
  grpWidth: number;
  ratio: number;
  winMin: number;
  winMax: number;
  winWidth: number;
  ticks: number;
  segments: Segment[];
};

export type ReadInfo = {
  start: number;
  length: number;
  begin: number;
  flip: boolean;
};

export type Locus = {
  chrom: string;
  start: number;
  end: number;
};

export type ReadItem = {
  selected: boolean;
  colour: string;
  readid: string;
  flipped: boolean;
  strand: string;
  start: string;
  end: string;
  length: number;
  mapped: Locus[];
};

export function validLocus(txt: string): string | boolean {
  const m = (txt || "").match(/^(chr([0-9]+|X|Y|MY)):([0-9]+)[-]([0-9]+)$/);
  if (!m) {
    return false;
  }
  //const chrom = m[1];
  const begin = m[3];
  const end = m[4];
  if (end != undefined) {
    if (parseInt(begin) > parseInt(end)) {
      return "end must be greater than start";
    }
  }
  return true;
}

export function parseLocus(txt: string): Locus | null {
  const m = (txt || "").match(/^(chr([0-9]+|X|Y|MY)):([0-9]+)[-]([0-9]+)$/);
  if (!m) {
    return null;
  }
  const chrom = m[1];
  const start = parseInt(m[3]);
  const end = parseInt(m[4]);

  return { chrom: chrom, start: start, end: end };
}
