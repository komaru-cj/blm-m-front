<template>
  <div class="background">
    <upbar></upbar>
    <div class="backbutton">
      <el-button type="info" plain @click="jumpDishes">返回</el-button>
    </div>
    <div class="down">
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="菜品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="菜品类别" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择菜品类别">
            <el-option label="类别一" value="shanghai"></el-option>
            <el-option label="类别二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品价格" prop="price">
          <el-input-number v-model="ruleForm.price" @change="handleChange" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="库存数量" prop="num">
          <el-input-number v-model="ruleForm.num" @change="handleChange" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="菜品描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="修改日期" prop="date">
          <el-date-picker
              v-model="ruleForm.date"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import upbar from '../views/UpBar'
export default {
  name: 'AddDishes',
  components: { upbar },
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        price: '',
        num:'',
        desc: '',
        date:new Date(),
      },
      rules: {
        name: [
          { required: true, message: '请输入菜品名称', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择菜品类别', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请选择价格', trigger: 'change' }
        ],
        num: [
          { required: true, message: '请选择库存', trigger: 'change' }
        ],
        desc: [
          { message: '请填写描述', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
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
.down{
  position: relative;
  left:450px;
  top:80px;
  width:600px;
  height:600px;
  background:inherit;
  background-color: rgba(255, 255, 252, 1);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
}
.backbutton{
  position: relative;
  left:30px;
  top:10px;
}
</style>