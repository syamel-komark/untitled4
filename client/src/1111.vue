<template>
  <div id="app" :class="{ authenticated: authenticated }">
    <div class="login-form" v-if="!authenticated">
      <h2>Komark ONC2.0 Login</h2>
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
      <DashBoard />
      <button @click="logout">Logout</button>
    </div>
    <div class="register-form" v-if="!authenticated">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="registerUsername">Username:</label>
          <input type="text" id="registerUsername" v-model="registerUsername" required />
        </div>
        <div>
          <label for="registerPassword">Password:</label>
          <input type="password" id="registerPassword" v-model="registerPassword" required />
        </div>
        <div>
          <label for="registerLevel">Level:</label>
          <input type="text" id="registerLevel" v-model="registerLevel" required />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import DashBoard from './components/DashboardForm';

export default {
  components: {
    DashBoard,
  },
  data() {
    return {
      authenticated: false,
      loginUsername: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',
      registerLevel: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/login', {
          username: this.loginUsername,
          password: this.loginPassword,
        });
        if (response.status === 200) {
          // Set authenticated status and username in session storage
          this.authenticated = true;
          sessionStorage.setItem('authenticated', 'true');
          sessionStorage.setItem('username', this.loginUsername);
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
    async register() {
      try {
        const response = await axios.post('/api/register', {
          username: this.registerUsername,
          password: this.registerPassword,
          level: this.registerLevel,
        });
        if (response.status === 200) {
          console.log('Registration successful');
        } else {
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },
  },

  created() {
    // Check session storage for authenticated status and username on component creation
    const authenticated = sessionStorage.getItem('authenticated');
    const username = sessionStorage.getItem('username');
    if (authenticated === 'true' && username) {
      this.authenticated = true;
      this.loginUsername = username;
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
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
