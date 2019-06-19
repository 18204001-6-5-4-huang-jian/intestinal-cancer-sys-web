<template>
  <div slot="right" class="content-page" v-if="messageList_page">
    <div class="content">
      <div class="filter-container" >
        <!--<router-link to="/home/countryHome">-->
          <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
        <!--</router-link>-->
        <h2>系统提醒</h2>
        <div class="messageCon">
          <el-tabs type="border-card" v-model="activeName" @tab-click="tabChange">
            <el-tab-pane label="系统更新" name="first">
              <newsList :newsList="newsList" :index="index" :queryResult="queryResult" @refreshList='query'></newsList>
            </el-tab-pane>
            <el-tab-pane label="结果通知" name="second">
              <newsList :newsList="newsList" :index="index" :queryResult="queryResult" @refreshList='query'></newsList>
            </el-tab-pane>
            <el-tab-pane label="异常事件" name="third">
             <newsList :newsList="newsList" :index="index" :queryResult="queryResult" @refreshList='query'></newsList>
              
            </el-tab-pane>
            <el-tab-pane label="申请/审核" name="forth">
              <newsList :newsList="newsList" :index="index" :queryResult="queryResult" @refreshList='query'></newsList>
            </el-tab-pane>
          </el-tabs>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import newsList from '../components/newsList'
  export default {
    name: 'Right',
    data () {
      return {
        //权限判定
        messageList_page:false,
        btnAuth:{
          uncompletedFITNumber_add_btn:false,
        },
        activeName:'first',
        newsList:[],
          //查询分页
        queryResult: {
          pageNo: 1,//当前页
          pageSize: 10,//每页的条数
          totalPageCount: 0,
        },
        index:0,
        noConShow:false
      }
    },
    components:{
      newsList
    },
    created(){
      this.query(this.$store.state.messageListPageNo,this.$store.state.messageListPageSize,0);
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this,"messageList_page",this.btnAuth);
    },
    beforeDestroy(){
      this.$store.state.messageListPageNo=1;
      this.$store.state.messageListPageSize=10;
    },
    methods:{
      //查询
       // 消息类型0----系统|1---异常事件|2---编辑|审核    4---发放通知',
      query(pageNo,pageSize,messageType){
            $axios_http({
              url: "/base/result/queryAllMessageCenter",
              data:{
                  messageType:messageType,    //消息类型
                  pageSize:pageSize,
                  pageNo:pageNo
              },
              vueObj: this
            }).then((res) => {
            this.newsList=res.data.data;
            this.queryResult.totalPageCount = res.data.pageInfo.totalPageCount//获取总共多少页
            this.queryResult.totalRowCount = res.data.pageInfo.totalRowCount//获取总共条数
              if(this.newsList.length==0){
                this.noConShow=true
              }else{
                this.noConShow=false
              }
            })
        },
      tabChange(targetName){
         this.$store.commit('get_messageListNo',1);
         this.$store.commit('get_messageListSize', 10)
        if(targetName.index==0){
          this.query(this.$store.state.messageListPageNo,this.$store.state.messageListPageSize,0);
          this.index=0;
        }else if(targetName.index==1){
          this.query(this.$store.state.messageListPageNo,this.$store.state.messageListPageSize,4);
          this.index=3;
        }else if(targetName.index==2){
          this.query(this.$store.state.messageListPageNo,this.$store.state.messageListPageSize,1);
          this.index=1;
        }else if(targetName.index==3){
          this.query(this.$store.state.messageListPageNo,this.$store.state.messageListPageSize,2);
          this.index=2;
        }
      },
   
    }}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .content{
    background: #fff;
    padding:10px;
  }
  .return-home {
    display: block;
    text-align: center;
    margin-bottom:20px;
  }
  h2{
    font-size: 18px;
    color:#666;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .messageCon .el-tabs--border-card,.messageCon .el-card.is-always-shadow{
    box-shadow: none;
  }
  .messageCon .el-card.is-always-shadow{
    border: none;
  }
</style>
