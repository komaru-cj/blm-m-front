<!--  在Echarts.vue文件中 -->
<template>
  <div class="Echarts">
    <div id="main1" style="width: 700px;height: 350px;"></div>
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
                  {value:this.e, name:'5星',grade:5},
                  {value:this.d, name:'4星',grade:4},
                  {value:this.c, name:'3星',grade:3},
                  {value:this.b, name:'2星',grade:2},
                  {value:this.a, name:'1星',grade:1}
                ],
                color: ['#5470c6','#91cc75','#fac858','#ee6666','#73c0de']
              }
            ]
          };
          myChart.setOption(option);
          myChart.on('click', (param) =>{
            sessionStorage.setItem("grade", param.data.grade);
            console.log(param.data.grade);
            this.$router.push('/ordermng')
          });
        }
        else {
          console.log(error);
        }
      }).catch(function (error){
        console.log(error);
      });
    }
  },
  mounted() {
    this.myEcharts();
  }
}
</script>

<style>

</style>