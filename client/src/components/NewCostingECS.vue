<template>
  <h2>ECS Label Specification</h2>
  <div class="form-container">
    <div class="form-group">
      <button @click="openSearchMastercard" for="Mastercard">Mastercard:</button>
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
      <button @click="showPrintingProcess" for="Process">Process:</button>
      <input type="text" id="process" v-model="printingProcess" required />
    </div>
    <div class="form-group">
      <button for="finishing">Finishing:</button>
      <input type="text" id="finishing" v-model="finishing" required />
    </div>
  </div>
  <div class="form-container">
    <div class="form-group">
    </div>
    <div class="form-group">
    <button @click="closeNewCosting">next</button>
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
      finishing:{
        isVarnish:false,
        isDiecut: true,
        isColdfoil: false,
        isLaminate: false,
        isBackprint:false,
        isKillglue: false,

      },
      printingProcess:{
        ECS340: '',
        AVTInspection: '',
        AutoCut: '',
        numberingMachine:'',
        kopack13: '',
        sonata:'',
        iwasaki:'',
        gallus4:'',
        bagMaking:'',
        gravureSlitting:'',
        gravurePrinting:'',
        lamination:'',
        utecoPrinting:'',
        utecoSlitting:'',
        packing:'',
        EM280:'',
        rhyguan:'',
        digital:'',


      },
    };
  },

  computed: {

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
      this.formModel.masterCard = selectedMastercard.mastercard; // Set the selected material
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
        const response = await axios.get('/api/getmaterials');
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
