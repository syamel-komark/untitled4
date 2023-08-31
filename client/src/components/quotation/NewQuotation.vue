<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Customer Info<button @click="openSearchCosting" form="costingnumber">Search Costing</button>
    </h2>
    <div class="quotation-generator">
      <div class="form-group">
        <button @click="showCustomer">Customer Name</button>
        <input type="text" id="customerName" v-model="this.formModel.customerName" required />
        <label for="Costing Number">Costing Number:</label>
        <input type="text" id="Costing Number" v-model="this.selectedCostingNumber" required />
      </div>
      <div class="form-group">
        <label for="customerAddress">Customer Address:</label>
        <input type="text" id="customerAddress" v-model="this.formModel.customerAddress" required />
      </div>
      <button @click="generateQuotation">Generate Quotation</button>
    </div>
  </div>
  <div class="success-modal" v-if="searchCosting">
    <div class="table-container">
      <h2>Costing List</h2>
      <input type="text" id="process" v-model="this.selectedCostingNumber" required readonly />
      <button @click="clearSelectedCostingNumber">Clear</button>
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
          <th>Action</th>
          <th>Costing Number</th>
          <th>Label name</th>
          <th>Quantity</th>
          <th>Unit Cost</th>
          <th>RSP</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="costing in filteredCosting" :key="costing.id">
          <td>
            <button @click="pickCosting(costing)">Use</button>
          </td>
          <td>{{ costing.id }}</td>
          <td>{{ costing.labelname }}</td>
          <td>{{ costing.quantity }}</td>
          <td>{{ costing.unitcost }}</td>
          <td>{{ costing.rsp }}</td>
        </tr>
        </tbody>
      </table>
    </div><button @click=closeSearchCosting>Close</button>
  </div>
  <div class="success-modal" v-if="searchCustomer">
    <div class="table-container">
      <h2>Customer List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="searchCustomerQuery"
            placeholder="Search by Customer Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Action</th>
          <th>Customer id</th>
          <th>Customer name</th>
          <th>Customer address</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="customers in filteredCustomers" :key="customers.id">
          <td>
            <button @click="pickCustomer(customers)">Use</button>
          </td>
          <td>{{ customers.id }}</td>
          <td>{{ customers.customername }}</td>
          <td>{{ customers.customeraddress }}</td>
        </tr>
        </tbody>
      </table>
    </div><button @click=closeCustomer>Close</button>
  </div>

</template>

<script>
import HeaderBar from "@/components/AppHeader.vue";
import axios from "axios";

export default {

  components: {
    HeaderBar
  },

  data() {
    return {
      newQuotationId:'',
      customers:[],
      searchCustomerQuery: '',
      searchCustomer:false,
      selectedCostingNumber:[],
      costingInfo:[],
      searchCostingQuery:'',
      searchCosting:false,
      formModel:{
        customerName: null,
        quantity: null,
        unitPrice: null,
        customerAddress: null,
        costingNumber: null,
        unitcost:null,
        rsp:null,

      },
      username: null,
      currentTime: null,
    };
  },

  computed:{
    filteredCustomers() {
      if (this.searchCustomerQuery === '') {
        return this.customers;
      } else {
        const query = this.searchCustomerQuery;
        return this.customers.filter(customers => {
          return customers.customername.includes(query);
        });
      }
    },


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

  },


  created() {

    this.fetchCustomers();

    this.fetchCostinginfo();


    // Retrieve username from session storage
    this.username = sessionStorage.getItem('username') || '';
    this.selectedCostingNumber =sessionStorage.getItem('quotationId');

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

    generateQuotation(){
      this.registerQuotation();
      sessionStorage.setItem('quotationId', this.newQuotationId);
      console.log(this.newQuotationId);
      this.$router.push('/quotationgenerator')
    },

    async registerQuotation() {
      try {
        let combinedCostingNumber = '';
        if (Array.isArray(this.selectedCostingNumber) && this.selectedCostingNumber.length > 1) {
          combinedCostingNumber = this.selectedCostingNumber.join(', ');
        } else {
          combinedCostingNumber = this.selectedCostingNumber;
        }
        const response = await axios.post('/api/registerquotation', {
          customername: this.formModel.customerName,
          customeraddress: this.formModel.customerAddress,
          costingnumber: combinedCostingNumber,
          });

        if (response.status === 200) {
          this.newQuotationId = response.data.id;
          sessionStorage.setItem('quotationId', this.newQuotationId);
          this.successRegisterLabel = true;
          this.successMessageLabel = 'quotation has been successfully registered.';
          console.log('New quotation ID:', this.newQuotationId); // Log the new quotation ID
          console.log('Registration successful');
        } else {
          this.successMessageLabel = 'quotation registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },

    async fetchCustomers() {
      try {
        const response = await axios.get('/api/getcustomers');
        this.customers = response.data;

        // Filter the costingInfo array to only include items with machine = "ECS"
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },

    pickCustomer(customers) {
      this.formModel.customerName = customers.customername;
      this.formModel.customerAddress = customers.customeraddress;
      this.searchCustomer = false;
    },



    clearSelectedCostingNumber(){
      this.selectedCostingNumber = [];
    },


    pickCosting(costing){
      const select = costing.id;
      this.selectedCostingNumber.push(select);


    },

    async fetchCostinginfo() {
      try {
        const response = await axios.get('/api/getcosting');
        this.costingInfo = response.data;

        // Filter the costingInfo array to only include items with machine = "ECS"
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },

    closeSearchCosting(){
      this.searchCosting=false;
      console.log(this.selectedCostingNumber);
    },

    openSearchCosting(){
      this.selectedCostingNumber = [],
      this.searchCosting=true;
    },


    showCustomer(){
      this.searchCustomer=true;
    },

    closeCustomer(){
      this.searchCustomer=false;
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
