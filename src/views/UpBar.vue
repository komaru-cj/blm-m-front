<template>
  <div class="body">
    <img class="logo" src="../assets/logo.png">
    <div @mouseenter="isExitHover=true" @mouseleave="isExitHover=false" class="exit" @click="exit">
      <img v-show="!isExitHover" :src="exit1" style="width:35px;height:35px;" class="mr10" />
      <img v-show="isExitHover" :src="exitActive1" style="width:35px;height:35px;" class="mr10" />
    </div>
    <div class="block" @click="psw"><el-avatar :size="55" >admin</el-avatar></div>
  </div>
</template>
<script>
export default {
  name: 'UpBar',
  data(){
    return{
      exit1: require("../assets/exit.png"),
      exitActive1: require("../assets/exit1.png"),
      isExitHover:false,
    }
  },
  methods: {
    exit() {
      this.$confirm('确认退出, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        this.$router.push('/')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        });
      });
    },
    psw() {
      this.$router.push('/psw')
    }
  }
}
</script>
<style scoped>
.body{
  overflow: hidden;
  font-size: 0px;
  width:100%;
  height:80px;
  background:inherit;
  background-color:rgba(255, 205, 86, 1);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
}
.logo{
  float: left;
  margin-top: 8px;
  margin-left: 25px;
  margin-right: 100px;
  width:150px;
  height:62px;
}
.exit{
  float: left;
  margin-top: 24px;
  margin-left: 1120px;
  width:35px;
  height:35px;
}
.block{
  float: left;
  margin-top: 12px;
  margin-left: 15px;
}
</style>
