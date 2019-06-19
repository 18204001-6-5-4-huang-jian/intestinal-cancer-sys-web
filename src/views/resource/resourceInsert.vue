<template>
  <div class="zindex" v-if="page_resource_add">
    <div class="contentMain">
      <div class="formWidth">
        <el-form :model="insertForm" ref="insertForm" :rules="rules">
          <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="insertForm.type" placeholder="请选择">
              <el-option value="1" v-bind:key="1" label="菜单"></el-option>
              <el-option value="2" v-bind:key="2" label="页面"></el-option>
              <el-option value="3" v-bind:key="3" label="按钮"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示名称" :label-width="formLabelWidth" prop="displayName">
            <el-input v-model="insertForm.displayName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="唯一标识" :label-width="formLabelWidth" prop="name">
            <el-input v-model="insertForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="formLabelWidth" prop="url">
            <el-input v-model="insertForm.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="desc">
            <el-input v-model="insertForm.desc" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单" :label-width="formLabelWidth" v-if="insertForm.type==1">
            <el-dialog title="菜单结构" :visible.sync="menuTreeVisible" :modal-append-to-body="false">
              <el-tree
                :data="menuTreeData"
                check-strictly
                highlight-current
                :default-expanded-keys="[1]"
                node-key="id"
                @node-click="handleNodeClick"
                ref="tree"
                :props="defaultProps">
              </el-tree>
            </el-dialog>
            <el-input v-model="pMenu" auto-complete="off" class="menuWidth" disabled @click.native="menuTreeVisible=true"></el-input>
          </el-form-item>
          <el-form-item label="所属菜单" :label-width="formLabelWidth"  v-if="insertForm.type==2">
            <el-dialog title="菜单结构" :visible.sync="menuTreeVisible" :modal-append-to-body="false">
              <el-tree
                :data="menuTreeData"
                @node-click="handleNodeClick"
                check-strictly
                highlight-current
                node-key="id"
                :default-expanded-keys="[1]"
                ref="tree"
                :props="defaultProps">
              </el-tree>
            </el-dialog>
            <el-input v-model="pMenu" auto-complete="off" class="menuWidth" disabled @click.native="menuTreeVisible=true"></el-input>
          </el-form-item>
          <el-form-item label="所属页面" :label-width="formLabelWidth"  v-if="insertForm.type==3">
            <el-dialog title="菜单结构" :visible.sync="menuTreeVisible" :modal-append-to-body="false">
              <el-tree
                :data="menuPageTreeData"
                @node-click="handleNodeClick"
                check-strictly
                highlight-current
                :default-expanded-keys="[1]"
                node-key="id"
                ref="tree"
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
              <el-button type="primary" size="small" @click="add('insertForm')" v-if="btnAuth.buttonAuthInsertSave">保 存
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
        menuTreeVisible:false,
        defaultProps: {
          children: 'child',
          label: 'displayName'
        },
        pMenu:'点击选择',
        //编辑表单数据对象
        "insertForm": {
          "name": "",
          "desc": "",
          "type": null,
          "url": "",
          "displayName":"",
          "level":"1",
          "operation":1,
          "sort":1
        },
        page_resource_add:false,
        btnAuth:{
          buttonAuthInsertSave:false,
        },
        menuTreeData:[],
        menuPageTreeData:[],
        formLabelWidth: '80px',
        rules: {
          name: [
            {required: true, message: '请输入唯一标识', trigger: 'blur'},
            {min: 1, max: 64, message: '长度在1到64个字符', trigger: 'blur'}
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
          ],
          displayName: [
            {required: true, message: '请输入显示名称', trigger: 'blur'},
            {min: 1, max: 64, message: '长度在1到64个字符', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      let obj = this.checkPageAuth(this, "page_resource_add", this.btnAuth);
      $axios_http({
        url: "/base/auth/getMenuTree",
        data: {},
        vueObj: this
      }).then((res) => {
        console.log(res)
        console.log('getMenuTree')
        var arr=[];
        arr.push(res.data.data)
        this.menuTreeData=arr;
      })
      $axios_http({
        url: "/base/auth/getMenuPageTree",
        data: {},
        vueObj: this
      }).then((res) => {
        console.log(res)
        console.log('getMenuPageTree')
        var arr=[];
        arr.push(res.data.data)
        this.menuPageTreeData=arr;
      })
    },
    methods:{
      handleNodeClick(data) {
        this.menuTreeVisible=false;
        console.log('data')
        console.log(data);
        this.pMenu=data.displayName;
        this.insertForm.pId=data.id;
      },
      add(formName){
        console.log('点击了保存')
        console.log(this.insertForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $axios_http({
              url: "/base/auth/saveAuth",
              data: this.insertForm,
              vueObj: this
            }).then((res) => {
              console.log('auth/saveAuth')
              console.log(res)
              //显示操作成功浮动提示框
              $successMsg(this, "添加成功")
              this.$router.push({path: '/resource/resourceList'})
              //清空添加数据对话框数据
              Object.assign(this.$data.insertForm, this.$options.data().insertForm)
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
  .menuWidth{
    width: 50%;
  }
  .el-input__inner{
    background-color:#fff !important;
  }
</style>
