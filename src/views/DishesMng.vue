<template>
  <div class="background">
    <upbar></upbar>
    <div class="backComponent">
      <leftbar></leftbar>
      <div class="addbutton">
        <el-button type="warning" @click="jumpAddDishes">添加菜品</el-button>
      </div>
      <div class="rightBackground">
        <el-table
            :data="tableData.filter(data => !search || data.dish.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"  max-height="570" >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="详细信息： ">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
              label="菜品名称"
              prop="dish"
              width="300"
              sortable>
          </el-table-column>
          <el-table-column
              prop="categoryName"
              label="类别"
              width="150"
              :filters="[{ text: '汉堡', value: '汉堡' },{ text: '炸鸡', value: '炸鸡' },{ text: '套餐', value: '套餐' },{ text: '小食甜品', value: '小食甜品' }, { text: '饮品', value: '饮品' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                  disable-transitions>{{scope.row.categoryName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
              label="价格"
              prop="price"
              width="150"
              sortable>
          </el-table-column>
          <el-table-column
              label="库存数量"
              prop="inventory"
              width="200"
              sortable>
          </el-table-column>
          <el-table-column
              label="添加时间"
              prop="createdTime"
              width="300"
              sortable>
          </el-table-column>
          <el-table-column
              align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                  v-model="search"
                  size="mini"
                  width="400"
                  placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      search: ''
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
    getdishes(){
      this.$api({
        url: '/categories/alldishes',
        method: 'get',
      }).then(res => {
        console.log(res)
        if(res.code===20041){
          console.log(res);
          let arryy = [];
          let oldarr = res.data;
          for(let x = 0; x < oldarr.length; x++) {
            for(let y = 0; y < oldarr[x].dishList.length; y++){
              oldarr[x].dishList[y].categoryName=oldarr[x].categoryName;
              arryy.push(oldarr[x].dishList[y]);
            }
          }
          console.log(arryy);
          this.tableData=arryy;
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
    this.getdishes();
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
</style>