<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <div class="dashboard-items">
      <h2>Costing Page</h2>
      <div class="dashboard-item">
        <currentbutton @click="showNewCosting('/newcosting')">New Costing</currentbutton>
        <button @click="showNewQuotation('/newquotation')">Quotation Page</button>
        <button @click="showNewReport('/costingreport')">Report Page</button>
      </div>
      <div v-if="isCosting" class="admin-menu">
        <NewCosting/>
      </div>
    </div>
  </div>
  <div v-if="isCosting" class="admin-menu">
    <button @click="closeNewCosting">Close costing</button>
  </div>

</template>

<script>
//import axios from "axios";
import HeaderBar from "@/components/AppHeader.vue";
import NewCosting from "@/components/costing/NewCosting.vue";

export default {

  components: {
    HeaderBar, NewCosting,
  },

  data() {
    return {
      isQuotation: false,
      isCosting: true,
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

    closeNewQuotation(){
      this.isQuotation = false;
    },

    showNewQuotation(){
      this.$router.push('/newquotation');
    },

    showNewCosting(){
      this.isCosting = true;
      this.isQuotation= false;
    },

    closeNewCosting(){
      this.isCosting = false;
    },

    logout() {
      sessionStorage.removeItem('username');
      this.$router.push('/');
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

currentbutton {
  background-color: #34c0d9;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8.5px 10px;
  cursor: pointer;
  margin-right: 5px;
  left: 5px;

}
</style>
