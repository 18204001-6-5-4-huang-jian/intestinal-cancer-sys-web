<template>
    <div class="table-container">
            <div class="item" v-for="(item,index) in tableData" :key="index">
                 <h4>{{item.deptName}}</h4>
                      <el-table
                    :data="item.data"
                     border
                    style="width:100%">
                    <el-table-column
                        prop="follow_month"
                        label="T1年随访分组组"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="ndwj"
                        label="年度随访问卷"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="fit"
                        label="FIT组（人）">
                    </el-table-column>
                    <el-table-column
                        prop="cj"
                        label="结肠镜组（人）">
                    </el-table-column>
                    <el-table-column
                        prop="total"
                        label="总计">
                    </el-table-column>
                    </el-table> 
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
      tableData:{
          type:Array,
          default:() => []
      }
    },
    mounted() {
        // console.log(this.tableData)
    },
}
</script>
<style scoped>
  .item{
      margin: 10px 0;
  }
</style>



