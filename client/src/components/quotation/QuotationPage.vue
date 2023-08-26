<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <div class="dashboard-items">
      <h2>Quotation Page</h2>
      <div class="dashboard-item">
        <button @click="this.$router.push('/newquotation')">New Quotation</button>
        <button @click="this.$router.push('/newcosting')">Quotation tracking Page</button>
        <button @click="this.$router.push('/registercustomer')">Customer Maintenance</button>
        <button @click="this.$router.push('/salesperson')">Sales Person Maintenace</button>
        <button @click="this.$router.push('/newcosting')">Quotation tracking Page</button>


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
      isQuotation: true,
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
