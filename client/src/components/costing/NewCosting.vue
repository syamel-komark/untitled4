<template>
  <h2>Select Machine:
    <button @click="ShowECS" for="ECS">ECS</button>
    <button for="HP">HP</button>
    <button for="KP">KP</button>
    <button for="LE">LE</button>
    <button for="UTECO">UTECO</button>
    <button for="GRAVURE">GRAVUE</button>
  </h2>
  <div v-if="isECS" class="admin-menu">
    <ECS/>
  </div>
  <div v-if="isECS" class="admin-menu">
    <button @click="CloseECS">CloseECS</button>
  </div>
</template>

<script>
//import axios from "axios";
//import HeaderBar from "@/components/AppHeader.vue";
import ECS from "@/components/costing/NewCostingECS.vue";
export default {

  components: {
    ECS,
    //HeaderBar,
  },

  data() {
    return {
      isCosting: true,
      username: null,
      currentTime: null,
      isECS: false,
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

.form-container {
  display: flex;
  flex-wrap: wrap;
}

.form-group {
  flex: 0 0 calc(50% - 20px); /* Adjust the width as needed */
  margin-right: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>
