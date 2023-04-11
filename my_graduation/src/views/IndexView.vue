<template>
  <div ref="vantaRef" style="width:100%;height:150vh">
    <el-container class="container">
      <div style="display:flex; flex-wrap: wrap;">
        <el-dropdown style="flex-shrink: 0;">
          <el-button type="primary">
            {{content}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="scene in scenes" :key="scene" @click="selectScene(scene)">{{ scene
              }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="flex-shrink: 0; margin-left: 20px;">
          <el-form-item label="原始视频">
            <el-input v-model="formInline.user" placeholder="未生成">{{original_video}}</el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">生成</el-button>
          </el-form-item>
          <el-form-item label="预测视频">
            <el-input v-model="formInline.user" placeholder="未生成">{{predicted_video}}</el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">生成</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="video-container">
        <div class="video">
          <div class="video1">
            <div class="video-window" style="flex-basis: 300px; margin-right: 20px;">
              <video ref="video1" :src="video1Url" width="300" height="225"></video>
              <video ref="video3" :src="video3Url" width="300" height="225"></video>
              <video ref="video4" :src="video4Url" width="300" height="225"></video>
            </div>
            <div class="video-window" style="flex-basis: 300px; margin-right: 20px;">
              <video ref="video5" :src="video5Url" width="300" height="225"></video>
              <video ref="video6" :src="video6Url" width="300" height="225"></video>
              <video ref="video7" :src="video7Url" width="300" height="225"></video>
            </div>
          </div>
          <div class="buttonOK" style="flex-basis: 300px; margin-right: 20px;">
            <el-button @click="togglePlay('video2')">
              <i class="el-icon-video-play"></i>
            </el-button>
          </div>
        </div>
        <div class="video-window">
          <video ref="video2" :src="video2Url" width="400" height="300"></video>
          <div class="buttonOK1" style="flex-basis: 300px; margin-right: 20px; margin-top: 20px;">
          <el-button @click="togglePlay1('video2')" >
            <i class="el-icon-video-play"></i>
          </el-button>
        </div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import BIRDS from 'vanta/src/vanta.net'

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
        },
        scenes: [],
        content: '场景列表',
        original_video: '',
        predicted_video: '',
        isPlaying: false // 是否正在播放        
      }
    },
    created () {
      this.$axios.get('http://localhost:8899/scenes')
        .then(response => {
          this.scenes = response.data;
        })
        .catch(error => {
          console.log(error);
        });
      // this.$axios.get('http://localhost:8899/scenes/'++this.content)
      this.$axios.get('http://localhost:8899/scenes/ddd')
        .then(response => {
          console.log(response.data)
          console.log(response.data.scene_video_path)
          console.log(response.data.scene_pre_video_path)
          this.original_video = response.data.scene_video_path;
          this.predicted_video = response.data.scene_pre_video_path
          if (!this.original_video) {
            this.original_video = "点击生成原始视频"
          } else {
            this.original_video = "原始视频已存在"
          }
          if (!this.predicted_video) {
            this.predicted_video = "点击生成预测视频"
          } else {
            this.predicted_video = "预测视频已存在"
          }
        })
        .catch(error => {
          console.log(error);
        });
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
      selectScene (scene) {
        console.log(scene)
        this.content = scene
      },
      togglePlay1 () {
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
      onSubmit () {
        console.log('submit!');
      }
    },

    mounted () {
      this.vantaEffect = BIRDS({
        el: this.$refs.vantaRef,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x7d6168,
        backgroundColor: 0xede9f5,
        showDots: false,
        THREE: THREE
      })
    },
    beforeDestroy () {
      if (this.vantaEffect) {
        this.vantaEffect.destroy()
      }
    }
  }
</script>

<style>
  .video {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .video1 {
    display: flex;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: rgba(226, 125, 17, 0.055);
    height: 150vh;
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