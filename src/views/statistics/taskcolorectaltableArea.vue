<template>
    <div class="table-container">
       <div class="item" v-for="(item,index) in tableData" :key="index">
            <h4>{{item.deptName}}</h4>
            <el-table
            :data="item.data"
             border
            style="width:100%">
            <el-table-column
                prop="name"
                label=""
                width="180"
                >
            </el-table-column>
            <el-table-column
                prop="cj_now"
                label="随访结肠镜当前任务数"
                >
            </el-table-column>
            <el-table-column
                prop="cj_yy"
                label="随访结肠镜已预约">
            </el-table-column>
            <el-table-column
                prop="cj_finish"
                label="随访结肠镜检查完成数">
            </el-table-column>
            <el-table-column
                prop="fit_cj_now"
                label="FIT阳性结肠镜当前任务数">
            </el-table-column>
            <el-table-column
                prop="fit_cj_yy"
                label="FIT阳性者结肠镜已预约"
                width="200">
            </el-table-column>
            <el-table-column
                prop="fit_cj_finish"
                label="FIT阳性者结肠镜检查数">
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



