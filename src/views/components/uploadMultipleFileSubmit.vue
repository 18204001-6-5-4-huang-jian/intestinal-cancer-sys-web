<template>
<div>
  <span class="uploadFile"  v-if="$route.query.flag!=0">
    <input type="file" multiple="multiple" id="multipartFile" name="multipartFile" @change="getFile($event)">
    <el-button type="primary" size="small"><i class="el-icon-upload2"></i>上传复印件</el-button>
  </span>
  <ul class="fileList">
    <li v-if="uploadFileList.length>0">上传文件列表：</li>
    <li v-for="item in uploadFileList">
      <span class="fileName" v-if="item.fileSuffix!='jpg' && item.fileSuffix!='jpeg' && item.fileSuffix!='png' && item.fileSuffix!='gif' && item.fileSuffix!='svg' && item.fileSuffix!='bmp'"><a :href="serverName + '/base/dnafile/downFile?filePath=' + item.filePath">{{item.fileNickname}}</a></span>
      <span class="fileName" @click="zoom(item)" v-if="item.fileSuffix=='jpg' || item.fileSuffix=='jpeg' || item.fileSuffix=='png' || item.fileSuffix=='gif' || item.fileSuffix=='svg' || item.fileSuffix=='bmp'">{{item.fileNickname}}</span>
      <span class="el-icon-close" @click="del(item)"  v-if="$route.query.flag!=0"></span>
      </li>
  </ul>
  <el-dialog :visible.sync="picVisible" width="900px">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<script>
  export default {
    name: 'uploadFile',
    props:['reportUrls'],
    data () {
      return {
       fileList:[],  //已选择文件
       uploadFileList:[],   //已上传文件
       serverName:SERVER_NAME,
       picVisible:false,
       dialogImageUrl:'', //当前图片地址
       pathUrls:[],    //上传文件地址
      }
    },
    mounted(){
       this.reportUrls.filter(item=>{
            this.uploadFileList.push(item);
            this.pathUrls.push(item);
          })
    },
    methods:{
       zoom(item){
        this.picVisible=true;
        this.dialogImageUrl=SERVER_NAME + '/base/dnafile/downFile?filePath=' + item.filePath;
      },
      del(item){
         for (var i = this.uploadFileList.length; i>=0; i--){
           if(this.uploadFileList[i]==item){
              this.uploadFileList.splice(i,1);
           }
        }
         //删除文件路径的地址
        for (var i = this.pathUrls.length-1; i>=0; i--){
           if(this.pathUrls[i].filePath==item.filePath){
              this.pathUrls.splice(i,1);
           }
        }
        this.$emit('getUrl2',this.pathUrls)
      },
      // 多图片上传
        getFile(event) {
          for(var i=0;i<event.target.files.length;i++){
            event.target.files[i].url=URL.createObjectURL(event.target.files[i]);
            this.fileList.push(event.target.files[i]);
          }
          // 上传
            let formData = new FormData();
            for(var i=0;i<this.fileList.length;i++){
              formData.append('files', this.fileList[i]);
            }
             const loading = this.$loading({
              lock: true,
              text: '文件拼命上传中...',
              spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.5)'
            });
            this.$ajax.post(SERVER_NAME+'/zuul/base/hospital/cancer/fileUpload', formData,{
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }).then(res => {
              loading.close();
              if(res.data.statusCode=='000000'){
                this.fileList=[];
                for(let item of res.data.data){
                  this.uploadFileList.push(item)
                }
                // 上传成功返回的url数组
                for(let item of res.data.data){
                  this.pathUrls.push(item)
                }
                this.$emit('getUrl',this.pathUrls)
                 this.$message({
                  message: '文件上传成功',
                  type: 'success'
                });
                event.target.value='';
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
    margin-left: 30px;
    width: 104px;
    height:32px;
    overflow: hidden;
    cursor: pointer;
  }
  .uploadFile input{
    position:absolute;
    opacity: 0;
    z-index: 1;
    width: 104px;
    height:32px;
    left:0;
    cursor: pointer;
  }
  .uploadFile button{
    position:absolute;
    text-align: center;
    right: left;
    cursor: pointer;
  }
  .fileList{
    margin-left: 30px;

  }
   .fileList li{
     list-style: none;
     font-size: 14px;
     color: #606266;
     margin: 10px 0;
     width: 400px;
     position: relative;
     height: 20px;
     cursor: pointer;
   }
   .fileName{
     display: inline-block;
     width: 350px;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
     color: #409EFF;
     line-height: 20px;
   }
   .fileList li .el-icon-close{
     position: absolute;
     right: 0;
     line-height: 20px;
   }
</style>
