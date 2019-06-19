<template>
  <div class="zindex" v-if="page_reqResource_add">
    <div class="contentMain">
      <div class="formWidth">
        <el-form :model="insertForm" ref="insertForm" :rules="rules">
          <el-form-item label="唯一标识" :label-width="formLabelWidth" prop="name">
            <el-input v-model="insertForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="formLabelWidth" prop="url">
            <el-input v-model="insertForm.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="desc">
            <el-input v-model="insertForm.desc" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属页面、按钮" :label-width="formLabelWidth">
            <el-popover
              ref="popover4"
              placement="right"
              width="400"
              trigger="click">
              <el-tree
                :data="menuTreeData"
                show-checkbox
                node-key="id"
                ref="tree"
                highlight-current
                check-strictly
                :props="defaultProps">
              </el-tree>
            </el-popover>
            <el-button v-popover:popover4>点击选择</el-button>
          </el-form-item>
          <el-form-item label="是否记录日志" :label-width="formLabelWidth" prop="saveLog">
            <el-select v-model="insertForm.saveLog" placeholder="请选择" @change="changeType">
              <el-option value="1" v-bind:key="1" label="是"></el-option>
              <el-option value="2" v-bind:key="2" label="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="dialog-footer">
              <router-link to="/resource/reqResourceList">
                <el-button size="small">返 回</el-button>
              </router-link>
              <el-button type="primary" size="small" @click="add('insertForm')" v-if="btnAuth.buttonResourceInsertSave">
                保 存
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
        defaultProps: {
          children: 'child',
          label: 'desc'
        },
        pMenu: '点击选择',
        //编辑表单数据对象
        "insertForm": {
          "id": null,
          "name": "",
          "desc": "",
          "url": "",
          "saveLog": null,
          "sort": '1',
          "type":"3",
          "ascriptionArr": []
        },
        page_reqResource_add: false,
        btnAuth: {
          buttonResourceInsertSave: false,
        },
        menuTreeData: [],
        formLabelWidth: '120px',
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
          saveLog: [
            {required: true, message: '是否记录日志', trigger: 'change'}
          ]
        }
      }
    },
    mounted() {
      let obj = this.checkPageAuth(this, "page_reqResource_add", this.btnAuth);
      $axios_http({
        url: "/base/auth/getAuthTree",
        data: {},
        vueObj: this
      }).then((res) => {
        console.log(res)
        console.log('getAuthTree')
        var arr = [];
        arr.push(res.data.data)
        this.menuTreeData = arr;
      })
    },
    methods: {
      changeType() {
        //this.insertForm.type = this.insertForm.type + ''
        //this.insertForm.saveLog = this.insertForm.saveLog + ''
      },
      getCheckedKeys() {
        console.log('getCheckedKeys');
        console.log(this.$refs.tree.getCheckedKeys(),111);
        console.log(this.$refs.tree.getHalfCheckedKeys(),222);
        this.insertForm.ascriptionArr = this.$refs.tree.getCheckedKeys();
//        console.log(this.insertForm.ascriptionArr,333);

      },
      add(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('getCheckedKeys');
            console.log(this.$refs.tree.getCheckedKeys(),"选中的项");
            this.insertForm.ascriptionArr = this.$refs.tree.getCheckedKeys();


            $axios_http({
              url: "/base/resource/insert",
              data: this.insertForm,
              vueObj: this
            }).then((res) => {
              console.log('resource/insert')
              console.log(res)
              //显示操作成功浮动提示框
              $successMsg(this, "添加成功")
              this.$router.push({path: '/resource/reqResourceList'})
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
<style scoped>

</style>
