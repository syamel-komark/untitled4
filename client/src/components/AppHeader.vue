<template>
  <div class="header">
    <div class="welcome">
      <div class="navigate-container">
        <div class="navigateback">
        <backbutton @click=$router.go(-1)>Back</backbutton>
      </div>
      <div class="navigatehome">
        <homebutton @click="home">Home</homebutton>
      </div>
      <div class="navigatelogout">
        <logoutbutton @click="logout">Logout</logoutbutton>
      </div>
      </div>
      <h2>Welcome, {{ username }}</h2>
      <l>Time: {{ currentTime }}</l>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: String,
    currentTime: String,
  },
  methods: {
    logout() {
      // Clear authenticated status and username from session storage
      this.authenticated = false;
      sessionStorage.removeItem('authenticated');
      sessionStorage.removeItem('username');
      this.$router.push('/');
    },

    home() {
      // return to home page
      this.$router.push('/dashboard');
    },
  },
};
</script>

<style scoped>

.logout {
  display: grid;
  vertical-align: middle;
  justify-content: space-between;
  align-items: end;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
}

.navigate-container {
  display: flex; /* Use flex display for side-by-side layout */
  justify-content: space-between; /* Spacing between children */
  vertical-align: center;
  align-items: self-start;
  background-color: #3498db;
  color: #fff;
}
.navigatehome {
  display: table;
  width: 100px;
  height: 10px;
  vertical-align: center;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
}.navigateback {
   display: table;
   width: 100px;
   height: 10px;
   vertical-align: center;
   justify-content: space-between;
   align-items: start;
   padding: 10px;
   background-color: #3498db;
   color: #fff;
 }
.navigatelogout {
  display: table;
  width: 30%;
  height: 10px;
  vertical-align: center;
  justify-content: space-between;
  align-items: end;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
}

.welcome {
  display: grid;
  text-align: center;
}

button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

homebutton {
  background-color: #34c1da;
  width: 20px;
  height: 5px;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
backbutton {
  background-color: #0e90a8;
  width: 20px;
  height: 5px;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
logoutbutton {
  background-color: #a80e37;
  width: 20px;
  height: 5px;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}
</style>
