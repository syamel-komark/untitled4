<template>
  <div class="dashboard">
    <h2>Fixed Cost Recalculate</h2>
    <div class="table-container">
      <h2>Fixed Cost List</h2>
      <div class="searchmaterial-menu">
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
        <tr v-for="fixedcost in fixedcost" :key="fixedcost.id">
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
          <label for="labelName">Current Total Fixed Cost / Month:</label>
          <input type="text" id="labelName"  v-model="calculateTotalFixedCost" required />
        </div>
        <div>
          <label for="labelName">Total Machine Speed:</label>
          <input type="text" id="labelName" v-model="calculateTotalSpeed" required />
        </div>
        <div>
          <label for="labelName">fixed cost / month:</label>
          <input type="text" id="labelName" v-model="calculatefixedcostpermonth" required />
        </div>

      </div>
      <div class="form-group">
        <div>
          <label for="labelName">NEW FIXED COST PER MONTH:</label>
          <input type="text" id="labelName" @input="setNewFixedCost" v-model="update.totalFixedCost" required />
        </div>
        <div>
          <label for="labelName">ratio:</label>
          <input type="text" id="labelName" v-model="calculateratio" required />
        </div>
        <div>
          <label for="labelName">costallocation:</label>
          <input type="text" id="labelName" v-model="calculatecostallocation" required />
        </div>

      </div>
      <div class="form-group">
        <div>
          <label for="labelName">total ratio:</label>
          <input type="text" id="labelName" v-model="calculatetotalratio" required />
        </div>
        <div>
          <label for="labelName">Fixed Cost Per Day:</label>
          <input type="text" id="labelName" v-model="calculatefixedcostperday" required />
        </div>
        <div>
          <label for="labelName">Fixed Cost Per Meter:</label>
          <input type="text" id="labelName" v-model="calculatefixedcostpermeter" required />
        </div>
        <div class="form-group">
          <div>
            <label for="labelName">Workday:</label>
            <input type="text" id="labelName" v-model="workday" required />
            <label for="labelName">Workhour:</label>
            <input type="text" id="labelName" v-model="workhour" required />
          </div>
      </div>
      </div>
    <div>
      <button @click="recalculateFixedCost">Apply</button>
    </div>
    <div>
      <button @click="$router.push('/fixedcostmaintenance')">Done</button>
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

  computed:{

    calculatefixedcostpermeter() {
      let workhour = this.workhour;
      let costpermeter = [];
      for (let i = 0; i < this.calculatefixedcostperday.length; i++) {
        costpermeter.push(this.calculatefixedcostperday[i] /( this.fixedcost[i].speed * 60 * workhour));
      }
      return costpermeter;
    },


    calculatefixedcostperday(){
      let costpermonth = this.calculatefixedcostpermonth;
      let costperday = [];
      for (let i = 0; i < costpermonth.length; i++) {
        costperday.push(costpermonth[i] / this.workday);
      }
      return costperday;


    },

    calculatefixedcostpermonth(){
      let total = this.update.totalFixedCost;
      let allocation = this.calculatecostallocation;
      let fixedcostpermonth=[];
      for (let i = 0; i < allocation.length; i++) {
        fixedcostpermonth.push(allocation[i] * total);
      }
      return fixedcostpermonth;


    },

    calculatecostallocation(){
      let total = this.calculatetotalratio;
      let costallocation = [];
      for (let i = 0; i < this.calculateratio.length; i++) {
        costallocation.push(this.calculateratio[i] / total);
      }
      return costallocation;
    },

    calculatetotalratio(){
      let ratio = this.calculateratio
      let total = 0;
      for (let i = 0; i < ratio.length; i++) {
        total += ratio[i];
      }
      return total;
    },



    calculateratio(){
      let ratio = []
      for (let i = 0; i < this.fixedcost.length; i++) {
        ratio.push((this.fixedcost[i].speed / this.calculateTotalSpeed)*this.fixedcost[i].currentutilization);
      }
      return ratio;
    },

    calculateTotalSpeed() {
      let total = 0;
      for (let i = 0; i < this.fixedcost.length; i++) {
        total += this.fixedcost[i].speed;
      }
      return total;
    },

    calculateTotalFixedCost() {
      let total = 0;
      for (let i = 0; i < this.fixedcost.length; i++) {
        total += this.fixedcost[i].fixedcostmonth;
      }
      return total;
    },


  },

  data() {
    return {
      workhour: 10,
      workday: 30,
      update:{
        totalFixedCost:null,
        newSpeedPercentage: [],
      },
      successMessageLabel:'',
      success:false,
      calculated:{
        totalFixedCost:null,
      },
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
      fixedcost:[],
      username: null,
      currentTime: null,
    };
  },


  created() {

    this.fetchFixedCost();

    this.setNewFixedCost()





  },





  methods: {

    async recalculateFixedCost() {
      try {
        for (let i = 0; i < this.fixedcost.length; i++) {
          const response = await axios.put('/api/updatefixedcost', {
            process: this.fixedcost[i].process,
            speed: this.fixedcost[i].speed,
            costallocation: this.calculatecostallocation[i],
            currentutilization: this.fixedcost[i].currentutilization,
            ratio: this.calculateratio[i],
            fixedcostmonth: this.calculatefixedcostpermonth[i],
            fixedcostday: this.calculatefixedcostperday[i],
            fixedcostm: this.calculatefixedcostpermeter[i],
            id: this.fixedcost[i].id,
          });

          if (response.status === 200) {
            console.log(`Fixed cost for process ${this.fixedcost[i].process} updated successfully.`);
          } else {
            console.error(`Failed to update fixed cost for process ${this.fixedcost[i].process}.`);
          }
        }
        this.success = true;
        this.successMessageLabel = 'fixedcost recalculate success.';
      } catch (error) {
        console.error('Error during update:', error);
      }
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

    setNewFixedCost() {
      if (this.update.totalFixedCost === null) {
        return this.calculateTotalFixedCost;
      }
    },

    currentFixedCost(){

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

.table-container {
  height: 200px; /* Set the desired maximum height */
  width: 100%;
  overflow-y: auto; /* Add vertical scroll if necessary */
  background-color: white;
  display: inline-block;
  justify-self: center;
}

</style>
