<template>
 <div>
    <el-dialog
        title="申请编辑"
        :visible.sync="applyOpenVisible"
        width="30%"
        :before-close="handleConfirmClose">
         <el-form :model="applyOpenForm"  ref="receiveExpressForm" label-width="100px">
           <el-form-item label="请注明原因：" >
                <el-input type="text" v-model.trim="applyOpenForm.remarks" auto-complete="off" maxlength="50" placeholder="请注明编辑原因"></el-input>
              </el-form-item>
         </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="applyConfirm">确 定</el-button>
        </span> 
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    props:['applyArr'],
    data () {
      return {
       applyOpenVisible:false,
        applyOpenForm: {
          remarks: ''
        },
        btnId:''
      }
    },
    mounted(){
     
    },
    
    methods:{
       handleConfirmClose(done){
          done();
          Object.assign(this.$data.applyOpenForm, this.$options.data().applyOpenForm);
        },
        cancel(){
          this.applyOpenVisible=false;
          Object.assign(this.$data.applyOpenForm, this.$options.data().applyOpenForm);
        },
        applyConfirm(){
          if(!this.applyOpenForm.remarks){
            $failMsg(this,'原因不能为空')
            return;
          }
          if(this.applyArr.formType=='HOSPITAL_INTESTINE_REVIEW' || this.applyArr.formType=='HOSPITAL_INTESTINE_RISK_FACTOR' || this.applyArr.formType=='HOSPITAL_FIT_RESULT' || this.applyArr.formType=='HOSPITAL_STOOL_DNA'){
            this.btnId='applyStatus_btn'   //社区
          }else if(this.applyArr.formType=='HOSPITAL_COURIER_RESULT' || this.applyArr.formType=='HOSPITAL_BIOLOGICAL_SAMPLE_RESULT' || this.applyArr.formType=='HOSPITAL_COLONOSCOPY_RESULT' || this.applyArr.formType=='HOSPITAL_COLONOSCOPY_PATHOLOGY_RESULT' || this.applyArr.formType=='HOSPITAL_SCREENING_NOTIFICATION'){
            this.btnId='applyStatusD_btn'   //地区
          }
          //按钮权限判断
          if(authority(this.btnId)){
            return;
          }
          let obj={};
          if(this.applyArr.formType=='HOSPITAL_INTESTINE_REVIEW' || this.applyArr.formType=='HOSPITAL_INTESTINE_RISK_FACTOR' || this.applyArr.formType=='HOSPITAL_STOOL_DNA' || this.applyArr.formType=='HOSPITAL_FIT_RESULT' || this.applyArr.formType=='HOSPITAL_COLONOSCOPY_RESULT' || this.applyArr.formType=='HOSPITAL_COLONOSCOPY_PATHOLOGY_RESULT' || this.applyArr.formType=='HOSPITAL_SCREENING_NOTIFICATION'){
            obj={
              id:this.applyArr.id,
              formType:this.applyArr.formType,
              remark:this.applyOpenForm.remarks,
              sid:this.applyArr.sid,
            }
          }else{
            obj={
              id:this.applyArr.id,
              formType:this.applyArr.formType,
              remark:this.applyOpenForm.remarks
            }
          }
            $axios_http({
              url: "/base/area/courier/result/sendUpdateResult",
              data: obj,
              vueObj: this
            }).then((res) => {
              this.applyOpenVisible=false;
              Object.assign(this.$data.applyOpenForm, this.$options.data().applyOpenForm);
              this.$message({
                            type: 'success',
                            message: '已向上级申请解锁!'
                          });
              if(this.applyArr.formType=='HOSPITAL_COURIER_RESULT'){
                //快递信息
                this.$parent.query(this.$store.state.expressListPageNo,this.$store.state.expressListPageSize);
              }else if(this.applyArr.formType=='HOSPITAL_BIOLOGICAL_SAMPLE_RESULT'){   //生物样本
                this.$parent.query(this.$store.state.bloodListPageNo,this.$store.state.bloodListPageSize);
                this.$parent.query(this.$store.state.salivaListPageNo,this.$store.state.salivaListPageSize);

              }else if(this.applyArr.formType=='HOSPITAL_INTESTINE_REVIEW' || this.applyArr.formType=='HOSPITAL_INTESTINE_RISK_FACTOR'){   //A1和A2
                this.$parent.query();
              }else if(this.applyArr.formType=='HOSPITAL_STOOL_DNA'){   //DNA
                this.$parent.query(this.$store.state.dnaManagementPageNo,this.$store.state.dnaManagementPageSize);
              }else if(this.applyArr.formType=='HOSPITAL_FIT_RESULT'){   //FIT
                this.$parent.query(this.$store.state.fitManagementPageNo,this.$store.state.fitManagementPageSize);
              }else if(this.applyArr.formType=='HOSPITAL_COLONOSCOPY_RESULT' || this.applyArr.formType=='HOSPITAL_COLONOSCOPY_PATHOLOGY_RESULT'){   //B1和B2
                this.$parent.queryInfo();
              }else if(this.applyArr.formType=='HOSPITAL_SCREENING_NOTIFICATION'){ //B9
                this.$parent.queryDate();
              }
            })
          
        }
    }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
