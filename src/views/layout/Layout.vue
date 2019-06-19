<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="nav-wrapper">
      <navbar></navbar>
    </div>
		<div class="sidebar-wrapper">
			<sidebar class="sidebar-container"></sidebar>
		</div>
		<div class="main-container">
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from 'views/layout';
 // console.log(Sidebar)
  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
		},
		created(){
			// 下拉公用请求，解决强制刷新页面bug
        if(this.$store.state.regionOptions.length==0){
          $axios_http({
            url:"/base/department/getAllOtherDepts/1",
            data:{},
          }).then((res)=>{
            this.$store.state.regionOptions = res.data.data
          })
        }
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;
		&.hideSidebar {
			.sidebar-wrapper {
				transform: translate(-140px, 0);
				.sidebar-container {
					transform: translate(132px, 0);
				}
				&:hover {
					transform: translate(0, 0);
					.sidebar-container {
						transform: translate(0, 0);
					}
				}
			}
			.main-container {
				margin-left: 40px;
			}
		}
		.sidebar-wrapper {
			width: 180px;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			z-index: 200;
			overflow: hidden;
			transition: all .28s ease-out;
		}
		.sidebar-container {
			transition: all .28s ease-out;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: -17px;
			overflow-y: scroll;
      margin-top: 50px;
      padding-bottom: 50px;
		}
		.main-container {
			min-height: 100%;
			transition: all .28s ease-out;
			margin-left: 180px;
      /*margin-top: 50px;*/
      padding-top: 50px;
		}
    .nav-wrapper{
      width:100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
      transition: all .28s ease-out;
    }
	}
</style>
