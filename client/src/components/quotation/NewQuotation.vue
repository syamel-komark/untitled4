<template>
  <h2>Customer Info<button @click="generateQuotation">View Costing Number</button>

  </h2>
  <div class="quotation-generator">
    <div class="form-group">
      <button @click="showCustomer">Customer Name</button>
      <input type="text" id="customerName" v-model="customerName" required />
      <label for="productName">Product Name:</label>
      <input type="text" id="productName" v-model="productName" required />
    </div>
    <div class="form-group">
      <label for="customerAddress">Customer Address:</label>
      <input type="text" id="customerAddress" v-model="customerName" required />
    </div>
    <div class="form-group">
      <label for="Costing Number">Costing Number:</label>
      <input type="number" id="Costing Number" v-model="costingNumber" required />
    </div>
    <div class="form-group">
      <label for="unitPrice">Unit Price:</label>
      <input type="number" id="unitPrice" v-model="unitPrice" required />
    </div>
    <button @click="generateQuotation">Generate Quotation</button>
    <div v-if="quotationGenerated">
      <h3>Quotation:</h3>
      <p><strong>Customer:</strong> {{ customerName }}</p>
      <p><strong>Product:</strong> {{ productName }}</p>
      <p><strong>Quantity:</strong> {{ quantity }}</p>
      <p><strong>Unit Price:</strong> ${{ unitPrice }}</p>
      <p><strong>Total Price:</strong> ${{ total }}</p>
    </div>
  </div>
  <div class="success-modal" v-if="isShowCustomer">
    <RegisterCustomer/>
    <button @click="closeCustomer">View Costing Number</button>

  </div>

</template>

<script>
//import axios from "axios";
//import HeaderBar from "@/components/AppHeader.vue";
import RegisterCustomer from "@/components/Customer/RegisterCustomer";

export default {

  components: {
    //HeaderBar,
    RegisterCustomer,
  },

  data() {
    return {
      isShowCustomer: false,
      isCosting: true,
      username: null,
      currentTime: null,
      isECS: false,
    };
  },


  created() {


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
