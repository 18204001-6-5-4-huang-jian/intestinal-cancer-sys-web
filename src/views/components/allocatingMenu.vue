<template>
<div v-if="rolePageAllauth">
  <div class="zindex"  >
    <div class="contentMain">
       <!--树形结构弹出框-->
          <div>
            <el-tree
                :data="dataTree"
                show-checkbox
                node-key="id"
                :default-expanded-keys="daufaultExtend"
                highlight-current
                ref="tree"
                :default-checked-keys="treeMenu"
                :props="defaultProps">
            </el-tree>
          </div>
          <div slot="footer" class="bottom_btn">
            <router-link to="/components/role" ><el-button size="small">返 回</el-button></router-link>
            <el-button  size="small" type="primary" @click="saveMenuTree" v-if="btnAuth.buttonRoleAllauthSave">保 存</el-button>
          </div>
    </div>

  </div>
</div>
</template>
<script>

   export default {
        name: 'Right',
        data () {
            return {
              rolePageAllauth:false,
               btnAuth:{
                    buttonRoleAllauthSave:false
                },
                nodeId:"",
                checkList: [],
                reSourceIds:[],
                roleId:"",
                dataTree: [],
                daufaultExtend:[1],
                defaultProps: {
                  children: 'child',
                  label: 'displayName'
                },
                treeMenu:[],
                allocateResourcesData:[],
                insertDialogVisible: false,
                updateDialogVisible: false,
                buttonDisabled:false,
                treeDialogVisible:false,
                allocateResourcesDialog:false,
                formLabelWidth: '80px',
                parentIdData:[],
                parentResult:[],
                allArr:[]

            }
        },
        mounted(){
          let obj = this.checkPageAuth(this,"rolePageAllauth",this.btnAuth);
          this.roleId=this.$route.query.id;
          $axios_http({
              url:"/base/role/menu/get/"+this.roleId,
              data:{},
              vueObj:this
          }).then( (res) => {
            console.log("登录时拿到的值")
            console.log(res)
            for (var i = 0; i < res.data.data.length; i++) {
                this.treeMenu.push(res.data.data[i].id)
            }
//                $axios_http({
//                      url:"/base/auth/queryAuth",
//                      data:{},
//                      vueObj:this
//                }).then((res) => {
//                      $axios_http({
//                        url:"/base/auth/getAuthTree",
//                        data:{},
//                        vueObj:this
//                      }).then((res) => {
//                        console.log("--------------")
//                        console.log(res.data.data.child);
//                            this.dataTree=[res.data.data];
//                            this.treeDialogVisible=true;
//                      });
//                });
            $axios_http({
              url:"/base/auth/getAuthTree",
              data:{},
              vueObj:this
            }).then((res) => {
              console.log("--------------")
              console.log(res.data.data.child);
              this.countCheckedKeys();
              this.dataTree=[res.data.data];
              this.treeDialogVisible=true;
            });
          })





        },
        methods:{

            //获取用户的菜单树
            getMenuTree(id){

            },
            //获取父节点的id
            getParentData(allArr,childId){

              this.parentResult = [];
              this.parentIdData=[];

              this.getData(allArr,allArr,childId);

              for(var m=0;m<this.parentResult.length;m++){
                  this.parentIdData.push(this.parentResult[m]["id"]*1)
              }
              return this.parentIdData;
            },
            getData(resource,parent,childId){

              if(parent.child){
                  var child = parent.child;
                  for(var i = 0 ; i < child.length ; i++){
                      if(child[i].id == childId){
                          this.parentResult.push(parent);
                          this.getData(resource,resource,parent.id);
                      }else{
                          this.getData(resource,child[i],childId);
                      }
                  }
              }
            },
            saveMenuTree(){
                console.log(this.$refs.tree.getCheckedKeys())
                console.log(this.$refs.tree.getHalfCheckedKeys())
                var finalCheckedNodes = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
                $axios_http({
                url:"/base/role/menu/save",
                data:{
                    "roleId":this.roleId,
                    "menuIds":finalCheckedNodes
                },
                vueObj:this
                }).then((res)=> {
                //显示操作成功浮动提示框
                 $successMsg(this,"修改成功")
                // 关闭添加数据对话框
                 this.treeDialogVisible=false;
                 this.$router.push({path:'/components/role'})
                })
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
                for(var i=0;i<this.treeMenu.length;i++){
                  for(var j=0;j<allAuthDataArray.length;j++){
                    if(allAuthDataArray[j].pId == this.treeMenu[i]){
                      isLeaf = false;
                      break;
                    }
                  }
                  if(isLeaf){
                    leafNodesArray.push(this.treeMenu[i]);
                  }
                }

                // 2、计算 哪些节点有子节点，并且其子节点也都是被选中的状态，才可被标记为选中；
                var parentCheckedNodes = new Array();
                for(var i=0;i<this.treeMenu.length;i++){
                  var allChildNodes = new Array();
                  //获取当前节点的所有子节点,包括子节点的子节点
                  allChildNodes = this.getAllChildNodes(this.treeMenu[i],allAuthDataArray,allChildNodes);


                  //判断this.updateForm.ascriptionArr中是否包含了所有子节点，若包含，当前节点可被选中，否则不可被选中
                  var isNodeChecked = true;
                  for(var j=0;j<allChildNodes.length;j++){
                    if(this.treeMenu.indexOf(allChildNodes[j])==-1){
                      console.log(allChildNodes[j],"is not exist.",this.treeMenu[i],"is not checked.")
                      isNodeChecked = false;
                      break;
                    }
                  }
                  if(isNodeChecked){
                    //排除叶子节点
                    if(leafNodesArray.indexOf(this.treeMenu[i])==-1){
                      parentCheckedNodes.push(this.treeMenu[i]);
                    }
                  }
                }
                console.log(leafNodesArray);
                console.log(parentCheckedNodes);
                var finalCheckedNodes = leafNodesArray.concat(parentCheckedNodes);
                this.treeMenu = finalCheckedNodes;
                console.log(finalCheckedNodes);
                this.$refs.tree.setCheckedKeys(this.treeMenu);
                this.defaultExpandedData = this.treeMenu;
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
            //每页显示查询结果条数变更事件，做重新查询操作
            pageSizeChange(pageSize) {

                this.queryResult.pageSize = pageSize

                this.query()
            },
            //切换当前页事件，做重新查询操作
            currentPageChange(currentPage) {

                this.queryResult.pageNo = currentPage

                this.query()
            },
            pageSouceChange(pageSize) {

                this.queryResultSource.pageSizeSource = pageSize
                this.resetSource()
            },
            //切换当前页事件，做重新查询操作
            currentPageSouceChange(currentPage) {

                this.queryResultSource.pageNoSource = currentPage
                this.resetSource()
            }

        }}
</script>
<style scoped>
  .bottom_btn{
    margin-top: 10px;
    margin-left: 30%;
  }

</style>
