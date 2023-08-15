<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <div class="dashboard-items">
      <h2>Quotation Page</h2>
      <div class="dashboard-item">
        <button @click="showNewCosting('/newcosting')">Costing Page</button>
        <button @click="showNewQuotation('/newquotation')">New Quotation</button>
        <button @click="showNewReport('/costingreport')">Report Page</button>
      </div>
      <div v-if="isQuotation" class="admin-menu">
        <NewQuotation/>
      </div>
    </div>
  </div>
  <div v-if="isCosting" class="admin-menu">
    <button @click="closeNewCosting">Close costing</button>
  </div>
  <div v-if="isQuotation" class="admin-menu">
    <button @click="closeNewQuotation">Close quotation</button>
  </div>

</template>

<script>
//import axios from "axios";
import HeaderBar from "@/components/AppHeader.vue";
import NewQuotation from "@/components/quotation/NewQuotation.vue";

export default {

  components: {
    HeaderBar, NewQuotation,
  },

  data() {
    return {
      isQuotation: false,
      isCosting: false,
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
      this.isQuotation = true;
      this.isCosting=false;
    },

    showNewCosting(){
      this.$router.push('/costingpage');

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

button{}

</style>
