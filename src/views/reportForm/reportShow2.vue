<template>
    <div class="j_content jright" v-if="area_pathology_add_result_page">
    <div style="min-width: 1200px;">
      <div class="btns">
        <el-button type="normal" size="small" class="fl" @click="goBack()">返回</el-button>
        <!--<el-button type="normal" size="small" class="fr" @click="submit()" v-if="!show">保存</el-button>-->
        <p class="text">表B2-病理检查结果表</p>
      </div>
      <div class="formcon">
        <div class="title">
          一、基本信息
          <el-button type="text" class="fr" @click="openr('1')" style="margin-right: 10px;margin-top: -4px;">填写说明</el-button>
          <el-button type="text" class="fr" @click="openr('2')" style="margin-right: 10px;margin-top: -4px;">编码说明</el-button>
        </div>
        <div class="tables">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" :disabled="show">
            <el-form-item label="sid:" class="formoneline">
              <span>{{formInline.sid}}</span>
            </el-form-item>
            <el-form-item label="身份证号:" class="formoneline">
              <span>{{users.idCard}}</span>
            </el-form-item>
            <el-form-item label="姓名:" class="formhalfline">
              <span>{{users.name}}</span>
            </el-form-item>
            <el-form-item label="性别:" class="formhalfline">
              <span>{{users.sex}}</span>
            </el-form-item>
            <el-form-item label="年龄:" class="formhalfline">
              <span>{{users.age}}</span>
            </el-form-item>
            <el-form-item label="检查日期:" class="formhalfline">
              <el-date-picker
                v-model="formInline.surveyDate"
                :clearable="false"
                type="date"
                style="width:160px;"
                size="small"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="formcon">
        <div class="title">
          二、病理诊断记录表
        </div>
        <div class="tables">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline" :rules="formInlinerule" :disabled="show">
              <el-form-item label="是否需要国家癌症中心会诊（复阅）？" class="formoneline" prop="item1">
                <el-radio-group v-model="formInline.item1">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <div>
                <div>
                  <table class="j_table cmc">
                     <div style="display:block;">
                      <tr class="title">
                        <td width="140" rowspan="2">1.病理标本号</td>
                        <td width="140" rowspan="2">2.活检部位</td>
                        <td width="128" rowspan="2">3.活检位置 （距肛门距离）</td>
                        <td width="170" rowspan="2">4.病理诊断（编码）</td>
                        <td width="120" rowspan="2">5.高级别上皮内瘤变比例（%）</td>
                        <td width="210" colspan="2">6.腺瘤性息肉的结构比例（%）</td>
                        <td width="210" rowspan="2">7.备注</td>
                        <td width="100" rowspan="2"  v-if="!show">操作</td>
                      </tr>
                      <tr class="title">
                        <td width="105">管状</td>
                        <td width="105">绒毛状</td>
                      </tr>
                    </div>
                    <div v-for="(x,index) in colonoscopyPathologyDiagnosisRecordList">
                      <el-form :inline="true" :model="x" class="demo-form-inline" :ref="'formInlinelist'+index" style="display:table-row-group;" :rules="formInlinelist" :disabled="show">
                        <tr>
                            <td width="140">
                                <el-form-item label=" " prop="item1" style="margin-bottom:0;margin-right: 0;" >
                                  <el-input v-model="x.item1"  size="small" style="width:100px;"></el-input>
                                </el-form-item>
                            </td>
                            <td width="140">
                              <el-form-item label=" " prop="item2" style="margin-bottom:0;margin-right: 0;">
                                <el-select v-model="x.item2" placeholder="请选择" size="small" style="width:102px;">
                                  <el-option
                                    v-for="item in partmentoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </td>
                            <td width="128">
                              <el-form-item label=" " prop="item3" class="formoneline specialwidth2" style="margin-bottom:0;margin-right: 0;">
                                <el-input v-model="x.item3"  size="small" style="width:90px;">
                                  <template slot="append"  size="small" >cm</template></el-input>
                              </el-form-item>
                            </td>
                            <td width="170">
                              <p v-for="a,index in x.item4" style="line-height: 14px;font-size: 14px;color: #606266;" v-if="x.item4!=''">{{item4Option[a-1].label}}</p>
                            </td>
                            <td width="120">
                              <el-form-item label=" " prop="item5" style="margin-bottom:0;margin-right: 0;">
                                <el-input v-model="x.item5" size="small" style="width:82px;"></el-input>
                              </el-form-item>
                            </td>
                            <td width="105">
                              <el-form-item label=" " prop="item6_1" style="margin-bottom:0;margin-right: 0;">
                                <el-input v-model="x.item6_1" size="small" style="width:65px;"></el-input>
                              </el-form-item>
                            </td>
                            <td width="105">
                              <el-form-item label=" " prop="item6_2" style="margin-bottom:0;margin-right: 0;">
                                <el-input v-model="x.item6_2" size="small" style="width:65px;"></el-input>
                              </el-form-item>
                            </td>
                            <td width="210">
                              <el-form-item label=" " prop="item7" class="formoneline specialwidth" style="margin-bottom:0;margin-right: 0;">
                                <el-input v-model="x.item7" size="small" ></el-input>
                              </el-form-item>
                            </td>
                            <td width="100" v-if="!show">
                              <el-button type="text" size="small" @click="clearbbFun(index)">清空</el-button>
                              <el-button type="text" size="small" @click="delbbFun(index)">删除</el-button>
                            </td>
                        </tr>
                      </el-form>
                    </div>
                  </table>
                </div>
              <div >
                <el-button type="text" class="lesionsRecordList" @click="addbbFun" v-if="!show">添加记录</el-button>
              </div>
            </div>
              <el-form-item label="是否诊断为结直肠癌前病变：" class="formoneline" prop="item2">
                <el-radio-group v-model="formInline.item2">
                  <el-radio label="2">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否诊断为结直肠癌：" class="formoneline" prop="item3">
                <el-radio-group v-model="formInline.item3">
                  <el-radio label="2">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="诊断日期：" class="formhalfline">
                <el-date-picker
                  v-model="formInline.diagnosisDate"
                  :clearable="false"
                  type="date"
                  size="small"
                  style="width:160px;"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="医师签名：" class="formhalfline" prop="doctorSign">
                <el-input v-model="formInline.doctorSign" style="width: 120px;margin-right: 20px;" size="small"></el-input>
              </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="text-center" style="margin-top: 40px;" v-if="!show">
        <el-button type="primary" @click="submit()">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </div>
    <div ref="bbsm" style="display: none;">
      <p class="txsm">1.病理标本号<br/>
        与肠镜检查结果登记表中的病理标本号相一致。
      </p>
      <p class="txsm">2.活检部位<br/>
        与肠镜检查结果登记表中的病变部位相一致。
      </p>
      <p class="txsm">3.活检位置<br/>
        活检位置的记录与内镜检查位置的记录完全一致。
      </p>
      <p class="txsm">4.病理诊断编码<br/>
        01.正常/大致正常结直肠粘膜<br/>
        02.慢性结肠/直肠炎<br/>
        03.慢性活动性结肠/直肠炎<br/>
        04.慢性肉芽肿性结肠/直肠炎<br/>
        05.非腺瘤性息肉<br/>
        06.增生性息肉<br/>
        07.无蒂锯齿状腺瘤<br/>
        08.传统锯齿状腺瘤<br/>
        09.锯齿状息肉不能分类<br/>
        10.管状腺瘤<br/>
        11.绒毛状腺瘤<br/>
        12.管状绒毛状腺瘤<br/>
        13.腺上皮低级别上皮内瘤变（异型增生）<br/>
        14.腺上皮高级别上皮内瘤变（异型增生）<br/>
        15.腺上皮高级别上皮内瘤变（粘膜内腺癌）<br/>
        16.腺上皮上皮内瘤变不能分级<br/>
        17.浸润性腺癌<br/>
        18.癌不能分类<br/>
        19.恶性肿瘤不能分类<br/>
        20.其它<br/>
        99.不足以作诊断<br/>
      </p>
      <p class="txsm">5、	高级别上皮内瘤变的比例：<br/>
        记录上皮内瘤变的病变中高级别上皮内瘤变的比例。
      </p>
      <p class="txsm">6、	腺瘤结构比例（%）：<br/>
        分别记录管状结构和绒毛状结构的比例，以百分比表示
      </p>
      <p class="txsm">7、	备注：上述内容不具备的任何需要说明的问题。</p>
    </div>
    <div ref="txsm" style="display: none;">
      <p class="txsm">
        1.本表中“筛查ID”与“姓名”必须与肠镜检查结果登记表中一致；
      </p>
      <p class="txsm">
        2.“1.病理标本号”为本医院原有标本病理编号（与《技术方案》要求不同）；
      </p>
      <p class="txsm">
        3.“2活检部位”直接填写文字；包括：回肠末端；回盲瓣；升结肠；肝曲；横结肠；脾曲；降结肠；降乙交界；乙状结肠；直乙交界；直肠；
      </p>
      <p class="txsm">
        4.“3.活检位置”按肠镜活检位置填写；
      </p>
      <p class="txsm">
        5．“4.病理诊断”可填写多个编码，根据病变诊断填写所有相关编码；
      </p>
      <p class="txsm">
        6.“结直肠癌前病变”的定义：病理诊断编码为<br/>
        07/08/09/10/11/12/13/14/15/16；
      </p>
      <p class="txsm">
        7.“结直肠癌”的定义：病理诊断编码为17/18/19。
      </p>
    </div>
  </div>
