<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Machine Maintenance</h2>
    <div class="table-container">
      <h2>HP Click Cost List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="materialSearchQuery"
            placeholder="Search by Machine Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Action</th>
          <th>Machine id</th>
          <th>Machine Name</th>
          <th>Max Width</th>
          <th>Max Pitch</th>
          <th>Min Width</th>
          <th>Min Pitch</th>
          <th>No Of Station</th>
          <th>Wastage</th>
          <th>Setting Length</th>
          <th>Speed</th>
          <th>Plate Price</th>
          <th>Gear</th>
          <th>Gear Pitch</th>
          <th>Trim width</th>
          <th>Across Gap</th>
          <th>Roll Length</th>
          <th>Joint Wastage</th>
          <th>Coating Weight</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="machine in filterMaterials" :key="machine.idmachine">
          <td>
            <button @click="pickMaterial(machine)">Use</button>
          </td>
          <td>{{ machine.idmachine }}</td>
          <td>{{ machine.machinename }}</td>
          <td>{{ machine.maxwidth }}</td>
          <td>{{ machine.maxpitch }}</td>
          <td>{{ machine.minwidth }}</td>
          <td>{{ machine.minpitch }}</td>
          <td>{{ machine.noofstation }}</td>
          <td>{{ machine.wastage }}</td>
          <td>{{ machine.settinglength }}</td>
          <td>{{ machine.speed }}</td>
          <td>{{ machine.settingtime }}</td>
          <td>{{ machine.plateprice }}</td>
          <td>{{ machine.gear }}</td>
          <td>{{ machine.gearpitch }}</td>
          <td>{{ machine.trim }}</td>
          <td>{{ machine.acrossgap }}</td>
          <td>{{ machine.rolllength }}</td>
          <td>{{ machine.jointwastage }}</td>
          <td>{{ machine.coatingweight }}</td>
        </tr>
        </tbody>
      </table>

    </div>
    <div class="searchmaterial-menu">
      <div>
        <div class="form-group">
          <div>
            <label for="labelName">Machine ID:</label>
            <input type="text" id="labelName" v-model="formModel.idMachine" required readonly/>
          </div>
          <div>
            <label for="labelName">Machine Name:</label>
            <input type="text" id="labelName" v-model="formModel.machineName" required />
          </div>
          <div>
            <label for="labelName">Wastage:</label>
            <input type="text" id="labelName" v-model="formModel.wastage" required />
          </div>
          <div>
            <label for="labelName">Speed (m/min):</label>
            <input type="text" id="labelName" v-model="formModel.speed" required />
          </div>
        </div>
        <div class="form-group">
          <div>
            <label for="labelName">Max Width (mm):</label>
            <input type="text" id="labelName" v-model="formModel.maxWidth" required />
          </div>
          <div>
            <label for="labelName">Max Pitch (mm):</label>
            <input type="text" id="labelName" v-model="formModel.maxPitch" required />
          </div>
          <div>
            <label for="labelName">Min Width (mm):</label>
            <input type="text" id="labelName" v-model="formModel.minWidth" required />
          </div>
          <div>
            <label for="labelName">Min Pitch (mm):</label>
            <input type="text" id="labelName" v-model="formModel.minPitch" required />
          </div>
        </div>
        <div class="form-group">
          <div>
            <label for="labelName">No Of Station:</label>
            <input type="text" id="labelName" v-model="formModel.noOfStation" required />
          </div>
          <div>
            <label for="labelName">Roll Length (m):</label>
            <input type="text" id="labelName" v-model="formModel.rollLength" required />
          </div>
          <div>
            <label for="labelName">Setting Length / Color (m):</label>
            <input type="text" id="labelName" v-model="formModel.settingLength" required />
          </div>
          <div>
            <label for="labelName">Setting Time Per Color:</label>
            <input type="text" id="labelName" v-model="formModel.settingTime" required />
          </div>
        </div>
        <div class="form-group">
          <div>
            <label for="labelName">Plate Price (RM/m2):</label>
            <input type="text" id="labelName" v-model="formModel.platePrice" required />
          </div>
          <div>
            <label for="labelName">Gear:</label>
            <input type="text" id="labelName" v-model="formModel.gear" required />
          </div>
          <div>
            <label for="labelName">Gear Pitch(mm):</label>
            <input type="text" id="labelName" v-model="formModel.gearPitch" required />
          </div>
          <div>
            <label for="labelName">Side Trim width (mm):</label>
            <input type="text" id="labelName" v-model="formModel.trim" required />
          </div>
        </div>
        <div class="form-group">
          <div>
            <label for="labelName">Gap between across (mm):</label>
            <input type="text" id="labelName" v-model="formModel.acrossGap" required />
          </div>
          <div>
            <label for="labelName">Joint Wastage (m):</label>
            <input type="text" id="labelName" v-model="formModel.jointWastage" required />
          </div>
          <div>
            <label for="labelName">Coating weight (g/m2):</label>
            <input type="text" id="labelName" v-model="formModel.coatingWeight" required />
          </div>
          <div>
            <label for="labelName">Hot Stamping Plate Price(RM/m2):</label>
            <input type="text" id="labelName" v-model="formModel.hotStampingPlatePrice" required />
          </div>
        </div>
        <div class="form-group">
          <div>
            <label for="labelName">Silk Screen Plate Price (RM/m2):</label>
            <input type="text" id="labelName" v-model="formModel.silkScreenPlatePrice" required />
          </div>
          <div>
            <label for="labelName">Flexible Diecut Price (RM/m):</label>
            <input type="text" id="labelName" v-model="formModel.flexibleDiecutPrice" required />
          </div>
          <div>
            <label for="labelName">Flatbed Diecut Price (RM/m):</label>
            <input type="text" id="labelName" v-model="formModel.flatbedDiecutPrice" required />
          </div>
          <div>
            <label for="labelName">Solid Diecut Price Price(RM/m):</label>
            <input type="text" id="labelName" v-model="formModel.solidDiecutPrice" required />
          </div>
        </div>

      </div>
      <div>
        <button @click="deleteMaterial">Delete</button>
        <button @click="clearField">Clear</button>
        <button @click="updateMaterial">Update</button>
        <button @click="registerMaterial">Register</button>
      </div>


    </div>

  </div>
  <div class="success-modal" v-if="success">
    <div class="table-container">
      <div class="success-content">
        <p>{{ successMessageLabel }}</p>
        <button @click="success = false">Close</button>
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

  computed:{

    filterMaterials(){
      if (this.materialSearchQuery === '') {
        return this.machine;
      } else {
        const query = this.materialSearchQuery;
        return this.machine.filter(machine => {
          return machine.machinename.toLowerCase().includes(query);
        });
      }
    },


  },

  data() {
    return {
      successMessageLabel:'',
      success:false,
      formModel:{
        idMachine:'',
        machineName:'',
        maxWidth:'',
        maxPitch: '',
        minWidth:'',
        minPitch:'',
        noOfStation:'',
        wastage:'',
        settingLength:'',
        speed:'',
        settingTime:'',
        platePrice:'',
        gear:'',
        gearPitch:'',
        trim:'',
        acrossGap:'',
        rollLength:'',
        jointWastage:'',
        coatingWeight:'',
        solidDiecutPrice:'',
        flexibleDiecutPrice:'',
        flatbedDiecutPrice:'',
        silkScreenPlatePrice:'',
        hotStampingPlatePrice:'',
      },
      materialSearchQuery:'',
      machine:[],
      username: null,
      currentTime: null,
    };
  },


  created() {

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

    async deleteMaterial() {
      try {
        const response = await axios.delete('/api/deletemachine', {
          data: {
            idmachine: this.formModel.idMachine,
          },
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'machine delete success.';
          console.log('Deletion successful');  // Corrected log statement
          // Update the materials list after deletion
          await this.fetchMaterials();
        } else {
          this.success = true;
          this.successMessageLabel = 'machine deletion failed.';
          console.error('Deletion failed');    // Corrected log statement
        }
      } catch (error) {
        console.error('Error deleting machine:', error);
      }
    },

    async updateMaterial() {
      try {
        const response = await axios.put('/api/updatemachine', {
          machinename: this.formModel.machineName,
          maxwidth: this.formModel.maxWidth,
          maxpitch: this.formModel.maxPitch,
          minwidth: this.formModel.minWidth,
          minpitch: this.formModel.minPitch,
          noofstation: this.formModel.noOfStation,
          wastage: this.formModel.wastage,
          settinglength: this.formModel.settingLength,
          speed: this.formModel.speed,
          settingtime: this.formModel.settingTime,
          plateprice: this.formModel.platePrice,
          gear: this.formModel.gear,
          gearpitch: this.formModel.gearPitch,
          trim: this.formModel.trim,
          acrossgap: this.formModel.acrossGap,
          rolllength: this.formModel.rollLength,
          jointwastage: this.formModel.jointWastage,
          coatingweight: this.formModel.coatingWeight,
          hotstampingplateprice: this.formModel.hotStampingPlatePrice,
          silkscreenplateprice: this.formModel.silkScreenPlatePrice,
          flexiblediecutprice: this.formModel.flexibleDiecutPrice,
          flatbeddiecutprice: this.formModel.flatbedDiecutPrice,
          soliddiecutprice: this.formModel.solidDiecutPrice,
          idmachine: this.formModel.idMachine,


        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'machine has been successfully updated.';
          console.log('update successful');
        } else {
          this.success = true;
          this.successMessageLabel = 'machine update failed.';
          console.error('update failed');
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    },

    async registerMaterial() {
      try {
        const response = await axios.post('/api/registermachine', {
          machinename: this.formModel.machineName,
          maxwidth: this.formModel.maxWidth,
          maxpitch: this.formModel.maxPitch,
          minwidth: this.formModel.minWidth,
          minpitch: this.formModel.minPitch,
          noofstation: this.formModel.noOfStation,
          wastage: this.formModel.wastage,
          settinglength: this.formModel.settingLength,
          speed: this.formModel.speed,
          settingtime: this.formModel.settingTime,
          plateprice: this.formModel.platePrice,
          gear: this.formModel.gear,
          gearpitch: this.formModel.gearPitch,
          trim: this.formModel.trim,
          acrossgap: this.formModel.acrossGap,
          rolllength: this.formModel.rollLength,
          jointwastage: this.formModel.jointWastage,
          coatingweight: this.formModel.coatingWeight,
          hotstampingplateprice: this.formModel.hotStampingPlatePrice,
          silkscreenplateprice: this.formModel.silkScreenPlatePrice,
          flexiblediecutprice: this.formModel.flexibleDiecutPrice,
          flatbeddiecutprice: this.formModel.flatbedDiecutPrice,
          soliddiecutprice: this.formModel.solidDiecutPrice,
          idmachine: this.formModel.idMachine,
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'machine has been successfully registered.';
          console.log('Registration successful');
          await this.fetchMaterials;

        } else {
          this.success = true;
          this.successMessageLabel = 'machine registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },

    clearField(){
      this.formModel.idMachine = '';
      this.formModel.machineName = '';
      this.formModel.maxWidth = '';
      this.formModel.maxPitch = '';
      this.formModel.minWidth = '';
      this.formModel.minPitch = '';
      this.formModel.noOfStation = '';
      this.formModel.wastage = '';
      this.formModel.settingLength = '';
      this.formModel.speed = '';
      this.formModel.settingTime = '';
      this.formModel.platePrice='';
      this.formModel.gear='';
      this.formModel.gearPitch='';
      this.formModel.trim='';
      this.formModel.acrossGap='';
      this.formModel.rollLength='';
      this.formModel.jointWastage='';
      this.formModel.coatingWeight='';
      this.formModel.hotStampingPlatePrice='';
      this.formModel.silkScreenPlatePrice='';
      this.formModel.flatbedDiecutPrice='';
      this.formModel.flexibleDiecutPrice='';
      this.formModel.solidDiecutPrice='';
    },

    pickMaterial(machine) {
      this.formModel.idMachine = machine.idmachine;
      this.formModel.machineName = machine.machinename;
      this.formModel.maxWidth = machine.maxwidth;
      this.formModel.maxPitch = machine.maxpitch;
      this.formModel.minWidth = machine.minwidth;
      this.formModel.minPitch = machine.minpitch;
      this.formModel.noOfStation = machine.noofstation;
      this.formModel.wastage = machine.wastage;
      this.formModel.settingLength = machine.settinglength;
      this.formModel.speed = machine.speed;
      this.formModel.settingTime = machine.settingtime;
      this.formModel.platePrice=machine.plateprice;
      this.formModel.gear=machine.gear;
      this.formModel.gearPitch=machine.gearpitch;
      this.formModel.trim=machine.trim;
      this.formModel.acrossGap=machine.acrossgap;
      this.formModel.rollLength=machine.rolllength;
      this.formModel.jointWastage=machine.jointwastage;
      this.formModel.coatingWeight=machine.coatingweight;
      this.formModel.hotStampingPlatePrice=machine.hotstampingplateprice;
      this.formModel.silkScreenPlatePrice=machine.silkscreenplateprice;
      this.formModel.flexibleDiecutPrice=machine.flexiblediecutprice;
      this.formModel.flatbedDiecutPrice=machine.flatbeddiecutprice;
      this.formModel.solidDiecutPrice=machine.soliddiecutprice;


    },


    async fetchMaterials() {
      try {
        const response = await axios.get('/api/getmachine');
        this.machine = response.data;
        console.log(this.machine);
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
}

</script>

<style scoped>

.form-group {
  flex: 0 0 calc(50% - 20px); /* Adjust the width as needed */
  margin-right: 20px;
  margin-bottom: 10px;
  display: inline-grid;
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
