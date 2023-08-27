<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <button v-print="'#myPrintableContent'">Print Costing</button>
    <div class="print" id="myPrintableContent">
      <div class="company-header">
        <img src="output (5).png" alt="Komark" width="150" height="60" />
        <label>Komark HQ ONC2.0 Costing Sheet</label>
        <div class="company-header-content">
          <label>Costing Number:{{this.calculated.costingId}}</label>
          <label>Date:{{formattedDate}}</label>
        </div>
      </div>
      <div class="costing-header">
        <div class="header-content">
          <div class ="header-item">
            <label>Label Name:</label>
            <input for="header" v-model="this.costingData.labelName">
            <label>Material Name:</label>
            <input for="header" v-model="this.costingData.facestock">
            <div class = "header-item-sub">
              <div class="sub-item">
                <label type="sub">Pitch (mm):</label>
                <input for="sub" v-model="this.costingData.pitch">
                <label type="sub">Width (mm):</label>
                <input for="sub" v-model="this.costingData.width">
              </div>
              <div class="sub-item">
                <label type="sub">Around:</label>
                <input for="sub" v-model="this.costingData.around">
                <label type="sub">Across:</label>
                <input for="sub" v-model="this.costingData.across">
              </div>
              <div class="sub-item">
                <label type="sub">Gear:</label>
                <input for="sub" v-model="this.costingData.gear">
                <label type="sub">Gap:</label>
                <input for="sub" v-model="this.calculated.gap">
              </div>

            </div>
          </div>
          <div class ="header-item">
            <label>Mastercard:</label>
            <input for="header" v-model="this.costingData.mastercard">
            <label>Machine:</label>
            <input for="header" v-model="this.machineSpec.machineName">
            <label>Finishing:</label>
            <input for="header" v-model="this.costingData.finishing">
            <label>Process:</label>
            <input for="header" v-model="this.formModel.process">
          </div>
        </div>
      </div>
      <div class="quantity-field">
        <div class ="quantity-head">
            <label>Quantity Ordered (PCS)</label>
          </div>
        <div class ="quantity-head">
          <div v-for="(quantity, index) in formModel.orderQuantity" :key="index" class="quantity-column">
            <label>{{ quantity }}</label>
          </div>

          <!-- Display the calculated values for this quantity -->

          <!-- Add other calculations as needed -->
        </div>
        <div class ="quantity-head">
          <label>Printed Length(PCS)</label>
        </div>
        <div class ="quantity-head">
          <div v-for="(quantity, index) in formModel.orderQuantity" :key="index" class="quantity-column">
            <label>{{ quantity }}</label>
          </div>

          <!-- Display the calculated values for this quantity -->

          <!-- Add other calculations as needed -->
        </div>
        <div class ="quantity-head">
          <label>Quantity Ordered (PCS)</label>
        </div>
        <div class ="quantity-head">
          <div v-for="(quantity, index) in formModel.orderQuantity" :key="index" class="quantity-column">
            <label>{{ quantity }}</label>
          </div>

          <!-- Display the calculated values for this quantity -->

          <!-- Add other calculations as needed -->
        </div>
        <div class ="quantity-head">
          <label>Quantity Ordered (PCS)</label>
        </div>
        <div class ="quantity-head">
          <div v-for="(quantity, index) in formModel.orderQuantity" :key="index" class="quantity-column">
            <label>{{ quantity }}</label>
          </div>

          <!-- Display the calculated values for this quantity -->

          <!-- Add other calculations as needed -->
        </div>
        <div class ="quantity-head">
          <label>Quantity Ordered (PCS)</label>
        </div>
        <div class ="quantity-head">
          <div v-for="(quantity, index) in formModel.orderQuantity" :key="index" class="quantity-column">
            <label>{{ quantity }}</label>
          </div>

          <!-- Display the calculated values for this quantity -->

          <!-- Add other calculations as needed -->
        </div>
        <div class ="quantity-head">
          <label>Quantity Ordered (PCS)</label>
        </div>
        <div class ="quantity-head">
          <div v-for="(quantity, index) in formModel.orderQuantity" :key="index" class="quantity-column">
            <label>{{ quantity }}</label>
          </div>

          <!-- Display the calculated values for this quantity -->

          <!-- Add other calculations as needed -->
        </div>
        <div class ="quantity-head">
          <label>Quantity Ordered (PCS)</label>
        </div>
        <div class ="quantity-head">
          <div v-for="(quantity, index) in formModel.orderQuantity" :key="index" class="quantity-column">
            <label>{{ quantity }}</label>
          </div>

          <!-- Display the calculated values for this quantity -->

          <!-- Add other calculations as needed -->
        </div>
        <div class ="quantity-head">
          <label>Quantity Ordered (PCS)</label>
        </div>
        <div class ="quantity-head">
          <div v-for="(quantity, index) in formModel.orderQuantity" :key="index" class="quantity-column">
            <label>{{ quantity }}</label>
          </div>

          <!-- Display the calculated values for this quantity -->

          <!-- Add other calculations as needed -->
        </div>
      </div>
    </div>

  </div>
  <ECSCalculator
      @costingdata = "getCostingData"
      @calculated = "getCalculated"
      @machine = "getMachine"

  />

