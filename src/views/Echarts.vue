<!--  在Echarts.vue文件中 -->
<template>
  <div class="Echarts">
    <div id="main1" style="width: 650px;height: 250px;"></div>
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  data(){
    return{
      a:0,
      b:0,
      c:0,
      d:0,
      e:0
    }
  },
  methods: {
    myEcharts(){
      var myChart = this.$echarts.init(document.getElementById('main1'));
      //配置图表
      this.$api({
        url: '/orderinfo/gradenumber',
        method: 'get'
      }).then(res => {
        console.log(res)
        if(res.code===20041){
          console.log(res);
          console.log(222);
          this.a=res.data[1].number;
          this.b=res.data[2].number;
          this.c=res.data[3].number;
          this.d=res.data[4].number;
          this.e=res.data[5].number;
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
                  {value:this.e, name:'5星'},
                  {value:this.d, name:'4星'},
                  {value:this.c, name:'3星'},
                  {value:this.b, name:'2星'},
                  {value:this.a, name:'1星'}
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