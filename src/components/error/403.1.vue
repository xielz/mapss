<template>
<div>
<!-- <div class="error-page">
  <div class="error-code">4<span>0</span>3</div>
  <div class="error-desc">您没有权限访问该页面</div>
  <div class="error-handle">
    <router-link to="/" class="gohome">
      返回首页
    </router-link>
  </div>

</div> -->

 <button @click="clickSelect">点击查看</button>

<!-- 引用组件 -->
<el-dialog title="预览" 
v-model="dialogVisible"
	:visible.sync="previewFileShow" 
	idth="80%" 
	:modal-append-to-body='false'
    :close-on-press-escape='false'
    :close-on-click-modal='false'
    :before-close="handleClose" 
	style="height:auto">
    <showpreviewFile :file="previewFile" v-if="previewFileShow" class="aa"></showpreviewFile>
</el-dialog>

</div>
</template>

<script>

import showpreview from '../module/Preview'
export default {
  data(){
       return{
         dialogVisible:false,
         
           previewFile:{}, // 传递的参数
           previewFile2:{}, 
           previewFileShow:false // 默认预览框是关闭状态
       }
    },
  methods: {
    clickSelect(){
      console.log("111111")


      this.previewFile={
        "fileName":'mp4',
        "downloadUrl":"https://img-home.csdnimg.cn/images/20201124032511.png"
      }
    //  this.dialogVisible=true;
    //    this.previewFileShow = true 
       
      
this.previewFile2={
           "fileName":'mp4',
           "downloadUrl":'https://v-cdn.zjol.com.cn/280443.mp4'
         }
  
        JSON.stringify(this.previewFile) 


  console.log("this.previewFile",this.previewFile.fileName)


         this.previewFileShow = true; 
          this.dialogVisible=true;
      //  this.previewFile.fileName = row.fileName
      //  this.previewFile.downloadUrl = row.url 

         this.previewFile.fileName = this.previewFile2.fileName;
       this.previewFile.downloadUrl = this.previewFile2.downloadUrl;
    },
handleClose(){
	this.previewFileShow = true 
},

preview(index,row){
       this.previewFileShow = true 
       this.previewFile.fileName = row.fileName
       this.previewFile.downloadUrl = row.url 
  }   
  }
};
</script>
<style lang="less" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  background: #ffffff;
  box-sizing: border-box;
  position: absolute;
}

.error-code {
 
  font-size: 70px;
  font-weight: bolder;
  color: #f02d2d;
}

.error-code span {
  color: #00a854;
}

.error-desc {
  font-size: 28px;
  color: #777;
}

.error-handle {
  margin-top: 40px;
 
}

.goback {
  margin-left: 1rem;
  font-size: 28px;
  display: inline-block;
}

.gohome {
  color: #ffffff;
  background: #2d8cf0;
  font-size: 24px;
  display: inline-block;
  padding: 10px 30px;
  border-radius: 10px;
}

  .aa{width: 300px;
    height: 300px;
    display: block;}
</style>
