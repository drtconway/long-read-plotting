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
