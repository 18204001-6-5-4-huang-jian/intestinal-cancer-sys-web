<template>
  <div class="zindex" v-if="page_department_update">
    <div class="contentMain">
      <el-form :model="updateForm" :rules="rules" ref="updateForm">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="updateForm.name" auto-complete="off" size="small" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-radio-group v-model="updateForm.type">
            <el-radio v-for="item in departmentTypeList" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="筛查现场" :label-width="formLabelWidth" >
          <el-select v-model="updateForm.screeningType" placeholder="请选择" clearable @clear="clearScreeningType"  size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="浙江"></el-option>
            <el-option value="2" v-bind:key="2" label="安徽"></el-option>
            <el-option value="3" v-bind:key="3" label="徐州"></el-option>
            <el-option value="4" v-bind:key="4" label="湖南"></el-option>
            <el-option value="5" v-bind:key="5" label="云南"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" >
          <el-input v-model="updateForm.desc" auto-complete="off" size="small" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="上级机构" :label-width="formLabelWidth" prop="pName">
          <el-input v-model="updateForm.pName" auto-complete="off" size="small" class="inputWidth" placeholder="请选择上级部门" @click.native="getDepartmentDataFun"
                    :disabled="true"></el-input>
          <el-dialog title="机构树" :visible.sync="deptDialog" :modal-append-to-body="false" @open="dialogOpen">
            <el-tree
              :data="pidDataFun"
              check-strictly
              node-key="id"
              :highlight-current=this.highlight
              :default-expanded-keys=this.deptArr
              :current-node-key=this.curDept
              :default-checked-keys="[updateForm.pId]"
              ref="tree"
              @node-click="handleNodeClick2"
              :props="defaultProps">
            </el-tree>
            <el-row>
              <el-col :span="22">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="deptDialog = false" size="small" style="margin-top:6px">确 定</el-button>
              </el-col>
            </el-row>
          </el-dialog>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="updateForm.sort" auto-complete="off" size="small" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="9"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="10">
              <router-link to="/departments/departmentList" size="small">
                <el-button>返 回</el-button>
              </router-link>
              <el-button type="primary" @click="update('updateForm')">确 定</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

    </div>

  </div>

