<template>
  <div class="background">
    <upbar></upbar>
    <div class="backComponent">
      <leftbar></leftbar>
      <div class="rightBackground">
        <el-table
            :data=tableData
            style="width: 100%"  height="590" :row-class-name="tableRowClassName">
          <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item v-for="(item, i) in props.row.respOrderDetailList">
                    <span>{{ item.dishName }}*{{item.number}}</span>
                  </el-form-item>
                  <el-form-item>
                    <span>订单评价：{{props.row.orderInfo2.comment}}</span>
                  </el-form-item>
                </el-form>
              </template>
          </el-table-column>
          <el-table-column
              label="取餐号"
              prop="orderInfo2.orderID"
              width="130"
              sortable>
          </el-table-column>
          <el-table-column
              label="下单手机号"
              prop="orderInfo2.phoneNumber">
          </el-table-column>
          <el-table-column
              label="订单状态"
              prop="orderInfo2.statusMessage"
              width="150"
              sortable>
          </el-table-column>
          <el-table-column
              label="订单金额"
              prop="orderInfo2.totalAmount"
              width="200"
              sortable>
          </el-table-column>
          <el-table-column
              label="创建时间"
              prop="orderInfo2.createdTime"
              sortable>
          </el-table-column>
          <el-table-column
              align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                  @keyup.enter.native="search"
                  size="mini"
                  v-model="number"
                  placeholder="输入关键字搜索"/>
            </template>
            <template slot="header" slot-scope="scope">
            </template>
            <template slot-scope="scope">
              <el-button
                  type="danger"
                  size="mini" icon="el-icon-close" circle
                  @click="handleBack(scope.$index, scope.row)" style="margin-right: 10px"></el-button>
              <el-button
                  type="success"
                  size="mini" icon="el-icon-check" circle
                  @click="handleEdit(scope.$index, scope.row)" style="margin-right: 40px"></el-button>
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
import {number} from "echarts/lib/export";
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
      orderData: [],
      currentPage: 1, // 当前页码
      pageSize: 10,
      total:0,
      number:0
    }
  },
  methods: {
    jumpAddDishes () {
      this.$router.push('/adddishes')
    },
    handleEdit(index, row) {
      console.log(index, row);
      if(row.orderInfo2.status===3) return;
      this.$api({
        url: '/orderinfo/updatestatus',
        method: 'post',
        params:{
          orderID:row.orderInfo2.orderID,
          status:row.orderInfo2.status+1
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
      this.getorder();
    },
    handleBack(index, row) {
      if(row.orderInfo2.status===0) return;
      console.log(index, row);
      this.$api({
        url: '/orderinfo/updatestatus',
        method: 'post',
        params:{
          orderID:row.orderInfo2.orderID,
          status:row.orderInfo2.status-1
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
      this.getorder();
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    tableRowClassName(row) {
      if(row.row.orderInfo2.status==1){
        return 'danger-row';
      }
      if(row.row.orderInfo2.status===2){
        return 'warning-row';
      }
      if(row.row.orderInfo2.status===0){
        return 'info-row';
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
        url: '/orderinfo/allorder/'+this.currentPage+'/'+this.pageSize+'/'+sessionStorage.getItem("grade"),
        method: 'get'
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
    search(){
      this.$api({
        url: '/orderinfo/id',
        method: 'get',
        params: {
          id:this.number
        }
      }).then(res => {
        console.log(res)
        if(res.code===20041){
          console.log(res);
          this.tableData=res.data;
          this.total=1;
        }
        else {
          console.log(error);
        }
      }).catch(function (error){
        console.log(error);
      });
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

.el-table .danger-row {
  background: #fdd5db;
}
.el-table .info-row {
  background: #faf9f9;
}
</style>