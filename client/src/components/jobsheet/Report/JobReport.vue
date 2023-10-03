<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Jobsheet Report<br>
      <button @click="openSearchJobsheet" form="costingnumber">Search Jobsheet</button>
      <div v-if="selectJobsheet">
        <header>Costing Number: {{this.newCostingId}}</header>
        <header>Jobsheet Number: {{this.jobsheetId}}</header>
        <header>Machine: {{this.machineType}}</header>

      </div>

    </h2>
    <div class="form">
      <div class="formsub">
        <div class="group-container">
          <div>
            <h2>Job info:</h2>
            <div class="form-group">
              <div>
                <label for="labelName">Mastercard:</label>
                <input type="text" id="Mastercard" v-model="formModel.mastercard" required />
              </div>
              <div>
                <label for="labelName">Label Name:</label>
                <input type="text" id="labelName" v-model="formModel.labelName" required />
              </div>
            </div>
            <div class="form-group">
              <div>
                <label for="Pitch">Label Pitch:</label>
                <input type="text" id="Pitch" v-model="formModel.pitch" required />
              </div>
              <div>
                <label for="number">Label Width:</label>
                <input type="text" id="Width" v-model="formModel.width" required />
              </div>
            </div>
          </div>
          <div>
            <h2>Material Use:</h2>
            <label>Facestock</label>
            <div class="form-group">
              <div>
                <label for="labelName">Material Name:</label>
                <input type="text" id="Mastercard" v-model="formModel.facestock" required />
              </div>
              <div>
                <label for="labelName">Length (m)</label>
                <input type="text" id="Mastercard" v-model="formReport.facestockLength" required />
              </div>
              <div>
                <label for="labelName">Width (mm):</label>
                <input type="text" id="labelName" v-model="formReport.facestockWidth" required />
              </div>
            </div>
            <label>Printing</label>
            <div class="form-group">
              <div>
                <label for="labelName">Ink Use (kg)</label>
                <input type="text" id="Mastercard" v-model="formReport.inkUse" required />
              </div>
              <div>
                <label for="labelName">Varnish Use (kg):</label>
                <input type="text" id="labelName" v-model="formReport.varnishUse" required />
              </div>
              <div>
                <label for="labelName">Glue Use (kg):</label>
                <input type="text" id="labelName" v-model="formReport.adhesiveUse" required />
              </div>
            </div>
            <label>Laminate</label>
            <div class="form-group">
              <div>
                <label for="labelName">Laminate</label>
                <input type="text" id="Mastercard" v-model="formModel.laminate" required />
              </div>
              <div>
                <label for="labelName">Length (m):</label>
                <input type="text" id="labelName" v-model="formReport.laminateUse" required />
              </div>
              <div>
                <label for="labelName">Width (mm):</label>
                <input type="text" id="labelName" v-model="formReport.laminateWidth" required />
              </div>
            </div>
            <label>Foil</label>
            <div class="form-group">
              <div>
                <label for="labelName">Foil</label>
                <input type="text" id="Mastercard" v-model="formModel.foil" required />
              </div>
              <div>
                <label for="labelName">Length (m):</label>
                <input type="text" id="labelName" v-model="formReport.foilUse" required />
              </div>
              <div>
                <label for="labelName">Width (mm):</label>
                <input type="text" id="labelName" v-model="formReport.foilWidth" required />
              </div>
            </div>


          </div>

        </div>
      </div>
      <div class="formsub">
        <div class="group-container">
          <div>
            <h2>Time use:</h2>
            <div class="form-group">
              <div>
                <label for="labelName">Setting (H):</label>
                <input type="text" id="Mastercard" v-model="formReport.settingTime" required />
              </div>
              <div>
                <label for="labelName">Printing (H):</label>
                <input type="text" id="Mastercard" v-model="formReport.printingTime" required />
              </div>
              <div>
                <label for="labelName">Cleaning (H):</label>
                <input type="text" id="Mastercard" v-model="formReport.cleaningTime" required />
              </div>
              <div>
                <label for="labelName">Down (H):</label>
                <input type="text" id="Mastercard" v-model="formReport.downTime" required />
              </div>
            </div>
            <h2>Printer info:</h2>
            <div class="form-group">
              <div>
                <label for="labelName">Name:</label>
                <input type="text" id="Mastercard" v-model="formReport.printerName" required />
              </div>
              <div>
                <label for="labelName">Employee Id:</label>
                <input type="text" id="Mastercard" v-model="formReport.printerId" required />
              </div>
            </div>
            <h2>Output info:</h2>
            <div class="form-group">
              <div>
                <label for="labelName">Produced (PCS):</label>
                <input type="text" id="Mastercard" v-model="formReport.produced" required />
              </div>
              <div>
                <label for="labelName">On Hold (PCS):</label>
                <input type="text" id="Mastercard" v-model="formReport.onHold" required />
              </div>
              <div>
                <label for="labelName">Rejected (PCS):</label>
                <input type="text" id="Mastercard" v-model="formReport.rejected" required />
              </div>
            </div>
          </div>

        </div>
      </div>


    </div>
  </div>
  <br><button @click="runAsyncFunctions" id="registercosting">GENERATE JOBSHEET</button>

  <div class="success-modal" v-if="searchJobsheet">
    <div class="table-container">
      <h2>Jobsheet List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="searchJobsheetQuery"
            @input="filterCosting"
            placeholder="Search by Mastercard"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Action</th>
          <th>Jobsheet Number</th>
          <th>Mastercard</th>
          <th>Label name</th>
          <th>Machine</th>
          <th>Pitch</th>
          <th>Width</th>
          <th>Material</th>
          <th>Quantity</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="jobsheet in filteredJobsheet" :key="jobsheet.id">
          <td>
            <button @click="pickJobsheet(jobsheet)">Use</button>
          </td>
          <td>{{ jobsheet.id }}</td>
          <td>{{ jobsheet.mastercard }}</td>
          <td>{{ jobsheet.labelname }}</td>
          <td>{{ jobsheet.machine }}</td>
          <td>{{ jobsheet.pitch }}</td>
          <td>{{ jobsheet.width }}</td>
          <td>{{ jobsheet.material }}</td>
          <td>{{ jobsheet.quantity }}</td>

        </tr>
        </tbody>
      </table>
    </div><button @click=closeSearchJobsheet>Close</button>
  </div>

