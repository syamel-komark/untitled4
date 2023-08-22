<template>
  <h2>ECS Label Specification</h2>
  <div class="group-container">
    <div class="form-group">
      <button @click="openSearchMastercard" form="Mastercard">Mastercard:</button>
      <input type="text" id="Mastercard" v-model="formModel.mastercard" required />
    </div>
    <div class="form-group">
      <label for="labelName">Label Name:</label>
      <input type="text" id="labelName" v-model="formModel.labelName" required />
    </div>
    <div class="form-group">
      <label for="Pitch">Label Pitch:</label>
      <input type="text" id="Pitch" v-model="formModel.pitch" required />
    </div>
    <div class="form-group">
      <label for="number">Label Width:</label>
      <input type="text" id="Width" v-model="formModel.width" required />
    </div>
    <div class="form-group">
      <button @click="openSearchMaterial">Material:</button>
      <input type="text" id="Material" v-model="formModel.material" required />
    </div>
    <div class="form-group">
      <label for="number">Label No of Color:</label>
      <input type="number" id="Color" v-model="formModel.color" required />
    </div>
    <div class="form-group">
      <button @click="calculateAcross" >Label Across:</button>
      <input type="number" id="across" v-model="formModel.across" required />
    </div>
    <div class="form-group">
      <button @click="calculateAround" >Label Around:</button>
      <input type="number" id="around" v-model="formModel.around" required /><label for="Gear">Gear:</label><input type="text" id="gear" v-model="formModel.gear" required />
    </div>
    <div class="form-group">
      <button @click="openPrintingProcess">Process:</button>
      <input type="text" id="process" v-model="selectedProcess" required />
    </div>
    <div class="form-group">
      <button @click="openFinishing">Finishing:</button>
      <input type="text" id="finishing" v-model="selectedFinishing" required />
    </div>
  </div>
  <div class="group-container">
    <div class="form-group">
    </div>
    <div class="form-group">
      <button @click="runAsyncFunctions" id="registercosting">Next</button>
  </div>
  </div>
  <div class="success-modal" v-if="searchMaterial">
    <div class="table-container">
      <h2>User List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="materialSearchQuery"
            @input="filterMaterials"
            placeholder="Search by Material Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Material Name</th>
          <th>Supplier</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="material in filteredMaterials" :key="material.materialid">
          <td>{{ material.materialname }}</td>
          <td>{{ material.materialsupplier }}</td>
          <td>
            <button @click="pickMaterial(material)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div><button @click=closeMaterialSearch>Close</button>
  </div>
  <div class="success-modal" v-if="searchMastercard">
    <div class="table-container">
      <h2>Mastercard List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="searchMastercardQuery"
            @input="filtermastercard"
            placeholder="Search by Mastercard Number"
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
  <div class="success-modal" v-if="isPrintingProcess">
    <div class="dashboard">
      <h1>Printing Process</h1>
      <div class="form-group">
        <label for="">ECS340</label>
        <input type="number" class="form-control" v-model="printingProcess.ECS340" />
        <label for="">AVTInspection</label>
        <input type="number" class="form-control" v-model="printingProcess.AVTInspection" />
        <label for="">Packing</label>
        <input type="number" class="form-control" v-model="printingProcess.packing" />
        <label for="">AutoCut</label>
        <input type="number" class="form-control" v-model="printingProcess.AutoCut" />
        </div>
      <button @click=showMoreProcess>More Process</button>
      <div class="success-modal" v-if="isMoreProcess">
        <div class="dashboard">
          <div class="form-group">
        <label for="">numberingMachine</label>
        <input type="number" class="form-control" v-model="printingProcess.numberingMachine" />
        <label for="">kopack13</label>
        <input type="number" class="form-control" v-model="printingProcess.kopack13" />
        <label for="">sonata</label>
        <input type="number" class="form-control" v-model="printingProcess.sonata" />
        <label for="">iwasaki</label>
        <input type="number" class="form-control" v-model="printingProcess.iwasaki" />
        </div>
          <div class="form-group">
        <label for="">gallus4</label>
        <input type="number" class="form-control" v-model="printingProcess.gallus4" />
        <label for="">bagMaking</label>
        <input type="number" class="form-control" v-model="printingProcess.bagMaking" />
        <label for="">gravureSlitting</label>
        <input type="number" class="form-control" v-model="printingProcess.gravureSlitting" />
        <label for="">gravurePrinting</label>
        <input type="number" class="form-control" v-model="printingProcess.gravurePrinting" />
        </div>
          <div class="form-group">
        <label for="">lamination</label>
        <input type="number" class="form-control" v-model="printingProcess.lamination" />
        <label for="">utecoPrinting</label>
        <input type="number" class="form-control" v-model="printingProcess.utecoPrinting" />
        <label for="">utecoSlitting</label>
        <input type="number" class="form-control" v-model="printingProcess.utecoSlitting" />
        <label for="">EM280</label>
        <input type="number" class="form-control" v-model="printingProcess.EM280" />
      </div>
          <div class="form-group">
        <label for="">rhyguan</label>
        <input type="number" class="form-control" v-model="printingProcess.rhyguan" />
        <label for="">digital</label>
        <input type="number" class="form-control" v-model="printingProcess.digital" />
        <label for="">k1slitting</label>
        <input type="number" class="form-control" v-model="printingProcess.k1Slitting" />
        <label for="">k1printing</label>
        <input type="number" class="form-control" v-model="printingProcess.k1Printing" />
      </div>
      </div>
          <button @click=closeMoreProcess>Close More Process</button>
      </div>
    <button @click=closePrintingProcess>Close</button>
    </div>
  </div>
  <div class="success-modal" v-if="isFinishing">
    <div class="dashboard">
      <h1>Finishing</h1>
      <div class="form-group">
        <label for="">Diecut</label>
        <input type="number" class="form-control" v-model="finishing.Diecut" />
        <label for="">Varnish</label>
        <input type="number" class="form-control" v-model="finishing.Varnish" />
        <label for="">Laminate</label>
        <input type="number" class="form-control" v-model="finishing.Laminate" />
        </div>
      <div class="form-group">
      <label for="">Killglue</label>
        <input type="number" class="form-control" v-model="finishing.Killglue" />
        <label for="">Backprint</label>
        <input type="number" class="form-control" v-model="finishing.Backprint" />
      </div>
      <button @click=closeFinishing>Close</button>
    </div>
  </div>
  <div class="success-modal" v-if="successRegisterLabel">
    <div class="table-container">
      <div class="success-content">
        <p>{{ successMessageLabel }}</p>
        <button @click="successRegisterLabel=false">Close</button>
      </div>
    </div>
  </div>




