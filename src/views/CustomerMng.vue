<template>
  <div class="background">
    <upbar></upbar>
    <div class="backComponent">
      <leftbar></leftbar>
      <div class="addbutton">
      </div>
      <div class="rightBackground">
        <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%;top: 15px"  height="540">
          <el-table-column
              label="姓名"
              width="200"
              prop="customer"
              sortable>
          </el-table-column>
          <el-table-column
              label="性别"
              width="100"
              prop="gender">
          </el-table-column>
          <el-table-column
              label="联系方式"
              width="400"
              prop="phoneNumber">
          </el-table-column>
          <el-table-column
              label="消费总额"
              prop="accumulatedAmount"
              sortable>
          </el-table-column>
          <el-table-column
              label="创建时间"
              prop="createdTime"
              sortable>
          </el-table-column>
          <el-table-column
              align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:6px;">
          <el-pagination align='center'  @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-size="pageSize"
                         layout="total,prev, pager, next, jumper"
                         :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import leftbar from '../views/LeftBar'
import upbar from '../views/UpBar'
export default {
  inject:["reload"],
  components: {
    leftbar,
    upbar
  },
  data() {
    return {
      tableData: [],
      search: '',
      currentPage: 1, // 当前页码
      pageSize: 10,
      total:0
    }
  },
  methods: {
    jumpAddDishes () {
      this.$router.push('/adddishes')
    },
    handleEdit(index, row) {
      console.log(index, row);
      sessionStorage.setItem("editdishid", row.dishID);
      this.$router.push('/editdishes')
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$api({
        url: '/dishes/delete/'+(row.dishID),
        method: 'get',
      }).then(res => {
        console.log(res)
        if(res.code===20051){
          console.log(res);
        }
        else {
          console.log(error);
        }
      }).catch(function (error){
        console.log(error);
      });
      this.tableData.splice(index,1);
    },
    filterTag(value, row) {
      return row.categoryName === value;
    },
    getcust(){
      this.$api({
        url: '/customer',
        method: 'get',
      }).then(res => {
        console.log(res)
        if(res.code===20041){
          console.log(res);
          this.tableData=res.data
          this.total=this.tableData.length
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
    this.getcust();
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
.rightBackground{
  position: relative;
  left:85px;
  top:-700px;
  width:1450px;
  height:700px;
  background:inherit;
  background-color:rgba(255, 255, 255, 1);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
}
.addbutton{
  position: relative;
  left:1410px;
  top:-693px;
  z-index: 100;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  margin-left: -10px;
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-left: 60px;
  margin-right: 0;
  margin-bottom: 0;
  width: 80%;
}
.block{
  position: relative;
  top: 30px;
}
</style>