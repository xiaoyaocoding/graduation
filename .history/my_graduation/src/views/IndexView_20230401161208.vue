<template>
  <div class="container">
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        Select an option<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="option1">Option 1</el-dropdown-item>
        <el-dropdown-item command="option2">Option 2</el-dropdown-item>
        <el-dropdown-item command="option3">Option 3</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-form label-position="top" label-width="100px">
      <el-form-item label="Text Field 1">
        <el-input v-model="text1"></el-input>
      </el-form-item>
      <el-form-item label="Text Field 2">
        <el-input v-model="text2"></el-input>
      </el-form-item>
    </el-form>
    <div class="video-container">
      <div class="video-window">
        <video ref="video1" :src="video1Url" width="400" height="300"></video>
        <el-button @click="togglePlay('video1')">Play/Pause</el-button>
      </div>
      <div class="video-window">
        <video ref="video2" :src="video2Url" width="400" height="300"></video>
        <el-button @click="togglePlay('video2')">Play/Pause</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import ElDropdown from 'element-ui';
import ElDropdownMenu from 'element-ui';
import ElDropdownItem from 'element-ui';
import ElForm from 'element-ui';
import ElFormItem from 'element-ui';
import ElInput from 'element-ui';
import ElButton from 'element-ui';


export default {
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
  },
  data() {
    return {
      video1Url: require('@/assets/front.mp4'),
      video2Url: require('@/assets/output.mp4'),
      text1: 'original_video',
      text2: 'predicted_video',
    }
  },
  methods: {
    togglePlay(refName) {
      const video = this.$refs[refName];
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    },
    handleCommand(command) {
      console.log('Selected option:', command);
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
