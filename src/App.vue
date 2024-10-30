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
import StaticPlot from "./components/StaticPlot.vue";
import DynamicPlot from "./components/DynamicPlot.vue";
import { Options } from "./components/options";

const options: Partial<Options> = {};

const staticOrDynamic = defineModel<string>("staticOrDynamic");
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>About</v-expansion-panel-title>
      <v-expansion-panel-text eager class="text-left">
      <p>
        This visualisation plots primary and supplementary alignments from BAM files
        to facilitate the interpretation of structural variants.
      </p>
      <p>
        To make a plot, use the file selector below to select a BAM file of long read
        alignments, and it's corresponding BAI file. Both must be provided. The app will
        read parts of the BAM file into the browser, but it does not transport any data
        outside the browser, so as to make sure patient privacy is preserved for clinical
        samples.
      </p>
      <p>
        You should then put the locus of interest into the input box below. This should
        be in the format <code>chrom:start-end</code>, as you may use for IGV or the UCSC
        browser. When you click "Scan Alignments", the app will scan the BAM file and
        identify all the reads that intersect the given locus, and gather up all the
        primary and supplementary alignments for those read in order to generate the plot.
      </p>
      <p>
        If the region of interest has a large footprint on the reference, it can take a long
        time to scan all the reads, most of which may not be of interest to interpreting the
        structural event, so you may find it more satisfactory to start with a locus of a
        few hundred base pairs around one or other end of the region.
      </p>
      <p>
        Once you have an initial plot, you can use the table below to selectively flip the
        orientation of reads for clarity, and selectively hide them to reduce clutter.
        The line segments in the plot are clickable, which brings up a panel with controls
        to allow you to "mute" (hide) a read, "solo" it (hide all the other reads), and
        copy the read ID to the clipboard.
      </p>
      <p>
        The camera icon in the top right of the plot opens a new window/tab with the plot as
        an image that you can save or copy for use in documents/presentations.
      </p>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-sheet elevation="1">
    <v-tabs v-model="staticOrDynamic">
      <v-tab value="dynamic">Alignment Summaries from BAM</v-tab>
      <v-tab value="static">Precomputed Alignment Summaries</v-tab>
    </v-tabs>
    <v-tabs-window v-model="staticOrDynamic">
      <v-tabs-window-item value="dynamic">
        <DynamicPlot :options="options"></DynamicPlot>
      </v-tabs-window-item>
      <v-tabs-window-item value="static">
        <StaticPlot :options="options"></StaticPlot>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-sheet>
</template>

<style lang="css" scoped>
  .v-expansion-panel-text p {
    padding-bottom: 1em;
  }
</style>
