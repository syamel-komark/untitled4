<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Jobsheet Specification<br><button @click="openSearchCosting" form="costingnumber">Search Costing</button>
      <button @click="openSearchJobsheet" form="costingnumber">Search Jobsheet</button>
      <div v-if="selectCosting">
        <header>Costing Number: {{this.newCostingId}}</header>
        <header>Machine: {{this.machineType}}</header>

      </div>
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
            <h2>Label info:</h2>
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
            <div class="form-group">
              <div>
                <label for="Pitch">No Of Color:</label>
                <input type="text" id="Pitch" v-model="formModel.color" required />
              </div>
              <div>
                <button for="number" @click="toggleSearchColor">Color Code:</button>
                <input type="text" id="Width" v-model="formModel.colorCode" required />
              </div>
            </div>
            <div class="form-group">`
              <div>
                <label for="labelName">Across:</label>
                <input type="number" id="across" v-model="formModel.across" required />
              </div>
              <div>
                <label for="labelName">Die Cut:</label>
                <input type="text" id="process" v-model="this.formModel.dieCutType" required />
              </div>
            </div>
            <div class="form-group">
              <div>
                <label for="labelName">Around:</label>
                <input type="number" id="around" v-model="formModel.around" required />
              </div>
              <div>
                <label v-if="machineType === 'HP'" for="Gear">Repeat:</label>
                <label v-if="machineType !== 'HP'" for="Gear">Gear:</label>
                <input type="text" id="gear" v-model="formModel.gear" required />
              </div>
            </div>

            <div class="form-group">
              <div>
                <label for="labelName">Finishing:</label>
                <input type="text" id="finishing" v-model="selectedFinishing" required />
              </div>
              <div>
                <label for="labelName">Process:</label>
                <input type="text" id="process" v-model="this.selectedProcesses" required />
              </div>
            </div>
            <div class="form-group">
              <div>

                <label for="number">Job type:</label>
                <select id="printing-type" v-model="this.formModel.jobType" required>
                  <option value="NEW">NEW</option>
                  <option value="SAMPLE">SAMPLE</option>
                  <option value="REPRINT">REPRINT</option>
                  <option value="INTERNAL">INTERNAL</option>

                </select>
              </div>
              <div>
                <label for="number">Quantity Order (pcs):</label>
                <input type="text" id="process" v-model="this.formModel.quantityOrder" required />
              </div>
            </div>



          </div>
        </div>
      </div>
      <div class = "formsub">
        <div class="group-container">
          <div>
            <h2>Material:</h2>
            <div class="form-group">
              <div>
                <label for="number">Facestock:</label>
                <input type="text" id="Material" v-model="formModel.facestock" required />
              </div>
              <div>
                <label for="number">Varnish:</label>
                <input type="text" id="Material" v-model="formModel.varnish" required />
              </div>
            </div>
            <div class="form-group">
              <div>
                <label for="number">Laminate:</label>
                <input type="text" id="Material" v-model="formModel.laminate" required />
              </div>
              <div>
                <label for="number">Foil:</label>
                <input type="text" id="Material" v-model="formModel.foil" required />
              </div>
            </div>
          </div>
        </div>
        <div class="group-container">
          <div>
            <h2>Order Info:</h2>
            <div class="form-group">
              <div>
                <button @click="toggleSearchSalesPerson" form="costingnumber">Sales Person</button>
                <input type="text" id="Material" v-model="formModel.salesPerson" required />
              </div>
              <div>
                <button @click="toggleSearchCustomer" form="costingnumber">Customers</button>
                <input type="text" id="Material" v-model="formModel.customerName" required />
              </div>
            </div>
            <div class="form-group">
              <div>
                <label for="number">Order Number:</label>
                <input type="text" id="process" v-model="this.formModel.orderNumber" required />
              </div>
              <div>
                <label for="number">Required Delivery Date:</label>
                <input
                    id="dateInput"
                    type="date"
                    v-model="formModel.deliveryDate"
                />
              </div>
            </div>
            <div class="form-group">
              <div>
                <label for="number">Quantity Per Roll:</label>
                <input type="text" id="Material" v-model="formModel.quantityPerRoll" required />
              </div>
              <div>
                <label for="printing-type">Roll Direction:</label>
                <select id="printing-type" v-model="this.formModel.direction" required>
                  <option value="ROA">ROA</option>
                  <option value="ROB">ROB</option>
                  <option value="ROC">ROC</option>
                  <option value="ROD">ROD</option>

                </select>
              </div>
            </div>
            <div class="form-group">
              <div>
                <label for="number">Unit Cost (RM/PCS):</label>
                <input type="text" id="Material" v-model="formModel.unitCost" required />
              </div>
              <div>
                <label for="number">Selling Price (RM/PCS):</label>
                <input type="text" id="Material" v-model="formModel.sellingPrice" required />
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
  <div class="success-modal" v-if="searchCosting">
    <div class="table-container">
      <h2>Costing List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="searchCostingQuery"
            @input="filterCosting"
            placeholder="Search by Label Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Costing Number</th>
          <th>Label name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="costing in filteredCosting" :key="costing.id">
          <td>{{ costing.id }}</td>
          <td>{{ costing.labelname }}</td>
          <td>
            <button @click="pickCosting(costing)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click=closeSearchCosting>Close</button>
  </div>
  <div class="success-modal" v-if="searchColor">
    <div class="table-container">
      <h2>Costing List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="colorSearchQuery"
            placeholder="Search by Pantone Code"
        />
        <input type="text" id="Width" v-model="formModel.colorCode" required readonly />
      </div>
      <table>
        <thead>
        <tr>
          <th>Action</th>
          <th>Id</th>
          <th>Color Name</th>
          <th>Color</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="color in filterColor" :key="color.id">
          <td>
            <button @click="pickColor(color)">Use</button>
          </td>
          <td>{{ color.id }}</td>
          <td>{{ color.colorname }}</td>
          <td>
            <div :style="{ backgroundColor: '#' + color.hexcode, width: '30px', height: '30px' }"></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click=toggleSearchColor>Close</button>
  </div>
  <div class="success-modal" v-if="searchCustomer">
    <div class="table-container">
      <h2>Customer List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="customerSearchQuery"
            placeholder="Search by Customer Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="customers in filterCustomers" :key="customers.id">
          <td>{{ customers.id }}</td>
          <td>{{ customers.customername }}</td>
          <td>
            <button @click="pickCustomer(customers)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click=toggleSearchCustomer>Close</button>
  </div>
  <div class="success-modal" v-if="searchSalesPerson">
    <div class="table-container">
      <h2>Customer List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="salesPersonSearchQuery"
            placeholder="Search by Sales Person Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Sales Person ID</th>
          <th>Sales Person Name</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="salesperson in filterSalesPerson" :key="salesperson.id">
          <td>{{ salesperson.id }}</td>
          <td>{{ salesperson.salespersonname }}</td>
          <td>
            <button @click="pickSalesPerson(salesperson)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click=toggleSearchSalesPerson>Close</button>
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
    return {
      jobsheetId:'',
      selectJobsheet:'',
      jobsheetInfo:[],
      searchJobsheetQuery:'',
      searchJobsheet:false,
      previousJobsheetId:'',
      newJobsheetId:'',
      combinedColorCode:'',
      colorSearchQuery: '',
      searchColor:false,
      color:[],
      machineType:'',
      sellingPrice:'',
      selectCosting: false,
      searchDieCut: false,
      machineInfo:[],
      machineSpec:{
        coatingWeight:'',
        trim:'',
        jointWastage:'',
        rollLength: '',
        settingLength:'',
        wastage:'',
        gearPitch:'',
        platePrice:'',
        gapAcross:'',
      },
      columnsPerRow: 4,
      selectedProcessWastage:[],
      selectedProcessCost:[],
      selectedProcesses: [], // Array to store the selected process IDs
      processQuantities: {}, // Object to store quantities for each process ID
      searchCosting: false,
      costingInfo:[],
      searchCostingQuery: '',
      newCostingId:'',
      successRegisterLabel: false,
      successMessageLabel:'',
      searchMastercardQuery:'',
      searchMastercard:false,
      searchInk:false,
      searchInkQuery:'',
      ink:[],
      searchVarnish:false,
      searchVarnishQuery:'',
      Varnish:[],
      facestock:[],
      facestockSearchQuery:'',
      searchFacestock: false,
      laminate:[],
      laminateSearchQuery:'',
      searchLaminate: false,
      foil:[],
      foilSearchQuery:'',
      searchFoil: false,
      isCosting: true,
      username: null,
      currentTime: null,
      formModel:{
        unitCost:'',
        sellingPrice:'',
        orderNumber:'',
        salesPerson:'',
        customerName:'',
        direction:'',
        deliveryDate:'',
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
      moreFinishing : false,
      selectedFinishing:[],
      isFinishing: false,
      finishing:{
        Varnish:1,
        Diecut: 1,
        laminate: 0,
        Backprint:0,
        Killglue: 0,
        hotStamp:0,
        coldFoil:0,
        silkScreen:0,
        backCut:0,
        multiForm:0,
        sheetForm:0,
        perforated:0,
      },
      searchFixedCostQuery:'',
      searchFixedCost:false,
      fixedCost:[],
      isMoreProcess: false,
      selectedProcess:[],
      isPrintingProcess: false,
      printingProcess:{
        ECS340: 1,
        AVTInspection: 1,
        AutoCut: 0,
        numberingMachine:0,
        kopack13: 0,
        sonata:0,
        iwasaki:0,
        gallus4:0,
        bagMaking:0,
        gravureSlitting:0,
        gravurePrinting:0,
        lamination:0,
        utecoPrinting:0,
        utecoSlitting:0,
        packing:1,
        EM280:0,
        rhyguan:0,
        digital:0,
        k1Printing:0,
        k1Slitting:0,


      },
      customerSearchQuery:'',
      customers:[],
      searchCustomer: false,
      salesPerson:[],
      salesPersonSearchQuery:'',
      searchSalesPerson: false,
    };
  },

  computed: {

    filterSalesPerson(){
      if (this.salesPersonSearchQuery === '') {
        return this.salesPerson;
      } else {
        const query = this.salesPersonSearchQuery.toLowerCase();
        return this.salesPerson.filter(salesperson => {
          return salesperson.salespersonname.toLowerCase().includes(query);
        });
      }
    },


    filterCustomers(){
      if (this.customerSearchQuery === '') {
        return this.customers;
      } else {
        const query = this.customerSearchQuery.toLowerCase();
        return this.customers.filter(customers => {
          return customers.customername.toLowerCase().includes(query);
        });
      }
    },

    filterColor() {
      if (this.colorSearchQuery === '') {
        return this.color;
      } else {
        const query = this.colorSearchQuery.toLowerCase();
        return this.color.filter(color => {
          return color.colorname.toLowerCase().includes(query);
        });
      }
    },


    splitProcessWastage(){
      let data = this.selectedProcess;
      const splitData = data.split(',');

      const splitData1 = [];

      for (let i = 2; i < splitData.length; i+=3) {
        splitData1.push(splitData[i]);
      }
      return splitData1;
    },

    splitProcessCost(){
      let data = this.selectedProcess;
      const splitData = data.split(',');

      const splitData1 = [];

      for (let i = 1; i < splitData.length; i+=3) {
        splitData1.push(splitData[i]);
      }
      return splitData1;
    },

    splitProcess(){
      let data = this.selectedProcess;
      const splitData = data.split(',');

      const splitData1 = [];

      for (let i = 0; i < splitData.length; i+=3) {
        splitData1.push(splitData[i]);
      }
      return splitData1;
    },


    compileProcess() {
      let data = [];
      for (let i = 0; i < this.selectedProcesses.length; i++) {
        let compile = `${this.selectedProcesses[i]},${this.selectedProcessCost[i]},${this.selectedProcessWastage[i]}`;
        data.push(compile);
      }
      return data.join(',');
    },

    tableData() {
      const dataCopy = [...this.filterFixedCost];
      const tableData = [];
      while (dataCopy.length > 0) {
        const row = [];
        for (let j = 0; j < this.columnsPerRow; j++) {
          const item = dataCopy.shift();
          if (item) {
            row.push(item);
          }
        }
        tableData.push(row);
      }
      return tableData;
    },

    nonZeroFinishing() {
      const nonZero = [];
      for (const finishing in this.finishing) {
        if (this.finishing[finishing] > 0) {
          for (let i = 0; i < this.finishing[finishing]; i++) {
            nonZero.push(finishing);
          }
        }
      }
      return nonZero;
    },

    generateGearArray() {
      if (!this.machineSpec || !this.machineSpec.gear) {
        return []; // Return an empty array if machineSpec or gear is undefined
      }

      let gear = this.machineSpec.gear.replace(/\s+/g, '').toLowerCase().split(',');
      let gearArray = [];

      for (let i = 0; i < gear.length; i++) {
        for (let j = 0; j < 10; j++) {
          gearArray.push(gear[i]  * this.machineSpec.gearPitch / j); // Multiply gear by (j + 1) factor
        }
      }

      return gearArray;
    },
    pitch(){
      return parseInt(this.formModel.pitch);
    },
    closestRepeat() {
      let minDifference = Infinity;
      let closestNum = 0;

      for (let i = 0; i < this.generateGearArray.length; i++) {
        const difference = (this.generateGearArray[i] - this.pitch);
        if (difference >= 3.5 && difference < minDifference) {
          minDifference = difference;
          closestNum = this.generateGearArray[i];
        }
      }

      return closestNum;
    },
    gear() {
      if (!this.machineSpec || !this.machineSpec.gear) {
        return []; // Return an empty array if machineSpec or gear is undefined
      }

      const gearArray = this.machineSpec.gear.replace(/\s+/g, '').toLowerCase().split(',');
      const closestIndex = this.generateGearArray.indexOf(this.closestRepeat);

      if (closestIndex !== -1) {
        const gearIndex = Math.floor(closestIndex / 10);
        return gearArray[gearIndex];
      }

      return null;
    },
    around() {
      const closestIndex = this.generateGearArray.indexOf(this.closestRepeat);
      console.log(closestIndex);
      const floorIndex = (parseFloat(closestIndex/10) - Math.floor(closestIndex / 10)).toFixed(1) * 10;
      console.log(floorIndex);
      return ((floorIndex));
    },

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

    filterMastercard() {
      if (this.searchMastercardQuery === '') {
        return this.mastercard;
      } else {
        const query = this.searchMastercardQuery.toLowerCase();
        return this.mastercard.filter(mastercard => {
          return mastercard.labelname.toLowerCase().includes(query);
        });
      }
    },

    filterInk() {
      if (this.searchInkQuery === '') {
        return this.ink;
      } else {
        const query = this.searchInkQuery.toLowerCase();
        return this.ink.filter(ink => {
          return ink.materialname.toLowerCase().includes(query);
        });
      }
    },

    filterVarnish() {
      if (this.searchVarnishQuery === '') {
        return this.varnish;
      } else {
        const query = this.searchVarnishQuery.toLowerCase();
        return this.varnish.filter(varnish => {
          return varnish.materialname.toLowerCase().includes(query);
        });
      }
    },

    filterFixedCost() {
      if (this.searchFixedCostQuery === '') {
        return this.fixedCost;
      } else {
        const query = this.searchFixedCostQuery.toLowerCase();
        return this.fixedCost.filter(fixedcost => {
          return fixedcost.process.toLowerCase().includes(query);
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

    filterFoil() {
      if (this.foilSearchQuery === '') {
        return this.foil;
      } else {
        const query = this.foilSearchQuery.toLowerCase();
        return this.foil.filter(foil => {
          return foil.materialname.toLowerCase().includes(query);
        });
      }
    },

  },

  created() {

    this.fetchCostinginfo()

    this.fetchJobsheet()

    this.setFinishing()

    this.setProcess()

    this.fetchMastercardinfo();

    this.fetchFoil();

    this.fetchLaminate();

    this.fetchFacestock();

    this.fetchInk();

    this.fetchVarnish();

    this.fetchFixedCost();

    this.getMachine();

    this.fetchColor();

    this.fetchCustomer();

    this.fetchSalesPerson();



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
    async fetchSalesPerson() {
      try {
        const response = await axios.get('/api/getsalesperson');
        this.salesPerson = response.data;
        console.log(this.salesPerson);
      } catch (error) {
        console.error('Error fetching salesperson:', error);
      }
    },

    toggleSearchSalesPerson() {
      this.searchSalesPerson = !this.searchSalesPerson;
    },

    pickSalesPerson(salesperson) {
      this.formModel.salesPerson = salesperson.salespersonname;
      this.searchSalesPerson = false;
    },

    async fetchCustomer() {
      try {
        const response = await axios.get('/api/getcustomers');
        this.customers = response.data;
        console.log(this.customers);
      } catch (error) {
        console.error('Error fetching salesperson:', error);
      }
    },

    toggleSearchCustomer() {
      this.searchCustomer = !this.searchCustomer;
    },

    pickCustomer(customers) {
      this.formModel.customerName = customers.customername;
      this.searchCustomer = false;
    },

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




      this.jobsheetId = jobsheet.id;
      this.searchJobsheet = false;
      this.selectedProcesses = this.splitProcess;
      this.machineType = jobsheet.machine;
      this.selectJobsheet =true;
    },

    async registerJobsheet() {
      try {
        let combinedColor = '';
        if (Array.isArray(this.formModel.colorCode) && this.formModel.colorCode.length > 1) {
          combinedColor = this.formModel.colorCode.join(',');
        } else {
          combinedColor = this.formModel.colorCode;
        }
        this.combinedColorCode = combinedColor;
        console.log(this.combinedColorCode);

        const response = await axios.post('/api/registerjobsheet', {
          mastercard: this.formModel.mastercard,
          labelname: this.formModel.labelName,
          material: this.formModel.facestock,
          pitch: this.formModel.pitch,
          width: this.formModel.width,
          color: this.formModel.color,
          across: this.formModel.across,
          around: this.formModel.around,
          gear: this.formModel.gear,
          colorcode: this.combinedColorCode,
          process: this.selectedProcesses.join(' ,'),
          finishing: this.selectedFinishing,
          machine: this.machineType,
          foil: this.formModel.foil,
          foilcost: this.formModel.foilCost,
          materialcost: this.formModel.facestockCost,
          laminate: this.formModel.laminate,
          laminatecost: this.formModel.laminateCost,
          ink: this.formModel.ink,
          inkcost: this.formModel.inkCost,
          varnish: this.formModel.varnish,
          varnishcost: this.formModel.varnishCost,
          diecut :this.formModel.dieCutType,
          quantity :this.formModel.quantityOrder,
          sellingprice:this.formModel.sellingPrice,
          unitcost:this.formModel.unitCost,
          quantityperroll: this.formModel.quantityPerRoll,
          salesperson: this.formModel.salesPerson,
          rolldirection: this.formModel.direction,
          entry_person: this.username,
          customer: this.formModel.customerName,
          deliverydate: this.formModel.deliveryDate,
          ordernumber: this.formModel.orderNumber,
          jobtype: this.formModel.jobType,
          costingid: this.newCostingId,






        });

        if (response.status === 200) {
          this.newJobsheetId = response.data.id;
          this.successRegisterLabel = true;
          this.successMessageLabel = 'label has been successfully updated.';
          console.log('Registration successful');
        } else {
          this.successMessageLabel = 'Label registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },


    pickColor(color) {
      this.selectedColor = "#"+color.hexcode; // Set the selected material
      this.colorName = color.colorname;
      this.colorSearchQuery = '';
      this.formModel.colorCode.push(this.colorName);
      console.log(this.selectedColor);
    },

    async fetchColor() {
      try {
        const response = await axios.get('/api/getcolor');
        this.color = response.data;
        console.log(this.mastercard);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },

    toggleSearchColor() {
      this.searchColor = !this.searchColor;
    },


    clearProcess(){
      this.selectedProcessCost=[];
      this.selectedProcesses=[];
      this.selectedProcessWastage=[];
    },

    addProcess(fixedcost){
      const selectedProcess = fixedcost.process;
      const selectedCost = fixedcost.fixedcostm;
      const selectedWastage = fixedcost.settingwastage;
      this.selectedProcesses.push(selectedProcess);
      this.selectedProcessCost.push(selectedCost);
      this.selectedProcessWastage.push(selectedWastage);


    },

    async fetchFixedCost() {
      try {
        const response = await axios.get('/api/getfixedcost');
        // Filter the costingInfo array to only include items with machine = "ECS"
        this.fixedCost = response.data;

        console.log(this.fixedCost);
      } catch (error) {
        console.error('Error fetching fixedCost:', error);
      }
    },

    pickCosting(costing) {
      this.formModel.mastercard = costing.mastercard; // Set the selected material
      this.formModel.labelName = costing.labelname; // Set the selected material
      this.formModel.facestock = costing.material; // Set the selected material
      this.formModel.width = costing.width; // Set the selected material
      this.formModel.pitch = costing.pitch; // Set the selected material
      this.formModel.color = costing.color; // Set the selected material
      this.formModel.across = costing.across; // Set the selected material
      this.formModel.around = costing.around; // Set the selected material
      this.formModel.gear = costing.gear; // Set the selected material
      this.selectedProcess = costing.process; // Set the selected material
      this.selectedFinishing = costing.finishing; // Set the selected material
      this.formModel.foil = costing.foil; // Set the selected material
      this.formModel.foilCost = costing.foilcost; // Set the selected material
      this.formModel.laminate = costing.laminate; // Set the selected material
      this.formModel.laminateCost = costing.laminatecost; // Set the selected material
      this.formModel.facestockCost = costing.materialcost; // Set the selected material
      this.formModel.ink = costing.ink; // Set the selected material
      this.formModel.inkCost = costing.inkcost; // Set the selected material
      this.formModel.varnish = costing.varnish; // Set the selected material
      this.formModel.varnishCost = costing.varnishcost; // Set the selected material
      this.formModel.dieCutType = costing.diecut;
      this.formModel.unitCost = costing.unitcost;
      this.formModel.quantityOrder = costing.quantity;
      this.formModel.sellingPrice = costing.sellingprice;
      this.newCostingId = costing.id;
      this.searchCosting = false;
      this.selectedProcesses = this.splitProcess;
      this.selectedProcessCost = this.splitProcessCost;
      this.selectedProcessWastage = this.splitProcessWastage;
      this.machineType = costing.machine;
      this.selectCosting =true;
    },

    async fetchCostinginfo() {
      try {
        const response = await axios.get('/api/getcosting');
        const allCostingInfo = response.data;

        // Filter the costingInfo array to only include items with machine = "ECS"
        this.costingInfo = allCostingInfo;

        console.log(this.costingInfo);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },

    closeSearchCosting(){
      this.searchCosting=false;
    },

    openSearchCosting(){
      this.searchCosting=true;
    },

    closeSearchJobsheet(){
      this.searchJobsheet=false;
    },

    openSearchJobsheet(){
      this.searchJobsheet=true;
    },

    async runAsyncFunctions() {
      try {
        await this.registerJobsheet();
        sessionStorage.setItem('costingnumber', this.newCostingId);
        sessionStorage.setItem('machine', this.machineType);
        sessionStorage.setItem('jobsheetnumber', this.newJobsheetId);

        this.$router.push('/jobsheetform');
        console.log('Both functions executed successfully');
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },

    async registerCosting() {
      try {
        let combinedProcess = '';
        let combinedFinishing = '';

        if (Array.isArray(this.selectedFinishing) && this.selectedFinishing.length > 1) {
          combinedFinishing = this.selectedFinishing.join(', ');
        } else {
          combinedFinishing = this.selectedFinishing;
        }
        combinedProcess = this.selectedProcess;

        const response = await axios.post('/api/registercosting', {
          mastercard: this.formModel.mastercard,
          labelname: this.formModel.labelName,
          material: this.formModel.facestock,
          pitch: this.formModel.pitch,
          width: this.formModel.width,
          color: this.formModel.color,
          across: this.formModel.across,
          around: this.formModel.around,
          gear: this.formModel.gear,
          process: combinedProcess,
          finishing: combinedFinishing,
          machine: this.machine,
          foil: this.formModel.foil,
          foilcost: this.formModel.foilCost,
          materialcost: this.formModel.facestockCost,
          laminate: this.formModel.laminate,
          laminatecost: this.formModel.laminateCost,
          ink: this.formModel.ink,
          inkcost: this.formModel.inkCost,
          varnish: this.formModel.varnish,
          varnishcost: this.formModel.varnishCost,
          diecut :this.formModel.dieCutType,
          quantity :this.formModel.quantityOrder,
          sellingprice:this.formModel.sellingPrice,




        });

        if (response.status === 200) {
          this.newCostingId = response.data.id;
          this.successRegisterLabel = true;
          this.successMessageLabel = 'label has been successfully updated.';
          console.log('Registration successful');
        } else {
          this.successMessageLabel = 'Label registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },

    async updateMastercard() {
      try {
        const combinedProcess = this.selectedProcess.join(', ');
        const combinedFinishing = this.selectedFinishing.join(', ');
        const response = await axios.put('/api/updatemastercard', {
          mastercard: this.formModel.mastercard,
          labelname: this.formModel.labelName,
          material: this.formModel.material,
          pitch: this.formModel.width,
          width: this.formModel.pitch,
          color: this.formModel.color,
          across: this.formModel.across,
          around: this.formModel.around,
          gear: this.formModel.gear,
          process: combinedProcess,
          finishing: combinedFinishing,
        });
        if (response.status === 200) {
          this.successRegisterLabel = true;
          this.successMessageLabel = 'label has been successfully updated. ' + 'new costing number: ' + this.newCostingId,
              this.formModel.mastercard=''
          this.formModel.labelName='',
              this.formModel.material='',
              this.formModel.width='',
              this.formModel.pitch='',
              this.formModel.color='',
              this.formModel.across='',
              this.formModel.around='',
              this.formModel.gear='',
              this.selectedProcess='',
              this.selectedFinishing='',
              this.formModel.materialPrice='';


          console.log('Registration successful');
        } else {
          this.successMessageLabel = 'Label registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },

    setFinishing(){
      this.selectedFinishing = this.nonZeroFinishing;
    },

    closeFinishing(){
      this.isFinishing = false;
      this.setFinishing();

    },

    openFinishing(){
      this.isFinishing = true;
    },

    closeMoreProcess(){
      this.isMoreProcess = false;
    },

    showMoreProcess(){
      this.isMoreProcess = true;
    },

    setProcess(){
      this.selectedProcess = this.compileProcess;
    },

    calculateAround(){
      this.formModel.around = this.around;
      this.formModel.gear = this.gear;
    },

    calculateAcross(){
      const labelWidth = this.formModel.width;
      const ecsmaxwidth = this.machineSpec.maxWidth;
      const gap = this.machineSpec.gapAcross;
      this.formModel.across = Math.floor(ecsmaxwidth/(parseInt(labelWidth)+parseInt(gap)));
      return this.formModel.across;
    },

    pickMastercard(selectedMastercard) {
      this.formModel.mastercard = selectedMastercard.mastercard; // Set the selected material
      this.formModel.labelName = selectedMastercard.labelname; // Set the selected material
      this.formModel.material = selectedMastercard.material; // Set the selected material
      this.formModel.width = selectedMastercard.width; // Set the selected material
      this.formModel.pitch = selectedMastercard.pitch; // Set the selected material

      this.searchMastercard = false;
    },

    async fetchMastercardinfo() {
      try {
        const response = await axios.get('/api/getmastercard');
        this.mastercard = response.data;
        console.log(this.mastercard);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },

    closePrintingProcess(){
      this.setProcess();
      this.searchFixedCost=false;
    },

    closeSearchMastercard(){
      this.searchMastercard=false;
    },

    openSearchMastercard(){
      this.searchMastercard=true;
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

    pickLaminate(laminate) {
      this.formModel.laminateCost = laminate.materialprice; // Set the selected material
      this.formModel.laminate = laminate.materialname;
      this.searchLaminate = false;
      this.laminateSearchQuery = '';
    },

    async fetchLaminate() {
      try {
        const response = await axios.get('/api/getlaminate');
        this.laminate = response.data;
        console.log(this.laminate);
      } catch (error) {
        console.error('Error fetching laminate:', error);
      }
    },

    pickFoil(foil) {
      this.formModel.foilCost = foil.materialprice; // Set the selected material
      this.formModel.foil = foil.materialname;
      this.searchFoil = false;
      this.foilSearchQuery = '';
    },

    async fetchFoil() {
      try {
        const response = await axios.get('/api/getfoil');
        this.foil = response.data;
        console.log(this.foil);
      } catch (error) {
        console.error('Error fetching foil:', error);
      }
    },

    pickInk(ink) {
      this.formModel.inkCost = ink.materialprice; // Set the selected material
      this.formModel.ink = ink.materialname;
      this.searchInk = false;
      this.searchInkQuery = '';
    },

    async fetchInk() {
      try {
        const response = await axios.get('/api/getink');
        this.ink = response.data;
        console.log(this.ink);
      } catch (error) {
        console.error('Error fetching ink:', error);
      }
    },

    pickVarnish(varnish) {
      this.formModel.varnishCost = varnish.materialprice; // Set the selected material
      this.formModel.varnish = varnish.materialname;
      this.searchVarnish = false;
      this.searchVarnishQuery = '';
    },

    async fetchVarnish() {
      try {
        const response = await axios.get('/api/getvarnish');
        this.varnish = response.data;
        console.log(this.varnish);
      } catch (error) {
        console.error('Error fetching laminate:', error);
      }
    },

    closeNewCosting(){
      this.isCosting = false;
    },

    async getMachine() {
      try {
        const response = await axios.get('/api/getmachine', {
          params: {
            machinename: 'ECS340'// Pass the costing ID as a query parameter
          }
        });

        const allMachineInfo = response.data;
        this.machineInfo = response.data;

        // fuck chat gpt for fucking me real good here
        this.machineSpec.coatingWeight = allMachineInfo[0].coatingweight; // Set the selected material
        this.machineSpec.trim = allMachineInfo[0].trim; // Set the selected material
        this.machineSpec.jointWastage = allMachineInfo[0].jointwastage; // Set the selected material
        this.machineSpec.rollLength = allMachineInfo[0].rolllength; // Set the selected material
        this.machineSpec.settingLength = allMachineInfo[0].settinglength; // Set the selected material
        this.machineSpec.wastage = allMachineInfo[0].wastage; // Set the selected material
        this.machineSpec.gearPitch = allMachineInfo[0].gearpitch; // Set the selected material
        this.machineSpec.platePrice = allMachineInfo[0].plateprice; // Set the selected material
        this.machineSpec.gapAcross = allMachineInfo[0].acrossgap; // Set the selected material
        this.machineSpec.gear = allMachineInfo[0].gear; // Set the selected material
        this.machineSpec.maxWidth = allMachineInfo[0].maxwidth;


        console.log(this.machineSpec);
      } catch (error) {
        console.error('Error fetching machine:', error);
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

select{
  width: 100%;
  height: 35px;
  margin-left: 5px;
}

</style>
