<template>
  <div class="background">
    <upbar></upbar>
    <div class="backComponent">
      <leftbar></leftbar>
      <div class="rightBackground">
        <el-table
            :data=tableData
            style="width: 100%"  height="590" :row-class-name="tableRowClassName">
          <el-table-column type="expand" @click="getorderdetail(scope.row)">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="菜品">
                  <span>{{ props.row.dishName }}</span>
                </el-form-item>
                <el-form-item label="数量">
                  <span>{{ props.row.number }}</span>
                </el-form-item>
                <el-form-item label="菜品金额">
                  <span>{{ props.row.dishAmount }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
              label="取餐号"
              prop="orderID"
              sortable>
          </el-table-column>
          <el-table-column
              label="客户ID"
              prop="customerID">
          </el-table-column>
          <el-table-column
              label="订单状态"
              prop="status"
              width="150"
              sortable>
          </el-table-column>
          <el-table-column
              label="订单金额"
              prop="totalAmount"
              width="200"
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
            </template>
            <template slot-scope="scope">
              <el-button
                  type="success"
                  size="mini" icon="el-icon-check" circle
                  @click="handleEdit(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:6px;">
          <el-pagination align='center'  @current-change="handleCurrentChange"
                         :current-page="currentPage"
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
  components: {
    leftbar,
    upbar
  },
  mounted() {
    this.getorder();
  },
  data() {
    return {
      tableData: [],
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
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    tableRowClassName(row) {
      if(row.row.status === 0){
        return 'warning-row';
      }
      return '';
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getorder();
    },
    getorder(){
      this.$api({
        url: '/orderinfo/pages',
        method: 'get',
        params: {
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }
      }).then(res => {
        console.log(res)
        if(res.code===20041){
          console.log(res);
          this.tableData=res.data.list;
          this.total=res.data.total;
        }
        else {
          console.log(error);
        }
      }).catch(function (error){
        console.log(error);
      });
    },
    getorderdetail(row){

    }
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
.backComponent {
  width: 100%;
  overflow: auto;
}
.rightBackground{
  position: relative;
  left:85px;
  top:-695px;
  width:1440px;
  height:800px;
  background:inherit;
  background-color:rgba(255, 255, 255, 1);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  margin-left: 20px;
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-left: 40px;
  margin-right: 0;
  margin-bottom: 0;
  width: 80%;
}
.el-table .warning-row {
  background: oldlace;
}
</style>