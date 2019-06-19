<template>
    <div class="table-container">
         <el-table
            :data="tableData"
            border
             style="width:100%">
            <el-table-column
                prop="name"
                label=""
                width="180"
                >
            </el-table-column>
            <el-table-column
                prop="total"
                label="总任务数"
                >
            </el-table-column>
            <el-table-column
                prop="now"
                label="当前任务数">
            </el-table-column>
            <el-table-column
                prop="code_entry"
                label="FIT发放数">
            </el-table-column>
            <el-table-column
                prop="result_entry"
                label="FIT结果返回数">
            </el-table-column>
            <el-table-column
                label="FIT结果（阳性/阴性/无效）"
                width="200">
                <template slot-scope="scope">
                    {{scope.row.result_total}}（{{scope.row.positive}}/{{scope.row.negative}}/{{scope.row.invalid}}）
                </template> 
            </el-table-column>
            <el-table-column
                prop="reserve"
                label="已预约结肠镜检查">
            </el-table-column>
            <el-table-column
                prop="complete"
                label="已完成结肠镜检查">
            </el-table-column>
            </el-table>
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

</style>



