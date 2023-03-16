<template>
  <div class="background">
    <upbar></upbar>
    <div class="backComponent">
      <leftbar></leftbar>
      <div class="rightBackground">
        <echarts></echarts>
      </div>
    </div>
  </div>
</template>
<script>
import leftbar from '../views/LeftBar'
import upbar from '../views/UpBar'
import echarts from '../views/Echarts'
export default {
  components: {
    leftbar,
    upbar,
    echarts
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
}
.backComponent {
  width: 100%;
  overflow: auto;
}
</style>