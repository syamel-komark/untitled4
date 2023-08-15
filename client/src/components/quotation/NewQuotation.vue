<template>
  <h2>Customer Info<button @click="showCostingTable">View Costing Number</button>

  </h2>
  <div class="quotation-generator">
    <div class="form-group">
      <button @click="showCustomer">Customer Name</button>
      <input type="text" id="customerName" v-model="emitCustomer.customerName" required />
      <label for="productName">Product Name:</label>
      <input type="text" id="productName" v-model="labelName" required />
    </div>
    <div class="form-group">
      <label for="customerAddress">Customer Address:</label>
      <input type="text" id="customerAddress" v-model="emitCustomer.customerAddress" required />
    </div>
    <div class="form-group">
      <label for="Costing Number">Costing Number:</label>
      <input type="number" id="Costing Number" v-model="costingNumber" required />
    </div>
    <div class="form-group">
      <label for="quantity">Order Quantity:</label>
      <input type="number" id="quantity" v-model="quantity" required />
    </div>
  </div>
  <div class="success-modal" v-if="isShowCustomer">
    <RegisterCustomer @customer-registered="handleEmitCustomer" />
    <button @click="closeCustomer">Finish</button>

  </div>
  <div class="success-modal" v-if="costingTable">
    <div class="table-container">
      <h2>Costing List</h2>
      <div class="searchcustomer-menu">
        <input
            type="text"
            v-model="searchCostingQuery"
            @input="filterlabelname"
            placeholder="Search by Label Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Costing Number</th>
          <th>Mastercard</th>
          <th>Label Name</th>
          <th>Material</th>
          <th>Width</th>
          <th>Pitch</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="costing in filterCosting" :key="costing.id">
          <td>{{costing.id}}</td>
          <td>{{ costing.mastercard }}</td>
          <td>{{ costing.labelname }}</td>
          <td>{{ costing.material }}</td>
          <td>{{ costing.width }}</td>
          <td>{{ costing.pitch }}</td>

          <td>
            <button @click="pickCosting(costing)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click=closeCostingTable>Close</button>
  </div>


</template>

<script>
//import axios from "axios";
//import HeaderBar from "@/components/AppHeader.vue";
import RegisterCustomer from "@/components/Customer/RegisterCustomer";
import axios from "axios";

export default {

  components: {
    //HeaderBar,
    RegisterCustomer,
  },

  data() {
    return {
      labelName:'',
      costingNumber:'',
      searchCostingQuery:'',
      costingList:[],
      costingTable: false,
      emitCustomer:[],
      isShowCustomer: false,
      isCosting: true,
      username: null,
      currentTime: null,
      isECS: false,
    };
  },


  created() {

    this.fetchCosting();


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

    filterCosting() {
      if (this.searchCostingQuery === '') {
        return this.costingList;
      } else {
        const query = this.searchCostingQuery.toLowerCase();
        return this.costingList.filter((costing) => {
          return costing.mastercard.toLowerCase().includes(query);
        });
      }
    },

  },

  methods: {
    //handleCostingFilter(){},

    async fetchCosting() {
      try {
        const response = await axios.get('/api/getcosting');
        this.costingList = response.data;
        console.log(this.customerList);
      } catch (error) {
        console.error('Error fetching Costing:', error);
      }
    },


    pickCosting(costing) {
      this.costingNumber = costing.id; // Set the selected material
      this.labelName = costing.labelname; // Set the selected material
      this.costingTable= false;
    },


    closeCostingTable(){
      this.costingTable = false;
    },

    showCostingTable(){
      this.costingTable = true;
    },

    handleEmitCustomer(data) {
      // Handle the emitted event data (registered customer info)
      this.emitCustomer = data;
    },

    closeCustomer(){
      this.isShowCustomer = false;
    },

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

.form-container {
  display: flex;
  flex-wrap: wrap;
}

.form-group {
  flex: 0 0 calc(50% - 20px); /* Adjust the width as needed */
  margin-right: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>
