<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <div class="dashboard-items">
      <div class="dashboard-item">
        <button @click="redirectTo('/costingpage')">Costing</button>
      </div>
      <div class="dashboard-item">
        <button @click="redirectTo('/newlabel')">Mastercard</button>
      </div>
      <div class="dashboard-item">
        <button @click="redirectTo('/new-job')">Jobsheet</button>
      </div>
      <div class="dashboard-item">
        <button @click="redirectTo('/new-job-report')">Report</button>
      </div>
    </div>
    <AdminMenu :isAdmin="isAdmin" />
  </div>
</template>

<script>

import HeaderBar from "@/components/AppHeader.vue";
import AdminMenu from "@/components/admin/AdminMenu.vue";

// import { mapGetters } from "vuex";

export const name = "Dashboard";

export default {

  components: {
    HeaderBar, AdminMenu,
  },

  data() {
    return {
      username: null,
      currentTime: null,
      loginLevel: null,
      isAdmin: false,
    };
  },
  created() {
    // Retrieve username from session storage
    this.username = sessionStorage.getItem('username') || '';
    this.loginLevel = sessionStorage.getItem('level') || '';

    // Get current time
    const now = new Date();
    this.currentTime = `${now.toLocaleTimeString()}`

    // Update current time every second
    this.currentTimeInterval = setInterval(this.updateCurrentTime, 1000);

    //admin check
    this.isAdmin = this.loginLevel === 'admin';


    console.log('Stored username:', this.username);
    console.log('Stored userlevel:', this.loginLevel);
    //console.log('Is admin', this.loginLevel);

  },

  beforeUnmount() {
    // Clear the interval when the component is destroyed
    clearInterval(this.currentTimeInterval);
  },

  methods: {
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

.welcome {
  text-align: center;
  margin-bottom: 20px;
}

.dashboard-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}

.dashboard-item {
  margin: 10px;
}
</style>
