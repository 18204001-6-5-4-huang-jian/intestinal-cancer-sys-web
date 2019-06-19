<template>
  <div slot="right" class="content-page" v-if="sendExpress_page">
    <div class="content">
      <div class="filter-container clearfix">
        <router-link to="/biology/express">
          <el-button size="mini" class="return-home">返 回</el-button>
        </router-link>
      </div>
      <!-- form表单 -->
      <div>
        <el-form :model="sendExpressForm" :rules="sendExpressFormRules" ref="sendExpressForm" label-width="120px" class="demo-ruleForm">
          <div class="sendExpressBox clearfix">
            <div class="fl left">
              <el-form-item label="快递公司" prop="courierCompany">
                <el-input type="text" v-model="sendExpressForm.courierCompany" auto-complete="off" @blur="checkForm('sendExpressForm')"></el-input>
              </el-form-item>
              <el-form-item label="运单号" prop="courierNumber">
                <el-input type="text" v-model="sendExpressForm.courierNumber" auto-complete="off" @blur="checkCourierNumber('sendExpressForm')"></el-input>
              </el-form-item>
              <el-form-item label="发出日期" prop="sendDateByString" class="formItemWidth">
                  <el-date-picker
                      v-model="sendExpressForm.sendDateByString"
                      type="date"
                      size="small"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      ref="sendDateByString"
                      align="left"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
              <el-form-item label="装箱人" prop="sendPerson">
                <el-input type="text" v-model="sendExpressForm.sendPerson" auto-complete="off" ref="sendPerson" @blur="checkForm('sendExpressForm')"></el-input>
              </el-form-item>
              <el-form-item label="装箱人手机号" prop="sendPersonPhone">
                <el-input type="text" v-model="sendExpressForm.sendPersonPhone" auto-complete="off" ref="sendPersonPhone" @blur="checkForm('sendExpressForm')"></el-input>
              </el-form-item>
            </div>
            <div class="fl right">
              <div class="box">
                <div class="title">装箱</div>
                <div class="con clearfix">
                  <div class="fl conBox">
                    <div class="title">
                      <el-checkbox v-model="checkAll" @change="handleCheckAllChange" class="all">所有冷冻盒</el-checkbox>
                    </div>
                    <div class="search">
                      <el-input type="text" v-model="searchCon" placeholder="请输入内容" auto-complete="off" @keyup.enter.native="search" clearable></el-input>
                    </div>
                    <div class="checkboxs">
                      <el-checkbox-group v-model="checkedFrozenBoxs" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(item,index) in frozenBoxs" :label="item" :key="index" v-show="!item.show">{{item.frozenBoxCode}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <p  class="total">共{{frozenBoxsLength}}条数据</p>
                  </div>

                  <div class="fl btnGroup">
                    <p>
                      <span class="el-icon-arrow-right"  @click="confim"></span>
                    </p>
                    <p>
                      <span class="el-icon-arrow-left"  @click="del"></span>
                    </p>
                     
                  </div>
                  <div class="fr conBox">
                    <div class="title">加入订单</div>
                    <div class="search">
                      <el-input type="text" v-model="searchConRight" placeholder="请输入内容" auto-complete="off" @keyup.enter.native="searchRight" clearable></el-input>
                    </div>
                    <div class="checkboxs">
                      <el-checkbox-group v-model="checkedRightfrozenBoxs">
                        <el-checkbox v-for="(item,index) in frozenBoxRightOptions" :label="item" :key="index">{{item.frozenBoxCode}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <p class="total">共{{frozenBoxRightOptions.length}}条数据</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
          <el-form-item>
            <el-button type="primary" :disabled="disabled" @click="submitForm('sendExpressForm')">提交</el-button>
            <el-button @click="resetForm('sendExpressForm')">取消</el-button>
          </el-form-item>
        </el-form>
    
      </div>
   
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else if (!(/\d/.test(value))) {
          callback(new Error('手机号只能是数字'))
        } else if (value.length != 11) {
          callback(new Error('请输入合法的11位手机号'));
        } else if (value) {
          callback();
        }
      };
       var validateCourierNumber = (rule, value, callback) => {
         if(this.checkCourierNumberVal==false){
            callback(new Error('快递编号已经存在'))
          }else{
              callback();
          }
      };
      return {
        searchCon:'',       // 搜索框
        searchConRight:'',  //右侧搜索框
        checkAll: false,
        checkedFrozenBoxs: [],   //选中的城市
        frozenBoxs:[],
        originalFrozenBoxs:[],    //第一次请求的原始数据
        frozenBoxRightOptions:[],   //右侧显示的数据
        originalRightOptions:[],
        checkedRightfrozenBoxs:[],   //右侧选中的数据
        frozenBoxsLength:'',        //左侧条数

        sendExpress_page: false,
        checkCourierNumberVal:true,
        disabled:true,      //提交按钮不能点
        btnAuth: {
          one_subjectsList_btn: false,
          subjectsList_query_btn: false,
          subjectsList_EXCEL_btn: false,
          subjectsList_add_btn: false
        },
        sendExpressForm: {
          courierCompany: '',
          courierNumber: '',
          sendDateByString:'',
          sendPerson:'',
          sendPersonPhone:''
        },
        sendExpressFormRules: {
          courierCompany: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          courierNumber: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateCourierNumber, trigger: 'blur'}
          ],
          sendDateByString:[
            {required: true, message: '必填', trigger: 'blur'}
          ],
          sendPerson: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          sendPersonPhone:[
             {required: true, message: '必填', trigger: 'blur'},
             {validator: validatePhone, trigger: 'blur'}
          ]
        }
      };
    },
    created(){
        var session = sessionStorage.getItem("token").split(";")
        for(var i = 0; i < session.length; i++){
          var arr = session[i].split("=");
          if(arr[0]=='nickName'){
            this.sendExpressForm.sendPerson = arr[1]
          }
        }
        this.getToday();
        this.query();
        if(this.$route.query.id){
          // 编辑回显
             this.queryExpress();
             this.disabled=false;
        }
    },
    mounted(){
      let obj = this.checkPageAuth(this, "sendExpress_page", this.btnAuth);
    },
    methods: {
       //检验表单是否全部验证通过
      checkForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.disabled=false;
          } else {
            this.disabled=true;
          } 
        });
      },
        checkCourierNumber(formName){   //校验运单号
          if(this.sendExpressForm.courierNumber.trim()!=""){
            let obj={}
            if(this.$route.query.id){   //编辑校验传值
              obj={
                "courierNumber":this.sendExpressForm.courierNumber,
                "id":this.$route.query.id
              }
            }else{      //新增校验传值
              obj={
                "courierNumber":this.sendExpressForm.courierNumber
              }
            }
            $axios_http({
              url: "/base/area/courier/result/checkCourierNumber",
              data:obj,
              vueObj: this
            }).then((res) => {
              if(res.data.statusCode=="1000001"){
                this.$message.error(res.data.statusMsg);
                this.checkCourierNumberVal=false;
                this.checkForm(formName);
              }else{
                this.checkCourierNumberVal=true;
                this.checkForm(formName);
              }
              
            })
           
          }else{   //清空的情况，提交按钮不能点击
             this.checkForm(formName);
          }
        },
        getToday(){
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate;
          this.sendExpressForm.sendDateByString = currentdate
        },
       //查询冷冻盒
      query(){
        $axios_http({
          url: "/base/area/courier/result/queryFrozenBoxCodes",
          vueObj: this
        }).then((res) => {
         this.frozenBoxs=res.data.data;
         this.originalFrozenBoxs=res.data.data;
         this.frozenBoxsLength=res.data.data.length;
         if(this.$route.query.id){
          // 编辑回显
             this.queryNumber();
        }
        })
      },
      focusSurvey_date(){
        this.$refs.investigator.focus()
      },
    
      submitForm(formName) {
        var that=this;
        this.sendExpressForm.frozenBoxCodeDtos=this.frozenBoxRightOptions;
        if(this.$route.query.id){
          this.sendExpressForm.id=this.$route.query.id;
        }
        for(let arry of this.frozenBoxRightOptions){
          delete arry.show;
        }
        this.$refs[formName].validate((valid) => {
           if (valid &&  this.checkCourierNumberVal==true) {
             if(that.frozenBoxRightOptions.length>0){
                //  修改快递信息
                if(this.$route.query.id){
                  $axios_http({
                    url: "/base/area/courier/result/updateCourierResultById",
                    data:this.sendExpressForm,
                    vueObj: this
                  }).then((res) => {
                    if(res.data.statusMsg=='success'){
                      $successMsg(this,"提交成功")
                      this.$router.push('/biology/express')
                    }
                  })
                }else{
                  //  新增快递信息
                  $axios_http({
                    url: "/base/area/courier/result/saveCourierResult",
                    data:this.sendExpressForm,
                    vueObj: this
                  }).then((res) => {
                    if(res.data.statusMsg=='success'){
                      $successMsg(this,"提交成功")
                      this.$router.push('/biology/express')
                    }
                  })

                }
                  
             }else{
                this.$message.error('请至少选择一个冷冻盒');
             }
           } else {
             return false;
           } 
         });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
         this.$router.push('/biology/express');
      },
      handleCheckAllChange(val) {
        let res=this.frozenBoxs.filter(element=>{
         if(!element.show || (element.show==false)){
            return element;
         }
      })
        this.checkedFrozenBoxs = val ? res : [];
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;  
        this.checkAll = checkedCount === this.frozenBoxs.length;
      },
      confim(){
        //第一次确认就等于选中的值，第二次确认，右边已有的+选中的值
        if(this.frozenBoxRightOptions.length>0){
          for(let i = 0; i < this.checkedFrozenBoxs.length; i++ ){
            this.frozenBoxRightOptions.push(this.checkedFrozenBoxs[i]);
          }
        }else{
          this.frozenBoxRightOptions=this.checkedFrozenBoxs;
        }
        this.originalRightOptions=this.frozenBoxRightOptions;
        //确认后，左侧添加show，隐藏已经移至右边的值
        var ary=this.frozenBoxs;
        var dates=[];
        this.checkedFrozenBoxs.filter(function(ele){
             dates.push(ele.frozenBoxCode)
         })
       for (var i = 0; i<ary.length; i++){
         dates.filter(element=>{
           if(ary[i].frozenBoxCode==element){
             ary[i].show=true;
           }
         })
       }
      this.checkAll=false;   //全选按钮取消全选
      this.checkedFrozenBoxs=[];    //全选按钮取消全选
      this.checkedRightfrozenBoxs=[];   //取消右边选中的
      // 计算左侧条数
      let res=this.frozenBoxs.filter(element=>{
         if(!element.show || (element.show==false)){
            return element;
         }
      })
      this.frozenBoxsLength=res.length;
      },
      del(){
        // this.checkedFrozenBoxs=[];
        this.checkAll=false;   //全选按钮取消全选
         //新表格数据
        var dates=[];
        this.checkedRightfrozenBoxs.filter(function(ele){
            dates.push(ele.frozenBoxCode)
        })
       for(let element of this.checkedRightfrozenBoxs){
          element.show=false;
        }
        this.search();
      for (var i = this.frozenBoxRightOptions.length; i>=0; i--){
        dates.filter(element=>{
          if(this.frozenBoxRightOptions[i] && this.frozenBoxRightOptions[i].frozenBoxCode==element){
            this.frozenBoxRightOptions.splice(i,1);
          }
        })
      }
       // 计算左侧条数
      let res=this.frozenBoxs.filter(element=>{
         if(!element.show || (element.show==false)){
            return element;
         }
      })
      this.frozenBoxsLength=res.length;
      },
      //左侧搜索
      search(){
        var that=this;
        this.checkedFrozenBoxs=[];
          //每次手动将数据置空,因为会出现多次点击搜索情况
        let res=this.originalFrozenBoxs.filter(function(item,index,array){
          if(item.frozenBoxCode.indexOf(that.searchCon)>=0){
            return item;
          }
        });
         //删除show为true的数据
         for (var i = res.length; i>=0; i--){
           if(res[i] && res[i].show==true){
             res.splice(i,1);
           }
          }
        this.frozenBoxs=res;
        this.frozenBoxsLength=res.length;
      },
      //右侧侧搜索
      searchRight(){
        var that=this;
        this.checkedRightfrozenBoxs=[];
        let res=this.originalRightOptions.filter(function(item,index,array){
          if(item.frozenBoxCode.indexOf(that.searchConRight)>=0){
            return item;
          }
        });
         for (var i = res.length; i>=0; i--){
           if(res[i] && res[i].show==false){
             res.splice(i,1);
           }
          }
         this.frozenBoxRightOptions=res;
      },
      // 根据id查询快递信息
      queryExpress(){
        $axios_http({
            url: "/base/area/courier/result/queryCourierResultId",
            data: {
              id:this.$route.query.id,
            },
            vueObj: this
          }).then((res) => {
          this.sendExpressForm.courierCompany=res.data.data.courierCompany,
          this.sendExpressForm.courierNumber=res.data.data.courierNumber,
          this.sendExpressForm.sendDateByString=res.data.data.sendDateByString,
          this.sendExpressForm.sendPerson=res.data.data.sendPerson,
          this.sendExpressForm.sendPersonPhone=res.data.data.sendPersonPhone
          })
      },
      // 查询寄出的冷冻盒编号
      queryNumber(){
        $axios_http({
          url: "/base/area/courier/result/queryCourierResultById",
          data: {
            courierNumber:this.$route.query.courierNumber,
          },
          vueObj: this
        }).then((res) => {
          res.data.data.filter(ele=>{
            this.frozenBoxRightOptions.push(ele);
          })
          res.data.data.filter(ele=>{
            ele.show=true;
            ele.samplyType=null;
            this.originalFrozenBoxs.push(ele);
          })
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }
.content{
    background: #fff;
    padding:10px;
  }
  .return-home {
    display: block;
    text-align: center;
    float: left;
    margin-bottom:20px;
  }
  .el-checkbox{
    display: block;
    margin-bottom: 5px;
    margin-left: 30px;
  }
  .sendExpressBox .left{
    width: 400px;
    margin-right: 100px;
    padding-top: 70px;
  }
  .sendExpressBox .right{
    width: 600px;
  }
  .sendExpressBox .box{
    border: 1px solid #e4e7ed;
  }
  .sendExpressBox  .title{
    width: 100%;
    height: 35px;
    line-height: 35px;
    background: #eef1f6;
    text-indent: 20px;
  }
   .sendExpressBox .con{
    padding: 30px;
  }
  .sendExpressBox .con .title{
    text-align: center;
  }
   .sendExpressBox .con .conBox{
     border: 1px solid #e4e7ed;
     width: 230px;
   }
   .checkboxs{
     height: 350px;
     overflow-y: auto;
     padding: 10px 0;
   }
    .sendExpressBox .con .all{
      margin-left: 0;
      text-align: left;
    }
    .total{
      font-size: 14px;
      color: #666;
      margin-left: 30px;
    }
    .el-icon-arrow-left,.el-icon-arrow-right{
      width: 30px;
      height: 30px;
      display: inline-block;
      border: 1px solid #666;
      border-radius: 50%;
      text-align: center;
      line-height: 28px;
      cursor: pointer;
      margin-left: 23px;
      margin-top: 30px;
    }
    .el-icon-arrow-left:hover,.el-icon-arrow-right:hover{
      background: #409EFF;
      border: 1px solid #409EFF;
      color: #fff;
    }
    .btnGroup{
      margin-top: 150px;
    }
    .search{
      padding: 5px;
    }
   
</style>
