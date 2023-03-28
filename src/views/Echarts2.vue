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
      this.$api({
        url: '/statistics/getgooddishes',
        method: 'get'
      }).then(res => {
        console.log(res)
        if(res.code===20041){
          console.log(res);
          console.log(res.data[0].dishCount);
          console.log(res.data[0].dishName);
          var option = {
            dataset: {
              source: [
                ['score', '销量（份）', 'product'],
                [5.0, res.data[0].dishCount, res.data[0].dishName],
                [2.6, res.data[1].dishCount, res.data[1].dishName],
                [3.3, res.data[2].dishCount, res.data[2].dishName],
                [1.7, res.data[3].dishCount, res.data[3].dishName],
                [4.3, res.data[4].dishCount, res.data[4].dishName]
              ]
            },
            grid: { containLabel: true },
            xAxis: { name: '销量（份）' },
            yAxis: { type: 'category' },
            visualMap: {
              orient: 'horizontal',
              x: 'center',
              min: 1,
              max: 5,
              text: ['高评分', '低评分'],
              // Map the score column to color
              dimension: 0,
              inRange: {
                color: ['#91cc75', '#fac858', '#ee6666']
              },
              bottom:'15'
            },
            series: [
              {
                type: 'bar',
                encode: {
                  // Map the "amount" column to X axis.
                  x: '销量（份）',
                  // Map the "product" column to Y axis
                  y: 'product'
                }
              }
            ],
          };
          myChart.setOption(option);
        }
        else {
          console.log(error);
        }
      }).catch(function (error){
        console.log(error);
      });
    }
  },
  mounted(){
    this.myEcharts();
  }
}
</script>

<style>

</style>