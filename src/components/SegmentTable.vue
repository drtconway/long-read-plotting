<!--
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
-->
<script setup lang="ts">
import * as d3 from "d3";
import { Segment } from "./segment";
import { computed } from "vue";
import { ColumnSpecification, KeyedItem } from "./sortable";
import Sortable from "./Sortable.vue";

const props = defineProps<{
  segments: Segment[];
}>();

interface DisplayedSegment extends KeyedItem {
  key: string;
  id: string;
  chrom: string;
  refStart: number;
  refEnd: number;
  strand: string;
  readStart: number;
  readEnd: number;
  refMapLen: number;
  readMapLen: number;
}

const columns: ColumnSpecification<DisplayedSegment>[] = [
  { kind: "str", title: "Chrom", field: "chrom", value: (seg: DisplayedSegment) => seg.chrom },
  { kind: "num", title: "RefStart", field: "refStart", value: (seg: DisplayedSegment) => seg.refStart },
  { kind: "num", title: "RefEnd", field: "refEnd", value: (seg: DisplayedSegment) => seg.refEnd },
  { kind: "str", title: "Strand", field: "strand", value: (seg: DisplayedSegment) => seg.strand },
  { kind: "num", title: "ReadStart", field: "readStart", value: (seg: DisplayedSegment) => seg.readStart },
  { kind: "num", title: "ReadEnd", field: "readEnd", value: (seg: DisplayedSegment) => seg.readEnd },
  { kind: "num", title: "RefMapLen", field: "refMapLen", value: (seg: DisplayedSegment) => seg.refMapLen },
  { kind: "num", title: "ReadMapLen", field: "readMapLen", value: (seg: DisplayedSegment) => seg.readMapLen },
  { kind: "str", title: "Read ID", field: "id", value: (seg: DisplayedSegment) => seg.id },
];

const items = computed<DisplayedSegment[]>(() => {
    return d3.map(props.segments, (seg) => {
      const res: DisplayedSegment = {
        key: seg.id,
        id: seg.readid,
        chrom: seg.chrom,
        refStart: seg.pos,
        refEnd: seg.pos + seg.rlen,
        strand: seg.strand,
        readStart: seg.offset,
        readEnd: seg.offset + seg.qlen,
        refMapLen: seg.rlen,
        readMapLen: seg.qlen,
      };
      return res;
    });
});
</script>

<template>
  <v-sheet rounded border>
    <Sortable v-if="items" :items="items" :columns="columns" height="4.5in"></Sortable>
  </v-sheet>
</template>

<style>
.mono {
  font-family: monospace;
}
</style>
