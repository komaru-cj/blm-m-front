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
      </div>
    </div>
  </div>
</template>
<script>
import leftbar from '../views/LeftBar'
import upbar from '../views/UpBar'
import echarts from '../views/Echarts'
import echarts2 from '../views/Echarts2'
export default {
  components: {
    leftbar,
    upbar,
    echarts,
    echarts2
  },
  mounted() {
    document.getElementById('switch4').setAttribute('class', 'leftSwitch selected')
  },
  created() {
    this.myEcharts();
  }
}
</script>
<style scoped>
.background{
  width:100%;
  height:100%;
  background:inherit;
  background-color:rgba(255, 255, 252, 1);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  overflow: hidden;
  background-color: #f7ffef;
}
.backComponent {
  width: 100%;
  overflow: auto;
}
.rightBackground{
  position: relative;
  top: -600px;
  left: 200px;
  background-color: #f7ffef;
}
.echarts1{
  position: relative;
  top: 0px;
  left: 0px;
  width: 600px;
}
.echarts2{
  position: relative;
  left: 600px;
  top:-380px;
}
</style>