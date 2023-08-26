<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <div class="dashboard-items">
      <h2>Select Machine:</h2>
      <div class="group-container">
        <button @click="$router.push('newcostingecs')" form="ECS">ECS340</button>
        <button @click="$router.push('newcostingecs')" form="ECS">EM280</button>
        <button form="HP">HP</button>
        <button form="KP">KP</button>
        <button form="LE">LE</button>
        <button form="UTECO">UTECO</button>
        <button form="GRAVURE">GRAVURE</button>
      </div>
      <button v-if="notUser" @click="this.$router.push('/CostingMaintenancePage')">Maintenance Page</button>

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
      isCosting: true,
      username: null,
      currentTime: null,
      isECS: false,
      loginLevel: null,
    };
  },


  created() {

    this.loginLevel = sessionStorage.getItem('level') || '';
    this.notUser = this.loginLevel !== 'user';

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

    CloseECS(){
      this.isECS=false;
    },

    ShowECS(){
      this.isECS=true;
    },

    showCosting(){
      this.isCosting=!this.isCosting;
    },

    closeNewCosting(){
      this.isCosting = false;
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




</style>
