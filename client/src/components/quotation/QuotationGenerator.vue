<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <button v-print="'#myPrintableContent'">Print Costing</button>
    <button @click="updatePricing">Save Pricing</button>

    <div class="print" id="myPrintableContent">
      <div class="company-header">
        <img src="output (5).png" alt="Komark" width="150" height="80" @click="toggleCalculator" />
        <div class = "address">
          <label for = "address">Komark International (M) Sdn. Bhd</label>
          <label for = "address">(198301001393(96626-V))</label>
          <label for = "address">Lot 132, Jalan 16/1, Kawasan Perindustrian Cheras Jaya,</label>
          <label for = "address">43200 Balakong, Selangor, Malaysia.</label>
          <label for = "address">Tel +(603) 9080 3333 || Fax +(603) 9080 5233</label>
        </div>
      </div>
      <div class="costing-header">
        <div class="header-content-start">
          <div class ="header-item-start">
            <label>Customer: {{this.quotationInfo.customerName}}</label>
            <label>Address: {{this.quotationInfo.customerAddress}}</label>
          </div>
        </div>
        <div class="header-content-end">
          <div class ="header-item-end">
            <label>Quotation Number: {{this.quotationId}}</label>
            <label>Date: {{formattedDate}}</label>
          </div>
        </div>
      </div>
      <div  v-for="(costing,index) in costingInfo" :key="index" class="quantity-field">
        <div class="quotation-entry">
          <div class="quotation-entry-head">
            <p>No:</p>
          </div>
          <div class="quotation-entry-item">
            <p>{{index}}</p>
          </div>
        </div>
        <div class="quotation-entry">
          <div class="quotation-entry-head">
            <p>Label Name:</p>
          </div>
          <div class="quotation-entry-item">
            <p>{{ costing.labelname }}</p>
          </div>
        </div>
        <div class="quotation-entry">
          <div class="quotation-entry-head">
            <p>Material Name:</p>
          </div>
          <div class="quotation-entry-item">
            <p>{{ costing.material }}</p>
          </div>
        </div>
        <div class="quotation-entry">
          <div class="quotation-entry-head">
            <p>Dimension (mm):</p>
          </div>
          <div class="quotation-entry-item">
            <p>Pitch: {{ costing.pitch }}<br>Width: {{ costing.width }}</p>
          </div>
        </div>
        <div class="quotation-entry">
          <div class="quotation-entry-head">
            <p>Printing:</p>
          </div>
          <div class="quotation-entry-item">
            <p>Color: {{ costing.color }}</p>
          </div>
        </div>
        <div class="quotation-entry">
          <div class="quotation-entry-head">
            <p>Finishing:</p>
          </div>
          <div class="quotation-entry-item">
            <p>{{ costing.finishing }}</p>
          </div>
        </div>
        <div class="quotation-entry">
          <div class="quotation-entry-head">
            <p>MOQ (PCS):</p>
          </div>
          <div class="quotation-entry-item">
            <div  v-for="(index) in quantity[index]" :key="index" class="quotation-enty-item">
              <p>{{index}}</p>
            </div>
          </div>
        </div>
        <div class="quotation-entry">
          <div class="quotation-entry-head">
            <p>Unit Price: (RM/PCS):</p>
          </div>
          <div class="quotation-entry-item">
            <div  v-for="(index) in RSP[index]" :key="index" class="quotation-enty-item">
              <p>{{index}}</p>
            </div>
          </div>
        </div>









      </div>
    </div>

  </div>
  <div class="success-modal" v-if="successUpdatePricing">
    <div class="table-container">
      <div class="success-content">
        <p>{{ successMessageLabel }}</p>
        <button @click="this.success=false">Close</button>
        <button @click="createQuotation">Create Quotation</button>
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
//todo:whatever the thing need to be done so that quotation is made
  data() {
    return {
      rsp:'',
      quantity:'',
      dataLoaded: false,
      costingInfo:[],
      numberOfOrderNumber:[],
      quotationInfo:[],
      successUpdatePricing:false,
      quotationId : 0,
      successMessageLabel:'',
      showCalculator:false,
      originalDate: new Date(),
      quantities:[1000,2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
      formattedDate:'',
      machineSpec:[],
      calculated:[],
      costingData:[],
      formModel:{
        sellingPrice:[],
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
    splitCostingNumber(){
      if(this.quotationInfo.costingNumber){
        let data = this.quotationInfo.costingNumber;
        const splitData = data.split(',');

        const splitData1 = [];

        for (let i = 0; i < splitData.length; i++) {
          splitData1.push(splitData[i]);
        }
        return splitData1;
      }
      return [];
    },

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

    createQuantity(){
      if(this.costingInfo){
        let data = this.costingInfo;
        let quantity =[];
        let final = [];
        let moq = [];
        for (let i = 0; i < data.length; i++) {
          quantity[i] = data[i].quantity;
          final.push(quantity[i]);
        }
        for (let i = 0; i < final.length; i++) {
          const splitdata = final[i].split(';');
          moq.push(splitdata);
        }
        return moq;
      }
      return [];
    },

    createRSP(){
      if(this.costingInfo){
        let data = this.costingInfo;
        let quantity =[];
        let final = [];
        let moq = [];
        for (let i = 0; i < data.length; i++) {
          quantity[i] = data[i].sellingprice;
          final.push(quantity[i]);
        }
        for (let i = 0; i < final.length; i++) {
          const splitdata = final[i].split(';');
          moq.push(splitdata);
        }
        return moq;
      }
      return [];
    },

  },

  created() {
    this.quotationId = sessionStorage.getItem('quotationId');
    console.log(sessionStorage); // Log the new quotation ID

    this.getQuotationInfo();

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

    setRSP(){
      this.RSP = this.createRSP;
      console.log(this.quantity);
    },

    setQuantity(){
      this.quantity = this.createQuantity;
      console.log(this.quantity);
    },

    async fetchData() {
      try {
        const response = await axios.get('/api/getcosting');
        const allCostingInfo = response.data;

        this.costingInfo = []; // Initialize costingInfo array

        for (let i = 0; i < this.numberOfOrderNumber.length; i++) {
          const orderNumber = parseInt(this.numberOfOrderNumber[i]);

          // Find the item with the matching orderNumber in allCostingInfo
          const matchingItem = allCostingInfo.find(costing => costing.id === orderNumber);

          if (matchingItem) {
            this.costingInfo.push(matchingItem);
          }
        }

        console.log(this.costingInfo);
        this.setQuantity();
        this.setRSP();
        this.dataLoaded = true;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    getNumberOfOrderNumber(){
      this.numberOfOrderNumber=this.splitCostingNumber;
      console.log(this.numberOfOrderNumber);
    },

    async getQuotationInfo() {
      try {
        const response = await axios.get('/api/getquotation', {
          params: {
            id: this.quotationId,// Pass the costing ID as a query parameter
          }
        });

        const allQuotation = response.data;
        this.quotationInfo = response.data;
        console.log(this.quotationInfo);

        // fuck chat gpt for fucking me real good here
        this.quotationInfo.customerName = allQuotation[0].customername; // Set the selected material
        this.quotationInfo.customerAddress = allQuotation[0].customeraddress; // Set the selected material
        this.quotationInfo.costingNumber = allQuotation[0].costingnumber; // Set the selected material
        this.getNumberOfOrderNumber();
        await this.fetchData();
      } catch (error) {
        console.error('Error fetching quotation info:', error);
      }
    },

    createQuotation(){
      sessionStorage.setItem('quotationId',this.calculated.costingId);
      this.$router.push('/newquotation');
    },

    async updatePricing() {
      try {
        const response = await axios.put('/api/updatepricing', {
          id: this.calculated.costingId,
          unitcost: this.calculated.unitCost.join(','),
          rsp: this.calculated.RSP.join(','),

        });
        if (response.status === 200) {
          this.successUpdatePricing = true;
          this.successMessageLabel = 'pricing have been successfully updated';
          console.log('update successful');
        } else {
          this.successMessageLabel = 'pricing update failed.';
          console.error('update failed');
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    },


    toggleCalculator() {
      this.showCalculator = !this.showCalculator;
    },
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
      this.formModel.sellingPrice = this.createSellingPrice
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

.quantity-label-column-fixed {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 2px;
  margin: 2px;
}

.quantity-table-fixed {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-content: end;
  flex-grow:1;


}

.quantity-column-fixed {
  display: flex;
  flex-direction: row;
  flex-grow:1;
  justify-content: flex-end;
  border: 1px solid #ccc;
  padding: 2px;
  margin: 2px;
}

.quantity-fixed {
  display: inline;
  flex-direction: row;
  flex-grow:1;
  justify-content: end;
  align-content: end;
  border: 1px solid #ccc;
  width: 80px;
  height: 15px;
  padding: 2px;
  margin: 2px;
}

.quantity-item-fixed {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: baseline;

}

.quantity-group-fixed {
  display: flex;
  flex-wrap: wrap;
  flex-grow:1;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  border: 1px solid #ccc;
  margin: 2px;
}

.quantity-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: end;
  align-content: end;
  border: 1px solid #ccc;
  margin: 2px;
}

.quantity-field {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: start;
  border: 1px solid #ccc;
  margin: 2px;
}

.quantity-head {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

}

.quantity-label {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

}

.quantity-item {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: baseline;

}

.quantity-table {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-content: end;

}

.quantity-label-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 2px;
  margin: 2px;
}

.quantity {
  display: inline;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: end;
  border: 1px solid #ccc;
  width: 80px;
  height: 15px;
  padding: 2px;
  margin: 2px;
}


.quantity-column {
  display: inline;
  flex-direction: row;
  justify-content: end;
  border: 1px solid #ccc;
  padding: 2px;
  margin: 2px;
}

.company-header-content{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: space-between;
}

.sub-item{
  display: flex;
  flex-direction: row;
  margin:2px;
  justify-content: space-evenly;
  align-items: baseline;
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
  margin:2px;
  dislay: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.header-item-end{
  margin:2px;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.header-item-start{
  margin:2px;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.header-content-end{
  margin: 2px;
  display: inline-flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
}

.header-content-start{
  margin: 2px;
  display: inline-flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
}

.quotation-entry-head{
  width:100px;
  height: 50px;
  margin: px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;

}

.quotation-entry{
  width:100px;
  margin: px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  border: 1px solid gray;
}
.quotation-entry-item{
  width:100px;
  margin: px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  word-wrap: anywhere;

}

.costing-header{
  margin : 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid gray;
  border-radius: 10px;
}
.company-header{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.address{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
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
  font-size: 13px;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  margin: 1px;
  cursor: pointer;
}

label {
  font-size: 13px;
  color: black;
  border: none;
  border-radius: 5px;
}

label[type=sub] {
  display: flex;
  font-size: 13px;
  color: black;
  border: none;
  margin:0px;

}

input[type=number], textarea {
  display: flex;
  padding: 3px;
  box-sizing: border-box;
  font-size: 13px;
  resize: vertical;
  overflow: auto;
}

label[for=address]{
  display: flex;
  margin: 1px;
  font-size: 12px;
}

input[for=header]{
  display: flex;
  padding: 3px;
  box-sizing: border-box;
  font-size: 13px;
  resize: vertical;
}

input[for=sub]{
  width: 50%;
  display: flex;
  padding: 3px;
  box-sizing: border-box;
  font-size: 13px;
}

</style>
