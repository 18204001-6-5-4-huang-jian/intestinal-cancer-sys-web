<template>
<span class="uploadFile">
  <input type="file" multiple="multiple" id="multipartFile" name="multipartFile" @change="getFile($event,id)" accept="image/*">
  <el-button type="text" size='small'>上传</el-button>
</span>
</template>

<script>
  export default {
    name: 'uploadFile',
    props:['id','flag'],
    data () {
      return {
       fileList:[],
      }
    },
    mounted(){
     
    },
    
    methods:{
      // 多图片上传
        getFile(event,id) {
          //追加isShow属性
          for(var i=0;i<event.target.files.length;i++){
            this.fileList.push(event.target.files[i]);
          }
            let formData = new FormData();
            for(var i=0;i<this.fileList.length;i++){
              formData.append('file', this.fileList[i]);
            }
             const loading = this.$loading({
              lock: true,
              text: '图片拼命上传中...',
              spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.5)'
            });
            this.$ajax.post(SERVER_NAME+'/base/colonoscopy/imgUpload?id='+id, formData,{
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }).then(res => {
              loading.close();
              if(res.data.statusCode=='000000'){
                this.fileList=[];
                 this.$message({
                  message: '图片上传成功',
                  type: 'success'
                });
                event.target.value='';
                if(this.flag=='0'){
                  // 刷新待办
                  this.$emit('refreshList',this.$store.state.stayColonscopyListPageNo,this.$store.state.stayColonscopyListPageSize);
                }else{
                  // 刷新肠镜管理列表
                  this.$emit('refreshList',this.$store.state.regionColonscopyListPageNo,this.$store.state.regionColonscopyListPageSize);
                }
              }else{
                this.$message({
                  message: res.data.statusMsg,
                  type: 'error'
                });
              }
              
            })
        },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .uploadFile{
    position: relative;
    display: inline-block;
    margin-left: 10px;
    width: 30px;
    height: 15px;
    overflow: hidden;
  }
  .uploadFile input{
    position:absolute;
    opacity: 0;
    width: 30px;
    z-index: 1;
    top:-6px;
    left:0;
  }
  .uploadFile button{
    width: 30px;
    position:absolute;
    text-align: center;
    right: left;
    top: -6px;
  }
</style>
