<!--  在Echarts.vue文件中 -->
<template>
  <div class="Echarts">
    <div id="main1" style="width: 600px;height: 400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  methods: {
    myEcharts(){
      var myChart = this.$echarts.init(document.getElementById('main1'));
      //配置图表
      var option = {
        title : {
          text: '顾客评价',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['5星','4星','3星','2星','1星']
        },
        series : [
          {
            name: '评价等级',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:1548, name:'5星'},
              {value:310, name:'4星'},
              {value:234, name:'3星'},
              {value:135, name:'2星'},
              {value:335, name:'1星'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
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