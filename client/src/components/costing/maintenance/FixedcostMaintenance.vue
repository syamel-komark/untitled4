<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Fixed Cost Maintenance</h2>
    <div class="table-container">
      <h2>Fixed Cost List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="fixedcostSearchQuery"
            placeholder="Search by Process Name"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Process id</th>
          <th>Process Name</th>
          <th>Speed</th>
          <th>Cost Allocation</th>
          <th>Current Utilization</th>
          <th>Ratio</th>
          <th>Fixed Cost/month</th>
          <th>Fixed Cost/day</th>
          <th>Fixed Cost/m</th>
          <th>Action</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="fixedcost in filterProcess" :key="fixedcost.id">
          <td>{{ fixedcost.id }}</td>
          <td>{{ fixedcost.process }}</td>
          <td>{{ fixedcost.speed }}</td>
          <td>{{ fixedcost.costallocation }}</td>
          <td>{{ fixedcost.currentutilization }}</td>
          <td>{{ fixedcost.ratio }}</td>
          <td>{{ fixedcost.fixedcostmonth }}</td>
          <td>{{ fixedcost.fixedcostday }}</td>
          <td>{{ fixedcost.fixedcostm }}</td>
          <td>
            <button @click="pickFixedCost(fixedcost)">Use</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="searchmaterial-menu">
      <div class="form-group">
        <div>
          <label for="labelName">Process ID:</label>
          <input type="text" id="labelName" v-model="formModel.id" required readonly/>
        </div>
        <div>
          <label for="labelName">Process Name:</label>
          <input type="text" id="labelName" v-model="formModel.process" required />
        </div>
        <div>
          <label for="labelName">Machine Speed:</label>
          <input type="text" id="labelName" v-model="formModel.speed" required />
        </div>

      </div>
      <div class="form-group">
        <div>
          <label for="labelName">Cost Allocation:</label>
          <input type="text" id="labelName" v-model="formModel.costallocation" required />
        </div>
        <div>
          <label for="labelName">Current Utilization:</label>
          <input type="text" id="labelName" v-model="formModel.currentutilization" required />
        </div>
        <div>
          <label for="labelName">Ratio:</label>
          <input type="text" id="labelName" v-model="formModel.ratio" required />
        </div>

      </div>
      <div class="form-group">
        <div>
          <label for="labelName">Fixed Cost Per Month:</label>
          <input type="text" id="labelName" v-model="formModel.fixedcostmonth" required />
        </div>
        <div>
          <label for="labelName">Fixed Cost Per Day:</label>
          <input type="text" id="labelName" v-model="formModel.fixedcostday" required />
        </div>
        <div>
          <label for="labelName">Fixed Cost Per Meter:</label>
          <input type="text" id="labelName" v-model="formModel.fixedcostm" required />
        </div>
      </div>
      </div>
    <div>
      <button @click="deleteFixedCost">Delete</button>
      <button @click="clearField">Clear</button>
      <button @click="updateFixedCost">Update</button>
      <button @click="registerFixedCost">Register</button>
    </div>
    <div>
      <button @click="$router.push('/fixedcostcalculate')">Recalculate</button>
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
//import axios from "axios";
import HeaderBar from "@/components/AppHeader.vue";
import axios from "axios";
export default {

  components: {
    HeaderBar,
  },

  computed:{

    filterProcess(){
      if (this.fixedcostSearchQuery === '') {
        return this.fixedcost;
      } else {
        const query = this.fixedcostSearchQuery;
        return this.fixedcost.filter(fixedcost => {
          return fixedcost.process.toLowerCase().includes(query);
        });
      }
    },


  },

  data() {
    return {
      successMessageLabel:'',
      success:false,
      formModel:{
        id:'',
        process:'',
        speed:'',
        costallocation:'',
        currentutilization: '',
        ratio: '',
        fixedcostmonth: '',
        fixedcostday: '',
        fixedcostm: '',
      },
      fixedcostSearchQuery:'',
      fixedcost:[],
      username: null,
      currentTime: null,
    };
  },


  created() {

    this.fetchFixedCost();


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

    async deleteFixedCost() {
      try {
        const response = await axios.delete('/api/deletefixedcost', {
          data: {
            id: this.formModel.id,
          },
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'fixedcost delete success.';
          console.log('Deletion successful');  // Corrected log statement
          // Update the materials list after deletion
          await this.fetchFixedcost();
        } else {
          this.success = true;
          this.successMessageLabel = 'fixedcost deletion failed.';
          console.error('Deletion failed');    // Corrected log statement
        }
      } catch (error) {
        console.error('Error deleting fixedcost:', error);
      }
    },

    async updateFixedCost() {
      try {
        const response = await axios.put('/api/updatefixedcost', {
          process: this.formModel.process,
          speed:this.formModel.speed,
          costallocation: this.formModel.costallocation,
          currentutilization: this.formModel.currentutilization,
          ratio: this.formModel.ratio,
          fixedcostmonth: this.formModel.fixedcostmonth,
          fixedcostday: this.formModel.fixedcostday,
          fixedcostm: this.formModel.fixedcostm,
          id:this.formModel.id,
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'fixedcost has been successfully updated.';
          console.log('update successful');
        } else {
          this.success = true;
          this.successMessageLabel = 'fixedcost update failed.';
          console.error('update failed');
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    },

    async registerFixedCost() {
      try {
        const response = await axios.post('/api/registerfixedcost', {
          process: this.formModel.process,
          speed:this.formModel.speed,
          costallocation: this.formModel.costallocation,
          currentutilization: this.formModel.currentutilization,
          ratio: this.formModel.ratio,
          fixedcostmonth: this.formModel.fixedcostmonth,
          fixedcostday: this.formModel.fixedcostday,
          fixedcostm: this.formModel.fixedcostm,
        });
        if (response.status === 200) {
          this.success = true;
          this.successMessageLabel = 'fixedcost has been successfully registered.';
          console.log('Registration successful');
          await this.fetchFacestock;

        } else {
          this.success = true;
          this.successMessageLabel = 'fixedcost registration failed.';
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },

    clearField(){
      this.formModel.id = '';
      this.formModel.speed= '';
      this.formModel.process = '';
      this.formModel.costallocation = '';
      this.formModel.currentutilization = '';
      this.formModel.ratio = '';
      this.formModel.fixedcostmonth = '';
      this.formModel.fixedcostday = '';
      this.formModel.fixedcostm = '';
    },

    pickFixedCost(fixedcost) {
      this.formModel.id = fixedcost.id;
      this.formModel.process = fixedcost.process;
      this.formModel.speed = fixedcost.speed;
      this.formModel.costallocation = fixedcost.costallocation;
      this.formModel.currentutilization = fixedcost.currentutilization;
      this.formModel.ratio = fixedcost.ratio;
      this.formModel.fixedcostmonth = fixedcost.fixedcostmonth;
      this.formModel.fixedcostday = fixedcost.fixedcostday;
      this.formModel.fixedcostm = fixedcost.fixedcostm;
    },


    async fetchFixedCost() {
      try {
        const response = await axios.get('/api/getfixedcost');
        this.fixedcost = response.data;
        console.log(this.fixedcost);
      } catch (error) {
        console.error('Error fetching fixedcost:', error);
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
