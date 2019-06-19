<template>
    <div class="table-container">
         <el-table
            :data="tableData"
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



