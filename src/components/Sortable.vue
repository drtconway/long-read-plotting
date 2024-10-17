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
<script setup lang="ts" generic="T extends KeyedItem">
import { onMounted, ref, watchEffect } from "vue";
import { KeyedItem, ColumnSpecification, stableSort } from "./sortable";

const props = defineProps<{
  items: T[];
  columns: ColumnSpecification<T>[];
  height: string;
}>();

const data = ref<T[]>();

const currentKey = ref<[string, boolean]>(["", true]);

function clickKey(spec: ColumnSpecification<T>) {
  if (currentKey.value) {
    if (currentKey.value[0] == spec.field.toString()) {
      if (currentKey.value[1] == true) {
        currentKey.value[1] = false;
      } else {
        return (currentKey.value = ["", true]);
      }
    } else {
      currentKey.value = [spec.field.toString(), true];
    }
  } else {
    currentKey.value = [spec.field.toString(), true];
  }
  if (data.value) {
    const xs = stableSort(data.value, spec, currentKey.value[1]);
      data.value = xs;
  }
}

onMounted(() => {
  watchEffect(() => {
    data.value = [...props.items];
    currentKey.value = ["", true];
  });
});
</script>

<template>
  <v-table fixed-header :height="height">
    <thead>
      <tr>
        <th
          v-for="spec in columns"
          :key="spec.field"
          :class="spec.kind == 'str' ? 'text-center' : 'text-right'"
          @click="clickKey(spec)"
        >
          {{ spec.title }}
          <v-icon size="small" v-if="currentKey[0] == spec.field.toString()">{{
            currentKey[1] ? "mdi-chevron-up" : "mdi-chevron-down"
          }}</v-icon>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.key">
        <td
          v-for="spec in columns"
          :key="item.key + ':' + spec.field.toString()"
          :class="spec.kind == 'str' ? 'text-center' : 'text-right'"
        >
          {{ item[spec.field] }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
