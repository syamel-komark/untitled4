<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Schedule Dashboard</h2>
    <div class="machine-select">
      <div class="machine-group">
        <button v-if="!label" @click="showLabel">LABEL</button>
        <button v-if="label" :style="{ backgroundColor: '#1e7ff7' }" @click="showLabel">LABEL</button>
        <button v-if="!flexible" @click="showFlexible">FLEXIBLE</button>
        <button v-if="flexible" :style="{ backgroundColor: '#1e7ff7' }" @click="showFlexible">FLEXIBLE</button>
        <button v-if="!digital" @click="showDigital">DIGITAL</button>
        <button v-if="digital" :style="{ backgroundColor: '#1e7ff7' }" @click="showDigital">DIGITAL</button>
        <div v-if="label" class="machine">
          <button @click="showECS">ECS340</button>
          <button @click="showEM2801">EM280-1</button>
          <button @click="showEM2802">EM280-2</button>
          <button @click="showKP13">KP13</button>
          <button @click="showKP8">KP8</button>
          <button @click="showIWASAKI">IWASAKI</button>
          <button @click="showSONATA">SONATA</button>
        </div>
        <div v-if="digital" class="machine">
          <button @click="showDIGITAL1">DIGITAL-1</button>
          <button @click="showDIGITAL2">DIGITAL-2</button>
          <button @click="showRHYGUAN">RHYGUAN</button>
          <button @click="showGALLUS4">GALLUS4</button>
        </div>
        <div v-if="flexible" class="machine">
          <button @click="showUTECO">UTECO</button>
          <button @click="showGRAVURE">GRAVURE</button>
          <button @click="showLAMINATE">LAMINATE</button>
          <button @click="showFLEXO">FLEXO</button>
          <button @click="showBAGMAKING1">BAGMAKING-1</button>
          <button @click="showBAGMAKING2">BAGMAKING-2</button>
          <button @click="showSLITTING1">SLITTING-1</button>
          <button @click="showSLITTING2">SLITTING-2</button>
          <button @click="showSLITTIN3">SLITTING-3</button>
        </div>
      </div>
    </div>
    <div class="schedule-container">
      <div class="schedule-board">
        <div v-if="isECS" class="ecs-schedule">
          <button @click="getECSJobsheet">Get ECS Jobsheet</button>
        </div>
        <div v-if="isEM1" class="ecs-schedule">
          <button @click="getEM1Jobsheet">Get EM1 Jobsheet</button>
        </div>
        <div v-if="isEM2" class="ecs-schedule">
          <button @click="getEM2Jobsheet">Get EM2 Jobsheet</button>
        </div>
        <div v-if="isKP13" class="ecs-schedule">
          <button @click="getKP13Jobsheet">Get KP13 Jobsheet</button>
        </div>
        <div v-if="isKP8" class="ecs-schedule">
          <button @click="getKP8Jobsheet">Get KP8 Jobsheet</button>
        </div>
        <div v-if="isIWA" class="ecs-schedule">
          <button @click="getIWAJobsheet">Get IWASAKI Jobsheet</button>
        </div>
        <div v-if="isSON" class="ecs-schedule">
          <button @click="getSONJobsheet">Get SONATA Jobsheet</button>
        </div>
        <div v-if="isUTE" class="ecs-schedule">
          <button @click="getUTEJobsheet">Get UTECO Jobsheet</button>
        </div>
        <div v-if="isGRA" class="ecs-schedule">
          <button @click="getGRAJobsheet">Get GRAVURE Jobsheet</button>
        </div>
        <div v-if="isLAM" class="ecs-schedule">
          <button @click="getLAMJobsheet">Get LAMINATION Jobsheet</button>
        </div>
        <div v-if="isDG1" class="ecs-schedule">
          <button @click="getECSJobsheet">Get ECS Jobsheet</button>
        </div>
        <div v-if="isDG2" class="ecs-schedule">
          <button @click="getECSJobsheet">Get ECS Jobsheet</button>
        </div>
        <div v-if="isRHY" class="ecs-schedule">
          <button @click="getECSJobsheet">Get ECS Jobsheet</button>
        </div>
        <div v-if="isGL4" class="ecs-schedule">
          <button @click="getECSJobsheet">Get ECS Jobsheet</button>
        </div>
        <div v-if="isFLX" class="ecs-schedule">
          <button @click="getECSJobsheet">Get ECS Jobsheet</button>
        </div>
        <div v-if="isSL1" class="ecs-schedule">
          <button @click="getECSJobsheet">Get ECS Jobsheet</button>
        </div>
        <div v-if="isSL2" class="ecs-schedule">
          <button @click="getECSJobsheet">Get ECS Jobsheet</button>
        </div>
        <div v-if="isSL3" class="ecs-schedule">
          <button @click="getECSJobsheet">Get ECS Jobsheet</button>
        </div>
        <div v-if="isBM1" class="ecs-schedule">
          <button @click="getECSJobsheet">Get ECS Jobsheet</button>
        </div>
        <div v-if="isBM2" class="ecs-schedule">
          <button @click="getECSJobsheet">Get ECS Jobsheet</button>
        </div>


      </div>
    </div>
  </div>

</template>

<script>
//import axios from "axios";
import HeaderBar from "@/components/AppHeader.vue";
export default {

  components: {
    HeaderBar,
  },

  data() {
    return {
      isECS:false,
      label:false,
      flexible:false,
      digital:false,
      username: null,
      currentTime: null,
    };
  },


  created() {


    // Retrieve username from session storage
    this.username = sessionStorage.getItem('username') || '';

    // Get current time
    const now = new Date();
    this.currentTime = now.toLocaleTimeString()

    // Update current time every second
    this.currentTimeInterval = setInterval(this.updateCurrentTime, 1000);

  },

  beforeUnmount() {
    // Clear the interval when the component is destroyed
    clearInterval(this.currentTimeInterval);
  },

  methods: {
    showECS(){
      this.isECS=!this.isECS;
    },

    showDigital(){
      this.digital=!this.digital;
      this.label = false;
      this.flexible = false;
    },

    showFlexible(){
      this.flexible=!this.flexible;
      this.label = false;
      this.digital = false;
    },

    showLabel(){
      this.label=!this.label;
      this.flexible = false;
      this.digital = false;
    },

    updateCurrentTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    },
    redirectTo(path) {
      this.$router.push(path);
    },

  },
};
</script>

<style scoped>

.dashboard {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>
