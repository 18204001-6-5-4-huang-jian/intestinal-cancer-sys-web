<template>
     <div class="j_content">
         <div style="min-width: 941px;" v-if="follow_up_e1_page">
              <div class="btns">
                <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
                <p class="text">表E1受试者联系记录表</p>
            </div>
            <div class="formcon">
                 <div class="title">
                    基本信息
                  </div>
                  <div class="tables">
                      <el-form :inline="true" :model="formInline" label-width="115px" :rules="rules" ref="formInline">
                              <el-row>
                                <el-col :span="8">
                                <el-form-item label="SID:" class="formoneline">
                                    {{base.sid}}
                                </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                <el-form-item label="筛查现场ID:" class="formoneline">
                                   {{base.siteId | siteId}}
                                </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="工作人员编码:" class="formoneline" prop="investigatorCode">
                                        <el-input type="text" v-model.trim="formInline.investigatorCode" maxlength="20" :disabled="$route.query.flag==0"></el-input>
                                </el-form-item>
                                </el-col>
                                </el-row>
                                 <el-row>
                                     <el-col :span="8">
                                     <el-form-item label="研究年份:" class="formoneline" prop="checkYears">
                                          <el-date-picker
                                            :disabled="$route.query.flag==0"
                                            :clearable="false"
                                            v-model="formInline.checkYears"
                                            type="year"
                                            format="yyyy年"
                                            value-format="yyyy"
                                            placeholder="选择年份"
                                            :picker-options="pickerOptions2">
                                        </el-date-picker>
                                </el-form-item>
                                     </el-col>
                                      <el-col :span="8">
                                     <el-form-item label="筛查对象姓名:" class="formoneline">
                                         {{base.name}}
                                </el-form-item>
                                     </el-col>
                                      <el-col :span="8">
                                     <el-form-item label="电话:" class="formoneline" prop="">
                                         {{base.phone}}
                                </el-form-item>
                                     </el-col>
                                 </el-row>
                      </el-form>
                  </div>
            </div>
            <div class="formcon">
                 <div class="connect-container" v-for="(item,index) in detailsList" :key="index">
                       <el-form :inline="true" :model="item"  :ref="'connectFormInline'+index" :rules="connectRules">
                          <el-row>
                              <el-form-item label="1、第" class="formoneline" prop="item1">
                                  <p class="p">{{item.item1}}</p>&nbsp;&nbsp;次联系
                                </el-form-item>
                          </el-row>
                           <el-row>
                               <el-form-item label="2、联系日期：" class="formoneline" prop="item2">
                                     <el-date-picker 
                                        :disabled="$route.query.flag==0"
                                        :clearable="false"
                                        v-model="item.item2"
                                        type="date"
                                        format="yyyy年MM月dd日"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions1">
                                    </el-date-picker>    
                                </el-form-item>
                           </el-row>
                            <el-row>
                                 <el-form-item label="3、通讯时间（24小时制）" class="" prop="hourTime">
                                     <el-input-number controls-position="right" v-model="item.hourTime"  :min="0" :max="23" :disabled="$route.query.flag==0"></el-input-number>&nbsp;&nbsp;&nbsp;点
                                 </el-form-item>
                                  <el-form-item label="" class="" prop="minuteTime">
                                     <el-input-number controls-position="right" v-model="item.minuteTime"  :min="0" :max="59" :disabled="$route.query.flag==0"></el-input-number>&nbsp;&nbsp;&nbsp;分
                                 </el-form-item>
                            </el-row>
                            <el-row>
                                 <el-form-item label="4、通讯结果：" class="" prop="item4">
                                      <el-radio-group v-model="item.item4" :disabled="$route.query.flag==0">
                                        <el-radio style="margin-top:10px" :label="1">无人接听</el-radio><br>
                                        <el-radio style="margin-top:10px" :label="2">忙碌</el-radio><br>
                                        <el-radio style="margin-top:10px" :label="3">回拨</el-radio><br>
                                        <el-radio style="margin-top:10px" :label="4">留言</el-radio><br>
                                        <el-radio style="margin-top:10px" :label="5">表格完成</el-radio><br>
                                        <el-radio style="margin-top:10px" :label="6">拒绝</el-radio><br>
                                        <el-radio style="margin-top:10px" :label="7">其它，请说明：</el-radio>
                                        </el-radio-group>
                                 </el-form-item>
                                <el-form-item  style="margin-top:155px;" v-if="item.item4 == 7" prop="item8">
                                           <el-input type="text" v-model.trim="item.item8" :disabled="$route.query.flag==0"></el-input>
                                </el-form-item>
                                 <el-form-item   label="（1）拒绝原因" class="formoneline" style="margin-left:110px;margin-bottom:10px;" v-if="item.item4 == 6" prop="item5">
                                        <el-radio-group v-model="item.item5" :disabled="$route.query.flag==0">
                                        <el-radio style="margin-top:10px" :label="1">忙碌</el-radio><br>
                                        <el-radio style="margin-top:10px" :label="2">不感兴趣</el-radio><br>
                                        <el-radio style="margin-top:10px" :label="3">其它，请说明：</el-radio><br>
                                        </el-radio-group>
                                </el-form-item>
                                <el-form-item  style="margin-left:220px;" v-if="item.item5 == 3" prop="item6">
                                           <el-input type="text" v-model.trim="item.item6" :disabled="$route.query.flag==0"></el-input>
                                </el-form-item>
                                 <el-form-item   label="（2）拒绝程度" class="formoneline" style="margin-left:110px;" v-if="item.item4 == 6" prop="item7">
                                        <el-radio-group v-model="item.item7" :disabled="$route.query.flag==0">
                                        <el-radio style="margin-top:10px" :label="1">温和</el-radio><br>
                                        <el-radio style="margin-top:10px" :label="2">坚决</el-radio><br>
                                        <el-radio style="margin-top:10px" :label="3">态度差</el-radio><br>
                                        </el-radio-group>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="5、备注：" class="formoneline" prop="">
                                    <el-input
                                        :disabled="$route.query.flag==0"
                                        style="width:300px"
                                        v-model="item.item9"
                                        type="textarea"
                                        :autosize="{ minRows: 2, maxRows: 4}"
                                        placeholder="请输入备注"
                                        >
                                        </el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                            <el-form-item>
                                <el-button type="primary" style="width:100px;padding:5px 20px;font-size:16px;margin-left:20px;" :disabled="$route.query.flag==0" @click="addCount()" v-if="index == detailsList.length-1">+</el-button>
                                <el-button type="danger"  style="width:100px;padding:5px 20px;font-size:16px;" :disabled="$route.query.flag==0" @click="deleteCount(index)">-</el-button>
                            </el-form-item>
                            </el-row>
                       </el-form>
                 </div>
            </div>
             <div class="btns" style="text-align:center;">
                 <el-button @click="$router.go(-1)" v-if="$route.query.flag == 1">取消</el-button>
                 <el-button type="primary" @click="saveRecord(1)" v-if="$route.query.flag == 1 && $route.query.action != 'edit'">暂时保存</el-button>
                 <el-button type="primary" @click="save(2)" v-if="$route.query.flag == 1">提交</el-button>
             </div>
         </div>
    </div>
