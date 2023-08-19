<template >
  <div id="app" :class="{ authenticated: authenticated }">
    <div class="login-form" v-if="!authenticated">
      <div>
        <img src="output (5).png" alt="Komark" width="200" height="80" />
      </div>
      <div class="header">
        <h2>ONC2.0 Login</h2>
      </div>
      <form @submit.prevent="login">
        <div>
          <label for="loginUsername">Username:</label>
          <input type="text" id="loginUsername" v-model="loginUsername" required />
        </div>
        <div>
          <label for="loginPassword">Password:</label>
          <input type="password" id="loginPassword" v-model="loginPassword" required />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    <div class="dashboard" v-else>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
//import DashBoard from './components/DashboardForm';

export default {
  //components: {
    //DashBoard,
  //},
  data() {
    return {
      authenticated: false,
      loginUsername: '',
      loginPassword: '',
      loginLevel:null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/login', {
          username: this.loginUsername,
          password: this.loginPassword,
          level: this.loginLevel,
        });
        if (response.status === 200) {
          // Set authenticated status and username in session storage
          this.authenticated = true;
          sessionStorage.setItem('authenticated', 'true');
          sessionStorage.setItem('username', this.loginUsername);
          sessionStorage.setItem('level', response.data.level);

          //console.log('Stored username:', this.loginUsername);
          //console.log('Stored userlevel:', response.data.level);

          // Navigate to the dashboard
          this.$router.push('/dashboard');

        } else {
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
    logout() {
      // Clear authenticated status and username from session storage
      this.authenticated = false;
      sessionStorage.removeItem('authenticated');
      sessionStorage.removeItem('username');
    },
  },

  created() {
    // Check session storage for authenticated status and username on component creation
    const authenticated = sessionStorage.getItem('authenticated');
    const username = sessionStorage.getItem('username');
    const level = sessionStorage.getItem('level')
    if (authenticated === 'true' && username) {
      this.authenticated = true;
      this.loginUsername = username;
      this.loginLevel = level;
    }
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
}
.authenticated {
  background-color: #f0f0f0;
}

.login-form,
.register-form {
  display: inline-block;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard {
  display: inline-block;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form {
  margin-top: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 3px 5px;
  cursor: pointer;
  margin-right: 5px;
  left: 5px;

}

button:hover {
  background-color: #2980b9;
}
</style>
