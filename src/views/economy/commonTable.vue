<template>
    <div class="table-container">
         <el-table
            :data="tableData"
            :span-method="objectSpanMethod"
            border
            style="width:100%">
              <!-- <el-table-column
                prop="province"
                :label="$store.state.hospitalType == 2?'社区':'省份'"
                align="center">
            </el-table-column> -->
            <el-table-column
                prop="groupName"
                label="组别"
                align="center">
            </el-table-column>
            <el-table-column
                prop="resultName"
                label=""
                align="center">
            </el-table-column>
            <el-table-column
                prop="total"
                label="基线入组人数"
                align="center">
            </el-table-column>
            <el-table-column
                prop="he_total"
                label="卫生经济学总任务"
                align="center">
            </el-table-column>
            <el-table-column
                prop="he_now"
                label="当前计划任务"
                align="center">
            </el-table-column>
            <el-table-column
                prop="he_finish"
                label="已完成"
                align="center">
            </el-table-column>
            </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            spanArr: [],
            position: 0
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
        this.rowspan()
    },
    watch: {
        tableData(newValue,oldValue){
           if(this.tableData.length){
               this.rowspan()
           }
        }
    },
    methods: {
         objectSpanMethod({ row, column, rowIndex, columnIndex }){
          //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
          //实现合并行的方法其实在每一行数据渲染的时候都会执行
          if(columnIndex === 0) {
    		const _row = this.spanArr[rowIndex];
    		const _col = _row>0 ? 1 : 0;
    		return {
    			rowspan: _row,
    			colspan: _col
    		}
          }
        },
        rowspan(){
           this.spanArr = [];
           for(let i = 0;i<this.tableData.length;i++){
               if(i===0){
                   this.spanArr.push(1);
	    		   this.position = 0;
               }else{
                    if(this.tableData[i].groupName === this.tableData[i-1].groupName){
                    this.spanArr[this.position] += 1;
	    			this.spanArr.push(0);
                    }else{
                        this.spanArr.push(1);
                        this.position = i;
                    }
               }
           }

        },

    },
}
</script>
<style scoped>

</style>



