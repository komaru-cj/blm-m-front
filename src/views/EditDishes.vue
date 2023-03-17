<template>
  <div class="background">
    <upbar></upbar>
    <div class="backbutton">
      <el-button type="info" plain @click="jumpDishes">返回</el-button>
    </div>
    <div class="uppic">
      <el-col span="12" :push="7">
        <!-- auto-upload为是否自动加载；action为图片要上传到的地址，这里随便填一个，因为暂时不用 -->
        <!-- class为动态样式选择，是实现上传图片后上传框消失的关键 -->
        <el-upload action="#"
                   list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                   :on-remove="handleRemoveimg"
                   :auto-upload="false" :on-change="handleChangeimg"
                   :class="objClass"
                   :file-list="fileList" :limit="1">
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- el-dialog为点击预览图的放大按钮后弹出来的框，在框内显示放大的图片 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-col>
    </div>
    <div class="down">
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="菜品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="菜品类别" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择菜品类别">
            <el-option label="汉堡" value="2"></el-option>
            <el-option label="炸鸡" value="3"></el-option>
            <el-option label="套餐" value="4"></el-option>
            <el-option label="小食甜品" value="5"></el-option>
            <el-option label="饮品" value="6"></el-option>
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
        <el-form-item label="添加日期" prop="date">
          <el-date-picker
              v-model="ruleForm.date"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
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
      dishid:'',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      objClass: {
        upLoadShow: true,
        upLoadHide: false,
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
    submit(){
      this.$api({
        url: '/dishes',
        method: 'post',
        header:{
          'Content-Type':'application/json'  //如果写成contentType会报错
        },
        data: {
          'dish':this.ruleForm.name,
          'categoryID':this.ruleForm.region,
          'inventory':this.ruleForm.num,
          'description':this.ruleForm.desc,
          'price':this.ruleForm.price
        }
      }).then(res => {
        console.log(res)
        if(res.code===20011){
          console.log(res);
          this.$router.push('/dishesmng')
        }
        else {
          console.log(error);
        }
      }).catch(function (error){
        console.log(error);
      });
    },
    change(){
      console.log(file)
      console.log(fileList)
      console.log(this.$el)
      // if(fileList.length>0){
      //
      // }
    },
    jumpDishes () {
      this.$router.push('/dishesmng')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          console.log('出错了!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
    },
    handleRemove(file) {
      console.log(file);
    },
    handleChangeimg(file, fileList) {
      this.objClass.upLoadHide = true;//上传图片后置upLoadHide为真，隐藏上传框
      this.objClass.upLoadShow = false;
    },
    handleRemoveimg(file, fileList) {
      this.objClass.upLoadShow = true;//删除图片后显示上传框
      this.objClass.upLoadHide = false;
    },
    // 点击预览图的放大按钮后会触发handlePictureCardPreview
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.dishid=sessionStorage.getItem("editdishid");
    this.$api({
      url: '/dishes/'+(this.dishid),
      method: 'get',
    }).then(res => {
      console.log(res)
      if(res.code===20041){
        console.log(res);
        this.ruleForm.name=res.data.dish,
        this.ruleForm.price=res.data.price,
        this.ruleForm.num=res.data.inventory,
        this.ruleForm.desc=res.data.description,
        this.ruleForm.date=new Date()
      }
      else {
        console.log(error);
      }
    }).catch(function (error){
      console.log(error);
    });
    sessionStorage.removeItem("editdishid");
  }
}
</script>
<style>
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
  top:-150px;
  width:600px;
  height:00px;
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
.upLoadShow .el-upload {
  width: 200px !important;
  height: 200px !important;
  line-height: 200px !important;
}

/*当upLoadHide为true时，启用如下样式，即缩略图的样式，若为false则不启用该样式*/
.upLoadHide .el-upload-list--picture-card .el-upload-list__item {
  width: 200px !important;
  height: 200px !important;
  line-height: 200px !important;
}
/*当upLoadHide为true时，启用如下样式，即上传框的样式，若为false则不启用该样式*/
.upLoadHide .el-upload {
  display: none;
}
.uppic{
  position: relative;
  left: -250px;
  top: 50px;
}
</style>