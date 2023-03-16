<template>
  <div class="body">
    <el-menu default-active="1-4-1" style="width: 80px;height: 700px" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router
             :default-active="$route.path">
      <el-menu-item style="margin-top: 40px;color:#F56C6C;" index="/dishesmng">
        <i class="el-icon-food" style="font-size: 40px;"></i>
        <span slot="title">菜品管理</span>
      </el-menu-item>
      <el-menu-item style="margin-top: 40px;color:#F56C6C"  index="/ordermng">
        <i class="el-icon-s-order" style="font-size: 40px;"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item style="margin-top: 40px;color:#F56C6C" index="/noticemng">
        <i class="el-icon-message-solid" style="font-size: 40px;"></i>
        <span slot="title">公告信息管理</span>
      </el-menu-item>
      <el-menu-item style="margin-top: 40px;color:#F56C6C"  index="/customermng">
        <i class="el-icon-s-custom" style="font-size: 40px;"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item style="margin-top: 40px;color:#F56C6C" index="/datamng">
        <i class="el-icon-s-data" style="font-size: 40px;" ></i>
        <span slot="title">数据统计</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      activeIndex:'/dishesmng'
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    this.activeIndex=this.$router.push()
  }
}
</script>