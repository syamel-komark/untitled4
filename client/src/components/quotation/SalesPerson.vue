<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Sales Person Maintenance</h2>
    <div class="table-container">
      <h2>Sales Person List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="materialSearchQuery"
            placeholder="Search by Sales Person Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Sales Person ID</th>
          <th>Sales Person Name</th>
          <th>Sales Person Contact</th>
          <th>Sales Person Level</th>
          <th>Action</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="materials in filterMaterials" :key="materials.materialid">
          <td>{{ materials.id }}</td>
          <td>{{ materials.salespersonname }}</td>
          <td>{{ materials.salespersoncontact }}</td>
          <td>{{ materials.salespersonlevel }}</td>

          <td>
            <button @click="pickMaterial(materials)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
    <div class="searchmaterial-menu">
      <div class="form-group">
        <label for="labelName">Sales Person Id:</label>
        <input type="text" id="labelName" v-model="formModel.salesPersonId" required readonly/>
      </div>
      <div class="form-group">
        <label for="labelName">Sales Person Name:</label>
        <input type="text" id="labelName" v-model="formModel.salesPersonName" required />
      </div>
      <div class="form-group">
        <label for="labelName">Sales Person Address:</label>
        <input type="text" id="labelName" v-model="formModel.salesPersonAddress" required />
      </div>
      <div class="form-group">
        <label for="labelName">Sales Person Contact:</label>
        <input type="text" id="labelName" v-model="formModel.salesPersonContact" required />
      </div>
      <div class="form-group">
        <label for="labelName">Sales Person Email:</label>
        <input type="text" id="labelName" v-model="formModel.salesPersonEmail" required />
      </div>
      <div class="form-group">
        <label for="labelName">Sales Person Level:</label>
        <input type="text" id="labelName" v-model="formModel.salesPersonLevel" required />
      </div>
      <button @click="deleteMaterial">Delete</button>
      <button @click="clearField">Clear</button>
      <button @click="updateMaterial">Update</button>
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
        return this.materials.filter(salespersons => {
          return salespersons.salespersonname.toLowerCase().includes(query);
        });
      }
    },


  },

  data() {
    return {
      successMessageLabel:'',
      success:false,
      formModel:{
        salesPersonId:'',
        salesPersonAddress:'',
        salesPersonContact:'',
        salesPersonEmail: '',
        salesPersonLevel:'',
        salesPersonName:'',

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
        const response = await axios.delete('/api/deletesalesperson', {
          data: {
            id: this.formModel.salesPersonId,
          },
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'salesperson delete success.';
          console.log('Deletion successful');  // Corrected log statement
          // Update the materials list after deletion
          await this.fetchMaterials();
        } else {
          this.success = true;
          this.successMessageLabel = 'salesperson deletion failed.';
          console.error('Deletion failed');    // Corrected log statement
        }
      } catch (error) {
        console.error('Error deleting salesperson:', error);
      }
    },

    async updateMaterial() {
      try {
        const response = await axios.put('/api/updatesalesperson', {
          id: this.formModel.salesPersonId,
          salespersonname: this.formModel.salesPersonName,
          salespersonaddress: this.formModel.salesPersonAddress,
          salespersoncontact: this.formModel.salesPersonContact,
          salespersonemail: this.formModel.salesPersonEmail,
          salespersonlevel: this.formModel.salesPersonLevel,

        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'salesperson has been successfully updated.';
          console.log('update successful');
        } else {
          this.success = true;
          this.successMessageLabel = 'salesperson update failed.';
          console.error('update failed');
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    },

    async registerMaterial() {
      try {
        const response = await axios.post('/api/registersalesperson', {
          salespersonname: this.formModel.salesPersonName,
          salespersonaddress: this.formModel.salesPersonAddress,
          salespersoncontact: this.formModel.salesPersonContact,
          salespersonemail: this.formModel.salesPersonEmail,
          salespersonlevel: this.formModel.salesPersonLevel,
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'salesperson has been successfully registered.';
          console.log('Registration successful');
          await this.fetchMaterials;

        } else {
          this.success = true;
          this.successMessageLabel = 'salesperson registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },

    clearField(){
      this.formModel.salesPersonId = '';
      this.formModel.salesPersonName='';
      this.formModel.salesPersonAddress='';
      this.formModel.salesPersonContact='';
      this.formModel.salesPersonEmail='';
      this.formModel.salesPersonLevel='';
    },

    pickMaterial(salespersons) {
      this.formModel.salesPersonId = salespersons.id;
      this.formModel.salesPersonName = salespersons.salespersonname;
      this.formModel.salesPersonAddress = salespersons.salespersonaddress;
      this.formModel.salesPersonContact = salespersons.salespersoncontact;
      this.formModel.salesPersonEmail = salespersons.salespersonemail;
      this.formModel.salesPersonLevel = salespersons.salespersonlevel;
    },

    async fetchMaterials() {
      try {
        const response = await axios.get('/api/getsalesperson');
        this.materials = response.data;
        console.log(this.materials);
      } catch (error) {
        console.error('Error fetching salespersons:', error);
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
