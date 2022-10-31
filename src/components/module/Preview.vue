<template>
  <div>
    <div>
      <!-- <iframe
        class="child"
        frameborder="0"
        :src="'http://view.xdocin.com/xdoc?_xdoc=' + this.downloadUrl"
        :style="{ width: width,height:height}"
      >
      </iframe> -->

        <!-- <iframe
        class="child"
        frameborder="0"
        :src="'https://192.168.16.24/preview/onlinePreview?url=' + this.downloadUrl"
        :style="{ width: width,height:height}"
      >
      </iframe> -->

            <iframe
        class="child"
        frameborder="0"
        :src="link+'preview/onlinePreview?url=' + this.downloadUrl"
        :style="{ width: width,height:height}"
      >
      </iframe>
    </div>
  </div>
</template>
<script>
export default {
  props: { file: {} },
  data() {
    return {
      downloadUrl: '',
      height: window.innerHeight-350 + 'px',
      width: '100%',
      link:"",
    };
  },
  created() {
 

    // this.downloadUrl = this.file.downloadUrl;// 文件路径

     this.downloadUrl = window.location.protocol+"//"+window.location.host+this.file.downloadUrl;// 文件路径
    this.link=this.$api.localPath;
  }
};
</script>
<style scoped>
.child{
 width: 100%;
  height: 100%;
  /* scrolling: no;
  frameborder: 0; */
  border: 0;
  margin:0;
  display: block;
}
.video,.img {
  width:100%;height:100%;
}
</style>