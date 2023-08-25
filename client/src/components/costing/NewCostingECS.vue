<template>
  <div class="dashboard">
  <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
  <h2>ECS Label Specification<button @click="openSearchCosting" form="costingnumber">Search Costing</button>
  </h2>
  <div class="form">
    <div class="group-container">
      <div>
        <h2>Label:</h2>
        <div class="form-group">
          <div>
            <button @click="openSearchMastercard" form="Mastercard">Mastercard:</button>
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
          <div>
            <label for="number">Label No of Color:</label>
            <input type="number" id="Color" v-model="formModel.color" required />
          </div>
        </div>
      </div>
    </div>
    <div class="group-container">
      <div>
        <h2>Label Arrangement:</h2>
        <div class="form-group">
          <button @click="calculateAcross" >Label Across:</button>
          <input type="number" id="across" v-model="formModel.across" required />
        </div>
        <div class="form-group">
          <button @click="calculateAround" >Label Around:</button>
          <input type="number" id="around" v-model="formModel.around" required />
          <label for="Gear">Gear:</label>
          <input type="text" id="gear" v-model="formModel.gear" required />
        </div>
      </div>
    </div>
    <div class="group-container">
      <div>
        <h2>Material:</h2>
        <div class="form-group">
          <div>
            <button @click="searchInk=true">Ink:</button>
            <input type="text" id="Material" v-model="formModel.ink" required />
          </div>
          <div>
            <button @click="searchVarnish=true">Varnish:</button>
            <input type="text" id="Material" v-model="formModel.varnish" required />
          </div>
          <div>
            <button @click="searchFacestock=true">Facestock:</button>
            <input type="text" id="Material" v-model="formModel.facestock" required />
          </div>
          <div>
            <button @click="searchLaminate=true">Laminate:</button>
            <input type="text" id="Material" v-model="formModel.laminate" required />
          </div>
          <div>
            <button @click="searchFoil=true">Foil:</button>
            <input type="text" id="Material" v-model="formModel.foil" required />
          </div>
        </div>
        <div class="form-group">
          <div>
            <label for="number">Price:</label>
            <input type="text" id="materialprice" v-model="formModel.inkCost" required />
          </div>
          <div>
            <label for="number">Price:</label>
            <input type="text" id="materialprice" v-model="formModel.varnishCost" required />
          </div>
          <div>
            <label for="number">Price:</label>
            <input type="text" id="materialprice" v-model="formModel.facestockCost" required />
          </div>
          <div>
            <label for="number">Price:</label>
            <input type="text" id="materialprice" v-model="formModel.laminateCost" required />
          </div>
          <div>
            <label for="number">Price:</label>
            <input type="text" id="materialprice" v-model="formModel.foilCost" required />
          </div>

        </div>

      </div>
    </div>
    <div class="group-container">
      <h2>Process and Finishing:</h2>
      <div class="form-group">
        <div>
            <button @click="openFinishing">Finishing:</button>
            <input type="text" id="finishing" v-model="selectedFinishing" required />
          </div>
          <div>
            <button @click="searchFixedCost=true">Process:</button>
            <input type="text" id="process" v-model="this.selectedProcesses" required />
          </div>

        </div>
      <div class = "form-group">
        <div>
          <button @click="searchDieCut=true">Diecut Type:</button>
          <input type="text" id="process" v-model="this.formModel.dieCutType" required />
        </div>
        <div>
          <label for="number">Quantity Order (pcs):</label>
          <input type="text" id="process" placeholder="Key in quantity to quote (use ; for multiple moq)" v-model="this.formModel.quantityOrder" required />
        </div>
      </div>
    </div>
  </div>

  </div>
  <button @click="runAsyncFunctions" id="registercosting">Next</button>
  <div class="success-modal" v-if="searchVarnish">
    <div class="table-container">
      <h2>Varnish List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="varnishSearchQuery"
            placeholder="Search by varnish Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Varnish Name</th>
          <th>Machine</th>
          <th>Material Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="varnish in filterVarnish" :key="varnish.materialid">
          <td>{{ varnish.materialname }}</td>
          <td>{{ varnish.materialsupplier }}</td>
          <td>{{ varnish.materialprice }}</td>
          <td>
            <button @click="pickVarnish(varnish)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click="searchVarnish=false">Close</button>
  </div>
  <div class="success-modal" v-if="searchInk">
    <div class="table-container">
      <h2>Ink List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="inkSearchQuery"
            placeholder="Search by Ink Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Ink Name</th>
          <th>Machine</th>
          <th>Material Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="ink in filterInk" :key="ink.materialid">
          <td>{{ ink.materialname }}</td>
          <td>{{ ink.machine }}</td>
          <td>{{ ink.materialprice }}</td>
          <td>
            <button @click="pickInk(ink)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click="searchInk=false">Close</button>
  </div>
  <div class="success-modal" v-if="searchLaminate">
    <div class="table-container">
      <h2>Laminate List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="laminateSearchQuery"
            placeholder="Search by laminate Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Laminate Name</th>
          <th>Supplier</th>
          <th>Material Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="laminate in filterLaminate" :key="laminate.materialid">
          <td>{{ laminate.materialname }}</td>
          <td>{{ laminate.materialsupplier }}</td>
          <td>{{ laminate.materialprice }}</td>
          <td>
            <button @click="pickLaminate(laminate)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click="searchLaminate=false">Close</button>
  </div>
  <div class="success-modal" v-if="searchFacestock">
    <div class="table-container">
      <h2>Material List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="facestockSearchQuery"
            placeholder="Search by facestock Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Facestock Name</th>
          <th>Supplier</th>
          <th>Material Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="facestock in filterFacestock" :key="facestock.materialid">
          <td>{{ facestock.materialname }}</td>
          <td>{{ facestock.materialsupplier }}</td>
          <td>{{ facestock.materialprice }}</td>
          <td>
            <button @click="pickFacestock(facestock)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click="searchFacestock=false">Close</button>
  </div>
  <div class="success-modal" v-if="searchFoil">
    <div class="table-container">
      <h2>Foil List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="foilSearchQuery"
            placeholder="Search by Foil Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Foil Name</th>
          <th>Supplier</th>
          <th>Material Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="foil in filterFoil" :key="foil.materialid">
          <td>{{ foil.materialname }}</td>
          <td>{{ foil.materialsupplier }}</td>
          <td>{{ foil.materialprice }}</td>
          <td>
            <button @click="pickFoil(foil)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click="searchFoil=false">Close</button>
  </div>
  <div class="success-modal" v-if="searchFixedCost">
    <div class="table-container">
      <h2>Process List</h2>
      <input type="text" id="process" v-model="this.selectedProcesses" required />
      <button @click="clearProcess()">Clear</button>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="searchFixedCostQuery"
            placeholder="Search by Process Name"

        />
      </div>
      <table>
        <tbody>
        <tr v-for="row in tableData" :key="row[0].id">
          <td v-for="cell in row" :key="cell.id">
            <div>{{ cell.id }} - {{ cell.process }}</div>
            <div><button @click="addProcess(cell)">Add</button></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click="closePrintingProcess">Done</button>
  </div>
  <div class="success-modal" v-if="searchMastercard">
    <div class="table-container">
      <h2>Mastercard List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="searchMastercardQuery"
            @input="filtermastercard"
            placeholder="Search by Label Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Mastercard Number</th>
          <th>Label name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="mastercard in filterMastercard" :key="mastercard.id">
          <td>{{ mastercard.mastercard }}</td>
          <td>{{ mastercard.labelname }}</td>
          <td>
            <button @click="pickMastercard(mastercard)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click=closeSearchMastercard>Close</button>
  </div>
  <div class="success-modal" v-if="isFinishing">
    <div class="dashboard">
      <h1>Finishing<button @click="moreFinishing=true">More Finishing</button>
      </h1>
      <div class="form-group">
        <label for="">Diecut</label>
        <input type="number" class="form-control" v-model="finishing.Diecut" />
        <label for="">Varnish</label>
        <input type="number" class="form-control" v-model="finishing.Varnish" />
        <label for="">Laminate</label>
        <input type="number" class="form-control" v-model="finishing.laminate" />
      </div>
      <div class="form-group">
        <label for="">Killglue</label>
        <input type="number" class="form-control" v-model="finishing.Killglue" />
        <label for="">Sheet Form</label>
        <input type="number" class="form-control" v-model="finishing.sheetForm" />
        <label for="">Cold Foil</label>
        <input type="number" class="form-control" v-model="finishing.coldFoil" />
      </div>
      <div class="form-group">
        <label for="">Hot Stamping</label>
        <input type="number" class="form-control" v-model="finishing.hotStamp" />
        <label for="">Silkscreen</label>
        <input type="number" class="form-control" v-model="finishing.silkScreen" />
        <label for="">BackCut</label>
        <input type="number" class="form-control" v-model="finishing.backCut" />
      </div>
      <button @click=closeFinishing>Close</button>
    </div>
  </div>
  <div class="success-modal" v-if="moreFinishing">
    <button @click="moreFinishing=false">Close</button>
    <div class="form-group">
      <label for="">Multi Form</label>
      <input type="number" class="form-control" v-model="finishing.multiForm" />
      <label for="">Backprint</label>
      <input type="number" class="form-control" v-model="finishing.Backprint" />
      <label for="">Perforated</label>
      <input type="number" class="form-control" v-model="finishing.perforated" />
    </div>

  </div>
  <div class="success-modal" v-if="successRegisterLabel">
    <div class="table-container">
      <div class="success-content">
        <p>{{ successMessageLabel }}</p>
        <button @click="this.successRegisterLabel=false">Close</button>
        <button @click="this.$router.push('/ecscalculator');">Create Quoataion</button>
      </div>
    </div>
  </div>
  <div class="success-modal" v-if="searchDieCut">
    <div class = "form-group">
      <label for="printing-type">Diecut:</label>
      <select id="printing-type" v-model="this.formModel.dieCutType" required>
        <option value="solid">Solid</option>
        <option value="flexible">Flexible</option>
        <option value="flatbed">Flatbed</option>
      </select>
    </div>
    <button @click="searchDieCut=false">Close</button>
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
      selectedProcessCost:[],
      selectedProcesses: [], // Array to store the selected process IDs
      processQuantities: {}, // Object to store quantities for each process ID
      searchCosting: false,
      costingInfo:[],
      searchCostingQuery: '',
      newCostingId:'',
      machine: 'ECS340',
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
        dieCutType:'flexible',
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
    };
  },

  computed: {

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

    compileProcess() {
      let data = [];
      for (let i = 0; i < this.selectedProcesses.length; i++) {
        let compile = `${this.selectedProcesses[i]},${this.selectedProcessCost[i]}`;
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

    nonZeroProcesses() {
      const nonZero = [];
      for (const process in this.printingProcess) {
        if (this.printingProcess[process] > 0) {
          for (let i = 0; i < this.printingProcess[process]; i++) {
            nonZero.push(process);
          }
        }
      }
      return nonZero;
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

    clearProcess(){
      this.selectedProcessCost=[];
      this.selectedProcesses=[];
    },

    addProcess(fixedcost){
      const selectedProcess = fixedcost.process;
      const selectedCost = fixedcost.fixedcostm;
      this.selectedProcesses.push(selectedProcess);
      this.selectedProcessCost.push(selectedCost);

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
      this.formModel.quantityOrder = costing.quantity;
      this.newCostingId = costing.id;
      this.searchCosting = false;
    },

    async fetchCostinginfo() {
      try {
        const response = await axios.get('/api/getcosting');
        const allCostingInfo = response.data;

        // Filter the costingInfo array to only include items with machine = "ECS"
        this.costingInfo = allCostingInfo.filter(costing => costing.machine === 'ECS340');

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

    async runAsyncFunctions() {
      try {
        sessionStorage.setItem('mastercard', this.formModel.mastercard);
        sessionStorage.setItem('labelname', this.formModel.labelName);
        sessionStorage.setItem('pitch', this.formModel.pitch);
        sessionStorage.setItem('width', this.formModel.width);
        sessionStorage.setItem('material', this.formModel.material);
        sessionStorage.setItem('color', this.formModel.color);
        sessionStorage.setItem('across', this.formModel.across);
        sessionStorage.setItem('around', this.formModel.around);
        sessionStorage.setItem('gear', this.formModel.gear);
        sessionStorage.setItem('process', this.selectedProcess);
        sessionStorage.setItem('finishing', this.selectedFinishing);
        sessionStorage.setItem('machine', this.machine);
        await this.registerCosting();
        sessionStorage.setItem('costingnumber', this.newCostingId);
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
      const ecsmaxwidth = 310;
      const gap = 3;
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
