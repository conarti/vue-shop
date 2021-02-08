<template>
  <div class="overlay">
    <div class="dialog" style="margin-top: 15vh; width: 50%;">
      
    </div>
  </div>
</template>

<script>
export default {
name: "DialogCreate"
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3000;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  overflow: auto;
}
.dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
  box-sizing: border-box;
}
</style>
