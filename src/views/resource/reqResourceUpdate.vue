<template>
  <div class="zindex" v-if="page_reqResource_update">
    <div class="contentMain">
      <div class="formWidth">
        <el-form :model="updateForm" ref="updateForm" :rules="rules">
          <el-form-item label="显示名称" :label-width="formLabelWidth" prop="desc">
            <el-input v-model="updateForm.desc" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="唯一标识" :label-width="formLabelWidth" prop="name">
            <el-input v-model="updateForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="formLabelWidth" prop="url">
            <el-input v-model="updateForm.url" auto-complete="off"></el-input>
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
                check-strictly
                :default-expanded-keys="defaultExpandedData"
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps">
              </el-tree>
            </el-popover>
            <el-button v-popover:popover4>点击选择</el-button>
          </el-form-item>
          <el-form-item label="是否记录日志" :label-width="formLabelWidth" prop="saveLog">
            <el-select v-model="updateForm.saveLog" placeholder="请选择">
              <el-option value="1" v-bind:key="1" label="是"></el-option>
              <el-option value="2" v-bind:key="2" label="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="dialog-footer">
              <router-link to="/resource/reqResourceList">
                <el-button size="small">返 回</el-button>
              </router-link>
              <el-button type="primary" size="small" @click="update('updateForm')"
                         v-if="btnAuth.buttonResourceEditorSave">保 存
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
          label: 'displayName'
        },
        menuTreeData: [],
        page_reqResource_update: false,
        btnAuth: {
          buttonResourceEditorSave: false,

        },
        defaultExpandedData:[],
        pMenu: '点击选择',
        "updateForm": {
          "id": null,
          "name": "",
          "desc": "",
          "url": "",
          "saveLog": 1,
          "type": "3",
          "ascriptionArr": []
        },
        menuPageTreeData: [],
        formLabelWidth: '120px',
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
          saveLog: [
            {required: true, message: '请选择是否记录日志', trigger: 'change'}
          ]
        }
      }
    },
    mounted() {
      let obj = this.checkPageAuth(this, "page_reqResource_update", this.btnAuth);
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


        $axios_http({
          url: '/base/resource/get/' + this.$route.query.id,
          data: {},
          vueObj: this
        }).then((res) => {
          console.log('this is resource res')
          console.log(res)
          this.updateForm = res.data.data;
          console.log('所属页面按钮')
          console.log(this.updateForm.ascriptionArr)
//          this.countCheckedKeys();
          //this.updateForm.type=this.updateForm.type+''

          //set tree selected nodes;
          this.$refs.tree.setCheckedKeys(this.updateForm.ascriptionArr);

          //set tree default expanded data
          this.defaultExpandedData = this.updateForm.ascriptionArr;
        })

      })
    },
    methods: {

      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
        this.updateForm.ascriptionArr = this.$refs.tree.getCheckedKeys();
        //console.log(this.insertForm.ascriptionArr)
        //this.pMenu=this.$refs.tree.getCheckedKeys();  给按钮赋值
      },
      countCheckedKeys() {
        //从后台拿到该请求所属的页面及按钮可能是多个，但对于elementui的tree控件，不能把所有数据认为是选中的，需要我们自己再判断一次，仅把符合规则的数据选中，具体规则如下：
        // 1、哪些是叶子节点，可直接选中；
        // 2、哪些节点是有子节点的，并且其子节点也必须全部在updateForm.ascriptionArr中，可直接选中；
        $axios_http({
          url:"/base/auth/queryAuth",
          data:{
          },
          vueObj:this
        }).then((res)=>{
          console.log('查看所有树')
          console.log(res)
          var allAuthDataArray = res.data.data;
          var leafNodesArray = new Array();
          //res.data.data  所有菜单、页面、按钮资源（数组）
          //this.updateForm.ascriptionArr   后台返回的节点数组

          // 1、计算 哪些是叶子节点,可直接标记为选中；
          var isLeaf = true;
          for(var i=0;i<this.updateForm.ascriptionArr.length;i++){
            for(var j=0;j<allAuthDataArray.length;j++){
              if(allAuthDataArray[j].pId == this.updateForm.ascriptionArr[i]){
                isLeaf = false;
                break;
              }
            }
            if(isLeaf){
              leafNodesArray.push(this.updateForm.ascriptionArr[i]);
            }
          }

          // 2、计算 哪些节点有子节点，并且其子节点也都是被选中的状态，才可被标记为选中；
          var parentCheckedNodes = new Array();
          for(var i=0;i<this.updateForm.ascriptionArr.length;i++){
            var allChildNodes = new Array();
            //获取当前节点的所有子节点,包括子节点的子节点
            allChildNodes = this.getAllChildNodes(this.updateForm.ascriptionArr[i],allAuthDataArray,allChildNodes);


            //判断this.updateForm.ascriptionArr中是否包含了所有子节点，若包含，当前节点可被选中，否则不可被选中
            var isNodeChecked = true;
            for(var j=0;j<allChildNodes.length;j++){
              if(this.updateForm.ascriptionArr.indexOf(allChildNodes[j])==-1){
                console.log(allChildNodes[j],"is not exist.",this.updateForm.ascriptionArr[i],"is not checked.")
                isNodeChecked = false;
                break;
              }
            }
            if(isNodeChecked){
                //排除叶子节点
              if(leafNodesArray.indexOf(this.updateForm.ascriptionArr[i])==-1){
                parentCheckedNodes.push(this.updateForm.ascriptionArr[i]);
              }
            }
          }
          console.log(leafNodesArray);
          console.log(parentCheckedNodes);
          var finalCheckedNodes = leafNodesArray.concat(parentCheckedNodes);
          this.updateForm.ascriptionArr = finalCheckedNodes;
          console.log(finalCheckedNodes);
          this.$refs.tree.setCheckedKeys(this.updateForm.ascriptionArr);
          this.defaultExpandedData = this.updateForm.ascriptionArr;
        })
      },
      getAllChildNodes(currentNode,allNodes,childNodes) {
          for(var i=0;i<allNodes.length;i++) {
            if (allNodes[i].pId == currentNode) {
              childNodes.push(allNodes[i].id)
              childNodes = this.getAllChildNodes(allNodes[i].id, allNodes, childNodes);
            }
          }
          return childNodes;
      },
      //更新一条旧数据
      update(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.$refs.tree.getCheckedKeys(),"选中的项");
            this.updateForm.ascriptionArr = this.$refs.tree.getCheckedKeys();

            $axios_http({
              url: '/base/resource/update',
              data: this.updateForm,
              vueObj: this
            }).then((res) => {
              console.log("Update request resource response.")
              console.log(res)
              $successMsg(this, "编辑成功")
              //关闭更新数据对话框
              this.$router.push({path: '/resource/reqResourceList'})
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
