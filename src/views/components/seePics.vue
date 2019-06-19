<template>
<div class="pics">
  <ul class='fileList clearfix'>
    <li class="noimg" v-if="fileList.length==0">
      暂无图片
    </li>
    <li  class="fl" v-for="item in fileList">
      <img :src="item.filePath" alt="">
      <div class="btnBox">
        <i class="el-icon-zoom-in" @click="zoom(item)"></i>
        <!-- <i class="el-icon-delete" @click="del(item)"></i> -->
      </div>
      </li>
  </ul>
  <el-dialog :visible.sync="picVisible" width="900px">
    <div>
      <el-button size="mini" type="primary" plain @click="pre" :disabled="!showA">上一张</el-button>
      <el-button size="mini" type="primary" plain @click="next" :disabled="!showB">下一张</el-button>
      <!-- <i class="el-icon-arrow-left" @click="pre" v-show="showA"></i>
      <i class="el-icon-arrow-right" @click="next" v-show="showB"></i> -->
    </div>
    <img width="100%" :src="dialogImageUrl" alt="">
    
  </el-dialog>
</div>
</template>

<script>
  export default {
    name: 'seePic',
    props:['fileList'],
    data () {
      return {
       picVisible:false,
       dialogImageUrl:'', //当前图片地址
       index:'' ,   //当前图片索引
       showA:true,
       showB:true,
       SERVER_NAME:SERVER_NAME
      }
    },
    created(){
      // this.fileList && this.fileList.filter(item=>{
      //   item.filePath=SERVER_NAME + '/base/dnafile/downFile?filePath=' + item.filePath
      // })
    },
    mounted(){

    },
    methods:{
      zoom(item){
        console.log(item)
        this.picVisible=true;
        this.dialogImageUrl=item.filePath;
        this.index=this.fileList.indexOf(item);
        if(this.index==0){
          this.showA=false
        }else{
          this.showA=true
        }
        if(this.index+1==this.fileList.length){
          this.showB=false
        }else{
          this.showB=true
        }
      },
      del(item){
         for (var i = this.fileList.length; i>=0; i--){
           if(this.fileList[i]==item){
              this.fileList.splice(i,1);
           }
        }
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
        this.dialogImageUrl=this.fileList[this.index].filePath;
       
      },
      // 下一张
      next(){
        this.index++;
        if(this.index+1==this.fileList.length){
          this.showB=false;
        }else{
          this.showB=true;
        }
        this.showA=true;
        this.dialogImageUrl=this.fileList[this.index].filePath;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bBox{
  position: relative;
}
.bBox input{
  width: 98px;
  height: 40px;
  position: absolute;
  opacity: 0;
  cursor: pointer;
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
.fileList li.noimg{
  margin-left:0px;
  width: 100%;
  font-size: 30px;
  text-align: center;
  line-height: 80px;
  color: #bbb;
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
  margin:30px 30px 0;
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
