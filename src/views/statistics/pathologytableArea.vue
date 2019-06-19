<template>
    <div class="table-container">
         <div class="item" v-for="(item,index) in tableData" :key="index">
             <h4>{{item.dept}}</h4>
             <el-table
            :data="item.list"
            border
            style="width:100%">
            <el-table-column
                prop="group"
                label="组别"
                >
            </el-table-column>
            <el-table-column
                prop="colorectalCancerNum"
                label="结直肠癌（N,%）">
            </el-table-column>
            <el-table-column
                prop="advancedAdenomaNum"
                label="进展期腺瘤（N,%）">
            </el-table-column>
            <el-table-column
                prop="nonAdvancedAdenomaNum"
                label="非进展期腺瘤（N,%）">
            </el-table-column>
            <el-table-column
                prop="otherLesionsNum"
                label="其他息肉性病变或者炎症（N,%）"
                width="240">
            </el-table-column>
            <el-table-column
                prop="colonoscopyNum"
                label="肠镜数">
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
    watch:{
       tableData(newval,oldval){
        //    console.log(newval)
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



