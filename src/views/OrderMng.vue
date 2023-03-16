<template>
  <div class="background">
    <upbar></upbar>
    <div class="backComponent">
      <leftbar></leftbar>
      <div class="rightBackground">
        <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%"  height="590" :row-class-name="tableRowClassName">
          <el-table-column type="expand">
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
              prop="orderId"
              sortable>
          </el-table-column>
          <el-table-column
              label="客户ID"
              prop="customerId">
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
                         :total="tableData.length">
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
    document.getElementById('switch2').setAttribute('class', 'leftSwitch selected')
  },
  data() {
    return {
      tableData: [{
        orderId:'113',
        customerId:'15055798018',
        status:1,
        createdTime:'2023.3.4',
        totalAmount:'51'
        },
        {
          orderId:'1134',
          customerId:'15055798018',
          status:1,
          createdTime:'2023.3.4',
          totalAmount:'51'
        },
        {
          orderId:'1134',
          customerId:'15055798018',
          status:1,
          createdTime:'2023.3.4',
          totalAmount:'51'
        },
        {
          orderId:'1134',
          customerId:'15055798018',
          status:1,
          createdTime:'2023.3.4',
          totalAmount:'51'
        },
        {
          orderId:'1134',
          customerId:'15055798018',
          status:0,
          createdTime:'2023.3.4',
          totalAmount:'51'
        },
        {
          orderId:'1134',
          customerId:'15055798018',
          status:0,
          createdTime:'2023.3.4',
          totalAmount:'51'
        },
        {
          orderId:'1134',
          customerId:'15055798018',
          status:0,
          createdTime:'2023.3.4',
          totalAmount:'51'
        },
        {
          orderId:'1134',
          customerId:'15055798018',
          status:0,
          createdTime:'2023.3.4',
          totalAmount:'51'
        },
        {
          orderId:'1134',
          customerId:'15055798018',
          status:0,
          createdTime:'2023.3.4',
          totalAmount:'51'
        },
        {
          orderId:'1134',
          customerId:'15055798018',
          status:0,
          createdTime:'2023.3.4',
          totalAmount:'51'
        },
        {
          orderId:'1134',
          customerId:'15055798018',
          status:0,
          createdTime:'2023.3.4',
          totalAmount:'51'
        },
        {
          orderId:'1134',
          customerId:'15055798018',
          status:0,
          createdTime:'2023.3.4',
          totalAmount:'51'
        },],
      currentPage: 1, // 当前页码
      total: 14, // 总条数
      pageSize: 10
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