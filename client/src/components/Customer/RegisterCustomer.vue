<template>
  <div class="dashboard">
    <h2>Customer info
      <button @click="showGetCustomer">Retrieve Customer</button>
    </h2>
    <div class="form-container">
      <div class="form-group">
        <label for="customerName">Customer Name:</label>
        <input type="text" id="customerName" v-model="customerName" required />
      </div>
      <div class="form-group">
        <label for="customerAddress">Customer Address:</label>
        <input type="text" id="customerAddress" v-model="customerAddress" required />
      </div>
      <div class="form-group">
        <label for="contactNumber">Customer Contact Number:</label>
        <input type="text" id="contactNumber" v-model="customerContactNumber" required />
      </div>
      <div class="form-group">
        <label for="customerEmail">Customer Email</label>
        <input type="text" id="customerEmail" v-model="customerEmail" required />
      </div>
      <div class="form-group">
        <label for="customerPIC">Customer PIC</label>
        <input type="text" id="customerPIC" v-model="customerPIC" required />
      </div>
      <button @click="registerCustomer">Register Customer</button>
    </div>
    <div class="success-modal" v-if="getCustomer">
      <div class="table-container">
        <h2>Customer List</h2>
        <div class="searchcustomer-menu">
          <input
              type="text"
              v-model="searchCustomerQuery"
              placeholder="Search by Customer Name"
              @input="filtercustomername"
          />
        </div>
        <table>
          <thead>
          <tr>
            <th>Customer Id</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="customers in filterCustomers" :key="customers.id">
            <td>{{customers.id}}</td>
            <td>{{ customers.customername }}</td>
            <td>{{ customers.customeraddress }}</td>
            <td>
              <button @click="pickCustomer(customers)">Use</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div><button @click=closeGetCustomer>Close</button>
    </div>
    <div class="success-modal" v-if="successRegisterCustomer">
      <div class="table-container">
        <div class="success-content">
          <p>{{ successMessageCustomer }}</p>
          <button @click="successRegisterCustomer=false">Close</button>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
//import axios from "axios";
//import HeaderBar from "@/components/AppHeader.vue";
import axios from "axios";
export default {

  components: {
    //HeaderBar,
  },

  data() {
    return {
      username: null,
      currentTime: null,
      customerName:'',
      customerAddress:'',
      customerContactNumber:'',
      customerEmail:'',
      customerPIC:'',
      getCustomer:false,
      searchCustomerQuery:'',
      customerList:[],
      successRegisterCustomer:false,
      successMessageCustomer:'',

    };
  },


  created() {

    this.fetchCustomerList();

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

  computed:{

    filterCustomers() {
      if (this.searchCustomerQuery === '') {
        return this.customerList;
      } else {
        const query = this.searchCustomerQuery.toLowerCase();
        return this.customerList.filter((customers) => {
          return customers.customername.toLowerCase().includes(query);
        });
      }
    },


  },

  methods: {

    emitCustomer() {
      // Emit an event with the data
      this.$emit('customer-registered', {
        customerName: this.customerName,
        customerAddress: this.customerAddress,
      });
    },


    async registerCustomer() {
      try {
        const response = await axios.post('/api/registercustomer', {
          customername: this.customerName,
          customeraddress: this.customerAddress,
          customercontactnumber: this.customerContactNumber,
          customeremail: this.customerEmail,
          customerpic: this.customerPIC,
        });
        if (response.status === 200) {
          this.successRegisterCustomer = true;
          this. successMessageCustomer= 'customer has been successfully registered.';
          this.emitCustomer();
          console.log('Registration successful');
        } else {
          this.successRegisterCustomer = true;
          this.successMessageCustomer = 'customer registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        this.successRegisterCustomer = true;
        this.successMessageCustomer = 'customer registration failed.';
        console.error('Error during registration:', error);
      }
    },




    async fetchCustomerList() {
      try {
        const response = await axios.get('/api/getcustomer');
        this.customerList = response.data;
        console.log(this.customerList);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },

    pickCustomer(customers) {
      this.customerName = customers.customername; // Set the selected material
      this.customerAddress = customers.customeraddress; // Set the selected material
      this.customerContactNumber = customers.customercontactnumber; // Set the selected material
      this.customerEmail = customers.customeremail; // Set the selected material
      this.customerPIC = customers.customerpic; // Set the selected material

      this.getCustomer = false;
      this.emitCustomer();
    },

    closeGetCustomer(){
      this.getCustomer=false;
    },

    showGetCustomer(){
      this.getCustomer=true;
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

.dashboard {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>
