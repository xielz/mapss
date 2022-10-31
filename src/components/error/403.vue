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

<!-- <img src="https://img-home.csdnimg.cn/images/20201124032511.png" alt="" > -->


<!-- <video preload="auto"  align="center" controls="" data-v-8ad80ad6="" style="width:100%;height:100%;">
  <source src="https://v-cdn.zjol.com.cn/280443.mp4" type="video/mp4" data-v-8ad80ad6="">
  </video> -->


  <!-- <iframe class="filename" src="https://view.officeapps.live.com/op/view.aspx?src=https://jbscn.fafu.edu.cn/_upload/article/files/24/6d/e22a7e9745dbb183c10baa5e48f7/a766b6d2-7400-4aa4-9675-7f5fd1dfbb65.pdf" width='100%' height='600' frameborder='1' ></iframe> -->

    <button @click="clickSelect">点击查看</button>
    

    <!-- 引用组件 -->
    <el-dialog title="预览" v-model="dialogVisible" :visible.sync="previewFileShow" idth="80%" 
    :modal-append-to-body='false' :close-on-press-escape='false' :close-on-click-modal='false' :before-close="handleClose" style="height:auto">
      <showpreview :file="previewFile" v-if="previewFileShow" ></showpreview>
    </el-dialog>

  <!-- <showpreview :file="previewFile" v-if="previewFileShow" ></showpreview> -->

  </div>
</template>

<script>
import showpreview from "../module/Preview";
export default {
  data() {
    return {
      dialogVisible: false,

      previewFile: {}, // 传递的参数
      previewFileShow: false // 默认预览框是关闭状态
    };
  },
  methods: {
    clickSelect() {
      this.previewFile={
        //   "fileName":'png',
        //  "downloadUrl":"https://img-home.csdnimg.cn/images/20201124032511.png"


        // "fileName":'.mp4',
        // "downloadUrl":"https://v-cdn.zjol.com.cn/280443.mp4"

         fileName: ".doc",
        downloadUrl: "http://edf.xmu.edu.cn/Attachments/System/202012/a6fc40329ddb4bcb90f155b9e304cd7b.doc"

           
        //    fileName: ".docx",
        //  downloadUrl: "http://192.168.16.15:7100/resouce/FileContainer/2022-08-11/3a059cb1-b0a8-d16f-c007-f8c883e6d740.docx"

        // resouce/FileContainer/2022-08-11/3a059cb1-b0a8-d16f-c007-f8c883e6d740.docx

        // fileName:"xlsx",
        // downloadUrl:'http://gjj.xm.gov.cn/xzzx/gjjjc/201809/P020200810349156676806.xlsx'

        // fileName:"pdf",
        // downloadUrl:'https://jbscn.fafu.edu.cn/_upload/article/files/24/6d/e22a7e9745dbb183c10baa5e48f7/a766b6d2-7400-4aa4-9675-7f5fd1dfbb65.pdf'
       


       
      }


      this.previewFileShow = true;
      this.dialogVisible = true;
          
 
       //判断是否是doc xlxl文件才跳转这个
      // window.open('https://view.officeapps.live.com/op/view.aspx?src=' + this.previewFile.downloadUrl, '_blank',)
      



      //  this.previewFile.fileName = this.previewFile.fileName
      //  this.previewFile.downloadUrl = this.previewFile.downloadUrl



      // this.previewFile.fileName = row.fileName;
      // this.previewFile.downloadUrl = row.downloadUrl;
      // var kk = JSON.stringify(this.previewFile);
      // this.previewFile = JSON.parse(kk).downloadUrl;
      // console.log("kk", this.previewFile);

    },
    handleClose() {
      this.previewFileShow = false;
        this.dialogVisible = false;
    },

    // preview(index, row) {
    //   this.previewFileShow = true;
    //   this.previewFile.fileName = row.fileName;
    //   this.previewFile.downloadUrl = row.url;
    // }
  },
  components: {
    showpreview
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

.aa {
  width: 300px;
  height: 300px;
  display: block;
}
</style>
