<template>
  <div class="background">
    <upbar></upbar>
    <div class="backComponent">
      <leftbar></leftbar>
      <div class="rightBackground">
        <div class="echarts1">
          <echarts></echarts>
        </div>
        <div class="echarts2">
          <echarts2></echarts2>
        </div>
        <div class="echarts3">
          <echarts3></echarts3>
        </div>
        <div class="time">
          <el-container id="box">
            <p class="timetext">{{dateFormat(date)}}</p>
          </el-container>
        </div>
        <div class="sta">
          <div class="sta1">
            <el-statistic title="今日订单总数">
              <template slot="formatter" > {{orderNumberOfToday}} </template>
            </el-statistic>
          </div>
          <div class="sta2">
            <el-statistic title="日销售额">
              <template slot="formatter" > {{orderAmountOfToday}} </template>
            </el-statistic>
          </div>
          <div class="sta3">
            <el-statistic title="月销售额">
              <template slot="formatter" > {{monthSales}} </template>
            </el-statistic>
          </div>
          <div class="sta4">
            <el-statistic title="未完成订单">
              <template slot="formatter" > {{unfinishedOrders}} </template>
            </el-statistic>
          </div>
        </div>
        <img src="../assets/line.png" class="line">
      </div>
    </div>
  </div>
</template>
<script>
import leftbar from '../views/LeftBar'
import upbar from '../views/UpBar'
import echarts from '../views/Echarts'
import echarts2 from '../views/Echarts2'
import echarts3 from '../views/Echarts3'
import dayjs from 'dayjs'
var padaDate = function(value){
  return value<10 ? '0'+value : value;
};
export default {
  components: {
    leftbar,
    upbar,
    echarts,
    echarts2,
    echarts3
  },
  methods:{
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      * */
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    },
    getData1(){
      this.$api({
        url: '/statistics',
        method: 'get'
      }).then(res => {
        if(res.code===20041){
          this.monthSales=res.data.monthSales;
          this.unfinishedOrders=res.data.unfinishedOrders;
          this.orderNumberOfToday=res.data.daySales.orderNumberOfToday;
          this.orderAmountOfToday=res.data.daySales.orderAmountOfToday.toFixed(2);
        }
        else {
          console.log(error);
        }
      }).catch(function (error){
        console.log(error);
      });
    }
  },
  created() {
    this.myEcharts();
  },
  data() {
    return {
      date: new Date(),
      orderNumberOfToday:0.00,
      monthSales:0.00,
      unfinishedOrders:0.00,
      orderAmountOfToday:0.00
      // deadline4: (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours())+':'+(new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes())+':'+(new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds())
    }
  },
  mounted() {
    let _this = this// 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
      _this.getData1();
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
}
</script>
<style scoped>
.background{
  width:100%;
  height:100%;
  background:inherit;
  background-color: rgb(254 250 243);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  overflow: hidden;
}
.backComponent {
  width: 100%;
  overflow: auto;
}
.rightBackground{
  position: relative;
  top: -600px;
  left: 200px;
  background-color: rgb(254 250 243);
}
.echarts1{
  position: relative;
  top: 280px;
  left: 780px;
  width: 800px;
  z-index: 100;
}
.echarts2{
  position: relative;
  left: -120px;
  top:-100px;
  width: 800px;
  z-index: 100;
}
.echarts3{
  position: relative;
  left: 700px;
  top:-720px;
  z-index: 100;
}
.time{
  position: relative;
  top:-1070px;
  left: 10px;
  width: 650px;
  height: 200px;
}
.timetext{
  border: 1px solid rgba(255, 255, 255, 1);
  text-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.9);
  /** 文本1 */
  font-size: 48px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgb(11, 7, 87);
  text-align: left;
  vertical-align: top;
}
.sta{
  position: relative;
  top:-1150px;
  left: -60px;
  width: 650px;
  height: 200px;
}
.sta1{
  position: relative;
  left: -30px;
  padding-top: 20px;
  width: 150px;
  height: 70px;
  background-color: #fcd6be;
  border-radius: 10px;
}
.sta2{
  position: relative;
  top:-90px;
  left: 150px;
  padding-top: 20px;
  width: 150px;
  height: 70px;
  background-color: #dbfaa6;
  border-radius: 10px;
}
.sta3{
  position: relative;
  top:-180px;
  left: 330px;
  padding-top: 20px;
  width: 150px;
  height: 70px;
  background-color: #c5e2fc;
  border-radius: 10px;
}
.sta4{
  position: relative;
  top:-270px;
  left: 510px;
  padding-top: 20px;
  width: 150px;
  height: 70px;
  background-color: #dec5fc;
  border-radius: 10px;
}
.line{
  width: 800px;
  height: 600px;
  position: relative;
  top:-1510px;
  left: 670px;
}
</style>