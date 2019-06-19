<template>
  <div slot="right" class="content-page" v-if="fileUpload_page">
    <div class="content">
      <div class="filter-container">
        <el-form :model="qc" :inline=true class="clear">
          <div>
            <el-input style="width: 200px;" size="small" clearable class="filter-item" placeholder="DNA编码"
                      v-model="qc.dnaCode"></el-input>
            <el-select v-model="qc.dnaCheckResult" placeholder="FIT结果" size="small" class="filter-item" clearable>
              <el-option value="1" label="阴性"></el-option>
              <el-option value="2" label="阳性"></el-option>
              <el-option value="3" label="无效"></el-option>
            </el-select>
            <el-select v-model="qc.dnaCheckEnterStatus" clearable placeholder="录入状态" size="small" class="filter-item">
              <el-option value="1" v-bind:key="1" label="未录入"></el-option>
              <el-option value="2" v-bind:key="2" label="已录入"></el-option>
            </el-select>
            <div style="margin-bottom: 20px;">
              <el-button size="small" type="primary" icon="el-icon-search" v-if="btnAuth.uploadList_query_btn"
                         @click="query(1,$store.state.subjectsListPageSize)">查询
              </el-button>
              <el-button type="primary" size="small" icon="el-icon-close" v-if="btnAuth.uploadList_query_btn"
                         @click="reset">重置
              </el-button>
            </div>
          </div>
        </el-form>
      </div>

      <div>
        <el-dialog :visible.sync="uploadDialog"   :before-close="closeDialog">
          <el-form :model="addCodeForm" :rules="addCodeFormRules" ref="addCodeForm">
            <el-form-item label="FIT-DNA得分 " :label-width="formLabelWidth" prop="dnaCheckGoal" >
              <el-input v-model="addCodeForm.dnaCheckGoal" auto-complete="off" class="lineWidth" :disabled="showData1" @change="getDNAcheckResult()"></el-input>
            </el-form-item>
            <el-form-item label="粪便DNA结果" :label-width="formLabelWidth" prop="dnaCheckResult">
              <el-select v-model="addCodeForm.dnaCheckResult" clearable placeholder="DNA结果" size="small" :disabled="showData1" class="filter-item" @change="dnaCheckResultChange">
                <el-option :value="1" disabled label="阴性">阴性</el-option>
                <el-option :value="2" disabled label="阳性">阳性</el-option>
                <el-option :value="3" label="无效">无效</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="FIT定量化结果" :label-width="formLabelWidth" prop="dnaCheckQuantum">
              <el-input v-model="addCodeForm.dnaCheckQuantum" auto-complete="off" class="lineWidth" @blur="getdnaCheckQuantum()" :disabled="showData1"></el-input>
              ug hb/ml
            </el-form-item>
            <el-form-item label="上传文件" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="uploadUrl()"
                :beforeUpload="beforeAvatarUpload"
                :on-preview="handlePreview"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :limit="1"
                :with-credentials="true"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary" :disabled="showData1">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" :disabled="showData1">确定上传</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
            <div class="dialog-footer" style="text-align: center;">
              <el-button size="small" @click="submit('addCodeForm')" type="primary">确 定</el-button>
              <el-button size="small" @click="cancel('addCodeForm')">取 消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <!--数据列表-->
        <el-table
          :data="queryResult.tableData"
          border
          :default-sort="{prop: 'inGroupDate', order: 'descending'}"
          style="width: 100%;">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="dna_code"
            label="粪便DNA编码"
          >
          </el-table-column>
          <el-table-column
            label="FIT-DNA得分"
            prop="dna_check_goal"
          >
          </el-table-column>
          <el-table-column
            label="粪便DNA结果"
          >
            <template slot-scope="scope">
              <span>{{scope.row.dna_check_result | result}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dna_check_quantum"
            label="FIT定量化结果（ug hb/ml）"
          >
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="dna_check_filePath"-->
            <!--label="pdf上传地址"-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <span><el-button type="text" v-if="btnAuth.uploadList_query_btn && scope.row.dna_check_result == null && scope.row.apply_status != 1"  @click="openUploadDialog(scope.row)">录入</el-button></span>
              <span><el-button type="text" v-if="btnAuth.uploadList_query_btn && scope.row.dna_check_filePath != null "><a :href="serverName + '/base/dnafile/downFile?filePath=' + scope.row.dna_check_filePath">下载PDF</a></el-button></span>
            </template>
          </el-table-column>
        </el-table>
        <!--分页栏-->
        <el-row>
          <el-col :span="10">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple">
              <div class="block" style="margin-top: 18px">
                <el-pagination
                  @size-change="pageSizeChange"
                  @current-change="currentPageChange"
                  :current-page="$store.state.uploadListNo"
                  :page-sizes="[10, 20, 50, 100]"
                  v-bind:page-size="$store.state.uploadListSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  v-bind:total="queryResult.totalRowCount">
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      var validateItem_2_4_1 = (rule, value, callback) => {
        if (value && !(/^\+?[0-9][0-9]*$/.test(value))) {
          callback(new Error('请输入正整数'))
        } else if (value * 1 < 0 || value * 1 > 999) {
          callback(new Error('得分：0-999之间'));
        }else {
          callback();
        }
      };
      var validateItem_2_4_2 = (rule, value, callback) => {
        if (value && !(/\d/.test(value))) {
          callback(new Error('请输入数字'))
        } else if (value * 1 < 0 || value * 1 > 9999) {
          callback(new Error('得分：0-9999之间'));
        }else {
          callback();
        }
      };
      var validateFileList = (rule, value, callback) => {
          console.log(this.fileList)
        if (this.fileList.length>0) {
          callback()
        }else {
          callback('请上传文件');
        }
      };

      return {
        fileUpload_page: false,
        uploadDialog: false,
        btnAuth: {
          uploadList_query_btn: false,
        },
        serverName:SERVER_NAME,
        showData1:false,
        //查询条件
        "qc": {
          "dnaCode": "",
          "dnaCheckResult": null,
          "dnaCheckEnterStatus":''
        },
        "addCodeForm": {
          'id':'',
          'sid': '',
          'dnaCheckResult': '',
          'dnaCheckQuantum': '',
          "dnaCheckGoal": '',
          "dnaCheckFilepath": null,
          "dnaCode":'',
          "fileList":''
        },
        addCodeFormRules: {
          dnaCheckGoal: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateItem_2_4_1, trigger: 'blur'},
          ],
          dnaCheckResult: [
            {required: true, message: '必填', },

          ],
          dnaCheckQuantum: [
            {required: true, message: '必填', trigger: 'blur'},
            {validator: validateItem_2_4_2, trigger: 'blur'},
          ],
//          fileList: [
//            {required: true, message: '请上传文件', },
//            {validator: validateFileList, trigger: 'change'},
//          ],
        },
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
          "tableData": [{}]
        },
        formLabelWidth: '180px',
        fileList:[]
      }
    },
    mounted(){
      let obj = this.checkPageAuth(this, "fileUpload_page", this.btnAuth)
      this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize);
    },
    beforeDestroy(){
      this.$store.state.subjectsListPageNo = 1;
      this.$store.state.subjectsListPageSize = 10;
    },
    methods: {
      //查询
      query(pageNo,pageSize){
        $axios_http({
          url: "/base/partytest/querydnacodelistforpage",
          data: {
            dnaCode: this.qc.dnaCode,
            dnaCheckResult: this.qc.dnaCheckResult,
            dnaCheckEnterStatus:this.qc.dnaCheckEnterStatus,
            pageNo: pageNo,//当前页
            pageSize: pageSize//每页条数
          },
          vueObj: this
        }).then((res) => {
          this.$store.commit('get_subjectsListPageNo',pageNo)
          this.queryResult.tableData = res.data.data;
          this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      getDNAcheckResult(value){
        if (this.addCodeForm.dnaCheckGoal*1 >= 165){
            this.addCodeForm.dnaCheckResult = 2
          this.$nextTick(function () {
            this.$refs.addCodeForm.validateField('dnaCheckResult')
          })
        }else if(this.addCodeForm.dnaCheckGoal*1 < 165){
          this.addCodeForm.dnaCheckResult = 1
          this.$nextTick(function () {
            this.$refs.addCodeForm.validateField('dnaCheckResult')
          })
        }
      },
      closeDialog(done){
        Object.assign(this.$data.addCodeForm, this.$options.data().addCodeForm)
        this.fileList = []
        this.addCodeFormRules.dnaCheckGoal[0].required = true
        this.addCodeFormRules.dnaCheckQuantum[0].required = true
        this.showData1 = false
        done()
      },
      cancel(formName){
        this.uploadDialog = false
        this.$refs[formName].resetFields();
        Object.assign(this.$data.addCodeForm, this.$options.data().addCodeForm)
        this.fileList = []
        this.addCodeFormRules.dnaCheckGoal[0].required = true
        this.addCodeFormRules.dnaCheckQuantum[0].required = true
        this.showData1 = false
      },
      openUploadDialog(row){
//        this.$refs.upload.clearFiles();
        this.fileList = []
        this.addCodeForm.dnaCode = row.dna_code
        this.addCodeForm.id = row.id
        this.addCodeForm.sid = row.sid
        this.uploadDialog = true
      },
      dnaCheckResultChange(value){
          if(value == 3){
            this.showData1 = true
            this.$refs['addCodeForm'].resetFields();
            this.addCodeForm.dnaCheckResult = 3
            this.addCodeFormRules.dnaCheckGoal[0].required = false
            this.addCodeFormRules.dnaCheckQuantum[0].required = false
            console.log(this.addCodeForm)
          }
      },
      submit(formName){

        this.$refs[formName].validate((valid) => {
          if (valid) {

            if(this.addCodeForm.dnaCheckFilepath == null || this.addCodeForm.dnaCheckFilepath == '' || this.fileList.length == 0){
                console.log(111)
                  if(this.showData1 == false){
                    console.log(222)
                  this.$message({
                    message: '请将文件上传至服务器',
                    type: 'warning'
                  });
                  return
                }
            }
            $axios_http({
              url: "/base/partytest/inform",
              data: {
                id:this.addCodeForm.id,
                sid: this.addCodeForm.sid,
                dnaCheckResult: this.addCodeForm.dnaCheckResult,
                dnaCheckQuantum: this.addCodeForm.dnaCheckQuantum,
                dnaCheckGoal: this.addCodeForm.dnaCheckGoal,
                dnaCode:this.addCodeForm.dnaCode,
                dnaCheckFilepath: this.addCodeForm.dnaCheckFilepath
              },
              vueObj: this
            }).then((res) => {
              $successMsg(this, "DNA录入成功")
              this.fileList = []
//              this.$refs.upload.clearFiles();
              Object.assign(this.$data.addCodeForm, this.$options.data().addCodeForm)
              this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize);
              this.uploadDialog = false;

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      //重置检索条件
      reset(){
        Object.assign(this.$data.qc, this.$options.data().qc)
        this.query(this.$store.state.subjectsListPageNo,this.$store.state.subjectsListPageSize);
        this.ids = []
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.$store.commit('get_subjectsListPageSize', pageSize)
        this.query(this.$store.state.subjectsListPageNo,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.$store.commit('get_subjectsListPageNo', currentPage)
        this.query(currentPage,this.$store.state.subjectsListPageSize);
      },
      getdnaCheckQuantum(){
        var a = this.addCodeForm.dnaCheckQuantum
        if(/\d/.test(a))  {
          this.addCodeForm.dnaCheckQuantum = (a*1).toFixed(1)
        }

      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      beforeAvatarUpload(file){
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg.toLowerCase() === 'pdf'
        const isLt2M = file.size / 1024 / 1024 < 10
        if(!extension) {
          this.fileList=[]
          this.$message({
            message: '上传文件只能是 pdf、PDF格式!',
            type: 'warning'
          });
        }
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 10MB!',
            type: 'warning'
          });
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList = fileList
      },
      handlePreview(file) {
//        window.open(SERVER_NAME+"/Users/zongtong/Desktop/get_pdf/795c03963fdb46438f68453e1b5b994e.xlsx")
        console.log(file);
      },
      uploadUrl(){
          return SERVER_NAME+"/base/dnafile/singleUpload"
      },
      handleAvatarSuccess(res, file,fileList) {
          this.addCodeForm.dnaCheckFilepath=res.data.filePath
           console.log(fileList,1)
          this.fileList = fileList
      },
      // showPDF(dnaCheckFilePath){
      //   window.open(dnaCheckFilePath)
      // },
      showDatas(id){
          this.uploadDialog = true
          this.showData1 = true
        $axios_http({
          url: "/base/partytest/querybyid",
          data: {
            id:id
          },
          vueObj: this
        }).then((res) => {
          console.log(res,1)
          this.addCodeForm. dnaCheckResult= res.data.data.dnaCheckResult
          this.addCodeForm. dnaCheckQuantum= res.data.data.dnaCheckQuantum
          this.addCodeForm. dnaCheckGoal= res.data.data.dnaCheckGoal
          this.fileList =[]
          this.fileList.push({
            name:'点击查看',
            url:res.data.data.dnaCheckFilepath
          })
          console.log(this.fileList)
        })
      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    background: #fff;
    padding: 10px;
  }

  .checkbox {
    display: block;
    margin-left: 20px;
    font-weight: normal;
  }

  .btnStyle {
    padding-left: 10px;
  }

  .return-home {
    display: block;
    text-align: center;
    float: left;
    margin-bottom: 20px;
  }

  .table-btn-grooup {
    margin-bottom: 10px;
  }

  .subjectsName {
    position: relative;
  }

  .corner {
    width: 20px;
    height: 20px;
    line-height: 20px;
    position: absolute;
    right: 10px;
    top: 0px;
    display: block;
    border-radius: 10px;
    text-align: center;
    background: #f56a00;
    color: #fff;
  }

  .lineWidth {
    width: 50%;
  }

  .filter-item {
    width: 200px;
    margin-right: 10px;
  }
</style>
