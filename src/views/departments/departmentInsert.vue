<template>
  <div class="zindex" v-if="page_department_add">
    <div class="contentMain">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" auto-complete="off" size="small" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-radio-group v-model="addForm.type">
            <el-radio v-for="item in departmentTypeList" :key="item.value" :label="item.value">{{item.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="筛查现场" :label-width="formLabelWidth" >
          <el-select v-model="addForm.screeningType" placeholder="请选择分组方案" clearable @clear="clearScreeningType" size="small" class="filter-item">
            <el-option value="1" v-bind:key="1" label="浙江"></el-option>
            <el-option value="2" v-bind:key="2" label="安徽"></el-option>
            <el-option value="3" v-bind:key="3" label="徐州"></el-option>
            <el-option value="4" v-bind:key="4" label="湖南"></el-option>
            <el-option value="5" v-bind:key="5" label="云南"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" >
          <el-input v-model="addForm.desc" auto-complete="off" size="small" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="上级机构" :label-width="formLabelWidth" prop="pName">
          <el-input v-model="addForm.pName" auto-complete="off" size="small" disabled placeholder="请选择"
                     @click.native="getDepartmentData" class="inputWidth"></el-input>
          <el-dialog title="机构结构" :visible.sync="deptDialog" :modal-append-to-body="false">
            <el-tree
              :data="pidData"
              :highlight-current=this.highlight
              :default-expanded-keys="['1']"
              :current-node-key=this.curDept
              :default-checked-keys="[]"
              check-strictly
              node-key="id"
              :props="defaultProps"
              @node-click="handleNodeClick1"
            >
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
          <!--<el-popover
            ref="popover1"
            placement="left-start"
            width="400"
            v-model="popover1Visible"
            trigger="click">
            &lt;!&ndash;父节点树形结构&ndash;&gt;
            <el-tree
              :data="pidData"
              default-expand-all
              :default-checked-keys="[]"
              check-strictly
              node-key="id"
              :props="defaultProps"
              @node-click="handleNodeClick1"
            >
            </el-tree>
          </el-popover>-->
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="addForm.sort" auto-complete="off" size="small" class="inputWidth"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="9"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="10">
          <div class="dialogBtn">
            <router-link to="/departments/departmentList" size="small">
              <el-button>返 回</el-button>
            </router-link>
            <el-button type="primary" @click="add('addForm')" v-if="btnAuth.buttonDepartmentAddSave">确 定</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import router from '../../router';

  Vue.filter("departmentFilter", (val) => {

  })
  Vue.filter("showData", (val) => {
    if (val == undefined) {
      return "请选择"
    } else {
      return val
    }
  })
  export default {
    name: 'Right',
    data() {
      return {
        deptDialog:false,
        highlight:true,
        curDept:'',
        //查询条件
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
            {required: true, message: '请输入机构描述', trigger: 'blur'},
            {min: 1, max: 64, message: '长度在1到64个字符', trigger: 'blur'}
          ]
        },
        SEX: [],
        MARITAL_STATUS: [],
        POLITICAL: [],
        pickerOptions0: {},
        allCitys: [],
        houseReg_City: [],
        departmentTypeList: [],
        HOUSEHOLD_REGISTRATION_TYPE: [],
        page_department_add: false,
        popover1Visible: false,
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
        btnAuth: {
          buttonDepartmentAddSave: false
        },
        addForm: {
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
      let obj = this.checkPageAuth(this, "page_department_add", this.btnAuth);
      this.initDictData('SEX')
      this.initDictData('HOUSEHOLD_REGISTRATION_TYPE')
      this.initDictData('MARITAL_STATUS')
      this.initDictData('POLITICAL')
     /* $axios_http({
        url: "/base/employee/area/province",
        vueObj: this
      }).then((res) => {
        console.log('query all region')
        console.log(res)
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].children = new Array()
        }
        this.allCitys = res.data.data
        console.log(this.allCitys)
      })*/
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
      add(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.addForm)

            if(this.addForm.type==2&&!this.addForm.screeningType){
              $failMsg(this, "类型为“地区医院”时，请选择“筛查现场”。")
              return
            }
            $axios_http({
              url: '/base/department/insert',
              data: this.addForm,
              vueObj: this
            }).then((res) => {
              console.log('add返回')
              console.log(res)
              Object.assign(this.$data.addForm, this.$options.data().addForm)
              $successMsg(this, '添加成功了')
              this.$router.push({path: '/departments/departmentList'})
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //查询
      initDictData(type) {
        console.log("Init dict data for key [" + type + "].")
        $axios_http({
          url: "/base/dictionary/query",
          data: {
            key: type,
            pageSize: -1//每页条数
          },
          vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
        }).then((res) => {
          console.log("Init dict data for key [" + type + "] response.")
          console.log('数据字典')
          console.log(res)
          this[type] = res.data.data
        })
      },
      //获取部门数据
      getDepartmentData() {
        this.deptDialog=true;
        if(this.addForm.pId){
          this.deptArr=[]
          var arr=[];
          this.addForm.pId=this.addForm.pId+''
          arr.push(this.addForm.pId)
          this.deptArr=arr
          console.log(this.deptArr)
          this.curDept=this.addForm.pId
        }
        $axios_http({
          url: "/base/department/getTree",
          data: {},
          vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
        }).then((res) => {
          console.log('获取父节点的数据')
          console.log(res.data.data)
          var arrayList = new Array();
          arrayList.push(res.data.data)
          this.pidData = arrayList
          console.log(res)
          console.log(arrayList, arrayList.length, "AAA")
          if (res.data.data.id == null) {
            var obj = new Object();
            obj.name = "筛查系统";
            obj.id = 0;
            obj.level = 0;
            obj.pId = 0;
            obj.pName = null;
            obj.sort = 1;
            obj.type = 1;
            arrayList[0]=obj
          } else {
            this.pidDataFun = arrayList
          }

        })
        //alert(1)
      },
      handleNodeClick1(data) {  //部门添加页面 点击事上级部门树中节点时，调用该方法
        this.addForm.pId = data.id
        this.addForm.pName = data.name
        this.addForm.level = data.level + 1
        this.popover1Visible = false
      },
      clearScreeningType(){ //清除筛查现场数据后，需手动赋值null，不然提交到后台是空串；
        this.addForm.screeningType = null;
      }
    }
  }

</script>
<style>
  .el-input__inner{
    background-color:#fff !important;
  }
  .el-tree{
    height: 500px !important;
    overflow-y: scroll;
  }
</style>

