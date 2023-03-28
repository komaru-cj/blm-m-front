<template>
  <div class="Echarts">
    <div id="main4" style="width: 700px;height: 350px;"></div>
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
      var myChart = this.$echarts.init(document.getElementById('main4'));
      //配置图表
      this.$api({
        url: '/customer/rank',
        method: 'get'
      }).then(res => {
        console.log(res)
        if(res.code===20041){
          console.log(res);
          this.a=res.data[0].number;
          this.b=res.data[1].number;
          this.c=res.data[2].number;
          var option = {
            title : {
              text: '会员等级',
              x:'center',
              bottom:'0'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            textStyle:{
              font:'Microsoft YaHei'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff6eb',
                  borderWidth: 3
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data:[
                  {value:this.a, name:'VIP1'},
                  {value:this.b, name:'VIP2'},
                  {value:this.c, name:'VIP3'},
                ],
                color: ['#b06ecc','#81c78d','#90b7d2']
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