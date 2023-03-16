<template>
  <div class="background">
    <upbar></upbar>
    <div class="backbutton">
      <el-button type="info" plain @click="jumpBack">返回</el-button>
    </div>
    <div class="pic">
      <img src="../assets/psw.png" style="width:200px;">
    </div>
    <div class="psw">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import upbar from '../views/UpBar'
export default {
  name: 'Psw',
  components: { upbar },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api({
            url: '/updatepwd/manager',
            method: 'post',
            params: {
              password:this.ruleForm.pass,
              phoneNumber:sessionStorage.getItem("key")
            }
          }).then(res => {
            console.log(res)
            if(res.code===20031){
              console.log(1)
              console.log('修改成功，请重新登录!!');
              this.$router.push('/')
            }
            else {
              console.log(2)
              console.log(error);
            }
          }).catch(function (error){
            console.log(error);
          });
        } else {
          console.log('出错了!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    jumpBack(){
      this.$router.go(-1);
    }
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
.psw{
  position: relative;
  top: 130px;
  left: 500px;
  width: 500px;
}
.pic{
  position: relative;
  top: 100px;
  left: 690px;
}
.backbutton{
  position: relative;
  left:30px;
  top:10px;
}
.img{
  position:fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>