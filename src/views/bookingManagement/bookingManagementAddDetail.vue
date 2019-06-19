<template>
    <div class="add-detail-container" v-if="bookingManagementAddDetail_page">
            <div class="table-header">
            &nbsp;社区放号列表
        </div>
    <!-- table -->
    <el-table
      :data="tableData"
      border
      style="width:100%">
      <el-table-column
      type="index"
      label="序号"
      width="50">
      </el-table-column>
      <el-table-column
        prop="commdeptName"
        label="所属社区">
      </el-table-column>
      <el-table-column
        prop="ruleBeginToString"
        label="开始时间">
      </el-table-column>
       <el-table-column
        prop="ruleEndToString"
        label="结束时间">
      </el-table-column>
       <el-table-column
          prop="num"
          label="数量"
          width="120">
        <template slot-scope="scope">
                <span v-if="scope.row.num=='----'">{{scope.row.num}}</span>
                <el-input v-model="scope.row.num"  v-if="scope.row.num!='----'" :disabled="scope.row.editShow"  @blur="saveNum(scope.row,scope.$index)"></el-input>
            </template>
          </el-table-column>
      <el-table-column
        fixed="right"
        width="100"
        label="操作">
         <template slot-scope="scope">
          <el-button type="text" size="small" @click='editFun(scope.row)' :disabled="scope.row.num=='----'">修改数量</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div style="margin:10px 0 0 10px;">
        <el-button type="primary" size="small" v-if="btnShow" @click="saveCount()">确定</el-button>
        <el-button type="primary" size="small" @click="$router.go(-1)">返回</el-button>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            bookingManagementAddDetail_page:false,
            btnAuth:{

            },
            btnShow:true,
            tableData:[],
            row:{},
            index:null
        }
    },
    mounted() {
        let obj = this.checkPageAuth(this, "bookingManagementAddDetail_page", this.btnAuth);
        this.getData();
    },
    methods: {
        getData(){
           //从local获取table数据
           if(localStorage.getItem('DetailTableData')){
               if(JSON.parse(localStorage.getItem('DetailTableData')).num == '----'){
                   this.btnShow = false;
               }
               if(localStorage.getItem(`hosAllocationRuleTimeInfoDtos${this.$route.query.index}`)){
                  this.timeArray = JSON.parse(localStorage.getItem(`hosAllocationRuleTimeInfoDtos${this.$route.query.index}`));//时间段
                  let itemArray = [];
                  for(let i = 0;i<this.timeArray.length;i++){
                            if(this.timeArray[i].ruleBeginToString != null && this.timeArray[i].ruleBeginToString != null && this.timeArray[i].num != null){
                                let obj = Object.assign({},JSON.parse(localStorage.getItem('DetailTableData')))
                                // console.log(this.timeArray[i])
                                obj.ruleBeginToString = this.timeArray[i].ruleBeginToString;
                                obj.ruleEndToString = this.timeArray[i].ruleEndToString;
                                if(JSON.parse(localStorage.getItem('DetailTableData')).num == '----'){
                                    obj.num = '----';
                                }else{
                                    obj.num = this.timeArray[i].num;
                                }
                                itemArray.push(obj)
                            }
                    }
                    this.tableData = itemArray;
               }else{
                    this.timeArray = JSON.parse(localStorage.getItem('hosAllocationRuleTimeInfoDtos'));//时间段
                    let itemArray = [];
                    for(let i = 0;i<this.timeArray.length;i++){
                            if(this.timeArray[i].beginTime != null && this.timeArray[i].endTime != null && this.timeArray[i].num != null){
                                let obj = Object.assign({},JSON.parse(localStorage.getItem('DetailTableData')))
                                obj.ruleBeginToString = this.timeArray[i].beginTime;
                                obj.ruleEndToString = this.timeArray[i].endTime;
                                if(JSON.parse(localStorage.getItem('DetailTableData')).num == '----'){
                                    obj.num = '----';
                                }else{
                                    obj.num = this.timeArray[i].num;
                                }
                                itemArray.push(obj)
                            }
                    }
                  this.tableData = itemArray;
               }
           }
        },
        editFun(row){
          row.editShow = false;
        },
        saveNum(row,index){
           this.row = row;
           this.index = index;
        },
        saveCount(){
            if(this.row.num < 1){
                this.$message({
                    type:'error',
                    message:'放号数量至少1个'
                })
                   return false;
                }
                var reg = /^[1-9]+[0-9]*]*$/;
                if(!reg.test(this.row.num)){
                    this.$message({
                        type:'error',
                        message:'放号数量只能为数字'
                    })
                    return false;
                }
                this.row.editShow=true;
                // console.log(this.tableData)
                localStorage.setItem(`hosAllocationRuleTimeInfoDtos${this.$route.query.index}`,JSON.stringify(this.tableData));
             //将修改的数据保存到local中改变tableData
             setTimeout(()=>{
                  let array = [];
                    let id= '';
                    for(let i = 0;i<this.tableData.length;i++){
                        array.push(this.tableData[i].num);
                        id = this.tableData[i].id;
                    }
                    let itemArray = JSON.parse(localStorage.getItem('tableData'));
                    for(let j = 0;j<itemArray.length;j++){
                        if(itemArray[j].id == id){
                            itemArray[j].num = eval(array.join('+'));
                        }
                    }
                    localStorage.setItem('tableData',JSON.stringify(itemArray));
                    this.$router.push({
                        path:'/bookingManagements/bookingManagementAdd'
                    })
             },500)
        }
    },
}
</script>
<style lang="scss" scoped>
    .add-detail-container{
        background: #ffffff;
        padding: 10px;
        .table-header{
          width: 100%;
          height: 60px;
          line-height: 60px;
          margin: 10px 0;
          position: relative;
          text-indent:5px;
          &:after{
              content: '';
              position: absolute;
              width: 4px;
              height: 40%;
              top:30%;
              left: 0;
              background: #409EFF;
          }
      }
    }
</style>

