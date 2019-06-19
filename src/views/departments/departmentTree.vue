<template>
  <div v-if="page_department_tree_operation" class="contMain">
    <el-dialog :visible.sync="dialogTree">
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

          <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input v-model="addForm.sort" auto-complete="off" size="small" class="inputWidth"></el-input>
          </el-form-item>
        </el-form>

        <div class="dialogBtn">
          <el-button @click="dialogTree=false" size="small">关闭</el-button>
          <el-button type="primary" @click="add('addForm')" size="small" v-if="btnAuth.buttonDepartmentAddSave">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogTreeUpdate">
      <el-form :model="updateForm" :rules="rules" ref="updateForm">
        <el-form-item label="医院" :label-width="formLabelWidth" prop="name">
          <el-input v-model="updateForm.name" auto-complete="off" size="small" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-radio-group v-model="updateForm.type">
            <el-radio v-for="item in departmentTypeList" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="筛查现场" :label-width="formLabelWidth" >
          <el-select v-model="updateForm.screeningType" placeholder="请选择分组方案" clearable @clear="clearScreeningType" size="small" class="filter-item">
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
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="updateForm.sort" auto-complete="off" size="small" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="dialogBtn">
             <el-button @click="dialogTreeUpdate=false" size="small">关闭</el-button>
            <el-button type="primary" @click="updateDepart('updateForm')" size="small">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogParentNodeUpdate">
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
      <div class="dialogBtn">
        <el-button  @click='dialogParentNodeUpdate=false' size="small" >关闭</el-button>
        <el-button type="primary" @click='replaceParentNode' size="small" style="margin-top:6px">确 定</el-button>
      </div>
    </el-dialog>
    <el-tree :data="data5" node-key="id"  :expand-on-click-node="false" :props="defaultProps" :default-expanded-keys='expandedKeys'>
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="btnPosition">
          <el-button type='text' size="mini" @click="() => append(data)" icon="el-icon-plus" title="添加医院" v-if="btnAuth.departTreeNodePlusBtn">

          </el-button>
          <el-button  type='text' size="mini" @click="() => remove(node, data)" icon="el-icon-delete" title="删除医院" v-if="btnAuth.departTreeDelBtn">

          </el-button>
          <el-button  type='text' size="mini" @click="() => update( data)" icon="el-icon-edit" title="编辑医院" v-if="btnAuth.departTreeUpdateBtn">

          </el-button>
          <el-button  type='text' size="mini" @click="() => editDepart( data)" icon="el-icon-edit-outline" title="选择上级机构" v-if="btnAuth.departTreeEditBtn">

          </el-button>
          <el-button type="text" size="mini" title="分配医生到医院" icon="el-icon-setting"
                     @click="memberManage(data)" v-if="btnAuth.departTreeManageBtn"></el-button>
          <el-button type="text" size="mini" title="设置医生职位" icon="el-icon-menu"
                      @click="setMemberPost(data)" v-if="btnAuth.departTreeMemberBtn"></el-button>
        </span>
      </span>
    </el-tree>
    <div style="width:100%;padding-left:80%;padding-top:30px">
      <router-link to="/departments/departmentList" size="small">
        <el-button size="small">返 回</el-button>
      </router-link>
    </div>
    <div class="panel-body">
      <!--成员关系弹出框-->
      <el-dialog title="分配医生到医院" :visible.sync="memberFormVisible">
        <el-transfer
          v-model="rightBoxData"
          filterable
          :titles="['所有医生', '本医院医生']"
          :footer-format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
          @change="handleChange"
          :data="companyEmployees"
          :props="{
              key: 'id',
              label: 'name'
            }"
        >

        </el-transfer>
        <!--<div slot="footer" class="dialog-footer">
          <el-button @click="memberFormVisible = false">关闭</el-button>
          <el-button type="primary"  @click="add">确 定</el-button>
        </div>-->
      </el-dialog>

      <!--成员岗位设置弹出框-->
      <el-dialog title="医生职位设置" :visible.sync="memberPostSettingVisible">
        <!--主体表格结构-->
        <div class="row" style="margin-top: 10px">
          <template>
            <el-table
              class="testpage"
              :data="departmentMembers"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
              >
              </el-table-column>
              <el-table-column
                label="职位">
                <template slot-scope="scope">
                  <el-select @change="handleDepartmentPostChange(scope.row)" v-model="scope.row.position"
                             filterable>
                    <el-option v-for='item in departmentPostList' :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  let id=10000;
  export default {

    data(){
      let id = 1000;
      return {
        dialogTree:false,
        dialogTreeUpdate:false,
        dialogParentNodeUpdate:false,
        deptArr:['1'],
        expandedKeys:['1'],
        data5: [],
        departTreeDefaultexpandedKeys:[],//页面树默认展开的值
        page_department_tree_operation:false,
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
            {required: true, message: '请输入描述', trigger: 'blur'},
            {min: 1, max: 64, message: '长度在1到64个字符', trigger: 'blur'}
          ]
        },
        SEX: [],
        MARITAL_STATUS: [],
        POLITICAL: [],
        pickerOptions0: {},
        allCitys: [],
        houseReg_City: [],
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
          departTreeNodePlusBtn:false,
          departTreeDelBtn:false,
          departTreeUpdateBtn:false,
          departTreeEditBtn:false,
          buttonDepartmentAddSave: false,
          departTreeManageBtn:false,
          departTreeMemberBtn:false
        },
        pageMemberManage:false,
        pageSetMember:false,
        memberFormVisible:false,
        memberPostSettingVisible:false,
        companyEmployees: [],
        departmentMembers: [],
        rightBoxData: [],
        currentDeptId: '',
        departmentTypeList: [],
        departmentPostList: [],
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
        formLabelWidth: '130px',
        departmentArr: [],
        page_department_update: false,
        popover2Visible: false,
        pidDataFun: [],
        updateForm: {
          name: '',
          type: '',
          desc: '',
          level: '',
          pId: '',
          pName: '',
          sort: null,
          screeningType:null
        }

      }
    },
    mounted(){
      let obj = this.checkPageAuth(this, "page_department_tree_operation", this.btnAuth);
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
      this.queryDepartmentTree()
    },
    methods:{
      handleChange(value, direction, movedKeys) {  //成员管理穿梭框右侧窗口中的数据变化时调用该方法
        //部门添加成员
        if (direction == "right") {
          console.log("Insert member.");
          var insertObj = {"deptId": "", "userId": "", "position": ""};
          this.insertData = [];
          for (var i = 0; i < movedKeys.length; i++) {
            var insertObj = {"deptId": "", "userId": "", "position": ""};
            insertObj['deptId'] = this.currentDeptId;
            insertObj['userId'] = movedKeys[i];
            insertObj['position'] = 3;
            this.insertData.push(insertObj);
            console.log("Insert member[" + movedKeys[i] + "].");
          }
          console.log(this.insertData);
          $axios_http({
            url: '/base/department/member/save',
            data: this.insertData,
            vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
          }).then((res) => {
            console.log(res)
          })
          //部门删除成员
        } else if (direction == "left") {
          console.log("Delete member.");
          this.deleteData = [];
          for (var i = 0; i < movedKeys.length; i++) {
            this.deleteData.push(movedKeys[i])
            console.log("Delete member[" + movedKeys[i] + "].");
          }
          $axios_http({
            url: '/base/department/member/delete',
            data: this.deleteData,
            vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
          }).then((res) => {
            console.log(res)
          })
        }
      },
      memberManage(data) {
        let obj = this.checkPageAuth(this, "pageMemberManage", this.btnAuth)
        if(this.pageMemberManage) {
          console.log("Pop Member manage page.")
          this.memberFormVisible = true
          console.log(data)
          this.currentDeptId = data.id
          this.insertData = [];
          this.deleteData = [];
          this.rightBoxData = [];
          this.companyEmployees = [];

          //获取公司所有员工
          $axios_http({
            url: '/base/employee/notExists/department/query',
            data: {
              "name": null,
              "departId": null,
              "positionId": null,
              "pageSize": -1
            },
            vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
          }).then((res) => {
            console.log("Query all company employees.")
            console.log(res)
            console.log(data.id)
            this.companyEmployees = res.data.data
            $axios_http({
              url: '/base/department/member/get/' + data.id,
              data: {
                "name": null,
                "departId": null,
                "positionId": null,
                "pageSize": -1
              },
              vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
            }).then((res) => {
              console.log("Get departments:" + data.name + " employees.")
              console.log(res)
              this.rightBoxData = [];
              var departmentEmployees = res.data.data
              for (var j = 0; j < departmentEmployees.length; j++) {
                this.rightBoxData.push(departmentEmployees[j].id)
                this.companyEmployees.push(departmentEmployees[j])
              }
              //this.companyEmployees = companyEmployeesArr.concat(departmentEmployees)
              console.log(this.rightBoxData)

            })
          })
        }
      },
      setMemberPost(data) {
        let obj = this.checkPageAuth(this, "pageSetMember", this.btnAuth)
        $axios_http({
          url: "/base/dictionary/query",
          data: {
            key: "DEPARTMENT_POST",
            pageSize: -1//每页条数
          },
          vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
        }).then((res) => {
          console.log("Init departments post select data list.")
          console.log(res)
          this.departmentPostList = res.data.data
        })
        if(this.pageSetMember){
          console.log("Pop Member post setting page.")
          this.memberPostSettingVisible = true
          this.currentDeptId = data.id
          //获取部门成员
          $axios_http({
            url: '/base/department/member/get/' + data.id,
            data: {
              "pageSize": -1
            },
            vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
          }).then((res) => {
            console.log("Get departments:" + data.name + " employees.")
            console.log(res)
            /* res.data.data[0].position = ""
             res.data.data[1].position =null
             res.data.data[2].position = undefined*/
            this.departmentMembers = res.data.data
            console.log(this.departmentMembers)
            //this.position=res.data.data[0].position+""
          })
        }else{
          Message.error('抱歉，您没有该权限！')
        }
      },
      handleDepartmentPostChange(data) {
        data.position = data.position + ''
        console.log(data, 'BBB')
        $axios_http({
          url: '/base/department/member/update',
          data: {
            "memberId": data.memberId,
            "deptId": data.deptId,
            "employeeId": data.id,
            "position": data.position
          },
          vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
        }).then((res) => {
          console.log("Set member:" + data.name + " position to " + data.position + ".")
          console.log(res)
        })
      },
      queryDepartmentTree(){
        $axios_http({
          url: "/base/department/getTree",
          data: {},
          vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
        }).then((res) => {
          console.log('获取父节点的数据')
          console.log(res.data.data)
          this.data5=[];
          this.data5.push(res.data.data);
          this.data5=JSON.parse(JSON.stringify(this.data5))
        })
      },
      handleNodeClick1(data) {  //部门添加页面 点击事上级部门树中节点时，调用该方法
        this.addForm.pId = data.id
        this.addForm.pName = data.name
        this.addForm.level = data.level + 1
        this.popover1Visible = false
      },
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
            obj.name = "容联云通讯";
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
      },
      append(data) {
        this.dialogTree=true;
        //console.log('111');
        this.addForm.pId=data.id;
        this.addForm.pName=data.name;
        this.addForm.level = data.level + 1
        //console.log(data)
        this.expandedKeys=[data.id];

      },
      remove(node, data) {
        this.$confirm('确认删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $axios_http({
            url: '/base/department/delete/' + data.id,
            vueObj: this
          }).then((res) => {
            console.log(res)
            console.log("Delete departments  response.")
            //this.query()
            $successMsg(this, "删除成功")
            const parent = node.parent;
            const children = parent.data.child || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

      },
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
              this.dialogTree=false;
              this.data5=[];
              $axios_http({
                url: "/base/department/getTree",
                data: {},
                vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
              }).then((res) => {
                console.log('获取父节点的数据')
                console.log(res.data.data)
                this.data5.push(res.data.data);
                this.data5=JSON.parse(JSON.stringify(this.data5))
              });

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      updateDepart(formName){

        this.$refs[formName].validate((valid) => {
          console.log(this.updateForm)
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

              this.dialogTreeUpdate=false;
              console.log("Update departments type response.")
              $successMsg(this, "编辑成功")
              this.queryDepartmentTree();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

//        $axios_http({
//          url: '/base/department/update',
//          data: this.updateForm
//        }).then((res) => {
//          console.log("Update departments type response.")
//          console.log(this.updateForm)
//          $successMsg(this, "编辑成功")
//          this.queryDepartmentTree();
//          //this.$router.push({path: '/departments/departmentList'})
//        })
      },
      update(data){
        this.dialogTreeUpdate=true;
        $axios_http({
          url: '/base/department/get/' + data.id,
          vueObj: this
        }).then((res) => {
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
      },
      editDepart(data) {
        this.dialogParentNodeUpdate=true;
        $axios_http({
          url: '/base/department/get/' + data.id,
          vueObj: this
        }).then((res) => {
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

          $axios_http({
            url: "/base/department/getOtherDepart/" + data.id,
            data: {},
            vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
          }).then((res) => {
            if(this.updateForm.pName){
              this.deptArr=[]
              var arr=[];
              this.updateForm.pId=this.updateForm.pId+''
              arr.push(this.updateForm.pId)
              this.deptArr=arr;
              this.curDept=this.updateForm.pId
            }
            console.log('获取父节点的数据')
            var arrayList = new Array();
            arrayList.push(res.data.data)
            this.pidData = arrayList;
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

        })

      },
      handleNodeClick2(data) {   //部门更新页面 点击事上级部门树中节点时，调用该方法
        this.updateForm.pId = data.id
        this.updateForm.pName = data.name
        this.updateForm.level = data.level + 1
        console.log(data)
        this.departTreeDefaultexpandedKeys=[data.id];
        //this.expandedKeys=[data.id];

      },
      replaceParentNode(){
        this.dialogParentNodeUpdate=false;
        console.log('updateForm');
        console.log(this.updateForm);
        $axios_http({
          url: '/base/department/update',
          data: this.updateForm
        }).then((res) => {
          console.log("Update departments type response.")
          this.queryDepartmentTree();
          $successMsg(this, "部门迁移成功")
          //this.$router.push({path: '/departments/departmentList'})
          this.expandedKeys=this.departTreeDefaultexpandedKeys;
        })
      },
      clearScreeningType(){ //清除筛查现场数据后，需手动赋值null，不然提交到后台是空串；
        this.updateForm.screeningType = null;
        this.addForm.screeningType = null;
      }
    }
  }
</script>
<style scoped="scoped">
  .contMain{
    width: 60%;
    position: relative;
  }
  .btnPosition{
    position: absolute;right:10%;
  }
  .dialogBtn{
    padding-left:70%;
    padding-bottom:20px;
  }
</style>
