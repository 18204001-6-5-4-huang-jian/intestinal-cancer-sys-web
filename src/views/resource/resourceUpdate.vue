<template>
  <div class="zindex" v-if="page_resource_update">
    <div class="contentMain">
      <div class="formWidth">
        <el-form :model="updateForm" ref="updateForm" :rules="rules">
          <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="updateForm.type" placeholder="请选择" size="small">
              <el-option value="1" label="菜单"></el-option>
              <el-option value="2" label="页面"></el-option>
              <el-option value="3" label="按钮"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示名称" :label-width="formLabelWidth" prop="desc">
            <el-input v-model="updateForm.displayName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="唯一标识" :label-width="formLabelWidth" prop="name">
            <el-input v-model="updateForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="formLabelWidth" prop="url">
            <el-input v-model="updateForm.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="">
            <el-input v-model="updateForm.desc" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单" ref="testItem" :label-width="formLabelWidth" v-if="updateForm.type==1">
            <el-dialog title="菜单结构" :visible.sync="menuTreeVisible" :modal-append-to-body="false" @open="dialogOpen">
              <el-tree
                :data="menuTreeData"
                accordion
                check-strictly
                highlight-current
                node-key="id"
                @node-click="handleNodeClick"
                ref="tree"
                :default-expanded-keys="defaultExpandedKeys"
                :props="defaultProps">
              </el-tree>
            </el-dialog>
            <el-input v-model="pMenu" auto-complete="off" class="menuWidth" disabled placeholder="点击选择上级菜单" @click.native="menuTreeVisible=true"></el-input>
          </el-form-item>
          <el-form-item label="所属菜单" :label-width="formLabelWidth" v-if="updateForm.type==2">
            <el-dialog title="菜单结构" :visible.sync="menuTreeVisible" :modal-append-to-body="false" @open="dialogOpen">
              <el-tree
                :data="menuTreeData"
                accordion
                @node-click="handleNodeClick"
                check-strictly
                node-key="id"
                ref="tree"
                highlight-current
                :default-expanded-keys="defaultExpandedKeys"
                :props="defaultProps">
              </el-tree>
            </el-dialog>
            <el-input v-model="pMenu" auto-complete="off" class="menuWidth" disabled @click.native="menuTreeVisible=true"></el-input>
          </el-form-item>
          <el-form-item label="所属页面" :label-width="formLabelWidth" v-if="updateForm.type==3">
            <el-dialog title="菜单结构" :visible.sync="menuTreeVisible" :modal-append-to-body="false" @open="dialogOpen">
              <el-tree
                :data="menuTreeData"
                accordion
                @node-click="handleNodeClick"
                check-strictly
                node-key="id"
                highlight-current
                ref="tree"
                :default-expanded-keys="defaultExpandedKeys"
                :props="defaultProps">
              </el-tree>
            </el-dialog>
            <el-input v-model="pMenu" auto-complete="off" class="menuWidth" disabled @click.native="menuTreeVisible=true"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="dialog-footer">
              <router-link to="/resource/resourceList">
                <el-button size="small">返 回</el-button>
              </router-link>
              <el-button type="primary" size="small" @click="update('updateForm')"
                         v-if="btnAuth.buttonAuthEditorSave">保 存
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Right',
    data() {
      return {
        defaultCheckedKeys:[],
        defaultExpandedKeys:[],
        menuTreeVisible:false,
        defaultProps: {
          children: 'child',
          label: 'displayName'
        },
        menuTreeData: [],
        page_resource_update: false,
        btnAuth: {
          buttonAuthEditorSave: false,

        },
        allTreeData:[],
        pMenu: '点击选择',
        "updateForm": {
          "id": null,
          "displayName":"",
          "name": "",
          "desc": "",
          "type": "",
          "url": "",
          "saveLog": 1,
          "level": 1,
          "pId": '',
          "operation": '1',
          "sort": '1'
        },
        formLabelWidth: '80px',
        rules: {
          name: [
            {required: true, message: '请输入唯一标识', trigger: 'blur'},
            {min: 1, max: 256, message: '长度在1到256个字符', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请输入显示名称', trigger: 'blur'},
            {min: 1, max: 64, message: '长度在1到64个字符', trigger: 'blur'}
          ],
          url: [
            {required: true, message: '请输入URL', trigger: 'blur'},
            {min: 1, max: 256, message: '长度在1到256个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择类型', trigger: 'change'}
          ]
        }
      }
    },
    mounted() {
      let obj = this.checkPageAuth(this, "page_resource_update", this.btnAuth);


      $axios_http({
        url: '/base/auth/get/' + this.$route.query.id,
        data: {},
        vueObj: this
      }).then((res) => {
        console.log('this is resource res')
        console.log(res)
        this.updateForm = res.data.data
        console.log(this.updateForm)

        if (this.updateForm.type != 3) {
          $axios_http({
            url: "/base/auth/getMenuTree",
            data: {},
            vueObj: this
          }).then((res) => {
            console.log(res)
            console.log('getMenuTree')
            var arr = [];
            arr.push(res.data.data)
            this.menuTreeData = arr;

//            this.filter(this.updateForm.pId)
            $axios_http({
              url:"/base/auth/queryAuth",
              data:{
              },
              vueObj:this
            }).then((res)=>{
              console.log('查看所有树')
              console.log(res)
              this.allTreeData=res.data.data
              //获取当前节点信息
              var pNodeInfo = this.getNode(this.allTreeData,this.updateForm.pId);
              //赋值父节点displayName，用于反显
              this.pMenu = pNodeInfo.displayName

              //赋值当前节点的父节点id，用于默认展开
              this.defaultExpandedKeys.push(pNodeInfo.pId);
            })

          })
        } else {
          $axios_http({
            url: "/base/auth/getMenuPageTree",
            data: {},
            vueObj: this
          }).then((res) => {
            console.log(res)
            console.log('getMenuPageTree')
            var arr = [];
            arr.push(res.data.data)
            this.menuTreeData = arr;
//            this.filter(this.updateForm.pId)
            $axios_http({
              url:"/base/auth/queryAuth",
              data:{
              },
              vueObj:this
            }).then((res)=>{
              console.log('查看所有树')
              console.log(res)
              this.allTreeData=res.data.data
              //获取当前节点信息
              var pNodeInfo = this.getNode(this.allTreeData,this.updateForm.pId);
              //赋值父节点displayName，用于反显
              this.pMenu = pNodeInfo.displayName

              //赋值当前节点的父节点id，用于默认展开
              this.defaultExpandedKeys.push(pNodeInfo.pId);
            })
          })
        }
      })




    },
    methods: {
//      filter(pid) {
//        console.log("返回pid");
//        console.log(pid)
//        for(var i=0;i<this.allTreeData.length;i++){
//          if(pid==0){
//            console.log(this.allTreeData[i])
//            this.pMenu='没有上级菜单,不可以改变此数据'
//          }else if(pid==this.allTreeData[i].id){
//            console.log('返显上级菜单')
//            console.log(this.allTreeData[i].desc)
//            this.pMenu=this.allTreeData[i].desc
//
//          }
//
//        }
//        console.log(this.menuTreeData)
//        var obj = this.menuTreeData[0];
//        if (pid == obj.id) {
//          this.pMenu = obj.displayName;
//        } else if (obj.child) {
//          for (var i = 0; i < obj.child.length; i++) {
//            if (pid == obj.child[i].id) {
//              this.pMenu = obj.child[i].displayName;
//            } else if (obj.child[i].child) {
//              for (var j = 0; j < obj.child[i].child.length; j++) {
//                if (pid == obj.child[i].child[j].id) {
//                  this.pMenu = obj.child[i].child[j].displayName;
//                }
//              }
//            }
//          }
//        }
//      },
      dialogOpen(){ //当对话框加载完毕后，设置菜单中被选中的节点
        this.$nextTick().then(()=>{
          this.$refs.tree.setCurrentKey(this.updateForm.pId);
        })
      },
      getNode(treeData,nodeId) {   //根据节点ID获取节点数据
        if(treeData){
          for(var i=0;i<treeData.length;i++){
            if(treeData[i]&&treeData[i].id==nodeId){
                return treeData[i];
            }else{
                continue;
            }
          }
        }
      },
      handleNodeClick(data) {
        console.log('data')
        console.log(data);
        this.menuTreeVisible=false;
        this.pMenu = data.displayName;
        this.updateForm.pId = data.id;


      },
      //更新一条旧数据
      update(formName) {
        console.log('updateForm')
        console.log(this.updateForm)

        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: '/base/auth/updateAuth',
              data: this.updateForm,
              vueObj: this
            }).then((res) => {
              console.log("Update dict type response.")
              $successMsg(this, "编辑成功")
              //关闭更新数据对话框
              this.$router.push({path: '/resource/resourceList'})
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      }

    }
  }
</script>
<style>
  .menuWidth {
    width: 50%;
  }
  .el-input__inner{
    background-color:#fff !important;
  }
</style>
