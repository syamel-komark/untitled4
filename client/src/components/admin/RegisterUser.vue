<template>
    <div class="register-form">
      <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
      <h2>Register</h2>
      <div class = form-group>
        <form @submit.prevent="register">
          <div>
            <label for="registerUsername">Username:</label>
            <input type="text" id="registerUsername" v-model="registerUsername" required class="input-field"/>
          </div>
          <div>
            <label for="registerPassword">Password:</label>
            <input type="password" id="registerPassword" v-model="registerPassword" required class="input-field"/>
          </div>
          <div>
            <label for="registerLevel">Level:</label>
            <select id="registerLevel" v-model="registerLevel" required class="input-field">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
          <div>
            <deletebutton @click="showDeleteModal=true">Delete user</deletebutton>
          </div>
        </form>
      </div>
    </div>
  <div class="success-modal" v-if="showSuccessModal">
    <div class="success-content">
      <p>{{ successMessage }}</p>
      <button @click="showSuccessModal=false">Close</button>
    </div>
  </div>
  <div class="success-modal" v-if="showDeleteModal">
    <div class="table-container">
      <h2>User List</h2>
      <table>
        <thead>
        <tr>
          <th>Username</th>
          <th>Level</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.username">
          <td>{{ user.username }}</td>
          <td>{{ user.level }}</td>
          <td>
            <button @click="deleteUser(user.username)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <p>{{ deleteMessage }}</p>
    </div>
    <button @click="closeDeleteModal">Close Table</button>
  </div>
</template>
<script>
import axios from 'axios';
import HeaderBar from "@/components/AppHeader.vue";

export default {
  components: {
  HeaderBar
  },


  data() {
    return {
      currentTime: null,
      username: null,
      registerUsername: '',
      registerPassword: '',
      registerLevel: 'user',
      showSuccessModal: false,
      showDeleteModal: false,
      successMessage: '',
      deleteMessage: '',
      users:[],
    };
  },
  methods: {
    logout() {
      // Clear authenticated status and username from session storage
      this.authenticated = false;
      sessionStorage.removeItem('authenticated');
      sessionStorage.removeItem('username');
    },

    async fetchUsers() {
      try {
        const response = await axios.get('/api/getuser');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    async deleteUser(username) {
      try {
        const response = await axios.delete('/api/deleteuser', {
          data: {
            username: username,
          },
        });
        if (response.status === 200) {
          console.log('User deleted successfully');
          // Update the users list after deletion
          this.fetchUsers();
        } else {
          console.error('User deletion failed');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },

    async register() {
      try {
        const response = await axios.post('/api/register', {
          username: this.registerUsername,
          password: this.registerPassword,
          level: this.registerLevel,
        });
        if (response.status === 200) {
          this.showSuccessModal = true;
          this.successMessage = 'User has been successfully registered.';
          this.registerUsername = ''; // Clear the registration form
          this.registerPassword = '';
          this.registerLevel = '';
          console.log('Registration successful');
        } else {
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.successMessage = '';
    },
    updateCurrentTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.deleteMessage = '';
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
    this.username = sessionStorage.getItem('username') || '';
    // Get current time
    const now = new Date();
    this.currentTime = `${now.toLocaleTimeString()}`

    // Update current time every second
    this.currentTimeInterval = setInterval(this.updateCurrentTime, 1000);

    //get user list
    this.fetchUsers();
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

.input-field {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-content: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
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

.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.success-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.table-container {
  height: 300px; /* Set the desired maximum height */
  width: 500px;
  overflow-y: auto; /* Add vertical scroll if necessary */
  background-color: white;
  display: inline-block;
  justify-self: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 20px;
  text-align: left;
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
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

deletebutton {
  background-color: #fc195c;
  color: #fff;
  border: none;
  margin-top: 10px;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}


</style>
