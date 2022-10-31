<template>
  <div class="error-page">
    <div class="error-code">4<span>0</span>4</div>
    <div class="error-desc">您访问的页面不存在</div>
    <div class="error-handle">
      <router-link to="/" class="gohome">
      返回首页
      </router-link>
     
    </div>
  </div>
</template>

<script>
export default {
  methods: {

  }
};
</script>


<style scoped>
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
color: #2d8cf0;
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
</style>
