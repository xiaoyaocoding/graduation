<template>
  
  <el-container class="container">
    <div style="display:flex; flex-wrap: wrap;">
    <el-dropdown style="flex-shrink: 0;">
      <el-button type="primary">
        {{ selectedOption || placeholder }}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="scene in scenes" :key="scene" @click="selectScene(scene)">{{ scene }}</el-dropdown-item>
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
        <el-input v-model="formInline.user" placeholder="未生成"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">生成</el-button>
      </el-form-item>
    </el-form>
    </div>
    
    <div class="video-container">
      <div class="video">
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
      <el-button @click="togglePlay('video2')">
        <i class="el-icon-video-play"></i>
      </el-button>
    </div>
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
        },
        selectedOption:'',
        scenes:[],
        placeholder:'请选择场景',
        original_video:''
      }
    },
    created(){
      this.$axios.get('http://localhost:8899/scenes')
      .then(response => {
        this.scenes = response.data;
      })
      .catch(error => {
        console.log(error);
      });
      this.$axios.get('http://localhost:8899/scenes/ddd')
      .then(response => {
        this.original_video = response.data;
        console.log(this.original_video)
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
      selectScene(scene){
        this.placeholder = scene
        this.selectedOption = scene
        console.log(scene)
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
  .video {
    display: flex;
    justify-content: center;
  }
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