</template>
<script>
  import Vue from 'vue'

  export default {
    name: 'Right',

    data() {
      var checkScreeningType = (rule, value, callback) => {

      };
      return {
        deptDialog:false,
        highlight:true,
        curDept:'',
        deptArr:[],
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 1, max: 32, message: '长度在1到32个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择类型', trigger: 'change'}
          ],
          pName: [
            {required: true, message: '请选择上级机构', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请输入描述', trigger: 'blur'},
            {min: 1, max: 64, message: '长度在1到64个字符', trigger: 'blur'}
          ]
        },

        departmentTypeList: [],
        departmentArr: [],
        HOUSEHOLD_REGISTRATION_TYPE: [],
        page_department_update: false,
        popover1Visible: false,
        popover2Visible: false,
        pidData: null,
        defaultProps: {
          children: 'child',
          label: 'name'
        },
        cityprops: {
          value: 'value',
          label: 'label',
          children: 'children'
        },
        pidDataFun: [],
        btnAuth: {
          buttonDepartmentAddSave: false
        },
        updateForm: {
          name: '',
          type: '',
          desc: '',
          level: '',
          pId: '',
          pName: '',
          sort: null,
          screeningType:null
        },
        formLabelWidth: '130px'
      }
    },
    mounted() {
      let obj = this.checkPageAuth(this, "page_department_update", this.btnAuth);
      //this.employeeQuery()

      $axios_http({
        url: '/base/department/get/' + this.$route.query.id,
        vueObj: this
      }).then((res) => {
        console.log("Get departments type response.")
//        console.log(res.data)
        res.data.data.pName = ""
        res.data.data.type = res.data.data.type + ""
        this.updateForm = res.data.data
        if(res.data.data.pId==0){
          this.updateForm.pId=0;
          this.updateForm.pName='根节点，不能改'
        }else{
          this.updateForm = res.data.data
        }
        if (this.updateForm.pId > 0) {
          $axios_http({
            url: '/base/department/get/' + this.updateForm.pId,
            vueObj: this
          }).then((res) => {
            console.log("Get departments[" + this.updateForm.pId + "] info.")
            console.log(this.updateForm)
            this.updateForm.pName = res.data.data.name
          })
        }
      })
      this.baseInfoId = this.$route.query.id;
      $axios_http({
        url: "/base/department/query",
        data: {
          pageSize: -1//每页条数
        },
        vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
      }).then((res) => {
        console.log('Render departments list')
//        console.log(res)
        this.departmentData = res.data.data
//        console.log(this.departmentData)
//        console.log(this.departmentArr, 1111111)
        this.departmentData.forEach((item, id) => {
//          console.log(item)
          this.departmentArr[item.name] = item.id
        })
      })
      //初始化“部门类型”下拉菜单数据
      $axios_http({
        url: "/base/dictionary/query",
        data: {
          key: "DEPARTMENT_TYPE",
          pageSize: -1//每页条数
        },
        vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
      }).then((res) => {
        console.log("Init departments type select data list.")
        console.log(res)
        this.departmentTypeList = res.data.data
        console.log(this.departmentTypeList)
      })
    },
    methods: {
      //获取除了本部门外的其他部门
      getDepartmentDataFun() {
        this.deptDialog=true;
        $axios_http({
          url: "/base/department/getOtherDepart/" + this.$route.query.id,
          data: {},
          vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
        }).then((res) => {
          if(this.updateForm.pName){
            this.deptArr=[]
            var arr=[];
            this.updateForm.pId=this.updateForm.pId+''
            arr.push(this.updateForm.pId)
            this.deptArr=arr
//            console.log(this.deptArr)
            this.curDept=this.updateForm.pId
          }
          console.log('获取父节点的数据')
//          console.log(res.data.data)
          var arrayList = new Array();
          arrayList.push(res.data.data)
          this.pidData = arrayList
//          console.log(res)
//          console.log(arrayList, arrayList.length, "AAA")
          if (res.data.data.id == null) {
            var obj = new Object();
            obj.name = "容联云通讯";
            obj.id = 0;
            obj.level = 0;
            obj.pId = 0;
            obj.sort = 1;
            obj.type = 2;
            arrayList[0]=obj
          } else {
            this.pidDataFun = arrayList
          }

          this.$nextTick().then(()=>{
            this.$refs.tree.setCurrentKey(this.updateForm.pId);
          })
        })
      },
      getDepartmentData() {
        $axios_http({
          url: "/base/department/getTree",
          data: {},
          vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
        }).then((res) => {
          console.log('获取父节点的数据')
          console.log(res.data.data.child)

          var arrayList = new Array();
          arrayList.push(res.data.data)
          this.pidData = arrayList
          console.log(res)
        })
        //alert(1)
      },
      handleNodeClick2(data) {   //部门更新页面 点击事上级部门树中节点时，调用该方法
        this.updateForm.pId = data.id
        this.updateForm.pName = data.name
        this.updateForm.level = data.level + 1
        this.popover2Visible = false
      },
      update(formName) { //点击 部门编辑 页面 保存 按钮，调用该方法
        this.$refs[formName].validate((valid) => {
          console.log(this.updateForm.pName)
          if (valid) {
            if(this.updateForm.type==2&&!this.updateForm.screeningType){
              $failMsg(this, "类型为“地区医院”时，请选择“筛查现场”。")
              return
            }
            console.log(this)
            $axios_http({
              url: '/base/department/update',
              data: this.updateForm
            }).then((res) => {

              console.log("Update departments type response.")
              $successMsg(this, "编辑成功")
              this.$router.push({path: '/departments/departmentList'})
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      dialogOpen(){ //当对话框加载完毕后，设置菜单中被选中的节点

      },
      clearScreeningType(){ //清除筛查现场数据后，需手动赋值null，不然提交到后台是空串；
        this.updateForm.screeningType = null;
      }
    }
  }

</script>
<style scoped>
  .selectWidth {
    width: 100%;
  }

  .dialogBtn {
    position: absolute;
    right: 20px;
    bottom: 10px;
  }

  .tab {
    margin-top: 15px;
  }
  .el-tree{
    height: 500px !important;
    overflow-y: scroll;
  }
</style>
