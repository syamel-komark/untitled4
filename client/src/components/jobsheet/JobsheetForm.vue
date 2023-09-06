<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <button v-print="'#myPrintableContent'">Print Costing</button>
    <button @click="updatePricing">Save Pricing</button>

    <div class="print" id="myPrintableContent">
      <div class="company-header">
        <img src="output (5).png" alt="Komark" width="150" height="60" @click="toggleCalculator" />
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
              <div class="sub-item">
                <label type="sub">Material Width (mm):</label>
                <input for="sub" v-model="this.calculated.materialWidth">
                <label type="sub">No of Color:</label>
                <input for="sub" v-model="this.costingData.color">
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
            <label>Quantity:</label>
            <input for="header" v-model="this.costingData.orderQuantity">
          </div>
        </div>
      </div>
      <div class="quantity-field">
        <div class = "quantity-group">
          <div class = "quantity-label-column">
            <div class = "quantity-label">
              <label>SUMMARY</label>
            </div>
          </div>
          <div class = "quantity-column">
            <div class ="quantity-head">
              <label>MOQ (PCS)</label>
            </div>
            <div class ="quantity-table">
              <div class = "quantity-item">
                <label>Total Pieces</label>
                <div v-for="(quantity, index) in formModel.orderQuantity" :key="index" class="quantity">
                  <label>{{ quantity }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>Print Length (m)</label>
                <div v-for="(length, index) in calculated.printingLength" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>Wastage Length (m)</label>
                <div v-for="(length, index) in calculated.wastageLength" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
              <div class = "quantity-item-fixed">
                <label>Setting Length (m)</label>
                <div class="quantity-fixed">
                  <label>{{ calculated.settingLength }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>Total Length (m)</label>
                <div v-for="(length, index) in calculated.totalLength" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>


            </div>
          </div>
        </div>
        <div class = "quantity-group">
          <div class = "quantity-label-column">
            <div class = "quantity-label">
              <label>MATERIAL COST</label>
            </div>
          </div>
          <div class = "quantity-column">
            <div class ="quantity-table">
              <div class = "quantity-item">
                <label>Paper Cost(RM)</label>
                <div v-for="(length, index) in calculated.paperCost" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>Ink Cost (RM)</label>
                <div v-for="(length, index) in calculated.inkCost" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>Varnish Cost (RM)</label>
                <div v-for="(length, index) in calculated.varnishCost" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>Laminate Cost(RM)</label>
                <div v-for="(length, index) in calculated.laminateCost" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>Foil Cost(RM)</label>
                <div v-for="(length, index) in calculated.foilCost" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>Total Material Cost(RM)</label>
                <div v-for="(length, index) in calculated.totalMaterialCost" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class = "quantity-group">
          <div class = "quantity-label-column">
            <div class = "quantity-label">
              <label>FIXED COST</label>
            </div>
          </div>
          <div class = "quantity-column">
            <div class ="quantity-table">
              <div class = "quantity-item">
                <label>Fixed Cost(RM)</label>
                <div v-for="(length, index) in calculated.fixedCost" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class = "quantity-group-fixed">
          <div class = "quantity-label-column-fixed">
            <div class = "quantity-label">
              <label>TOOLING COST</label>
            </div>
          </div>
          <div class = "quantity-column-fixed">
            <div class ="quantity-table-fixed">
              <div class = "quantity-item-fixed">
                <label>Diecut Cost(RM)</label>
                <div class="quantity-fixed">
                  <label>{{ calculated.dieCutCost }}</label>
                </div>
              </div>
              <div class = "quantity-item-fixed">
                <label>Plate Cost (RM)</label>
                <div class="quantity-fixed">
                  <label>{{ calculated.plateCost }}</label>
                </div>
              </div>
              <div class = "quantity-item-fixed">
                <label>Total Tooling Cost(RM)</label>
                <div class="quantity-fixed">
                  <label>{{ calculated.totalToolingCost }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class = "quantity-group">
          <div class = "quantity-label-column">
            <div class = "quantity-label">
              <label>COSTING SUMMARY</label>
            </div>
          </div>
          <div class = "quantity-column">
            <div class ="quantity-table">
              <div class = "quantity-item">
                <label>Total Cost(RM)</label>
                <div v-for="(length, index) in calculated.totalCost" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>Unit Cost(RM/PCS)</label>
                <div v-for="(length, index) in calculated.unitCost" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>Current selling Price(RM/PCS)</label>
                <div v-for="(length, index) in formModel.sellingPrice" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>Current Margin(%)</label>
                <div v-for="(length, index) in calculated.currentMargin" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>
              <div class = "quantity-item">
                <label>RSP 20%(RM/PCS)</label>
                <div v-for="(length, index) in calculated.RSP" :key="index" class="quantity">
                  <label>{{ length }}</label>
                </div>
              </div>


            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
  <component :is="jobsheetType" ref="calculator"
             @costingdata = "getCostingData"
             @calculated = "getCalculated"
             @machine = "getMachine"
  ></component>
  <button @click="sendValueToChild">Send Value to Child</button>
  <div class="success-modal" v-if="successUpdatePricing">
    <div class="table-container">
      <div class="success-content">
        <p>{{ successMessageLabel }}</p>
        <button @click="this.successUpdatePricing=false">Close</button>
        <button @click="createQuotation">Create Quotation</button>
      </div>
    </div>
  </div>


</template>

<script>
//import axios from "axios";
import HeaderBar from "@/components/AppHeader.vue";
import ECSCalculator from "@/components/costing/ecs/ECSCalculator";
import HPCalculator from "@/components/costing/hp/HPCalculator";
import EMCalculator from "@/components/costing/em/EMCalculator";
import KPCalculator from "@/components/costing/kopack/KPCalculator";
import LECalculator from "@/components/costing/lowend/LECalculator";

import axios from "axios";
export default {
///todo: update the close this.successupdatepricing for all costingform
  components: {
    ECSCalculator,
    HeaderBar,
    HPCalculator,
    EMCalculator,
    KPCalculator,
    LECalculator,
  },

  data() {
    return {
      machineType:'',
      successUpdatePricing:false,
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

    jobsheetType() {
      const machine = this.machineType;
      const machineToJobsheetType = {
        ECS: 'ECSCalculator',
        HP: 'HPCalculator',
        EM280 :'EMCalculator',
        KP13 : 'KPCalculator',
        SONATA : 'LECalculator',
        // Add more machines and their corresponding jobsheet types as needed
      };
      return machineToJobsheetType[machine] || '';
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

    createMoq(){
      if(this.costingData.orderQuantity){
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

    createSellingPrice(){
      if(this.costingData.currentSellingPrice){
        let data = this.costingData.currentSellingPrice;
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

    this.sendValueToChild();


    // Retrieve username from session storage
    this.username = sessionStorage.getItem('username') || '';
    this.machineType = sessionStorage.getItem('machine') || '';
    console.log(this.jobsheetType);



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

    sendValueToChild() {
      // Get a reference to the child component
      const childComponent = this.$refs.calculator;

      // Emit a custom event to the child component with the value you want to send
      if (childComponent && this.jobsheetType !== '') {
        childComponent.$emit('custom-event', 'Value to send to child');
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
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: end;
  align-content: end;
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
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
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

.header-item{
  width:50%;
  margin:2px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.header-content{
  margin: 2px;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: start;
  border: 2px solid gray;
  border-radius: 10px;
}

.costing-header{
  margin : 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
}
.company-header{
  display: flex;
  flex-direction: row;
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
