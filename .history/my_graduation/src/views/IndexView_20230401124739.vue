
<template>
  <div class="video-container">
    <div class="video-window">
      // eslint-disable-next-line vue/no-parsing-error
      <video :src="[../../back.mp4]" width="400" height="300"></video>
    </div>
    <div class="video-window">
      <video :src="../../output.mp4" width="400" height="300"></video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      video1Url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      video2Url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    }
  }
}
</script>

<style>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  height: 100vh;
}

.video-window {
  margin: 10px;
}
</style>
