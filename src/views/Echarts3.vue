<template>
  <div class="Echarts">
    <div id="main3" style="width: 650px;height: 400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  data(){
    return{
      dataTable:[]
    }
  },
  methods: {
    myEcharts(){
      var myChart = this.$echarts.init(document.getElementById('main3'));
      //配置图表
      this.$api({
        url: 'statistics/orderofhour',
        method: 'get'
      }).then(res => {
        console.log(res)
        if(res.code===20041){
          console.log(res);
          this.dataTable=res.data;
          var option = {
            title: {
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              // prettier-ignore
              data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00','20:00','21:00','22:00','23:00']
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              },
              axisPointer: {
                snap: true
              }
            },
            visualMap: {
              show: false,
              dimension: 0,
              pieces: [
                {
                  lte: this.dataTable[24],
                  color: 'green'
                },
                {
                  gt: this.dataTable[24],
                  lte: this.dataTable[24]+1,
                  color: 'red'
                },
                {
                  gt: this.dataTable[24]+1,
                  lte: this.dataTable[25],
                  color: 'green'
                },
                {
                  gt: this.dataTable[25],
                  lte: this.dataTable[25]+1,
                  color: 'red'
                },
                {
                  gt: this.dataTable[25]+1,
                  color: 'green'
                }
              ]
            },
            series: [
              {
                name: '订单量',
                type: 'line',
                smooth: true,
                // prettier-ignore
                data: res.data.slice(0,24),
                markArea: {
                  itemStyle: {
                    color: 'rgba(255, 173, 177, 0.4)'
                  },
                  data: [
                    [
                      {
                        name: '早高峰',
                        xAxis: '07:00'
                      },
                      {
                        xAxis: '08:00'
                      }
                    ],
                    [
                      {
                        name: '晚高峰',
                        xAxis: '17:00'
                      },
                      {
                        xAxis: '18:00'
                      }
                    ]
                  ]
                }
              }
            ]
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