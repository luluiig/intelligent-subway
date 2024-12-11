<!--
 * @Description:
 * @Author: your name
 * @version:
 * @Date: 2024-05-09 13:36:13
 * @LastEditors: your name
 * @LastEditTime: 2024-05-09 14:38:21
-->
<template>
  <div id="historyChart"></div>
</template>

<script setup>
import { historyWarning } from "@/cesiumTools/myFramwork/home/echartsOpts";
import * as echarts from "echarts";
import { onMounted } from "vue";
import {historyWarningData} from '@/store/staticData'

onMounted(() => {
  initChart();
});

const initChart = () => {
  const myChart = echarts.init(document.getElementById("historyChart"));
  const options = historyWarning(historyWarningData);
  myChart.setOption(options);
};
</script>
<style scoped lang="scss">
  #historyChart{
    width: 100%;
    height:100%;
    padding: 0 10px 10px 10px;
  }
</style>
