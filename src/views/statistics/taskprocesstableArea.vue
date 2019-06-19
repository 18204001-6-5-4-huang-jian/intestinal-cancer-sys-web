<template>
    <div class="table-container">
     <div class="item" v-for="(item,index) in tableData" :key="index">
         <h4>{{item.deptName}}</h4>
         <el-table
        class="task-process-table"
        :data="item.data"
         border
        style="width:100%">
        <el-table-column
            prop="name"
            label=""
            width="180">
        </el-table-column>
         <el-table-column
            prop="total"
            label="基线入组人数"
            width="150">
        </el-table-column>
        <el-table-column label="年度随访问卷">
            <el-table-column
                prop="ndwj_total"
                label="总任务"
                >
            </el-table-column>
                <el-table-column
                prop="ndwj_now"
                label="当前计划任务"
                width="110"
                >
                </el-table-column>
                <el-table-column
                prop="ndwj_invited"
                label="已邀请"
                >
                </el-table-column>
                <el-table-column
                prop="ndwj_delay"
                label="已延期"
                >
                </el-table-column>
                <el-table-column
                prop="ndwj_finish"
                label="随访成功"
                >
                </el-table-column>
                <el-table-column
                prop="ndwj_loss"
                label="失访"
                >
            </el-table-column>
        </el-table-column>
         <el-table-column label="FIT">
            <el-table-column
                prop="fit_total"
                label="总任务"
                >
            </el-table-column>
                <el-table-column
                prop="fit_now"
                label="当前计划任务"
                width="110"
                >
                </el-table-column>
                <el-table-column
                prop="fit_invited"
                label="已邀请"
                >
                </el-table-column>
                <el-table-column
                prop="fit_delay"
                label="已延期"
                >
                </el-table-column>
                <el-table-column
                prop="fit_finish"
                label="随访成功"
                >
                </el-table-column>
                <el-table-column
                prop="fit_loss"
                label="失访"
                >
            </el-table-column>
        </el-table-column>
         <el-table-column label="结肠镜">
            <el-table-column
                prop="cj_total"
                label="总任务"
                >
            </el-table-column>
                <el-table-column
                prop="cj_now"
                label="当前计划任务"
                width="110"
                >
                </el-table-column>
                <el-table-column
                prop="cj_invited"
                label="已邀请"
                >
                </el-table-column>
                <el-table-column
                prop="cj_delay"
                label="已延期"
                >
                </el-table-column>
                <el-table-column
                prop="cj_finish"
                label="随访成功"
                >
                </el-table-column>
                <el-table-column
                prop="cj_loss"
                label="失访"
                >
            </el-table-column>
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
<style>
  .el-table.task-process-table th>.cell {
      text-align:center;
  }
</style>




