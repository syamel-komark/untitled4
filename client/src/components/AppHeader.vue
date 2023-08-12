<template>
  <div class="header">
    <div class="welcome">
      <h2>Welcome, {{ username }}</h2>
      <l>Time: {{ currentTime }}</l>
    </div>
    <div class="navigate">
      <homebutton @click="home">Home</homebutton>
      <div class="navigate">
        <button @click="logout">Logout</button>
      </div>
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
}

.navigate {
  display: table-cell;
  vertical-align: middle;
  justify-content: space-between;
  align-items: start;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
}

.welcome {
  text-align: left;
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