</template>

<script>
//import axios from "axios";
//import HeaderBar from "@/components/AppHeader.vue";
import axios from "axios";

export default {

  components: {
    //HeaderBar,
  },

  data() {
    return {
      gearArray:  [99, 108, 122, 127, 140, 146, 160],
      pitchArray: [
        314.325, 157.1625, 104.775, 78.58125, 62.865, 52.3875, 44.90357143, 39.290625, 34.925, 31.4325,
        342.9, 171.45, 114.3, 85.725, 68.58, 57.15, 48.98571429, 42.8625, 38.1, 34.29,
        387.35, 193.675, 129.1166667, 96.8375, 77.47, 64.55833333, 55.33571429, 48.41875, 43.03888889, 38.735,
        403.225, 201.6125, 134.4083333, 100.80625, 80.645, 67.20416667, 57.60357143, 50.403125, 44.80277778, 40.3225,
        444.5, 222.25, 148.1666667, 111.125, 88.9, 74.08333333, 63.5, 55.5625, 49.38888889, 44.45,
        463.55, 231.775, 154.5166667, 115.8875, 92.71, 77.25833333, 66.22142857, 57.94375, 51.50555556, 46.355,
        508, 254, 169.3333333, 127, 101.6, 84.66666667, 72.57142857, 63.5, 56.44444444, 50.8
      ],
      successRegisterLabel: false,
      successMessageLabel:'',
      searchMastercardQuery:'',
      searchMastercard:false,
      materialPick:[],
      materialSearchQuery:'',
      searchMaterial: false,
      isCosting: true,
      username: null,
      currentTime: null,
      formModel:{
        mastercard: '',
        labelName:'',
        across:'',
        around:'',
        material:'',
        color:'',
        pitch:'',
        width:'',
        gear:'',
      },
      selectedFinishing:[],
      isFinishing: false,
      finishing:{
        Varnish:1,
        Diecut: 1,
        Coldfoil: 0,
        Laminate: 0,
        Backprint:0,
        Killglue: 0,

      },
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

    nonZeroFinishing() {
      return Object.keys(this.finishing).filter(finish => this.finishing[finish] !== 0);
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

      for (let i = 0; i < this.pitchArray.length; i++) {
        const difference = (this.pitchArray[i] - this.pitch);
        if (difference >= 3.5 && difference < minDifference) {
          minDifference = difference;
          closestNum = this.pitchArray[i];
        }
      }

      return closestNum;
    },
    gear() {
      const gearArray = this.gearArray;
      const closestIndex = this.pitchArray.indexOf(this.closestRepeat);

      if (closestIndex !== -1) {
        const gearIndex = Math.floor(closestIndex / 10);
        return gearArray[gearIndex];
      }

      return null;
    },
    around() {
      const closestIndex = this.pitchArray.indexOf(this.closestRepeat);
      console.log(closestIndex);
      const floorIndex = (parseFloat(closestIndex/10) - Math.floor(closestIndex / 10)).toFixed(1) * 10;
      console.log(floorIndex);
      return ((floorIndex)+1);
    },



    filterMastercard() {
      if (this.searchMastercardQuery === '') {
        return this.mastercard;
      } else {
        const query = this.searchMastercardQuery;
        return this.mastercard.filter(mastercard => {
          return mastercard.mastercard.includes(query);
        });
      }
    },

    filteredMaterials() {
      if (this.materialSearchQuery === '') {
        return this.materialPick;
      } else {
        const query = this.materialSearchQuery.toLowerCase();
        return this.materialPick.filter(material => {
          return material.materialname.toLowerCase().includes(query);
        });
      }
    },
  },



  created() {

    this.setFinishing()

    this.setProcess()

    this.fetchMastercardinfo();

    this.fetchMaterials();

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

    async runAsyncFunctions() {
      try {
        await this.registerCosting();
        await this.updateMastercard();
        console.log('Both functions executed successfully');
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },


    async registerCosting() {
      try {
        const combinedProcess = this.selectedProcess.join(', ');
        const combinedFinishing = this.selectedFinishing.join(', ');
        const response = await axios.post('/api/registercosting', {
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
          machine: this.machine,
        });
        if (response.status === 200) {
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
          this.successMessageLabel = 'label has been successfully updated.',
          this.formModel.mastercard='',
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
      this.selectedProcess = this.nonZeroProcesses;
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
      this.isPrintingProcess=false;
    },

    openPrintingProcess(){
      this.isPrintingProcess=true;
    },


    closeSearchMastercard(){
      this.searchMastercard=false;
    },

    openSearchMastercard(){
      this.searchMastercard=true;
    },

    pickMaterial(selectedMaterial) {
      this.formModel.material = selectedMaterial.materialname; // Set the selected material
      this.searchMaterial = false;
    },

    async fetchMaterials() {
      try {
        const response = await axios.get('/api/getfacestock');
        this.materialPick = response.data;
        console.log(this.materialPick);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    },

    closeMaterialSearch(){
      this.searchMaterial=false;
    },

    openSearchMaterial(){
      this.searchMaterial = true;
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

.group-container {
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