</template>
<script>
  import { Notification } from 'element-ui'
  export default {
    name: 'report2',
    data() {
      const item3 = (rule, value, callback) => {
        if (value != null && value != "" || value == undefined) {
          if(value>=0){
            const that = this
            this.colonoscopyPathologyDiagnosisRecordList.forEach(function (item) {
              that.$set(item ,['item3'], (item.item3 * 1).toFixed(1))
            })
            callback()
          }else{
            callback(new Error('请输入非负数!'))
          }
        }else{
          callback(new Error('请输入!'))
        }
      }
      const item4 = (rule, value, callback) => {
        if(((value%1==0) && value>0 && value<21) || value == '99'){
          callback();
        }else{
          if (value != null && value != "" || value == undefined) {
            callback(new Error('编码错误'))
          }else{
            this.colonoscopyPathologyDiagnosisRecordList.forEach(function (item) {
              if((item.dynamicTags && item.dynamicTags.length)||value){
                callback();
              }else {
                callback(new Error('请输入'))
              }
            })
          }
        }
      }
      const item4other = (rule, value, callback) => {
        const that = this
        // that.colonoscopyPathologyDiagnosisRecordList.forEach(function (item) {
        //   if(item.dynamicTags && item.dynamicTags.length){
        //     item.dynamicTags.forEach(function(items){
        //       that.setItemBylist(items*1)
        //     })
        //   }
        //   if(item.item4 && item.item4%1==0){
        //     that.setItemBylist(item.item4*1)
        //   }
        // })

        if(((value%1==0) && value>0 && value<21) || value == '99'){
          callback();
        }else{
          if (value != null && value != "" || value == undefined) {
            callback(new Error('编码错误'))
          }else{
            this.colonoscopyPathologyDiagnosisRecordList.forEach(function (item) {
              if((item.dynamicTags && item.dynamicTags.length)||value){
                callback();
              }else {
                callback(new Error('请输入'))
              }
            })
          }
        }
      }
      const item5 = (rule, value, callback) => {
        if (value != null && value != "" || value == undefined) {
          if(value>=0){
            const that = this
            this.colonoscopyPathologyDiagnosisRecordList.forEach(function (item) {
              that.$set(item ,['item5'], (item.item5 * 1).toFixed(1))
            })
            callback()
          }else{
            callback(new Error('请输入非负数!'))
          }
        }else{
          callback(new Error('请输入!'))
        }
      }
      const item6_1 = (rule, value, callback) => {
        if (value != null && value != "" || value == undefined) {
          if(value>=0){
            const that = this
            this.colonoscopyPathologyDiagnosisRecordList.forEach(function (item) {
              that.$set(item ,['item6_1'], (item.item6_1 * 1).toFixed(1))
            })
            callback()
          }else{
            callback(new Error('请输入非负数!'))
          }
        }else{
          callback(new Error('请输入!'))
        }
      }
      const item6_2 = (rule, value, callback) => {
        if (value != null && value != "" || value == undefined) {
          if(value>=0){
            const that = this
            this.colonoscopyPathologyDiagnosisRecordList.forEach(function (item) {
              that.$set(item ,['item6_2'], (item.item6_2 * 1).toFixed(1))
            })
            callback()
          }else{
            callback(new Error('请输入非负数!'))
          }
        }else{
          callback(new Error('请输入!'))
        }
      }
      return {
        users:{
          idCard: '',
          name: '',
          sex: '',
          age: '',
        },
        show:true,
        area_pathology_add_result_page:false,
        formInline: {
          sid: 'TC10001',//受试者唯一标识值固定为TC0001
          todoId: '1',//待办id值固定为1
          colonoscopyRecordId: this.$route.query.id,//结肠镜检查结果记录id值固定为1
          colonoscopyResultId: this.$route.query.resultId,//结肠镜检查结果记录id值固定为1
          surveyDate: new Date(),
          diagnosisDate: new Date(),
          item2:'',
          item3:''
        },
        item4Option:[
          {
            value:'1',
            label:'01.正常/大致正常结直肠粘膜'
          },
          {
            value:'2',
            label:'02.慢性结肠/直肠炎'
          },
          {
            value:'3',
            label:'03.慢性活动性结肠/直肠炎'
          },
          {
            value:'4',
            label:'04.慢性肉芽肿性结肠/直肠炎'
          },
          {
            value:'5',
            label:'05.非腺瘤性息肉'
          },
          {
            value:'6',
            label:'06.增生性息肉'
          },
          {
            value:'7',
            label:'07.无蒂锯齿状腺瘤'
          },
          {
            value:'8',
            label:'08.传统锯齿状腺瘤'
          },
          {
            value:'9',
            label:'09.锯齿状息肉不能分类'
          },
          {
            value:'10',
            label:'10.管状腺瘤'
          },
          {
            value:'11',
            label:'11.绒毛状腺瘤'
          },
          {
            value:'12',
            label:'12.状绒毛状腺瘤'
          },
          {
            value:'13',
            label:'13.腺上皮低级别上皮内瘤变（异型增生）'
          },
          {
            value:'14',
            label:'14.上皮高级别上皮内瘤变（异型增生）'
          },
          {
            value:'15',
            label:'15.腺上皮高级别上皮内瘤变（粘膜内腺癌）'
          },
          {
            value:'16',
            label:'16.腺上皮上皮内瘤变不能分级'
          },
          {
            value:'17',
            label:'17.浸润性腺癌'
          },
          {
            value:'18',
            label:'18.癌不能分类'
          },
          {
            value:'19',
            label:'19.恶性肿瘤不能分类'
          },
          {
            value:'20',
            label:'20.其它'
          },
          {
            value:'21',
            label:'21.不足以作诊断'
          },
        ],
        colonoscopyPathologyDiagnosisRecordList:[{}],// 其他病变
        partmentoptions: [{
          value: '1',
          label: '回肠末端'
        }, {
          value: '2',
          label: '回盲瓣'
        }, {
          value: '3',
          label: '升结肠'
        }, {
          value: '4',
          label: '肝曲'
        }, {
          value: '5',
          label: '横结肠'
        }, {
          value: '6',
          label: '脾曲'
        }, {
          value: '7',
          label: '降结肠'
        }, {
          value: '8',
          label: '降乙交界'
        }, {
          value: '9',
          label: '乙状结肠'
        }, {
          value: '10',
          label: '直乙交界'
        }, {
          value: '11',
          label: '直肠'
        }],
        formInlinerule:{
          'item1': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item2': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item3': [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'doctorSign': [
            { required: true, message: '请输入', trigger: 'change' }
          ]
        },
        formInlinelist:{
          'item1':[
            { required: true, message: '请输入', trigger: 'change' }
          ],
          'item2':[
            { required: true, message: '请选择', trigger: 'change' }
          ],
          'item3':[
            { required: true, message: '请输入', trigger: 'change' },
            { message: '请输入非负数', trigger: 'blur',validator:item3 }
          ],
          'item4':[
            { message: '', trigger: 'change',validator:item4 },
            { message: '', trigger: 'blur',validator:item4other }
          ],
          'item5':[
            { required: true, message: '请输入', trigger: 'change' },
            { message: '请输入非负数', trigger: 'blur',validator:item5 }
          ],
          'item6_1':[
            { required: true, message: '请输入', trigger: 'change' },
            { message: '请输入非负数', trigger: 'blur',validator:item6_1 }
          ],
          'item6_2':[
            { required: true, message: '请输入', trigger: 'change' },
            { message: '请输入非负数', trigger: 'blur',validator:item6_2 }
          ],
          'item7':[
            { required: true, message: '请输入', trigger: 'change' }
          ],
        }
      }
    },
    created() {
      let obj = this.checkPageAuth(this,"area_pathology_add_result_page",this.btnAuth)
      this.formInline.sid=this.$route.query.sid;
      this.formInline.id = this.$route.query.id;
      this.queryDetail()
      if(this.show){
        this.queryInfo()
        this.formInlinerule = {}
        this.formInlinelist = {}
      }
    },
    methods:{
      //查询user
      queryDetail(){
        $axios_http({
          url: "/base/hospital/person/info/get/"+this.formInline.sid,
          data: {},
          vueObj: this
        }).then((res) => {
          this.users = res.data.data
        this.users.age =  this.users.age+'岁'
        this.users.sex =  (this.users.sex==1?'男':'女')
      })
      },
      cancel(){
        this.$router.go(-1)
      },
      queryInfo(){
        $axios_http({
          url:'/base/colonoscopy/PathologyResult/queryColonoscopyPathologyResult',
          data:{
            sid:this.formInline.sid,
            id:this.formInline.id,
            idType:'record',
          },
        }).then((res)=> {
          const dd = res.data.data
          this.formInline.item1 = dd.item1+''
          this.formInline.item2 = dd.item2+''
          this.formInline.item3 = dd.item3+''
          this.formInline.doctorSign = dd.doctorSign
          this.formInline.diagnosisDate = dd.diagnosisDate
          this.formInline.surveyDate=dd.surveyDate
          this.colonoscopyPathologyDiagnosisRecordList = dd.colonoscopyPathologyDiagnosisRecordList
          if(this.colonoscopyPathologyDiagnosisRecordList.length>0){
            this.colonoscopyPathologyDiagnosisRecordList.forEach(function(item){
              for(var i in item){
                if(item[i] || item[i]==0){
                  if(i == 'item4'){
                    item[i] = item[i].split(',')
                  }else{
                    item[i] = item[i]+''
                  }
                }else{
                  item[i]=''
                }
              }
            })
          }
        })
      },
      setItemBylist(value){ //根据编码给，是否诊断为结直肠癌，是否诊断为结直肠癌前病变，赋值
        if(value>6 && value<17){//是否诊断为结直肠癌前病变
          this.$set(this.formInline,['item2'],'1')
        }else{
          this.$set(this.formInline,['item2'],'2')
        }
        if(value>16 && value<20){//是否诊断为结直肠癌
          this.$set(this.formInline,['item3'],'1')
        }else{
          this.$set(this.formInline,['item3'],'2')
        }
      },
      adddynamicTags(row,item4){//增加编码
        if(((item4%1==0) && item4>0 && item4<21) || item4 == '99'){
          if(!row.dynamicTags) {
            this.$set(row,['dynamicTags'],[])
          }
          if(row.dynamicTags.indexOf(item4)<0){
            row.dynamicTags.push(item4)
          }else {
            this.$alert('请勿重复添加', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
          }
          this.$set(row,['item4'],'')
        }else{
          this.$alert('编码错误', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }
      },
      handleClose(row,index){//删除编码
        row.dynamicTags.splice(index,1)
      },
      openr(type){ //打开编码说明和填写说明
        const that = this
        if(type == '2'){
          Notification.closeAll()
          Notification({
            title: '结直肠癌筛查病理诊断表编码说明',
            duration:0,
            customClass:'smclass',
            offset: 154,
            dangerouslyUseHTMLString: true,
            message: that.$refs.bbsm.innerHTML
          })
        }else{
          Notification.closeAll()
          Notification({
            title: '填写说明',
            customClass:'smclass',
            duration:0,
            offset: 154,
            dangerouslyUseHTMLString: true,
            message: that.$refs.txsm.innerHTML
          })
        }
      },
      addbbFun(){// 添加病理标本
        this.colonoscopyPathologyDiagnosisRecordList.push({})
      },
      delbbFun(index){// 删除病理标本
        if(index){
          this.colonoscopyPathologyDiagnosisRecordList.splice(index,1)
        }else{
          this.clearbbFun(index)
        }
      },
      clearbbFun(index){// 清空单行病理标本
        this.$set(this.colonoscopyPathologyDiagnosisRecordList,index,{})
      },
      submit(){ //提交
        const that = this

        // 验证form
        let validd = true
        this.$refs.formInline.validate((valid) => {
          if (!valid){
          validd = false
          }
        })
        if(this.colonoscopyPathologyDiagnosisRecordList && this.colonoscopyPathologyDiagnosisRecordList.length){
          for(var i=0;i<this.colonoscopyPathologyDiagnosisRecordList.length;i++){
          // this.$refs.formInlinelist.forEach(function(item){
            this.$refs['formInlinelist'+i][0].validate((valid) => {
              if (!valid){
                validd = false
              }
            })
          }
        }
        if(validd){
          //设置数据
          let dd = JSON.parse(JSON.stringify(that.formInline)) //1,2

          dd.colonoscopyPathologyDiagnosisRecordList = JSON.parse(JSON.stringify(this.colonoscopyPathologyDiagnosisRecordList))
          //给列表添加sid
          if(dd.colonoscopyPathologyDiagnosisRecordList.length>0){
            dd.colonoscopyPathologyDiagnosisRecordList.forEach(function (item) {
              that.$set(item ,['sid'], that.formInline.sid)
              that.$set(item ,['item5'], parseFloat(item.item5)/100)
              that.$set(item ,['item6_1'], parseFloat(item.item6_1)/100)
              that.$set(item ,['item6_2'], parseFloat(item.item6_2)/100)
              let item4 = []
              if(item.item4){
                item4.push(item.item4)
              }
              if(item.dynamicTags && item.dynamicTags.length){
                item.dynamicTags.forEach(function(item3){
                  if(item4.indexOf(item3)<0){
                    item4.push(item3)
                  }
                })
              }
              // 删除多余数据
              delete item.dynamicTags
              item.item4 =  item4.join(',')
            })
          }

          // 设置时间格式
          if(dd.surveyDate.indexOf('T')>=0){
            dd.surveyDate = dd.surveyDate.split('T')[0]
          }
          if(dd.diagnosisDate.indexOf('T')>=0){
            dd.diagnosisDate = dd.diagnosisDate.split('T')[0]
          }
          $axios_http({
            url:'/base/colonoscopy/PathologyResult/addColonoscopyPathologyResult',
            data:dd,
            vueObj:this
          }).then((res)=> {
            //显示操作成功浮动提示框
            $successMsg(this,"保存成功")
           this.$router.go(-1)
          //清空数据
          this.$refs.formInline.resetFields()
          if(this.colonoscopyPathologyDiagnosisRecordList && this.colonoscopyPathologyDiagnosisRecordList.length){
            for(var i=0;i<this.colonoscopyPathologyDiagnosisRecordList.length;i++){
            // this.$refs.formInlinelist.forEach(function(item){
              this.$refs['formInlinelist'+i][0].resetFields()
            }
          }
          this.$set(this.formInline,['surveyDate'],new Date())
          this.$set(this.formInline,['diagnosisDate'],new Date())
          this.colonoscopyPathologyDiagnosisRecordList = [{}]
        })
        } else {
          return false;
        }

      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .text-right {
    text-align: right;
  }

  .text-center {
    text-align: center;
  }

  .j_content {
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
    margin:0 20px 20px;
    border: 1px solid #f3f3f3;
  }

  .formcon .title {
    font-size: 16px;
    text-align: center;
    line-height: 2;
    background: #f3f3f3;
    color: #000000;
  }

  .formcon .title.nobg {
    background: none;
  }

  .tables {
    margin: 40px 20px 30px 20px;
    font-size: 0;
    line-height: 0;
  }

  .formoneline {
    width: 100%;
    margin-right: 0 !important;
  }

  .formhalfline {
    width: 50%;
    margin-right: 0 !important;
  }

  .mb5 {
    margin-bottom: 8px;
  }

  .colonoscopyPathologyDiagnosisRecordList {
    font-size: 20px;
    font-weight: bold;
    color: #3a8ee6;
  }

  .zdysinput input {
    border-width: 0 0 1px 0;
  }

  .txsm {
    font-size: 14px;
    margin: 10px 0px;
  }

  .lesionsRecordList {
    font-size: 16px;
    font-weight: bold;
    color: #3a8ee6;
    margin-bottom:40px;
  }
  .j_table{
    margin: 20px 0;
    border-collapse: collapse;
    table-layout: auto;
    width: 100%;
  }
  .j_table td{
    border:1px solid #e0dcdc;
    padding:10px 6px;
    vertical-align: top;
  }
  .j_table form td{
     border-top:0;
   }
  .j_table .title{
    font-size: 14px;
    text-align: center;
    color: #606266;
    line-height: 15px;
  }
</style>
<style>
  .el-table.j_table td{
    padding:5px 0;
  }
  .j_content .el-input-group__append{
    padding:0 10px;
  }
  .smclass{
    width: 500px;
    max-height: calc(100% - 175px);
    overflow: auto;
  }
  .j_table .el-form-item__label{
    padding-right: 5px;
  }
  .j_table .el-form--inline .el-form-item__content{
    font-size: 0;
    line-height: 0;
  }
  .specialwidth .el-form-item__content{
    width: calc(100% - 20px);
  }
  .specialwidth2 .el-form-item__content{
    /* margin-top: -8px; */
  }
  .j_table .el-input__inner{
    padding:0 5px;
  }

  .j_content .el-radio__input.is-disabled.is-checked+span.el-radio__label {
    color: #409EFF;
  }
  .j_content .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #409EFF;
    border-color: #409EFF;
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
  .j_content .el-checkbox__input.is-disabled.is-checked+span.el-checkbox__label {
    color: #409EFF;
    cursor: not-allowed;
  }
  .j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  .j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff;
  }

  .zdysinput.el-input.is-disabled .el-input__inner{
    background: transparent;
  }
</style>
