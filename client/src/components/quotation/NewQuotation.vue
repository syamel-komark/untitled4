<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Customer Info<button @click="searchCosting=true">View Costing Number</button>
    </h2>
    <div class="quotation-generator">
      <div class="form-group">
        <button @click="searchCustomer=true">Customer Name</button>
        <input type="text" id="customerName" v-model="this.formModel.customerName" required />
        <label for="productName">Product Name:</label>
        <input type="text" id="productName" v-model="this.formModel.labelName" required />
      </div>
      <div class="form-group">
        <label for="customerAddress">Customer Address:</label>
        <input type="text" id="customerAddress" v-model="this.formModel.customerAddress" required />
      </div>
      <div class="form-group">
        <label for="Costing Number">Costing Number:</label>
        <input type="number" id="Costing Number" v-model="this.formModel.costingNumber" required />
      </div>
      <button @click="$router.push('/quotationgenerator')">Generate Quotation</button>
    </div>
    <div class="success-modal" v-if="searchCosting">
      <div class="table-container">
        <h2>Costing List</h2>
        <div class="searchmaterial-menu">
          <input
              type="text"
              v-model="searchCostingQuery"
              placeholder="Search by Label Name"
          />
        </div>
        <table>
          <thead>
          <tr>
            <th>Costing Number</th>
            <th>Label name</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="costing in filteredCosting" :key="costing.id">
            <td>{{ costing.id }}</td>
            <td>{{ costing.labelname }}</td>
            <td>
              <button @click="pickCosting(costing)">Use</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div><button @click="searchCosting=false">Close</button>
    </div>
    <div class="success-modal" v-if="searchCustomer">
      <div class="table-container">
        <h2>customer List</h2>
        <div class="searchmaterial-menu">
          <input
              type="text"
              v-model="customerSearchQuery"
              placeholder="Search by Customer Name"
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
          <tr v-for="customers in filterCustomer" :key="customers.id">
            <td>{{ customers.id }}</td>
            <td>{{ customers.customername }}</td>
            <td>{{ customers.customeraddress }}</td>
            <td>{{ customers.customersalesperson }}</td>
            <td>
              <button @click="pickCustomers(customers)">Use</button>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import HeaderBar from "@/components/AppHeader.vue";

export default {
//todo: configure parsing of data to quotation generator. flow should be: pass costing number, generator check for machine, emit event handle parse according to machine component
  components: {
    HeaderBar,
  },

  data() {
    return {
      customerSearchQuery:'',
      customers:[],
      searchCustomer:false,
      searchCostingQuery:'',
      searchCosting:false,
      costingInfo:[],
      formModel:{
        customerName: null,
        productName: null,
        quantity: null,
        customerAddress: null,
        costingNumber: null,
      },
      username: null,
      currentTime: null,
      isECS: false,
    };
  },

  computed:{
    filteredCosting() {
      if (this.searchCostingQuery === '') {
        return this.costingInfo;
      } else {
        const query = this.searchCostingQuery;
        return this.costingInfo.filter(costing => {
          return costing.labelname.includes(query);
        });
      }
    },

    filterCustomer(){
      if (this.customerSearchQuery === '') {
        return this.customers;
      } else {
        const query = this.customerSearchQuery;
        return this.customers.filter(customers => {
          return customers.customername.toLowerCase().includes(query);
        });
      }
    },


  },


  created() {

    this.fetchCostinginfo()

    this.fetchCustomers()





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

    pickCustomers(customers) {
      this.formModel.customerId = customers.id;
      this.formModel.customerAddress=customers.customeraddress;
      this.formModel.customerName = customers.customername;
      this.formModel.customerContact = customers.customercontact;
      this.formModel.customerEmail = customers.customeremail;
      this.formModel.customerSalesPerson=customers.customersalesperson;
      this.searchCustomer=false;
    },



    async fetchCustomers() {
      try {
        const response = await axios.get('/api/getcustomers');
        this.customers = response.data;
        console.log(this.customers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },



    /////////////COSTING PICK/////
    pickCosting(costing) {
      this.formModel.labelName = costing.labelname; // Set the selected material
      this.formModel.quantityOrder = costing.quantity;
      this.formModel.costingNumber = costing.id;
      this.searchCosting = false;
    },
    async fetchCostinginfo() {
      try {
        const response = await axios.get('/api/getcosting');
        const allCostingInfo = response.data;

        // Filter the costingInfo array to only include items with machine = "ECS"
        this.costingInfo = allCostingInfo.filter(costing => costing.machine === 'ECS340');

        console.log(this.costingInfo);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },
    ////////////////////////////////
    showCustomer(){
      this.isShowCustomer=true;
    },

    CloseECS(){
      this.isECS=false;
    },

    ShowECS(){
      this.isECS=true;
    },

    showCosting(){
      this.isCosting=!this.isCosting;
    },

    closeNewCosting(){
      this.isCosting = false;
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



.form-group {
  flex: 0 0 calc(50% - 20px); /* Adjust the width as needed */
  margin-right: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>
