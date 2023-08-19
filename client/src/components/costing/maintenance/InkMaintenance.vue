<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Ink Maintenance</h2>
    <div class="table-container">
      <h2>Ink List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="materialSearchQuery"
            placeholder="Search by Material Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Material ID</th>
          <th>Material Name</th>
          <th>Machine</th>
          <th>Material Price</th>
          <th>Action</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="materials in filterMaterials" :key="materials.materialid">
          <td>{{ materials.materialid }}</td>
          <td>{{ materials.materialname }}</td>
          <td>{{ materials.machine }}</td>
          <td>{{ materials.materialprice }}</td>
          <td>
            <button @click="pickMaterial(materials)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
    <div class="searchmaterial-menu">
      <div class="form-group">
        <label for="labelName">Material ID:</label>
        <input type="text" id="labelName" v-model="formModel.materialId" required readonly />
      </div>
      <div class="form-group">
        <label for="labelName">Material Name:</label>
        <input type="text" id="labelName" v-model="formModel.materialName" required />
      </div>
      <div class="form-group">
        <label for="labelName">Machine:</label>
        <input type="text" id="labelName" v-model="formModel.machine" required />
      </div>
      <div class="form-group">
        <label for="labelName">Material Price:</label>
        <input type="text" id="labelName" v-model="formModel.materialPrice" required />
      </div>
      <button @click="clearField">Clear</button>
      <button @click="updateMaterial">Update</button>
      <button @click="deleteMaterial">Delete</button>
      <button @click="registerMaterial">Register</button>


    </div>

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

  computed:{

    filterMaterials(){
      if (this.materialSearchQuery === '') {
        return this.materials;
      } else {
        const query = this.materialSearchQuery;
        return this.materials.filter(materials => {
          return materials.materialname.toLowerCase().includes(query);
        });
      }
    },


  },

  data() {
    return {
      successMessageLabel:'',
      success:false,
      formModel:{
        materialId: '',
        materialName:'',
        machine:'',
        materialPrice: '',
      },
      materialSearchQuery:'',
      materials:[],
      username: null,
      currentTime: null,
    };
  },


  created() {

    this.fetchMaterials();


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

    async deleteMaterial() {
      try {
        const response = await axios.delete('/api/deleteink', {
          data: {
            materialid: this.formModel.materialId,
          },
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'ink delete success.';
          console.log('Deletion successful');  // Corrected log statement
          // Update the materials list after deletion
          await this.fetchMaterials();
        } else {
          this.success = true;
          this.successMessageLabel = 'ink deletion failed.';
          console.error('Deletion failed');    // Corrected log statement
        }
      } catch (error) {
        console.error('Error deleting ink:', error);
      }
    },

    async updateMaterial() {
      try {
        const response = await axios.put('/api/updateink', {
          materialid: this.formModel.materialId,
          materialname: this.formModel.materialName,
          machine: this.formModel.machine,
          materialprice: this.formModel.materialPrice,
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'ink has been successfully updated.';
          console.log('update successful');
        } else {
          this.success = true;
          this.successMessageLabel = 'ink update failed.';
          console.error('update failed');
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    },

    async registerMaterial() {
      try {
        const response = await axios.post('/api/registerink', {
          materialname: this.formModel.materialName,
          machine: this.formModel.machine,
          materialprice: this.formModel.materialPrice,
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'ink has been successfully registered.';
          console.log('Registration successful');
          await this.fetchMaterials;

        } else {
          this.success = true;
          this.successMessageLabel = 'ink registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
      await this.fetchMaterials;

    },

    clearField(){
      this.formModel.materialId = '';
      this.formModel.materialName = '';
      this.formModel.materialPrice='';
      this.formModel.machine = '';
      this.formModel.materialSupplier = '';
      this.formModel.materialPrice = '';
    },

    pickMaterial(materials) {
      this.formModel.materialId = materials.materialid;
      this.formModel.materialPrice = materials.materialprice; // Set the selected material
      this.formModel.materialName = materials.materialname;
      this.formModel.machine = materials.machine;
    },


    async fetchMaterials() {
      try {
        const response = await axios.get('/api/getink');
        this.materials = response.data;
        console.log(this.materials);
      } catch (error) {
        console.error('Error fetching ink:', error);
      }
    },


    updateCurrentTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    },
    redirectTo(path) {
      this.$router.push(path);
    },

  },
}

</script>

<style scoped>

.dashboard {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>
