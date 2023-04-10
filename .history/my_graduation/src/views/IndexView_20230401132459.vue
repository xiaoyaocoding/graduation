<template>
  <div class="video-container">
    <div class="video-window">
      <video :src="video1Url" width="400" height="300"></video>
    </div>
    <div class="video-window">
      <video :src="video2Url" width="400" height="300"></video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      video1Url: 'C:\\Users\\小妖\\Desktop\\graduation\\916\\back.mp4',
      video2Url: '../../output.mp4',
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