</template>


<script>
//import axios from "axios";
import HeaderBar from "@/components/AppHeader.vue";
import ECSCalculator from "@/components/costing/ecs/ECSCalculator";
export default {

  components: {
    ECSCalculator,
    HeaderBar,
  },

  data() {
    return {
      originalDate: new Date(),
      quantities:[1000,2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
      formattedDate:'',
      machineSpec:[],
      calculated:[],
      costingData:[],
      formModel:{
        process:'',
        orderQuantity:[]
      },
      username: null,
      currentTime: null,
    };
  },

  mounted() {
    this.formatDate();
  },

  computed: {
    splitProcess(){
      if(this.costingData.process){
        let data = this.costingData.process;
        const splitData = data.split(',');

        const splitData1 = [];

        for (let i = 0; i < splitData.length; i+=3) {
          splitData1.push(splitData[i]);
        }
        return splitData1;
      }
      return [];
    },

    createMoq(){
      if(this.costingData.process){
        let data = this.costingData.orderQuantity;
        const splitData = data.split(';');

        const splitData1 = [];

        for (let i = 0; i < splitData.length; i++) {
          splitData1.push(splitData[i]);
        }
        return splitData1;
      }
      return [];
    },


  },

  created() {

    this.getProcess();

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

    getMachine(machinespec){
      this.machineSpec = machinespec;
      console.log('Received machine:', this.machineSpec);

    },

    getCalculated(calculated){
      this.calculated = calculated;
      console.log('Received calculated:', this.calculated);

    },

    getCostingData(costingdata){
      this.costingData = costingdata;
      this.formModel.process =this.splitProcess;
      this.formModel.orderQuantity = this.createMoq;
      console.log('Received form data:', this.costingData);


    },

   getProcess(){
      this.formModel.process = this.splitProcess;



   },

    updateCurrentTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    },
    redirectTo(path) {
      this.$router.push(path);
    },

    formatDate() {
      const year = this.originalDate.getFullYear();
      const month = this.originalDate.getMonth() + 1;
      const day = this.originalDate.getDate();
      this.formattedDate = `${day}-${month}-${year}`;
    },

  },
};
</script>

<style scoped>

.quantity-field {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: end;
  align-content: end;
  border: 1px solid #ccc;
  margin: 5px;
}

.quantity-head {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

}

.quantity-column {
  display: inline;
  flex-direction: row;
  justify-content: end;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}

.group-input{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-content: end;
}

.group-label{
  width:30%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-content: end;
}
.quantity-header{
  width:100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: end;
  align-content: end;
}

.company-header-content{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
}

.sub-item{
  display: flex;
  flex-direction: row;
  margin:3px;
  justify-content: space-evenly;
  align-items: start;
}

.print{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}


.header-item-sub{
  width: 100%;
  margin:3px;
  dislay: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.header-item{
  width:50%;
  margin:3px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.header-content{
  margin: 3px;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: start;
  border: 2px solid gray;
  border-radius: 10px;
}

.costing-header{
  margin : 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
}
.company-header{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.dashboard {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


button {
  background-color: #3498db;
  font-size: 15px;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  margin: 1px;
  cursor: pointer;
}

label {
  font-size: 14px;
  color: black;
  border: none;
  border-radius: 5px;
}

label[type=sub] {
  display: flex;
  font-size: 14px;
  color: black;
  border: none;
  margin:0px;

}

input[type=number], textarea {
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  font-size: 14px;
  resize: vertical;
  overflow: auto;
}

input[for=header]{
  display: flex;
  padding: 3px;
  box-sizing: border-box;
  font-size: 14px;
  resize: vertical;
}

input[for=sub]{
  width: 50%;
  display: flex;
  padding: 3px;
  box-sizing: border-box;
  font-size: 14px;
}

</style>
