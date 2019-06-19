<template>
<div class="pics">
  <ul class='fileList clearfix'>
    <li  class="fl" v-for="item in uploadFileList">
      <img :src="item.filePath" alt="">
      <div class="btnBox">
        <i class="el-icon-zoom-in" @click="zoom(item)"></i>
        <i class="el-icon-delete" @click="del(item)"></i>
      </div>
    </li>
    <li  class="fl" v-for="item in fileList">
      <img :src="item.url" alt="">
      <div class="btnBox">
        <i class="el-icon-zoom-in" @click="zoom(item)"></i>
        <i class="el-icon-delete" @click="del(item)"></i>
      </div>
    </li>
    <li class="bBox fl">
      <input type="file" multiple="multiple" id="multipartFile" name="multipartFile" @change="getFile($event,id)" accept="image/*">
      <i class="el-icon-plus"></i>
    </li>
  </ul>
  <el-dialog :visible.sync="picVisible" width="900px">
    <div>
      <el-button size="mini" type="primary" plain @click="pre" :disabled="!showA">上一张</el-button>
      <el-button size="mini" type="primary" plain @click="next" :disabled="!showB">下一张</el-button>
    </div>
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<script>
var objDeepCopy = function (source) {   //深拷贝
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}
  export default {
    name: 'uploadFile',
    props:['id','flag','uploadFileList'],
    data () {
      return {
       fileList:[],  //已选择文件
      //  uploadFileList:[],   //已上传文件
       pathUrls:[],   //上传成功返回的url数组
       picVisible:false,
       dialogImageUrl:'', //当前图片地址
       index:'' ,   //当前图片索引
       showA:true,
       showB:true
      }
    },
    created(){
      // this.uploadFileList && this.uploadFileList.filter(item=>{
      //   item.filePath=SERVER_NAME + '/base/dnafile/downFile?filePath=' + item.filePath
      // })
    },
    mounted(){
     
    },
    
    methods:{
      zoom(item){
        this.picVisible=true;
        this.dialogImageUrl=item.filePath;
        this.index=this.uploadFileList.indexOf(item);
        if(this.index==0){
          this.showA=false
        }else{
          this.showA=true
        }
        if(this.index+1==this.uploadFileList.length){
          this.showB=false
        }else{
          this.showB=true
        }
      },
      del(item){
         for (var i = this.uploadFileList.length; i>=0; i--){
           if(this.uploadFileList[i]==item){
              this.uploadFileList.splice(i,1);
           }
        }
        //删除图片路径修改前的地址
        for (var i = this.pathUrls.length-1; i>=0; i--){
          if(item.filePath.indexOf('=')>-1){
            item.filePath=item.filePath.split('=')[1];
          }else{
            item.filePath=item.filePath
          }
           if(this.pathUrls[i].filePath==item.filePath){
              this.pathUrls.splice(i,1);
           }
        }
        this.$emit('getUrl2',this.pathUrls)
      },
     //前一张 
      pre(){
        this.index--;
        if(this.index==0){
          this.showA=false;
        }else{
          this.showA=true;
        }
        this.showB=true;
        this.dialogImageUrl=this.uploadFileList[this.index].filePath;
       
      },
      // 下一张
      next(){
        this.index++;
        if(this.index+1==this.uploadFileList.length){
          this.showB=false;
        }else{
          this.showB=true;
        }
        this.showA=true;
        this.dialogImageUrl=this.uploadFileList[this.index].filePath;
      },
      // 多图片上传
        getFile(event,id) {
          //追加isShow属性
          for(var i=0;i<event.target.files.length;i++){
            event.target.files[i].url=URL.createObjectURL(event.target.files[i]);
            this.fileList.push(event.target.files[i]);
          }
          // 上传
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
            this.$ajax.post(SERVER_NAME+'/base/colonoscopy/imgUpload', formData,{
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }).then(res => {
              loading.close();
              if(res.data.statusCode=='000000'){
                this.fileList=[];
                let arrayB=objDeepCopy(res.data.data);
                // 上传成功返回的url数组
                for(let item of res.data.data){
                  this.pathUrls.push(item)
                }
                this.$emit('getUrl',this.pathUrls)
                // 上传成功返回的图片信息
                arrayB.filter(item=>{
                  item.filePath=SERVER_NAME + '/base/dnafile/downFile?filePath=' + item.filePath
                })
                for(let item of arrayB){
                  this.uploadFileList.push(item)
                }

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
.fileList .bBox{
  position: relative;
  border:1px dashed #dcdfe6;
  background:#fff;
  cursor: pointer;
  margin-left: 10px;
}
.bBox input{
  width: 80px;
  height: 80px;
  position: absolute;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}
.bBox i{
  font-size: 32px;
  position:absolute;
  top: 50%;
  left: 50%;
  color: #c4cbd5;
  transform: translate(-50%,-50%);
}
.fileList{
  border:1px solid rgb(153, 153, 153);
  padding-top: 10px;
  margin-bottom:20px;
}
.fileList li{
  margin-left:10px;
  width: 80px;
  height: 80px;
  overflow: hidden;
  position: relative;
  margin-bottom:10px;
}
.fileList li img{
  width: 80px;
  height: 80px;
  border:1px solid rgb(153, 153, 153);
}
.btnBox{
  display: none;
  position: absolute;
  background: rgba(0,0,0,0.5);
  width: 80px;
  height: 80px;
  top: 0;
  left: 0;
}
.btnBox i{
  display: inline-block;
  font-size: 20px;
  color: #fff;
  margin:30px 10px 0;
  cursor: pointer;
}
.fileList li:hover .btnBox{
  display: block;
}
.el-dialog__body button{
  color: #777;
  cursor: pointer;
  margin-top:-30px;
  margin-bottom:10px;
}
</style>
