<template>
	<div>
    <el-menu mode="vertical" background-color="#144894" text-color="#ABB7D3" active-text-color="#fff" router :default-active="$route.path">
      <!--<sidebar-item ></sidebar-item>-->

      <div v-for="(totalItem,index) in  totalData" :key="totalItem.id">
        <el-submenu :index="index+toString()+1" v-if="totalItem.child">
          <template slot="title">
            <span>{{totalItem.displayName}}</span>
          </template>
          <el-menu-item-group v-for="(item,secIndex) in  totalItem.child" :key="item.id">
            <el-menu-item :index="item.url">{{item.displayName}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else-if="!totalItem.child" :index="totalItem.url" :key="totalItem.id" :disabled="totalItem.url.indexOf('#')>-1">
          <span slot="title">{{totalItem.displayName}}</span>
        </el-menu-item>
      </div>
    </el-menu>
	</div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    /*props:{
 		totalData:{
 			type:Array
 		}
    },*/
    data(){
    	return {
    		'totalData':[]
    	}
    },
    mounted: function() {

      //allAuthResource
     // this.totalData=localStorage.getItem('allAuthResource')
      if(this.$store.state.allAuthResource.length>0){
        this.totalData = this.$store.state.allAuthResource;
      }else{
        $axios_http({
          url: "/base/user/resource",
          data: {},
          vueObj: this
        }).then((res)=> {
          let btnArr=res.data.data.buttons;
          let pageArr=res.data.data.pages;
          for (var i = 0; i < btnArr.length; i++) {
            this.hasAuth(btnArr[i]);
          }
          for(var j=0;j<pageArr.length;j++){
            this.hasAuth(pageArr[j]);
          }
          this.totalData = res.data.data.menu.child;
        })
      }

    },
    methods:{
      hasAuth(authName){
            //localStorage.setItem(authName,authName)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.svg-icon {
		margin-right: 15px;
	}

	.hideSidebar .menu-indent {
		display: block;
		text-indent: 10px;
	}
	/* .router-link-exact-active{
		display: block;
		background: red;
		width: 100%;
	} */
	/* .router-link-active{
		color:#20A0FF;
	} */
	.activeFat{
		position: relative;
	}
	.setWidth{
		position: absolute;left:0;top:0;
		padding-left:21%;
		display: block;
		width: 100%;
		height: 100%;
		line-height: 50px;
	}
  .firstMenu a{
    padding-left:0px!important;
  }
</style>
<style>
  /*.el-menu{*/
    /*overflow-x: hidden;*/
  /*}*/
  ul .el-menu .sidebar-container{
    overflow-x: hidden;
  }
  ul.el-menu.el-menu--inline{
    overflow-x: hidden;
  }
  .el-menu-item-group__title,.el-submenu .el-menu-item{
    padding-left: 30px !important;
  }
</style>

