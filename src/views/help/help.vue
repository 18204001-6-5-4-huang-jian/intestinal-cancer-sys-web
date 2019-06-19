<template>
  <div slot="right" class="content-page" v-if="help_page">
    <div>
      <p>表单下载</p>
      <div class="list-wrapper">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">《表A1-受试者资格审核表》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName + '/base/dnafile/downFile?filePath=/static/doc/A1.docx'" target="_blank" download="受试者资格审核表">立即下载</a></span></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">《表A2-联系信息与危险因素调查表》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName + '/base/dnafile/downFile?filePath=/static/doc/A2.docx'" target="_blank" download="联系信息与危险因素调查表">立即下载</a></span></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">《粪便隐血试验（FIT）结果告知书》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="">立即下载</span></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">《结肠镜检查结果记录表》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName + '/base/dnafile/downFile?filePath=/static/doc/B1.docx'" target="_blank" download="结肠镜检查结果记录表">立即下载</a></span></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">《病理检查结果表》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName + '/base/dnafile/downFile?filePath=/static/doc/B2.docx'" target="_blank" download="病理检查结果表">立即下载</a></span></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">《结肠镜筛查结果告知书》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName + '/base/dnafile/downFile?filePath=/static/doc/B9.docx'" target="_blank" download="结肠镜筛查结果告知书">立即下载</a></span></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">《违反方案事件记录表》</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><span class="">立即下载</span></div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="margin-top: 30px;">
      <p>操作说明</p>
      <div class="list-wrapper1">
        <el-row>
          <el-col :span="18">
            <div class="grid-content bg-purple">《中国人群结直肠癌筛查随机对照试验信息管理平台用户使用手册（地区医院）》</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light"><span class="down"><a :href="serverName + '/base/dnafile/downFile?filePath=/static/doc/area.pdf'" target="_blank" download="地区手册">立即下载</a></span></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Right',
    data () {
      return {
        //权限判定
        visible2:false,
        help_page: false,
        serverName:SERVER_NAME,
        btnAuth: {
          buttonRoleAdd: false,
          buttonRoleEditor: false,
          buttonRoleDel: false,
          buttonRoleQuery: false,
          buttonUserRoleDis: false
        },
      }
    },
    mounted(){
      this.$store.commit('LOGOUT_USER');
      let obj = this.checkPageAuth(this, "help_page", this.btnAuth);
    },
    methods: {}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-page {
    padding: 20px;
    background: #fff;
  }

  .list-wrapper {
    height: 240px;
    border: 1px solid #e5e5e5;
    margin-top: 20px;
    padding: 20px;
  }

  .list-wrapper1 {
    height: 120px;
    border: 1px solid #e5e5e5;
    margin-top: 20px;
    padding: 10px;
  }

  .down {
    color: blue;
  }
</style>
