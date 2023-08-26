<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Customer Maintenance</h2>
    <div class="table-container">
      <h2>customer List</h2>
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
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Customer Address</th>
          <th>Customer Sales Person</th>
          <th>Action</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="materials in filterMaterials" :key="materials.id">
          <td>{{ materials.id }}</td>
          <td>{{ materials.customername }}</td>
          <td>{{ materials.customeraddress }}</td>
          <td>{{ materials.customersalesperson }}</td>
          <td>
            <button @click="pickMaterial(materials)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
    <div class="searchmaterial-menu">
      <div class="form-group">
        <label for="labelName">Customer Id:</label>
        <input type="text" id="labelName" v-model="formModel.customerId" required readonly/>
      </div>
      <div class="form-group">
        <label for="labelName">Customer Name:</label>
        <input type="text" id="labelName" v-model="formModel.customerName" required />
      </div>
      <div class="form-group">
        <label for="labelName">Customer Address:</label>
        <input type="text" id="labelName" v-model="formModel.customerAddress" required />
      </div>
      <div class="form-group">
        <label for="labelName">Customer Contact:</label>
        <input type="text" id="labelName" v-model="formModel.customerContact" required />
      </div>
      <div class="form-group">
        <label for="labelName">Customer Email:</label>
        <input type="text" id="labelName" v-model="formModel.customerEmail" required />
      </div>
      <div class="form-group">
        <button @click="searchSalesPerson=true">Sales Person</button>
        <input type="text" id="labelName" v-model="formModel.customerSalesPerson" readonly />
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
  <div class="success-modal" v-if="searchSalesPerson">
    <div class="table-container">
      <h2>Sales Person List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="salesPersonQuery"
            placeholder="Search by Sales Person Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Sales Person ID</th>
          <th>Sales Person Name</th>
          <th>Action</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="salesperson in filterSalesPerson" :key="salesperson.id">
          <td>{{ salesperson.id }}</td>
          <td>{{ salesperson.salespersonname }}</td>

          <td>
            <button @click="pickSalesPerson(salesperson)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>

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

    filterSalesPerson(){
      if (this.salesPersonQuery === '') {
        return this.salesperson;
      } else {
        const query = this.salesPersonQuery;
        return this.salesperson.filter(salespersons => {
          return salespersons.salespersonname.toLowerCase().includes(query);
        });
      }
    },


    filterMaterials(){
      if (this.materialSearchQuery === '') {
        return this.materials;
      } else {
        const query = this.materialSearchQuery;
        return this.materials.filter(customers => {
          return customers.customername.toLowerCase().includes(query);
        });
      }
    },


  },

  data() {
    return {
      searchSalesPerson: false,
      successMessageLabel:'',
      success:false,
      formModel:{
        customerId:'',
        customerName:'',
        customerAddress:'',
        customerContact: '',
        customerEmail:'',
        customerSalesPerson:'',
      },
      salesPersonQuery:'',
      materialSearchQuery:'',
      materials:[],
      username: null,
      currentTime: null,
      salesperson:[],
    };
  },


  created() {

    this.fetchSales();

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

    pickSalesPerson(salespersons) {
      this.formModel.customerSalesPerson = salespersons.salespersonname;
      this.searchSalesPerson = false;
    },

    async deleteMaterial() {
      try {
        const response = await axios.delete('/api/deletecustomers', {
          data: {
            id: this.formModel.customerId,
          },
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'customer delete success.';
          console.log('Deletion successful');  // Corrected log statement
          // Update the materials list after deletion
          await this.fetchMaterials();
        } else {
          this.success = true;
          this.successMessageLabel = 'customer deletion failed.';
          console.error('Deletion failed');    // Corrected log statement
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    },

    async updateMaterial() {
      try {
        const response = await axios.put('/api/updatecustomers', {
          id: this.formModel.customerId,
          customername: this.formModel.customerName,
          customeraddress: this.formModel.customerAddress,
          customercontact: this.formModel.customerContact,
          customeremail: this.formModel.customerEmail,
          customersalesperson: this.formModel.customerSalesPerson,

        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'customer has been successfully updated.';
          console.log('update successful');
        } else {
          this.success = true;
          this.successMessageLabel = 'customer update failed.';
          console.error('update failed');
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    },

    async registerMaterial() {
      try {
        const response = await axios.post('/api/registercustomer', {
          customername: this.formModel.customerName,
          customeraddress: this.formModel.customerAddress,
          customercontact: this.formModel.customerContact,
          customeremail: this.formModel.customerEmail,
          customersalesperson: this.formModel.customerSalesPerson,
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'customer has been successfully registered.';
          console.log('Registration successful');
          await this.fetchMaterials;

        } else {
          this.success = true;
          this.successMessageLabel = 'customer registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },

    clearField(){
      this.formModel.customerId = '';
      this.formModel.customerAddress='';
      this.formModel.customerName = '';
      this.formModel.customerContact = '';
      this.formModel.customerEmail = '';
      this.formModel.customerSalesPerson='';

    },

    pickMaterial(customers) {
      this.formModel.customerId = customers.id;
      this.formModel.customerAddress=customers.customeraddress;
      this.formModel.customerName = customers.customername;
      this.formModel.customerContact = customers.customercontact;
      this.formModel.customerEmail = customers.customeremail;
      this.formModel.customerSalesPerson=customers.customersalesperson;
    },

    async fetchMaterials() {
      try {
        const response = await axios.get('/api/getcustomers');
        this.materials = response.data;
        console.log(this.materials);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },

    async fetchSales() {
      try {
        const response = await axios.get('/api/getsalesperson');
        this.salesperson = response.data;
        console.log(this.salesperson);
      } catch (error) {
        console.error('Error fetching salesperson:', error);
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
