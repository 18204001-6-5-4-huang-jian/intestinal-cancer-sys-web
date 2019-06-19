<template>
  <div class="myindex" v-if="userPageAllrole">

    <div>
      <el-checkbox-group v-model="checkList">
        <el-checkbox class="mycheckbox" v-for="(item,index) in allocateResources" :key="item.id" :label="item.id">
          {{item.name}}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="btnclass">
      <router-link to="/components/userList">
        <el-button size="small">返 回</el-button>
      </router-link>
      <el-button size="small" type="primary" @click="saveAllocateResources" v-if="btnAuth.buttonUserAllroleSave">保 存
      </el-button>
    </div>


  </div>
</template>
<script>
  export default {
    name: 'Right',
    data() {
      return {
        userPageAllrole: false,
        btnAuth: {
          buttonUserAllroleSave: false
        },
        userId: "",
        allocateResources: [],
        checkList: [],
        reSourceIds: [],
        formLabelWidth: '100px'
      }
    },
    mounted() {
      let obj = this.checkPageAuth(this, "userPageAllrole", this.btnAuth)

      console.log(this.$route.query.id)
      this.userId = this.$route.query.id
      this.checkList = [];
      $axios_http({
        url: '/base/user/role/get/' + this.userId,
        data: {},
        vueObj: this
      }).then((ress) => {
        this.checkList = ress.data.data;
        $axios_http({
          url: "/base/role/query",
          data: {},
          vueObj: this
        }).then((res) => {
          console.log('tree')
          console.log(res)
          this.allocateResources = res.data.data;
          this.allocateResourcesDialog = true;


        })

      })


    },
    methods: {
      //更改所分配的角色
      saveAllocateResources() {

        this.reSourceIds = this.checkList;
        console.log(this.userId);

        $axios_http({
          url: "/base/user/role/save",
          data: {
            "userId": this.userId,
            "roleIds": this.reSourceIds
          },
          vueObj: this
        }).then((res) => {

          $successMsg(this, "分配成功")
          this.$router.push({path: '/components/userList'})
        })


      }

    }
  }
</script>
<style scoped>
  .myindex {
    position: absolute;
    width: 100%;
    top: 48px;
    left: 180px;
    bottom: 0;
    background-color: #fff;
    z-index: 3000;
  }

  .mycheckbox {
    margin-left: 20px;
    margin-top: 10px;
    display: block;
  }

  .btnclass {
    margin-left: 30%;
  }
</style>