</template>

<script>
import HeaderBar from "@/components/AppHeader.vue";
import axios from "axios";

export default {

  components: {
    HeaderBar,
  },

  data() {
    //TODO: COSTING NUMBER IN QUOTATION
    //TODO: MARGIN ADJUST
    return {
      formReport:{
        facestockName:'',
        facestockLength:'',
        facestockWidth:'',
        inkUse:'',
        varnishUse:'',
        adhesiveUse:'',
        laminateUse:'',
        laminateWidth:'',
        foilUse:'',
        foilWidth:'',
        settingTime:'',
        printingTime:'',
        cleaningTime:'',
        downTime:'',
        printerName:'',
        printerId:'',
        produced:'',
        onHold:'',
        rejected:'',
      },
      jobsheetId:'',
      selectJobsheet:'',
      jobsheetInfo:[],
      searchJobsheetQuery:'',
      searchJobsheet:false,
      previousJobsheetId:'',
      newJobsheetId:'',
      machineType:'',
      machineInfo:[],
      facestock:[],
      facestockSearchQuery:'',
      searchFacestock: false,
      username: null,
      currentTime: null,
      formModel:{
        unitCost:'',
        sellingPrice:'',
        orderNumber:'',
        salesPerson:'',
        customerName:'',
        direction:'',
        deliveryDate: '',
        quantityPerRoll:'',
        jobType:'',
        colorCode:[],
        mastercard: '',
        labelName:'',
        across:'',
        around:'',
        facestock:'',
        laminate:'',
        foil:'',
        color:'',
        pitch:'',
        width:'',
        gear:'',
        facestockCost:0,
        laminateCost:0,
        foilCost:0,
        ink:'',
        inkCost:0,
        varnish:'',
        varnishCost:0,
        dieCutType:'',
        quantityOrder:'',
      },
    };
  },

  computed: {



    filteredJobsheet() {
      if (this.searchJobsheetQuery === '') {
        return this.jobsheetInfo;
      } else {
        const query = this.searchJobsheetQuery;
        return this.jobsheetInfo.filter(jobsheet => {
          return jobsheet.mastercard.includes(query);
        });
      }
    },

    filterFacestock() {
      if (this.facestockSearchQuery === '') {
        return this.facestock;
      } else {
        const query = this.facestockSearchQuery.toLowerCase();
        return this.facestock.filter(facestock => {
          return facestock.materialname.toLowerCase().includes(query);
        });
      }
    },

    filterLaminate() {
      if (this.laminateSearchQuery === '') {
        return this.laminate;
      } else {
        const query = this.laminateSearchQuery.toLowerCase();
        return this.laminate.filter(laminate => {
          return laminate.materialname.toLowerCase().includes(query);
        });
      }
    },



  },

  created() {

    this.fetchJobsheet();

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

    async fetchJobsheet() {
      try {
        const response = await axios.get('/api/getjobsheet');
        this.jobsheetInfo = response.data;
        console.log(this.jobsheetInfo);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },

    pickJobsheet(jobsheet) {
      this.formModel.mastercard = jobsheet.mastercard; // Set the selected material
      this.formModel.labelName = jobsheet.labelname; // Set the selected material
      this.formModel.facestock = jobsheet.material; // Set the selected material
      this.formModel.width = jobsheet.width; // Set the selected material
      this.formModel.pitch = jobsheet.pitch; // Set the selected material
      this.formModel.color = jobsheet.color; // Set the selected material
      this.formModel.across = jobsheet.across; // Set the selected material
      this.formModel.around = jobsheet.around; // Set the selected material
      this.formModel.gear = jobsheet.gear; // Set the selected material
      this.selectedProcess = jobsheet.process; // Set the selected material
      this.selectedFinishing = jobsheet.finishing; // Set the selected material
      this.formModel.foil = jobsheet.foil; // Set the selected material
      this.formModel.laminate = jobsheet.laminate; // Set the selected material
      this.formModel.ink = jobsheet.ink; // Set the selected material
      this.formModel.varnish = jobsheet.varnish; // Set the selected material
      this.formModel.dieCutType = jobsheet.diecut;
      this.formModel.quantityOrder = jobsheet.quantity;
      this.formModel.colorCode = jobsheet.colorcode;
      this.formModel.jobType = jobsheet.jobtype;
      this.formModel.quantityPerRoll = jobsheet.quantityperroll;
      this.formModel.direction = jobsheet.rolldirection;
      this.formModel.salesPerson = jobsheet.salesperson
      this.formModel.customerName =  jobsheet.customer;
      this.formModel.deliveryDate = jobsheet.deliverydate;
      this.formModel.orderNumber = jobsheet.ordernumber;
      this.newCostingId = jobsheet.costingid;
      this.formModel.unitCost = jobsheet.unitcost;
      this.formModel.sellingPrice = jobsheet.sellingprice;
      this.formModel.core = jobsheet.core;
      this.formModel.remark = jobsheet.remark;




      this.jobsheetId = jobsheet.id;
      this.searchJobsheet = false;
      this.selectedProcesses = this.splitProcess;
      this.machineType = jobsheet.machine;
      this.selectJobsheet =true;
      this.selectCosting =false;

    },

    closeSearchJobsheet(){
      this.searchJobsheet=false;
    },

    openSearchJobsheet(){
      this.searchJobsheet=true;
    },


    pickFacestock(facestock) {
      this.formModel.facestockCost = facestock.materialprice; // Set the selected material
      this.formModel.facestock = facestock.materialname;
      this.searchFacestock = false;
      this.facestockSearchQuery = '';
    },

    async fetchFacestock() {
      try {
        const response = await axios.get('/api/getfacestock');
        this.facestock = response.data;
        console.log(this.facestock);
      } catch (error) {
        console.error('Error fetching facestock:', error);
      }
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

.table-container {
  height: 400px; /* Set the desired maximum height */
  width: 800px;
  overflow-y: auto; /* Add vertical scroll if necessary */
  background-color: white;
  display: inline-block;
  justify-self: center;
}

.formsub {
  flex: 1 1 auto;
  display:  inline-flex;
  flex-direction: column;;
  flex-wrap: wrap;
  align-items: self-start;
  justify-content: space-evenly;
  justify-items: stretch;
}


.form {
  flex: 1 1 auto;
  display:  inline-flex;
  flex-direction: row;;
  flex-wrap: wrap;
  align-items: self-start;
  justify-content: space-evenly;
  justify-items: stretch;
}


.group-container {
  width:550px;
  border: 2px solid gray;
  border-radius: 10px;
  display:  flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: self-start;
  justify-content: space-evenly;
  margin: 10px 10px 10px 10px;
}
.form-group {
  padding: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content:space-evenly;
  background-color: gainsboro;
}

.dashboard {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-content: center;
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
  font-size: 18px;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 2px 2px;
  margin: 2px;
}

input[type=text], input[type=number], textarea {
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  font-size: 18px;
}

input[type=remark],textarea {
  display: flex;
  padding: 5px;
  width: 300px;
  height: 80px;
  box-sizing: border-box;
  font-size: 12px;
}

select{
  width: 100%;
  height: 35px;
  margin-left: 5px;
}

</style>
