<template>
  <div class="dashboard-container">
   <!-- <component v-bind:is="currentRole">

    </component>-->
    <!--<div class="infoContainer">
      <h3>消息提醒：</h3>
      <ul class="messageList" id="messageList" @click="aaa">
      </ul>

    </div>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'dashboard',

    data() {
      return {
        maessInfo:""
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'email',
        'introduction',
        'roles'
      ])
    },
    created() {
      if (this.roles.indexOf('admin') >= 0) {
        return;
      }
      this.currentRole = 'DefaultDashboard';
    },
    mounted(){
      //this.queryMessage();
    },
    methods:{
      aaa(eve){
        console.log(eve)
      },
      queryMessage(){
        $axios_http({
          url:'/jfservice/message/hints',
          data:{
          },
          vueObj: this
        }).then((res)=>{
          console.log('messageInfo')
          console.log(res)
          var data=res.data.data,str='';
          data.forEach((val,ind)=>{
            str+='<li>'+val.message+'<span class="read">X</span></li>'
            //console.log(str)
          })
          document.getElementById('messageList').innerHTML=str;

        })
      }
    }
  }
</script>
<style>
  .infoContainer{
    margin-left: 2%;
  }
  .messageList li{
    line-height: 35px;
    list-style: none;
    position: relative;
  }
  .read{
    position: absolute;top:0px;
    display: inline-block;
    margin-left: 10px;
    font-size:12px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    color:#fff;
    background: brown;
    text-align: center;
    line-height:15px;
  }
</style>
