<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <button v-print="'#myPrintableContent'">Print Jobsheet</button>
    <button @click="saveJobsheet">Save Jobsheet</button>

    <div class="print" id="myPrintableContent">
      <div class="company-header">
        <img src="output (5).png" alt="Komark" width="150" height="60" @click="toggleCalculator" />
        <label>Komark HQ ONC2.0 Job Sheet</label>
        <div class="company-header-content">
          <label>Jobsheet Number:{{this.jobsheetNumber}}</label>
          <label>Date:{{formattedDate}}</label>
          <label>Costing Number: {{this.calculated.costingId}}</label>
        </div>
      </div>
      <div class="costing-header">
        <header>Label Info</header>
        <div class="header-content">
          <div class ="header-item">
            <label>Label Name:</label>
            <input for="header" v-model="this.costingData.labelName">
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
                <label v-if="this.machineSpec.machineName==='HP'" type="sub">Repeat(mm):</label>
                <label v-else type="sub">Gear(mm):</label>
                <input for="sub" v-model="this.costingData.gear">
                <label type="sub">Gap(mm):</label>
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
            <label>Job Type:</label>
            <input for="header" v-model="this.jobsheet.jobType">
            <label>Costing:</label>
            <input for="header" v-model="this.approval">


          </div>
        </div>
      </div>
      <div class="costing-header-order">
        <header>Material Info</header>
        <div class="header-content-order">
          <div class ="header-item-order">
            <label>Material Name:</label>
            <input for="header" v-model="this.costingData.facestock">
            <div class="sub-item">
              <label>Varnish:</label>
              <input for="header" v-model="this.jobsheet.varnish">
              <label>Laminate:</label>
              <input for="header" v-model="this.jobsheet.laminate">
            </div>
          </div>
          <div class ="header-item-order">
            <label>Color Name:</label>
            <input for="header" v-model="this.jobsheet.colorCode">
            <div class="sub-item">
              <label>Color:</label>
              <input for="header" v-model="this.jobsheet.ink">
              <label>Foil:</label>
              <input for="header" v-model="this.jobsheet.foil">
            </div>

          </div>
        </div>
      </div>
      <div class="costing-header-order">
        <header>Process Info</header>
        <div class="header-content-order">
          <div class ="header-item-order">
            <label>Process:</label>
            <input for="header" v-model="this.formModel.process">
            <label>Finishing:</label>
            <input for="header" v-model="this.costingData.finishing">
          </div>
        </div>
      </div>
      <div class="costing-header-order">
        <header>Printing Info</header>
        <div class="header-content-order">
          <div class ="header-item-order">
            <div class="sub-item">
              <label>Printing Length(m):</label>
              <input for="header" v-model="this.printLength">
              <label>Total Length(m):</label>
              <input for="header" v-model="this.calculated.totalLength">
            </div>
            <div class="sub-item">
              <label>Setting Length(m):</label>
              <input for="header" v-model="this.calculated.settingLength">
              <label>Wastage Length(m):</label>
              <input for="header" v-model="this.calculated.wastageLength">

            </div>

            <div class="sub-item">
              <label v-if="this.machineSpec.machineName==='HP'" type="sub">Clicks:</label>
              <label v-else type="sub">Ink(kg):</label>
              <input for="header" v-model="this.calculated.inkUse">
              <label>Varnish(kg):</label>
              <input for="header" v-model="this.calculated.varnishUse">
            </div>
          </div>
          <div class ="header-item-order">
            <div class="sub-item">
              <label>Printing Duration(hours):</label>
              <input for="header" v-model="this.calculated.printingDuration">
              <label>Setting Duration(hours):</label>
              <input for="header" v-model="this.calculated.settingDuration">
            </div>
            <div class="sub-item">
              <label>Laminate Length(m):</label>
              <input for="header" v-model="this.calculated.laminateUse">
              <label>Foil Length(m):</label>
              <input for="header" v-model="this.calculated.foilUse">
            </div>
            <div class="sub-item">
              <label>Quantity (PCS):</label>
              <input for="header" v-model="this.costingData.orderQuantity">
              <label>Diecut:</label>
              <input for="header" v-model="this.costingData.dieCutType">
            </div>

          </div>
        </div>
      </div>
      <div class="costing-header-order">
        <header>Packing Info</header>
        <div class="header-content-order">
          <div class ="header-item-order">
            <label>Roll Pattern:</label>
            <input for="header" v-model="this.jobsheet.direction">
          </div>
          <div class ="header-item-order">
            <label>Quantity Per Roll:</label>
            <input for="header" v-model="this.jobsheet.quantityPerRoll">
          </div>
        </div>
      </div>
      <div class="costing-header-order">
        <header>Order Info</header>
        <div class="header-content-order">
          <div class ="header-item-order">
            <div class="sub-item">
              <label>Sales Person:</label>
              <input for="header" v-model="this.jobsheet.salesPerson">
              <label>Order Number:</label>
              <input for="header" v-model="this.jobsheet.orderNumber">
            </div>
          </div>
          <div class ="header-item-order">
            <div class="sub-item">
              <label>Customer Name:</label>
              <input for="header" v-model="this.jobsheet.customerName">
              <label>Delivery Date:</label>
              <input for="header" v-model="extractedDate">
            </div>

          </div>

        </div>
      </div>
      <div class="costing-header-order">
        <header>Approvals</header>
        <div class="header-content-order">
          <div class ="approvals-main">
            <div class ="approval-area">
              <div class="approval-box"></div>
              <approval>Customer Service</approval>
            </div>
            <div class ="approval-area">
              <div class="approval-box"></div>
              <approval>Sales Person</approval>
            </div>
            <div class ="approval-area">
              <div class="approval-box"></div>

              <approval>Quality Manager</approval>
            </div>
            <div class ="approval-area">
              <div class="approval-box"></div>
              <approval>Production Manager</approval>
            </div>
            <div class ="approval-area">
              <div class="approval-box"></div>
              <approval>General Manager</approval>
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
             v-show="showCalculator"
  ></component>
  <div class="success-modal" v-if="successUpdatePricing">
    <div class="table-container">
      <div class="success-content">
        <p>{{ successMessageLabel }}</p>
        <button @click="this.successUpdatePricing=false">Close</button>
        <button @click="createSchedule">Create Schedule</button>
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
      printingLength:'',
      jobsheetInfo:[],
      jobsheet:{
        mastercard: '',
        labelname: '',
        facestock: '',
        width: '',
        pitch: '',
        color: '',
        across: '',
        around: '',
        gear: '',
        foil: '',
        laminate: '',
        ink: '',
        varnish: '',
        dieCutType: '',
        quantityOrder: '',
        colorCode: '',
        jobType: '',
        quantityPerRoll: '',
        direction: '',
        salesPerson: '',
        customerName: '',
        deliveryDate: '',
        orderNumber: '',
        unitCost: '',
        sellingPrice: ''
      },
      jobsheetNumber:'',
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

    printLength(){
      const total = this.calculated.totalLength;
      const setting = this.calculated.settingLength;
      const wastage = this.calculated.wastageLength;
      const print = total-setting-wastage;
      return print;
    },

    extractedDate() {
      //if (!this.jobsheet.deliveryDate) return ''; // Handle empty date
     // return this.jobsheet.deliveryDate.substring(0, 10);
      return this.jobsheet.deliveryDate;
    },


    jobsheetType() {
      const machine = this.machineType;
      const machineToJobsheetType = {
        ECS340: 'ECSCalculator',
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

    approval(){
        if(this.calculated.currentMargin<0){
          return 'Rejected < 0';
        }
        if(this.calculated.currentMargin>0.19){
          return 'Approved';
        }
        else{
          return 'Check costing';
        }
    },






  },

  created() {

    this.fetchJobsheet();

    this.getProcess();

    this.sendValueToChild();


    // Retrieve username from session storage
    this.username = sessionStorage.getItem('username') || '';
    this.machineType = sessionStorage.getItem('machine') || '';
    this.jobsheetNumber = sessionStorage.getItem('jobsheetnumber') || '';
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

    async saveJobsheet(){
      try {
        this.printingLength = this.printLength;
        const response = await axios.put('/api/updatejobsheetinfo', {
          id: this.jobsheetNumber,
          printinglength: this.printingLength,
          totallength: this.calculated.totalLength,
          settinglength: this.calculated.settingLength,
          wastagelength: this.calculated.wastageLength,
          inkuse: this.calculated.inkUse,
          varnishuse: this.calculated.varnishUse,
          laminateuse: this.calculated.laminateUse,
          foiluse: this.calculated.foilUse,
          printingduration: this.calculated.printingDuration,
          settingduration: this.calculated.settingDuration,
          approval:this.approval







        });
        if (response.status === 200) {
          this.successUpdatePricing = true;
          this.successMessageLabel = 'jobsheet have been successfully updated';
          console.log('update successful');
        } else {
          this.successMessageLabel = 'pricing update failed.';
          console.error('update failed');
        }
      } catch (error) {
        console.error('Error during update:', error);
      }

    },


    async fetchJobsheet() {
      this.jobsheetNumber = sessionStorage.getItem('jobsheetnumber');
      console.log(this.jobsheetNumber);
      try {
        const response = await axios.get('/api/getjobsheet', {
          params: {
            id: parseInt(this.jobsheetNumber) // Pass the costing ID as a query parameter
          }
        });

        const alljobsheet = response.data;
        this.jobsheetInfo = response.data;

        this.jobsheet.mastercard = alljobsheet[0].mastercard; // Set the selected material
        this.jobsheet.labelName = alljobsheet[0].labelname; // Set the selected material
        this.jobsheet.facestock = alljobsheet[0].material; // Set the selected material
        this.jobsheet.width = alljobsheet[0].width; // Set the selected material
        this.jobsheet.pitch = alljobsheet[0].pitch; // Set the selected material
        this.jobsheet.color = alljobsheet[0].color; // Set the selected material
        this.jobsheet.across = alljobsheet[0].across; // Set the selected material
        this.jobsheet.around = alljobsheet[0].around; // Set the selected material
        this.jobsheet.gear = alljobsheet[0].gear; // Set the selected material
        this.jobsheet.foil = alljobsheet[0].foil; // Set the selected material
        this.jobsheet.laminate = alljobsheet[0].laminate; // Set the selected material
        this.jobsheet.ink = alljobsheet[0].ink; // Set the selected material
        this.jobsheet.varnish = alljobsheet[0].varnish; // Set the selected material
        this.jobsheet.dieCutType = alljobsheet[0].diecut;
        this.jobsheet.quantityOrder = alljobsheet[0].quantity;
        this.jobsheet.colorCode = alljobsheet[0].colorcode;
        this.jobsheet.jobType = alljobsheet[0].jobtype;
        this.jobsheet.quantityPerRoll = alljobsheet[0].quantityperroll;
        this.jobsheet.direction = alljobsheet[0].rolldirection;
        this.jobsheet.salesPerson = alljobsheet[0].salesperson
        this.jobsheet.customerName =  alljobsheet[0].customer;
        this.jobsheet.deliveryDate = alljobsheet[0].deliverydate;
        this.jobsheet.orderNumber = alljobsheet[0].ordernumber;
        this.jobsheet.unitCost = alljobsheet[0].unitcost;
        this.jobsheet.sellingPrice = alljobsheet[0].sellingprice;

        console.log(this.jobsheetInfo);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },

    sendValueToChild() {
      // Get a reference to the child component
      const childComponent = this.$refs.calculator;

      // Emit a custom event to the child component with the value you want to send
      if (childComponent && this.jobsheetType !== '') {
        childComponent.$emit('custom-event', 'Value to send to child');
      }
    },

    createSchedule(){
      sessionStorage.setItem('jobsheet',this.jobsheetNumber);
      this.$router.push('/schedulejob');
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

approval{
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
}

.approval-box{
  display: flex;
  height:60px;
}

.approval-area{
  flex-direction: column;
  display: flex;
  border: 1px solid gray;
  align-items: baseline;
  justify-items: baseline;
  margin-left: 10px;
  margin-right: 10px;


}

.approvals-main {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
}


.company-header-content{
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  width: 100%;

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
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.header-item{
  width:100%;
  margin:2px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  flex-grow: 1;
}

.header-item-order{
  width: 100%;
  margin:2px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;


}


.header-content{
  width: 100%;
  margin: 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: start;
  border: 2px solid gray;
  border-radius: 10px;
}

.header-content-order{
  margin: 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: start;
  border: 2px solid gray;
  border-radius: 10px;
  width: 100%;

}

.costing-header-order{
  width: 100%;
  margin : 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;

}

.costing-header{
  width: 100%;

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
