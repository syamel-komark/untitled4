<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Laminate Maintenance</h2>
    <div class="table-container">
      <h2>Laminate List</h2>
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
          <th>Material id</th>
          <th>Material Name</th>
          <th>Supplier</th>
          <th>Material Price</th>
          <th>Action</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="materials in filterMaterials" :key="materials.materialid">
          <td>{{ materials.materialid }}</td>
          <td>{{ materials.materialname }}</td>
          <td>{{ materials.materialsupplier }}</td>
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
        <input type="text" id="labelName" v-model="formModel.materialId" required readonly/>
      </div>
      <div class="form-group">
        <label for="labelName">Material Name:</label>
        <input type="text" id="labelName" v-model="formModel.materialName" required />
      </div>
      <div class="form-group">
        <label for="labelName">Material Supplier:</label>
        <input type="text" id="labelName" v-model="formModel.materialSupplier" required />
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
        materialId:'',
        materialName:'',
        materialSupplier:'',
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
        const response = await axios.delete('/api/deletelaminate', {
          data: {
            materialid: this.formModel.materialId,
          },
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'laminate delete success.';
          console.log('Deletion successful');  // Corrected log statement
          // Update the materials list after deletion
          await this.fetchMaterials();
        } else {
          this.success = true;
          this.successMessageLabel = 'laminate deletion failed.';
          console.error('Deletion failed');    // Corrected log statement
        }
      } catch (error) {
        console.error('Error deleting laminate:', error);
      }
    },

    async updateMaterial() {
      try {
        const response = await axios.put('/api/updatelaminate', {
          materialid: this.formModel.materialId,
          materialname: this.formModel.materialName,
          materialsupplier: this.formModel.materialSupplier,
          materialprice: this.formModel.materialPrice,
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'laminate has been successfully updated.';
          console.log('update successful');
        } else {
          this.success = true;
          this.successMessageLabel = 'laminate update failed.';
          console.error('update failed');
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    },

    async registerMaterial() {
      try {
        const response = await axios.post('/api/registerlaminate', {
          materialname: this.formModel.materialName,
          materialsupplier: this.formModel.materialSupplier,
          materialprice: this.formModel.materialPrice,
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'laminate has been successfully registered.';
          console.log('Registration successful');
          await this.fetchMaterials;

        } else {
          this.success = true;
          this.successMessageLabel = 'laminate registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },

    clearField(){
      this.formModel.materialId = '';
      this.formModel.materialPrice='';
      this.formModel.materialName = '';
      this.formModel.materialSupplier = '';
      this.formModel.materialPrice = '';
    },

    pickMaterial(materials) {
      this.formModel.materialId = materials.materialid;
      this.formModel.materialPrice = materials.materialprice; // Set the selected material
      this.formModel.materialName = materials.materialname;
      this.formModel.materialSupplier = materials.materialsupplier;
    },


    async fetchMaterials() {
      try {
        const response = await axios.get('/api/getlaminate');
        this.materials = response.data;
        console.log(this.materials);
      } catch (error) {
        console.error('Error fetching materials:', error);
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
