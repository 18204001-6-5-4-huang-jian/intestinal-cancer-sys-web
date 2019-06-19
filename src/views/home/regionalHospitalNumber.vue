<template>
  <div v-if="regionalHospitalNumber_page" class="form-wrapper">
    <router-link to="/home/areaHome">
      <el-button size="mini" class="return">返 回</el-button>
    </router-link>
    <el-form :model="insertForm" :rules="rules" ref="insertForm" class="form">
      <div class="clearfloat">
        <el-form-item label="检查项目:" :label-width="formLabelWidth"  class="formItemWidth">
          <div>结肠镜检查</div>
        </el-form-item>
      </div>
      <div class="clearfloat">
        <el-form-item label="预约结肠镜时间:" :label-width="formLabelWidth" prop="reservationDate" class="formItemWidth">
          <el-date-picker
            v-model="insertForm.reservationDate"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            size="small"
            ref="surveyDate"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label=""  prop="startTime" class="time-width time-margin">
          <!-- <el-select v-model="insertForm.startTime" placeholder="开始时间"  @change="timeChange" size="small" >
            <el-option
              v-for="item in beginOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select> -->
          <el-time-select
            placeholder="开始时间"
            v-model="insertForm.startTime"
            :picker-options="{
              start: '08:00',
              step: '00:30',
              end: '18:00'
            }">
          </el-time-select>
        </el-form-item>
        <span style="float: left;height:40px;line-height: 40px;font-size: 20px;">-</span>
        <el-form-item label=""  prop="endTime" class="time-width">
          <!-- <el-select v-model="insertForm.endTime"  placeholder="结束时间"   size="small">
            <el-option
              v-for="item in endOptions"
              :key="item.value"
              :disabled="item.timeDisabled"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select> -->
          <el-time-select
            placeholder="结束时间"
            v-model="insertForm.endTime"
            :picker-options="{
              start: '08:00',
              step: '00:30',
              end: '18:00',
              minTime: insertForm.startTime
            }">
          </el-time-select>
        </el-form-item>
      </div>
      <div class="clearfloat">
        <!--<el-form-item label="" :label-width="formLabelWidth" prop="day" class=" timeItemWidth">-->
          <!--<el-select v-model="insertForm.day" placeholder=""  size="small"  @change="getMorningOrAfternoon">-->
            <!--<el-option-->
              <!--v-for="item in timeOptions"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.label"-->
             <!--&gt;-->
            <!--</el-option>-->
          <!--</el-select>-->

        <!--</el-form-item>-->

      </div>
      <div class="clearfloat">
        <el-form-item label="就诊科室:" :label-width="formLabelWidth"  class="formItemWidth" prop="examinationPlace">
          <el-input v-model="insertForm.examinationPlace" auto-complete="off" size="small"
          ></el-input>
        </el-form-item>
      </div>
     <div class="relative-div">
      <div class="clearfloat" v-for="item in insertForm.communityDept">
        <el-form-item label="选择社区:" :label-width="formLabelWidth"  class="formItemWidth">
          <el-select v-model="item.communityDeptId" placeholder="请选择" size="small" >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.commdeptName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置人数:" label-width="80px"  class="setting-form-width">
          <el-input v-model="item.amount" auto-complete="off" size="small" ref="amount"></el-input>
        </el-form-item>
      </div>
      <div class="plus-group">
        <span>
          <span><img src="../../assets/img/cut.png" alt="" @click="cutCommunitys" class="plus-cut"></span>
           <span><img src="../../assets/img/plus.png" alt="" @click="plusCommunitys" class="plus-cut"></span>
        </span>
      </div>
     </div>
      <div class="clearfloat">
        <el-form-item label="提交员签字:" :label-width="formLabelWidth" prop="signature" class="formItemWidth">
          <el-input v-model="insertForm.signature" auto-complete="off" size="small"
                    @keyup.enter.native="focus()"></el-input>
        </el-form-item>
      </div>
      <div class="clearfloat add-btn">
        <el-button type="primary"  @click="add('insertForm')" v-if='btnAuth.buttonNumberRelease'>发布</el-button>
        <router-link to="/home/areaHome">
          <el-button>取消</el-button>
        </router-link>
      </div>
    </el-form>
    <div class="query-table">
      <div style="margin-bottom:40px;">下属社区待检查情况：</div>
      <el-table
        :data="queryResult"
        border
        style="width: 50%;">
        <el-table-column
          prop="communityName"
          label="社区"
        >
        </el-table-column>
        <el-table-column
          prop="allsums"
          label="待检查人数"
        >
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'Right',
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            // return time.getTime() < Date.now() ;
            return time.getTime() < Date.now() - 8.64e7;
          }
        },

        queryResult:[],
        //批量设置社区
        communitys:[],
        //是否符合筛选条件
        subjectInsertState:false,
        //发送短信
        checked: '',
        submitDialog: false,
        regionalHospitalNumber_page: false,
        btnAuth: {
          buttonNumberRelease: false,
        },
        //上下午选择
        timeOptions: [{
          value: '上午',
          label: '上午'
        },
          {
            value: '下午',
            label: '下午'
          },
         ],
        //社区选择
        options: [],
        //开始时间
        beginOptions: [{
            value: '1',
            label: '08:00'
        },
          {
            value: '2',
            label: '09:00'
          },
          {
            value: '3',
            label: '10:00'
          },
          {
            value: '4',
            label: '11:00'
          },
          {
            value: '5',
            label: '12:00'
          },
          {
            value: '6',
            label: '13:00'
          },
          {
            value: '7',
            label: '14:00'
          },
          {
            value: '8',
            label: '15:00'
          },
          {
            value: '9',
            label: '16:00'
          },
          {
            value: '10',
            label: '17:00'
          },
          {
            value: '11',
            label: '18:00'
          },
        ],

        //结束时间时间
        endOptions: [{
          value: '1',
          label: '08:00',
          timeDisabled:false,
        },
          {
            value: '2',
            label: '09:00',
            timeDisabled:false,
          },
          {
            value: '3',
            label: '10:00',
            timeDisabled:false,
          },
          {
            value: '4',
            label: '11:00',
            timeDisabled:false,
          },
          {
            value: '5',
            label: '12:00',
            timeDisabled:false,
          },
          {
            value: '6',
            label: '13:00',
            timeDisabled:false,
          },
          {
            value: '7',
            label: '14:00',
            timeDisabled:false,
          },
          {
            value: '8',
            label: '15:00',
            timeDisabled:false,
          },
          {
            value: '9',
            label: '16:00',
            timeDisabled:false,
          },
          {
            value: '10',
            label: '17:00',
            timeDisabled:false,
          },
          {
            value: '11',
            label: '18:00',
            timeDisabled:false,
          },
        ],
        //添加表单数据对象
        'insertForm': {
          "communityDept":[{
            "communityDeptId":'',
            "amount":''

          }

          ],
          "reservationDate": '',
          "startTime":'',
          "endTime": '',
          "signature": '',
          "examinationPlace":''
        },
        formLabelWidth: '140px',
        autograph: '120px',
        rules: {
          signature: [
            {required: true, message: '必填', },
            {min: 2, max: 30, message: '长度在2到30个字符', }
          ],
          investigator: [
            {required: true, message: '必填',},
            {min: 2, max: 30, message: '长度在4到30个字符', }
          ],
          reservationDate: [
            {required: true, message: '必填', }
          ],
          startTime: [
            {required: true, message: '必填', }
          ],
          endTime: [
            {required: true, message: '必填', }
          ],
          examinationPlace: [
            {required: true, message: '必填', }
          ],
        }
      }
    },

    mounted() {
      this.query()
      this.getTable()
      let obj = this.checkPageAuth(this, "regionalHospitalNumber_page", this.btnAuth);
      this.getUser()
    },
    methods: {
      getUser(){
        var session = sessionStorage.getItem("token").split(";")
        for(var i = 0; i < session.length; i++){
          var arr = session[i].split("=");
          if(arr[0]=='LOGINNAME'){
            this.insertForm.signature = arr[1]
          }
        }
      },
      //添加一条社区
      plusCommunitys(){
        if(this.options.length == '0'){
          this.$message({
            type:'warning',
            message:'当前没有可添加的社区'
          })
          return
        }
        if(this.insertForm.communityDept.length+1>this.options.length){
          this.$message({
            type:'warning',
            message:'只能添加'+this.options.length+'个社区'
          })
          return
        }else{
          var obj = {}
          obj.communityDeptId = ''
          obj.amount = ''
          this.insertForm.communityDept.push(obj)
        }

      },
      timeChange(value){
         var a = ''
         for(let i = 0;i<this.beginOptions.length;i++){
           if(value == this.beginOptions[i].label){
               a = this.beginOptions[i].value
           }
         }
         for(let j = 0; j<this.endOptions.length;j++){
             if(a/1 >= this.endOptions[j].value){
                 console.log(this.endOptions[j].value)
               this.endOptions[j].timeDisabled = true
             }else {
               this.endOptions[j].timeDisabled = false
             }
         }

      },
      //减去一条社区
      cutCommunitys(){
        if(this.insertForm.communityDept.length<2 ){
            this.$message({
              type:'warning',
              message:'至少添加一个社区'
            })
        }else{
          this.insertForm.communityDept.pop();
        }
      },
      focus(){
        this.$refs.phone.focus()
      },
      focusPhone(){
        this.$refs.idCard.focus()
      },
      watchInputVal(val, opt, a, b) {
        if (val != 'Y' && val != 'N' && val != 'y' && val != 'n') {
          this.$nextTick(function () {
            opt[a][b] = ''
          })
        }
      },

      //保存一条新增数据
      add(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              for(let i = 0;i<this.insertForm.communityDept.length;i++){
                if( this.insertForm.communityDept[i].communityDeptId == "" ||this.insertForm.communityDept[i].amount == "" ){
                  this.$message({
                    type:'warning',
                    message:'社区或人数不能为空'
                  })
                  return
                }
              }
            $axios_http({
              url: "/base/hospital/community/allocation/insert",
              data: this.insertForm,
              vueObj: this
            }).then((res) => {
              $successMsg(this, "放号成功")
              this.$refs[formName].resetFields();
              Object.assign(this.$data.insertForm, this.$options.data().insertForm)
              this.getUser()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      getTable(){
        $axios_http({
          url: "/base/hospital/community/allocation/getHcrallocationById",
          data: {},
          vueObj: this
        }).then((res) => {
          this.queryResult = res.data.data
        })
      },
      query(formName) {
          $axios_http({
            url: "/base/hospital/community/allocation/querycommdepts",
            data: {},
            vueObj: this
          }).then((res) => {
           this.options = res.data.data
          })
      },
      //提交后弹窗分组
      onSubmit(){
        this.submitDialog = true
      }

    }
  }
</script>
<style scoped>
  .formItemWidth {
    width: 360px;
    float: left;
  }
  .setting-form-width{
    width: 220px;
    float: left;
  }
  h2 {
    padding: 50px 0 20px 0;
  }
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .timeItemWidth{
    width:220px;
    float: left;
  }
  .time-width{
    width:130px;
    float: left;
  }
  .time-width .el-date-editor.el-input{
    width: 130px;
  }

  .time-margin{
    margin-left: 30px;
  }
  .time-begin{
    margin-left: 140px;

  }
  .add-btn{
    margin-top:30px;
    margin-left:300px;
    margin-bottom:30px;
  }
  .form{
    padding-top: 100px;
    padding-left: 50px;
    padding-bottom:30px;
  }
  .table{
    width: 600px;
    margin:20px auto
  }
  .plus-cut{
    width:20px;
    height:20px;
    margin-top:10px;
    margin-left:10px;
    cursor: pointer;
  }
  .return {
    margin-top: 20px;
    display: block;
    text-align: center;
    float: left;
    margin-left: 20px;
  }
  .relative-div{
    position: relative;
  }
  .plus-group{
    position: absolute;
    left:600px;
    top:0px;
  }
</style>
<style>
  #test .el-form-item {
    margin-bottom: 0px;
    display: inline-block;
  }

  .option .el-form-item__error {
    top: 85%;
  }

  .answerBox .el-input__inner {
    padding: 0;
    font-weight: 800;
    text-align: center;
  }

  .el-form-item__error {
    padding: 0;
  }



  .form-wrapper {
    background: #ffffff;
  }
  .query-table{
    width:800px;
    padding-bottom: 50px;
    margin-left: 100px;
  }
.time-width .el-date-editor.el-input .el-input__inner{
  height: 32px;
}
</style>
