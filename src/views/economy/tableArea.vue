<template>
    <div class="table-container">
          <div class="item" v-for="(item,index) in tableData" :key="index">
                 <h4>{{item.deptName}}</h4>
                 <Table :tableData="item.data"></Table>
            </div>
    </div>
</template>
<script>
import Table from './commonTable.vue'
export default {
    data(){
        return{
            
        }
    },
    components:{
      Table
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
    watch: {
        tableData(newVal,oldVal){
           if(newVal.length){
               for(let i = 0;i<newVal.length;i++){
                   for(let k = 0;k<newVal[i].data.length;k++){
                    // if(k == 3){
                    //      newVal[i].data[k].province = newVal[i].deptName;
                    // }else{
                    //      newVal[i].data[k].province = '';
                    // }
                   }
               }
               this.tableData = newVal;
           }
        }
    },
}
</script>
<style scoped>
 .item{
     margin:20px 0;
 }
 h4{
     margin:10px 0;
 }
</style>



