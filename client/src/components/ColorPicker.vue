<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Pantone Color</h2>
    <div>
      <button @click="toggleSearchColor">Search Color</button>
      <p :style="{ backgroundColor: selectedColor }">Selected Pantone Color: {{ colorName }}</p>
    </div>
    <div>
      <label>Color id:</label>
      <input for="header" v-model="this.id">
    </div>
    <div>
      <label>Color Name:</label>
      <input for="header" v-model="this.colorName">
    </div>
    <div>
      <label>Hexcode:</label>
      <input for="header" v-model="this.hexcode">
    </div>
    <button @click="deleteColor">Delete</button>
    <button @click="clearField">Clear</button>
    <button @click="updateColor">Update</button>
    <button @click="registerColor">Register</button>
  </div>
  <div class="success-modal" v-if="searchColor">
    <div class="table-container">
      <h2>Costing List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="colorSearchQuery"
            placeholder="Search by Pantone Code"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Action</th>
          <th>Id</th>
          <th>Color Name</th>
          <th>Color</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="color in filterColor" :key="color.id">
          <td>
            <button @click="pickColor(color)">Use</button>
          </td>
          <td>{{ color.id }}</td>
          <td>{{ color.colorname }}</td>
          <td>
            <div :style="{ backgroundColor: '#' + color.hexcode, width: '30px', height: '30px' }"></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click=toggleSearchColor>Close</button>

  </div>
  <div class="success-modal" v-if="success">
    <div class="table-container">
      <div class="success-content">
        <p>{{ successMessageLabel }}</p>
        <button @click="success = false">Close</button>
      </div>
    </div>
  </div>



</template>

<script>
//import axios from "axios";
import HeaderBar from "@/components/AppHeader.vue";
import axios from "axios";
export default {

  components: {
    HeaderBar,
  },

  data() {
    return {
      id:'',
      hexcode:'',
      colorName:'',
      colorSearchQuery:'',
      color:[],
      filteredColor:[],
      searchColor: false,
      selectedColor:'',
      username: null,
      currentTime: null,
      success : false,
      successMessageLabel:'',
    };
  },

  computed:{

    filterColor() {
      if (this.colorSearchQuery === '') {
        return this.color;
      } else {
        const query = this.colorSearchQuery.toLowerCase();
        return this.color.filter(color => {
          return color.colorname.toLowerCase().includes(query);
        });
      }
    },

  },


  created() {

    this.fetchColor();

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

    pickColor(color) {
      this.id = color.id;
      this.selectedColor = "#"+color.hexcode; // Set the selected material
      this.colorName = color.colorname;
      this.hexcode = color.hexcode;
      this.colorSearchQuery = '';
      this.searchColor = false;
      console.log(this.selectedColor);
    },

    async deleteColor() {
      try {
        const response = await axios.delete('/api/deletecolor', {
          data: {
            id: this.id,
          },
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'color delete success.';
          console.log('Deletion successful');  // Corrected log statement
          // Update the materials list after deletion
          await this.fetchMaterials();
        } else {
          this.success = true;
          this.successMessageLabel = 'color deletion failed.';
          console.error('Deletion failed');    // Corrected log statement
        }
      } catch (error) {
        console.error('Error deleting color:', error);
      }
    },

    async updateColor() {
      try {
        const response = await axios.put('/api/updatecolor', {
          id: this.id,
          colorname: this.colorName,
          hexcode: this.hexcode,
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'color has been successfully updated.';
          console.log('update successful');
        } else {
          this.success = true;
          this.successMessageLabel = 'color update failed.';
          console.error('update failed');
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    },

    async fetchColor() {
      try {
        const response = await axios.get('/api/getcolor');
        this.color = response.data;
        console.log(this.mastercard);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },

    async registerColor() {
      try {
        const response = await axios.post('/api/registercolor', {
          colorname: this.colorName,
          hexcode: this.hexcode,
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'color has been successfully registered.';
          console.log('Registration successful');
          await this.fetchColor();

        } else {
          this.success = true;
          this.successMessageLabel = 'color registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
      await this.fetchColor();

    },

    clearField(){
      this.id = '';
      this.colorName='';
      this.hexcode='';
    },


    toggleSearchColor() {
      this.searchColor = !this.searchColor;
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

p {
  padding: 10px;
  color: white;
  text-align: center;
}

.dashboard {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>
