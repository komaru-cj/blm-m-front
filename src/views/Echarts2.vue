<template>
  <div class="Echarts2">
    <div id="main2" style="width: 700px;height: 350px;"></div>
  </div>
</template>

<script>
export default {
  name: 'Echarts2',
  methods: {
    myEcharts(){
      var myChart = this.$echarts.init(document.getElementById('main2'));
      //配置图表
      var option = {
        dataset: {
          source: [
            ['score', 'amount', 'product'],
            [4.7, 58212, '香辣鸡腿堡'],
            [2.6, 78254, '吮指原味鸡'],
            [3.3, 41032, '可口可乐'],
            [3.7, 12755, '葡式蛋挞'],
            [1.5, 20145, 'OK三件套']
          ]
        },
        grid: { containLabel: true },
        xAxis: { name: 'amount' },
        yAxis: { type: 'category' },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 1,
          max: 5,
          text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#65B581', '#FFCE34', '#FD665F']
          }
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted(){
    this.myEcharts();
  }
}
</script>

<style>

</style>