<template>
  
  <el-container class="container">
    <div style="display:flex; flex-wrap: wrap;">
    <el-dropdown style="flex-shrink: 0;">
      <el-button type="primary">
        场景列表<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="flex-shrink: 0; margin-left: 20px;">
      <el-form-item label="原始视频">
        <el-input v-model="formInline.user" placeholder="未生成"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">生成</el-button>
      </el-form-item>
      <el-form-item label="预测视频">
        <el-input v-model="formInline.user" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">生成</el-button>
      </el-form-item>
    </el-form>
    </div>
    
    <div class="video-container" >
      <div class="video-window">
        <video ref="video1" :src="video1Url" width="300" height="225"></video>
        <video ref="video3" :src="video3Url" width="300" height="225"></video>
        <video ref="video4" :src="video4Url" width="300" height="225"></video>
      </div>
      <div class="video-window">
        <video ref="video5" :src="video5Url" width="300" height="225"></video>
        <video ref="video6" :src="video6Url" width="300" height="225"></video>
        <video ref="video7" :src="video7Url" width="300" height="225"></video>
      </div>
      <el-button @click="togglePlay('video2')">
        <i class="el-icon-video-play"></i>
      </el-button>
      <div class="video-window">
        <video ref="video2" :src="video2Url" width="400" height="300"></video>
        <el-button @click="togglePlay1('video2')">
          <i class="el-icon-video-play"></i>
        </el-button>
      </div>
    </div>
  </el-container>
</template>

<script>


  export default {
    data () {
      return {
        video1Url: require('@/assets/front.mp4'),
        video2Url: require('@/assets/output.mp4'),        
        video3Url: require('@/assets/front_left.mp4'),
        video4Url: require('@/assets/front_right.mp4'),        
        video5Url: require('@/assets/back.mp4'),
        video6Url: require('@/assets/back_left.mp4'),        
        video7Url: require('@/assets/back_right.mp4'),
        text1: 'original_video',
        text2: 'predicted_video',
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      togglePlay () {
        const videos = [
          this.$refs.video1,
          this.$refs.video3,
          this.$refs.video4,
          this.$refs.video5,
          this.$refs.video6,
          this.$refs.video7,
        ];
        videos.forEach((video) => {
            if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      togglePlay1(){
        const video = this.$refs.video2;
        if (video.paused) {
            video.play();
          } else {
            video.pause();
        }
      },
      handleCommand (command) {
        console.log('Selected option:', command);
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: rgba(255, 255, 255, 0.5);
    height: 100vh;
    padding: 20px;
  }

  .video-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .video-window {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }
</style>