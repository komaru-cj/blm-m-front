<template>
  <div class="Echarts2">
    <div id="main2" style="width: 700px;height: 400px;"></div>
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
        title: {
          text: 'Top5菜品月销量',
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['单层嫩牛堡','黄金脆皮鸡','葡式蛋挞','可口可乐','新奥尔良鸡腿堡']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [11204,9854,7352,7045,5638],
          itemStyle: {
            normal: {
              // 这里就可以实现，配置柱状图的颜色
              color: function (params) {
                var colorList = ['#800206', '#f3910f', '#b70505', '#f3cc36', '#a10b56'];
                return colorList[params.dataIndex]
              },
            }
          }
        }]
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