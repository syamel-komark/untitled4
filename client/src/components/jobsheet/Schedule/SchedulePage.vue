<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Schedule Dashboard</h2>

    <button @click="searchJobsheet" >Retrieve Jobsheet</button>
    <div class="scheduleboard">
      <header>JOB ON HAND</header>
      <table>
        <thead>
        <tr>
          <th>Jobsheet</th>
          <th>Mastercard</th>
          <th>Label</th>
          <th>Machine</th>
          <th>Length(m)</th>
          <th>Quantity(PCS)</th>
          <th>Process</th>
          <th>Delivery</th>
          <th>Action</th>


        </tr>
        </thead>
        <tbody>
        <tr v-for="schedule in scheduleInfo" :key="schedule.id">
          <td>{{ schedule.jobsheet }}</td>
          <td>{{ schedule.mastercard }}</td>
          <td>{{ schedule.labelname }}</td>
          <td>{{ schedule.machine }}</td>
          <td>{{ schedule.totallength }}</td>
          <td>{{ schedule.quantity }}</td>
          <td>{{ schedule.process }}</td>
          <td>{{ schedule.deliverydate }}</td>
          <td><button @click="deleteSchedule(schedule.id)">Delete</button></td>



        </tr>
        </tbody>
      </table>

    </div>
    <div class="machine-select">
      <div>
        <button
            v-for="(department, index) in uniqueDepartments"
            :key="index"
            @click="handleDepartmentButtonClick(department)"
            :class="{ 'selected-button': department === selectedDepartment }"

        >
          {{ department }}
        </button>
        <div>
          <button
              v-for="(process, index) in filteredProcesses"
              :key="index"
              @click="handleSelectedProcessButtonClick(process.process)"
          >
            {{ process.process }}
          </button>
        </div>
      </div>
    </div>
    <div class="schedule-container">
      <div class="schedule-board">

      </div>
    </div>
  </div>
  <div class="success-modal" v-if="isSearchJobsheet">
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
    </div><button @click=searchJobsheet>Close</button>
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

  data() {
    return {
      formModel:{
        mastercard:'',
        labelName:'',
        facestock:'',
        process:'',
        finishing:'',
        dieCutType:'',
        quantityOrder:'',
        jobType:'',
        salesPerson:'',
        customerName:'',
        deliveryDate:'',
        orderNumber:'',
        totalLength:'',
        printingDuration:'',
        settingDuration:'',
        jobsheetNumber:'',
        machine:'',
        entryDate:'',
      },
      scheduleInfo:[],
      searchJobsheetQuery:'',
      jobsheetInfo:[],
      isSearchJobsheet: false,
      selectedProcess: null,
      processList:[],
      selectedDepartment:null,
      departmentList:[],
      isECS:false,
      label:false,
      flexible:false,
      digital:false,
      username: null,
      currentTime: null,
    };
  },


  created() {

    this.fetchJobsheet();
    this.fetchSchedule()
    this.getDepartment();
    this.getProcess();

    // Retrieve username from session storage
    this.username = sessionStorage.getItem('username') || '';
   // this.searchJobsheetQuery = sessionStorage.getItem('jobsheet') || '';



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

  computed: {

    filteredJobsheet() {
      if (this.searchJobsheetQuery === '') {
        return this.jobsheetInfo;
      } else {
        const query = this.searchJobsheetQuery;
        return this.jobsheetInfo.filter(jobsheet => {
          return jobsheet.id.includes(query);
        });
      }
    },

    filteredProcesses() {
      if (!this.selectedDepartment) {
        // If no department is selected, return an empty array
        return [];
      }
      // Filter the processList based on the selected department
      return this.processList.filter(process => process.department === this.selectedDepartment);
    },

    uniqueDepartments() {
      const uniqueSet = new Set(); // Create a Set to store unique department names

      // Iterate through this.departmentList and add department names to the Set
      this.departmentList.forEach((machineData) => {
        uniqueSet.add(machineData.department);
      });

      // Convert the Set back to an array to get unique department names
      return Array.from(uniqueSet);
    }
  },


  methods: {

    async deleteSchedule(id) {
      try {
        const response = await axios.delete('/api/deleteschedule', {
          data: {
            id: id,
          },
        });
        if (response.status === 200) {
          console.log('schedule deleted successfully');
          // Update the users list after deletion
          this.fetchSchedule();
        } else {
          console.error('schedule deletion failed');
        }
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    },


    async registerSchedule() {
      try {
            const response = await axios.post('/api/registerschedule', {
              mastercard: this.formModel.mastercard,
              labelname: this.formModel.labelName,
              material: this.formModel.facestock,
              process: this.formModel.process,
              finishing: this.formModel.finishing,
              machine: this.formModel.machine,
              diecut :this.formModel.dieCutType,
              quantity :this.formModel.quantityOrder,
              salesperson: this.formModel.salesPerson,
              customer: this.formModel.customerName,
              deliverydate: this.formModel.deliveryDate,
              ordernumber: this.formModel.orderNumber,
              jobtype: this.formModel.jobType,
              entrydate: this.formModel.entryDate,
              totallength: this.formModel.totalLength,
              printingduration: this.formModel.printingDuration,
              settingduration: this.formModel.settingDuration,
              jobsheet: this.formModel.jobsheetNumber,

        });

        if (response.status === 200) {
          await this.fetchSchedule();
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


    async pickJobsheet(jobsheet) {
      this.formModel.mastercard = jobsheet.mastercard; // Set the selected material
      this.formModel.labelName = jobsheet.labelname; // Set the selected material
      this.formModel.facestock = jobsheet.material; // Set the selected material
      this.formModel.process = jobsheet.process; // Set the selected material
      this.formModel.finishing = jobsheet.finishing; // Set the selected material
      this.formModel.dieCutType = jobsheet.diecut;
      this.formModel.quantityOrder = jobsheet.quantity;
      this.formModel.jobType = jobsheet.jobtype;
      this.formModel.salesPerson = jobsheet.salesperson
      this.formModel.customerName =  jobsheet.customer;
      this.formModel.totalLength = jobsheet.totallength;
      this.formModel.printingDuration = jobsheet.printingduration;
      this.formModel.settingDuration = jobsheet.settingduration;
      this.formModel.jobsheetNumber = jobsheet.id;
      this.formModel.machine = jobsheet.machine;
      this.formModel.orderNumber = jobsheet.ordernumber;
      this.formModel.deliveryDate = jobsheet.deliverydate;
      this.formModel.entryDate = jobsheet.entry_datetime;
      await this.registerSchedule()
    },


    async fetchSchedule() {
      try {
        const response = await axios.get('/api/getschedule');
        this.scheduleInfo = response.data;
        console.log(this.scheduleInfo);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
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

    searchJobsheet(){
      this.isSearchJobsheet = !this.isSearchJobsheet;
    },

    handleSelectedProcessButtonClick(process) {
      this.selectedProcess = process; // Set the selected department
      console.log(this.selectedProcess);
      // You can add any other logic here based on the selected department
    },

    async getProcess() {
      try {
        const response = await axios.get('/api/getfixedcost');
        this.processList = response.data.map((machineData) => {
          return {
            department: machineData.department,
            process: machineData.process,

            // Add other properties here as needed
          };
        });
        console.log(this.processList);
      } catch (error) {
        console.error('Error fetching fixedcost:', error);
      }
    },

    handleDepartmentButtonClick(department) {
      if (this.selectedDepartment === department) {
        // If the clicked department is already selected, clear the selection
        this.selectedDepartment = null;
      } else {
        // Otherwise, set the selected department
        this.selectedDepartment = department;
      }
      console.log(this.selectedDepartment);
      // You can add any other logic here based on the selected department
    },
    async getDepartment() {
      try {
        const response = await axios.get('/api/getfixedcost');
        this.departmentList = response.data.map((machineData) => {
          return {
            department: machineData.department,
            // Add other properties here as needed
          };
        });
        console.log(this.departmentList);
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
};
</script>

<style scoped>

.scheduleboard {
  padding: 5px;
  border: 3px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  align-content: space-evenly;
}

.machine-select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  align-content: space-evenly;
}

.selected-button {
  background-color: #0600ff; /* Set the background color for the selected button */
  /* Add any other styling you want for selected buttons */
}

.dashboard {
  margin: 2px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button{
  margin:1px;
}

</style>
