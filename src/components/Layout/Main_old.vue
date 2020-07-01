<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
#main-wrap {
  height: 100vh;
  overflow: hidden;
  // position: fixed;
  // left: $navMenu;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // z-index: -1;
}
.main-content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.close .main-content {
  padding: ($layoutHeader + 30) 30px 0 ($navMenuMin + 30);
}
.open .main-content {
  padding: ($layoutHeader + 30) 30px 0 ($navMenu + 30);
}
.content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 30px 0 30px;
  background-color: #fff;
}
</style>
