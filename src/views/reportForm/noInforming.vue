<template>
	<div id="informing"  v-if="noInforming_page">
    <el-tabs type="border-card">
      <el-tab-pane label="录入告知书">
        <report3></report3>
      </el-tab-pane>
      <el-tab-pane label="结肠镜结果">
        <report1></report1>
      </el-tab-pane>
      <el-tab-pane label="病理结果">
        <report2></report2>
      </el-tab-pane>
    </el-tabs>
	</div>
</template>

<script>
  import report3 from'./report3.vue'
  import report1 from'./reportShow1.vue'
  import report2 from'./reportShow2.vue'
  export default{
    components:{
      report3,
      report1,
      report2
    },
    name: 'informing',
    data(){
      return{
        noInforming_page:false
      }
    },
    created(){
      let obj = this.checkPageAuth(this,"noInforming_page",this.btnAuth)
    }

  }
</script>

<style scoped>
  #app{
  	overflow-x: hidden;
    background: #FAFAFA;

  }
</style>
