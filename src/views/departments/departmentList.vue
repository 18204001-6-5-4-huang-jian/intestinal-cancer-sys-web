<template>
  <div slot="right" class="content-page" v-if="page_departmentList">
    <div class="content">
      <div class="filter-container">
        <el-form :model="queryForm" :inline="true">
          <el-input style="width: 200px;" size="small" class="filter-item" placeholder="名称" v-model="queryForm.name"
                    v-if="btnAuth.buttonDepartmentQuery"></el-input>
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="query"
                     v-if="btnAuth.buttonDepartmentQuery">查询
          </el-button>
          <router-link to="/departments/departmentInsert">
            <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" v-if="btnAuth.buttonDepartmentAdd">
              添加
            </el-button>
          </router-link>
          <el-button class="filter-item" type="primary" size="small" icon="el-icon-close" @click="reset"
                     v-if="btnAuth.buttonDepartmentQuery">重置
          </el-button>
          <router-link to="/departments/departmentTree">
            <el-button class="filter-item" size="small" type="primary" icon="el-icon-info" v-if="btnAuth.buttonDepartmentTree">
              组织架构
            </el-button>
          </router-link>
        </el-form>
        <div class="row" style="margin-top: 10px">
          <template>
            <el-table
              :data="departmentData"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                width="100"
                label="序号"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
              >
              </el-table-column>
              <el-table-column
                prop="DEPARTMENT_TYPEDisplayName"
                label="类型">
              </el-table-column>
              <el-table-column
                prop="screeningTypeDisplayName"
                label="筛查场地">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="描述">
              </el-table-column>
              <el-table-column
                prop="operation"
                label="操作">
                <template slot-scope="scope">
                  <router-link :to="{path:'/departments/departmentUpdate',query:{id:scope.row.id}}">
                    <el-button type="text" icon="el-icon-edit" title="编辑" size="small" class="iconPadding" v-if="btnAuth.buttonDepartmentEdit"></el-button>
                  </router-link>
                  <el-button type="text" title="删除" @click="handleDelete(scope.row)" icon="el-icon-delete"
                             size="small" v-if="btnAuth.buttonDepartmentDel"></el-button>
                  <el-button type="text" title="用户管理" icon="el-icon-setting" size="small"
                             @click="memberManage(scope.row)" v-if="btnAuth.buttonMemberManage"></el-button>
                  <el-button type="text" title="设置用户岗位" icon="el-icon-menu" size="small"
                             @click="setMemberPost(scope.row)" v-if="btnAuth.buttonSetMember"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <!--分页栏-->
        <el-row>
          <el-col :span="10">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="10">
            <div class="block" style="margin-top: 18px">
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="this.$store.state.departmentPageNo"
                :page-sizes="[10, 20, 50, 100]"
                v-bind:page-size="this.$store.state.departmentPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                v-bind:total="queryResult.totalRowCount">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
        <router-view></router-view>
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
        <el-dialog title="成员岗位设置" :visible.sync="memberPostSettingVisible">
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
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'Right',
    data() {
      return {
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
            {required: true, message: '请输入医院描述', trigger: 'blur'},
            {min: 1, max: 64, message: '长度在1到64个字符', trigger: 'blur'}
          ]
        },
        pageMemberManage:false,
        pageSetMember:false,
        page_departmentList: false,
        btnAuth: {
          buttonDepartmentAdd: false,
          buttonDepartmentEdit: false,
          buttonDepartmentDel: false,
          buttonDepartmentQuery: false,
          buttonMemberManage: false,
          buttonSetMember:false,
          buttonDepartmentTree:false
        },
        departmentData: [{
          name: '',
          desc: '',
          id: '',
          level: '',
          pId: '',
          sort: '',
          type: ''
        }],
        formLabelWidth: '100px',
        //查询数据表单对象
        queryForm: {
          name: ''
        },
        idGet: "",
        //查询结果
        queryResult: {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
          "tableData": []
        },
        departmentTypeList: [],
        departmentPostList: [],
        departmentPost: null,
        insertData: [],
        deleteData: [],
        popover1Visible: false,
        popover2Visible: false,
        dialogFormVisible: false,
        updateDialogVisible: false,
        memberPostSettingVisible: false,
        buttonDisabled: false,
        memberFormVisible: false,
        pidData: null,
        pidDataFun: null,//上级父节点的数据
        defaultProps: {
          children: 'child',
          label: 'name'
        },
        companyEmployees: [],
        departmentMembers: [],
        rightBoxData: [],
        currentDeptId: '',
        renderFunc(h, option) {
          console(option)
          return 111;
          //return ('<span>{ option.key} - { option.label }</span>');
        }

      }
    },
    props: [],
    mounted() {
      let obj = this.checkPageAuth(this, "page_departmentList", this.btnAuth);
      console.log("Query departments type event.")
      console.log(this)
      this.query();

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
      //初始化“部门岗位”下拉菜单数据
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
    },
    methods: {
      dialogFormVisibleFn(formName) {
        this.dialogFormVisible = true
        //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
        this.$nextTick(function () {
          this.$refs[formName].resetFields();
        })
      },
      query() {
        console.log("Query departments type event.")
        $axios_http({
          url: "/base/department/query",
          data: {
            name: this.queryForm.name,
            isTranslate:true,
            pageNo: this.$store.state.departmentPageNo,//当前页
            pageSize: this.$store.state.departmentPageSize//每页条数
          },
          vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
        }).then((res) => {
          console.log('查询部门数据')
          console.log(res)
          this.departmentData = res.data.data
          this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount//获取总共多少页
          this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount//获取总共条数
        })
      },
      changeType() {
        console.log("")
      },
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
      //部门成员管理
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
      //设置成员岗位
      setMemberPost(data) {
        let obj = this.checkPageAuth(this, "pageSetMember", this.btnAuth)
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
      //查询事件
      queryEvent() {
      },
      //重置查询表单数据 清除为空
      reset() {
        console.log("Clear query conditions.")
        Object.assign(this.$data.queryForm, this.$options.data().queryForm)
        this.query()
      },
      //获取除了本部门外的其他部门
      getDepartmentDataFun() {
        $axios_http({
          url: "/base/department/getOtherDepart/" + this.idGet,
          data: {},
          vueObj: this//将当前VUE对象传递给发送请求上一层代码，便于对当前页面做操作
        }).then((res) => {
          console.log('获取父节点的数据')
          console.log(res.data.data.child)

          var arrayList = new Array();
          arrayList.push(res.data.data)
          this.pidDataFun = arrayList
          console.log(res)
        })
      },
      //获取部门数据
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
      //部门编辑事件
      handleEdit(id) {
        this.idGet = id
        $axios_http({
          url: '/base/department/get/' + id,
          vueObj: this
        }).then((res) => {
          this.updateDialogVisible = true
          console.log("Get departments type response.")
          console.log(res.data)
          res.data.data.pName = ""
          res.data.data.type = res.data.data.type + ""
          this.updateForm = res.data.data
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
      handleDelete(row) {
        console.log(row.id)
        this.$confirm('确认删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row.id);
          $axios_http({
            url: '/base/department/delete/' + row.id,
            vueObj: this
          }).then((res) => {
            console.log(res)
            console.log("Delete departments  response.")
            this.query()
            $successMsg(this, "删除成功")
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //获取部门Id
      getDepartId(id) {
        console.log()
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        //this.queryResult.pageSize = pageSize
        this.$store.commit('get_departmentPageSize',pageSize)
        console.log(`每页 ${pageSize} 条`)
        this.query()
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        //this.queryResult.pageNo = currentPage
        this.$store.commit('get_departmentPageNo',currentPage)
        console.log(`当前页: ${currentPage}`);
        this.query()
      },
      handleNodeClick1(data) {  //部门添加页面 点击事上级部门树中节点时，调用该方法
        this.addForm.pId = data.id
        this.addForm.pName = data.name
        this.addForm.level = data.level + 1
        this.popover1Visible = false
      },
      handleNodeClick2(data) {   //部门更新页面 点击事上级部门树中节点时，调用该方法
        this.updateForm.pId = data.id
        this.updateForm.pName = data.name
        this.updateForm.level = data.level + 1
        this.popover2Visible = false
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
      closeInsertDialog() {
        Object.assign(this.$data.addForm, this.$options.data().addForm)
      },
      closeUpdateDialog() {
        Object.assign(this.$data.updateForm, this.$options.data().updateForm)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  /* .isremove{
     padding:0 0 15px 50px;
     font-size: 16px;
     font-weight: bolder;
   }
   .removeBox{
     overflow: hidden;
   }
   .isSure{
     position: absolute;right:20px;bottom: 10px;
   }
   .sure{
     font-size: 14px;
     margin-left: 10px;
   }
   .el-dialog__title{
     float:left !important;
   }
   .text-right{
     margin-bottom: 15px;
   }*/
  .inputWidth {
    width: 60%;
  }

  .pidWidth {
    width: 20%;
  }

  .el-transfer-panel__list.is-filterable{
    height: 233px !important;
  }
  .el-transfer-panel__body{
    height:304px !important;
  }
</style>
