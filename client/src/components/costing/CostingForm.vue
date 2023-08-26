<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Costing Form</h2>
    <input v-model="this.costingData">
    <ECSCalculator
        @costingdata = "getCostingData"
    />

  </div>
</template>

<script>
//import axios from "axios";
import HeaderBar from "@/components/AppHeader.vue";
import ECSCalculator from "@/components/costing/ecs/ECSCalculator";
export default {

  components: {
    ECSCalculator,
    HeaderBar,
  },

  data() {
    return {
      costingData:[],
      formModel:{
        labelName:'',
      },
      username: null,
      currentTime: null,
    };
  },


  created() {

    this.getCostingData();

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
    getCostingData(costingdata){
      this.costingData = costingdata;
      console.log('Received form data:', this.costingData);


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
