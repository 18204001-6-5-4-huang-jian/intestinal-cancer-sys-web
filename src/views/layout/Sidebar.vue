<template>
	<el-menu mode="vertical" background-color="#144894" text-color="red" active-text-color="#fff" router default-active="/home/home">
		<sidebar-item ></sidebar-item>
	</el-menu>
</template>


<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    components: { SidebarItem }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

	.el-menu {
			min-height: 100%;
	}
  .logoImg{
        height:20px;
  }
</style>
