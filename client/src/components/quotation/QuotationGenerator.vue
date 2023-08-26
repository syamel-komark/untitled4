<template>
  <div class="quotation-generator">
    <h2>Generate Quotation</h2>
    <div class="form-group">
      <label for="customerName">Customer Name:</label>
      <input type="text" id="customerName" v-model="customerName" required />
    </div>
    <div class="form-group">
      <label for="productName">Product Name:</label>
      <input type="text" id="productName" v-model="productName" required />
    </div>
    <div class="form-group">
      <label for="quantity">Quantity:</label>
      <input type="number" id="quantity" v-model="quantity" required />
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
</template>

<script>
export default {
  data() {
    return {
      formModel:{
        customer
      }
    };
  },
  computed: {
    total() {
      return this.quantity * this.unitPrice;
    }
  },
  methods: {
    generateQuotation() {
      this.quotationGenerated = true;
    }
  }
};
</script>

<style scoped>
.quotation-generator {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
}
.form-group {
  margin-bottom: 15px;
}
</style>