</template>
<script>
var birthDate='';
import moment from 'moment'
export default {
    data(){
        var validatePhone = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('手机号不能为空'));
            } else if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(value))) {
            callback(new Error('请输入11位手机号码'))
            } else {
            callback();
            }
        };
        return{
            follow_up_e1_page:false,
            btnAuth:{

            },
            pickerOptions1:{
               disabledDate(time) {
                return time.getTime() > Date.now() ;
              }
            },
            pickerOptions2:{
                 disabledDate(time) {
                       return Date.now() > time.getTime();
                 }
            },
           base:{
              sid:'',
              siteId:'',
              name:'',
              phone:''
           },
           formInline:{
               investigatorCode:'',
               checkYears:new Date()
           },
           rules:{
               investigatorCode:[
                    { required: true, message: '必填', trigger: 'blur' },
               ],
               checkYears:[
                   { required: true, message: '必填', trigger: 'blur' },
               ],
            },
           connectRules:{
              item1:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              item2:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              hourTime:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              minuteTime:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              item4:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item8:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              item5:[
                   { required: true, message: '必选', trigger: 'change' },
              ],
              item6:[
                   { required: true, message: '必填', trigger: 'blur' },
              ],
              item7:[
                   { required: true, message: '必选', trigger: 'change' },
              ],
              item9:[
                  { required: true, message: '必填', trigger: 'blur' },
              ]
           },
           detailsList:[
               {
                   item1:1,
                   item2:new Date(),
                   hourTime:0,
                   minuteTime:0,
                   item3:'',
                   item4:'',
                   item8:'',
                   item5:'',
                   item6:'',
                   item7:'',
                   item9:''
               }
           ]
        }
    },
     mounted() {
        let obj = this.checkPageAuth(this,"follow_up_e1_page",this.btnAuth);
        let followupE1ListInfo = JSON.parse(localStorage.getItem('followupE1ListInfo'));
        if(followupE1ListInfo){
            this.base.sid = followupE1ListInfo.sid;
            this.base.siteId = followupE1ListInfo.siteId;
            this.base.name = followupE1ListInfo.name;
            this.base.phone = followupE1ListInfo.phone
        }
         if(this.$route.query.flag == 0){
          // 查看
          this.getDetailData();
        }else if(this.$route.query.flag == 1 && this.$route.query.action == 'edit'){
          // 编辑
          this.getDetailData();
        }else if(this.$route.query.flag == 1 && !this.$route.query.action){
          //录入 查询信息
          $axios_http({
              url:'/base/follow/contactRecordInfo/query',
              data:{
                  id:JSON.parse(localStorage.getItem('followupE1ListInfo')).id
              },
              vueObj: this
          }).then((res) => {
               if(res.data.statusMsg == 'success'){
                   if(res.data.data.detailsList.length != 0){
                     this.formInline.investigatorCode = res.data.data.investigatorCode;
                     this.formInline.checkYears = res.data.data.checkYears;
                     this.detailsList = res.data.data.detailsList;
                     this.$nextTick(()=>{
                       for(let k = 0;k<this.detailsList.length;k++){
                         // 移除表单项的校验结果
                        this.$refs['connectFormInline'+k][0].clearValidate();
                        let index = this.detailsList[k].item3.indexOf(':');
                        this.detailsList[k].hourTime = Number(this.detailsList[k].item3.substring(0,index));
                        this.detailsList[k].minuteTime = Number(this.detailsList[k].item3.substring(index+1,index+4));
                       }
                     })
                    
                   }
               }
          })
        }
    },
    beforeDestroy () {
        localStorage.removeItem('followupE1ListInfo');
    },
    methods: {
        getDetailData(){
            let _id=null;
            if(localStorage.getItem('followupE1ListInfo')){
                _id = JSON.parse(localStorage.getItem('followupE1ListInfo')).id
            }else{
                _id=this.$route.query.id
            }
          $axios_http({
              url:'/base/follow/contactRecordInfo/query',
              data:{
                  id:_id
              },
              vueObj: this
          }).then((res) => {
               if(res.data.statusMsg == 'success'){
                     this.formInline.investigatorCode = res.data.data.investigatorCode;
                     this.formInline.checkYears = res.data.data.checkYears;
                     this.detailsList = res.data.data.detailsList;
                     this.base.sid = res.data.data.sid;
                     this.base.siteId = res.data.data.siteId;
                     this.base.name = res.data.data.name;
                     this.base.phone = res.data.data.phone;
                     this.$nextTick(()=>{
                       for(let k = 0;k<this.detailsList.length;k++){
                        let index = this.detailsList[k].item3.indexOf(':');
                        this.detailsList[k].hourTime = Number(this.detailsList[k].item3.substring(0,index));
                        this.detailsList[k].minuteTime = Number(this.detailsList[k].item3.substring(index+1,index+4));
                       }
                     })
               }
          })
        },
        goBack(){
            this.$router.go(-1)
        },
        addCount(){
            if(this.detailsList.length < 20){
                this.detailsList.push(
                    {   item1:this.detailsList[this.detailsList.length-1].item1+1,
                        item2:new Date(),
                        hourTime:0,
                        minuteTime:0,
                        item4:'',
                        item8:'',
                        item5:'',
                        item6:'',
                        item7:'',
                        item9:''}
                )
            }else{
                this.$message({
                    message: '新增联系记录不可以超过20次',
                    type: 'warning'
                });
            }
        },
        deleteCount(index){
            if(this.detailsList.length == 1){
                 this.$message({
                    message: '至少保留一次联系记录',
                    type: 'warning'
                });
            }else{
                this.detailsList.splice(index,1);
                //改变索引
                for(let k = 0;k < this.detailsList.length;k++){
                         if(k >= index){
                             this.detailsList[k].item1 = this.detailsList[k].item1 - 1;
                         }
                }
            }
        },
        saveRecord(saveType){
               //保存记录
               let basicData = Object.assign({},this.base,this.formInline,{id:JSON.parse(localStorage.getItem('followupE1ListInfo')).id,saveType:saveType});
               basicData.checkYears = moment(basicData.checkYears).format('YYYY')
               for(let k = 0;k<this.detailsList.length;k++){
                   this.detailsList[k].item2 = moment(this.detailsList[k].item2).format('YYYY-MM-DD');
                   if(this.detailsList[k].hourTime == '0'){
                       this.detailsList[k].hourTime = '00'
                   }
                   if(this.detailsList[k].minuteTime == '0'){
                       this.detailsList[k].minuteTime = '00'
                   }
                   this.detailsList[k].item3 = this.detailsList[k].hourTime + ':' + this.detailsList[k].minuteTime;
                   delete this.detailsList[k].hourTime;
                   delete this.detailsList[k].minuteTime;
                }
                let dataObj = Object.assign({},basicData,{detailsList:this.detailsList})
                // console.log(dataObj)
                $axios_http({
                    url:'/base/follow/contactRecord/save',
                    data:dataObj,
                    vueObj: this
                }).then((res) => {
                   if(res.data.data == 'success'){
                        this.$router.push('/followup/liste1')
                   }
                })
        },
        save(saveType){
            let flag = true;
            this.$refs.formInline.validate((valid) => {
                if(!valid){
                   flag = false;
                }
            })
           for(let i = 0;i<this.detailsList.length;i++){
                   this.$refs['connectFormInline'+i][0].validate((valid) => {
                    if (!valid){
                        flag = false
                    }
                })
           }
           if(flag){
               let basicData = Object.assign({},this.base,this.formInline,{id:JSON.parse(localStorage.getItem('followupE1ListInfo')).id,saveType:saveType});
               basicData.checkYears = moment(basicData.checkYears).format('YYYY')
               for(let k = 0;k<this.detailsList.length;k++){
                   this.detailsList[k].item2 = moment(this.detailsList[k].item2).format('YYYY-MM-DD');
                   if(this.detailsList[k].hourTime == '0'){
                       this.detailsList[k].hourTime = '00'
                   }
                   if(this.detailsList[k].minuteTime == '0'){
                       this.detailsList[k].minuteTime = '00'
                   }
                   this.detailsList[k].item3 = this.detailsList[k].hourTime + ':' + this.detailsList[k].minuteTime;
                   delete this.detailsList[k].hourTime;
                   delete this.detailsList[k].minuteTime;
                }
                let dataObj = Object.assign({},basicData,{detailsList:this.detailsList})
                // console.log(dataObj)
                $axios_http({
                    url:'/base/follow/contactRecord/save',
                    data:dataObj,
                    vueObj: this
                }).then((res) => {
                   if(res.data.data == 'success'){
                        this.$router.push('/followup/liste1')
                   }
                })
           }
      }
   }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .j_content{
        padding: 10px;
        height: 100%;
        overflow: auto;
    }
     .btns {
        padding: 20px;
    }

    .btns .text {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        line-height: 1.5;
        margin: 0;
        padding: 0;
    }
    .formcon {
    margin: 0px 20px 20px;
    border: 1px solid rgb(204, 204, 204);
    }
    .formcon .title {
    font-size: 16px;
    text-align: center;
    line-height: 2;
    background: rgb(204, 204, 204);
    color: #000000;
  }
    .tables {
    margin: 40px 50px 30px 50px;
    font-size: 0;
    line-height: 0;
  }
  .formoneline {
    width: 100%;
    margin-right: 0 !important;
  }
  .connect-container{
      margin:20px 0px;
      padding:0 20px;
  }
  .p{
      display: inline-block;
      width: 80px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #cccccc;
  }
</style>
<style>
.j_content .el-radio__input.is-disabled.is-checked + span.el-radio__label {
  color: #409eff;
}
.j_content .el-radio__input.is-disabled.is-checked .el-radio__inner {
  background-color: #409eff;
  border-color: #409eff;
}
.j_content .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
  background-color: #f5f7fa;
}
.j_content .el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
  cursor: not-allowed;
}
.j_content .el-textarea.is-disabled .el-textarea__inner {
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
  cursor: not-allowed;
}
.j_content
  .el-checkbox__input.is-disabled.is-checked
  + span.el-checkbox__label {
  color: #409eff;
  cursor: not-allowed;
}
.j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}
.j_content
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: #fff;
}
</style>
