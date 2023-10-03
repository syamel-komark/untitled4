<template>
  <div class="dashboard">
    <HeaderBar :username="username" :currentTime="currentTime" @logout="logout" />
    <h2>Schedule Dashboard</h2>

    <button @click="searchJobsheet" >Retrieve Jobsheet</button>
    <div class="scheduleboard">
      <header>JOB ON HAND</header>
      <div class = "table-container-schedule">
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
          <tr v-for="schedule in activeSchedule" :key="schedule.id">
            <td>{{ schedule.jobsheet }}</td>
            <td>{{ schedule.mastercard }}</td>
            <td>{{ schedule.labelname }}</td>
            <td>{{ schedule.machine }}</td>
            <td>{{ schedule.totallength }}</td>
            <td>{{ schedule.quantity }}</td>
            <td>{{ schedule.process }}</td>
            <td>{{ schedule.deliverydate }}</td>
            <td><button @click="archiveSchedule(schedule.id,schedule.jobsheet)">Archive</button></td>



          </tr>
          </tbody>
        </table>

      </div>
      <button @click="showArchivedJobsheet=true">Archived Jobsheet</button>


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
              :class="{ 'selected-button': process.process === selectedProcess }"

          >
            {{ process.process }}
          </button>
        </div>
      </div>
    </div>
    <div class="schedule-container">
      <div v-if="this.selectedProcess" class="scheduleboard">
        <div class="scheduleboard-header">
          <header>{{this.selectedProcess}} CURRENT JOB</header>
          <header>CURRENT CAPACITY: {{filteredRowsCapacity}}m</header>
          <header>MAX CAPACITY: {{filteredCapacity}}m/day</header>
        </div>
        <div class="row">
          <div class="col-8">
            <h3>Draggable table</h3>

            <table class="table table-striped">
              <thead class="thead-dark">
              <tr>
                <th>Jobsheet</th>
                <th>Mastercard</th>
                <th>Label</th>
                <th>Length(m)</th>
                <th>Quantity(PCS)</th>
                <th>Process</th>
                <th>Delivery</th>
                <th>Remark</th>
                <th>Action</th>
              </tr>
              </thead>
              <draggable v-model="selectedSchedule" tag="tbody" item-key="id" @change="handleRowReorder">
                <template #item="{ element }">
                  <tr :class="element.rowClass" class="draggable-item">
                    <td>{{ element.jobsheet }}</td>
                    <td>{{ element.mastercard }}</td>
                    <td>{{ element.labelname }}</td>
                    <td>{{ element.totallength }}</td>
                    <td>{{ element.quantity }}</td>
                    <td>{{ element.process }}</td>
                    <td>{{ element.deliverydate }}</td>
                    <td>{{ element.remark }}</td>
                    <td><button @click="showRemark(element.jobsheet)">Update</button></td>
                  </tr>
                </template>
              </draggable>
            </table>
          </div>

          <rawDisplayer class="col-3" :value="list" title="List" />
        </div>

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
            placeholder="Search Jobsheet"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Action</th>
          <th>Jobsheet Number</th>
          <th>Mastercard</th>
          <th>Label name</th>
          <th>Order Number</th>
          <th>Process</th>
          <th>Total Length</th>
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
          <td>{{ jobsheet.ordernumber}}</td>
          <td>{{ jobsheet.process }}</td>
          <td>{{ jobsheet.totallength}}</td>
          <td>{{ jobsheet.quantity }}</td>


        </tr>
        </tbody>
      </table>
    </div>
    <button @click=searchJobsheet>Close</button>
  </div>
  <div class="success-modal" v-if="showSuccessModal">
    <div class="success-content">
      <p>{{ Message }}</p>
      <button @click="showSuccessModal=false">Close</button>
    </div>
  </div>
  <div class="success-modal" v-if="machineModal">
    <div class="success-content">
      <p>Assign Machine</p>
      <select v-model="selectedMachine">
        <option value="">Select a Machine</option>
        <option v-for="machineData in processList" :key="machineData.process" :value="machineData.process">{{ machineData.process }}</option>
      </select>
      <button @click="assignMachine">Assign</button>
      <button @click="machineModal=false">Close</button>
    </div>
  </div>
  <div class="success-modal" v-if="statusModal">
    <div class="success-content">
      <p>Update Status </p>
      <select v-model="formModel.status">
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Deleted">Deleted</option>
      </select>
      <button @click="updateStatus">Archive</button>
      <button style="background-color: #a80e37; color: white;" @click="deleteSchedule">Delete</button>
    </div>
    <button @click="this.statusModal=false">Close</button>

  </div>
  <div class="success-modal" v-if="remarkModal">
    <div class="success-content">
      <div>
        <p>Update Remark </p>
        <input v-model="this.formModel.remark">
        <button @click="updateRemark">Update</button>
      </div>
      <div>
        <p>Update Process </p>
        <select v-model="formModel.process">
          <option value="">Select a Process</option>
          <option v-for="machineData in processList" :key="machineData.process" :value="machineData.process">{{ machineData.process }}</option>
        </select>
        <button @click="updateProcess">Update</button>
      </div>
      <div>
        <p>Update Status </p>
        <select v-model="formModel.status">
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Deleted">Deleted</option>
        </select>
        <button @click="updateStatus">Archive</button>
      </div>
    </div>
    <button @click="this.remarkModal=false">Close</button>

  </div>
  <div class="success-modal" v-if="showArchivedJobsheet">
    <div class="table-container">
      <h2>Archived Jobsheet List</h2>
      <div class="searchmaterial-menu">
        <input
            type="text"
            v-model="searchScheduleQuery"
            placeholder="Search Jobsheet"
        />
      </div>
      <table>
        <thead>
        <tr>
          <th>Action</th>
          <th>Jobsheet</th>
          <th>Mastercard</th>
          <th>Label</th>
          <th>Machine</th>
          <th>Length(m)</th>
          <th>Quantity(PCS)</th>
          <th>Process</th>
          <th>Delivery</th>
          <th>Status</th>
          <th>Remark</th>


        </tr>
        </thead>
        <tbody>
        <tr v-for="schedule in archivedSchedule" :key="schedule.id">
          <td><button @click="unarchive(schedule.jobsheet)">Unarchive</button></td>
          <td>{{ schedule.jobsheet }}</td>
          <td>{{ schedule.mastercard }}</td>
          <td>{{ schedule.labelname }}</td>
          <td>{{ schedule.machine }}</td>
          <td>{{ schedule.totallength }}</td>
          <td>{{ schedule.quantity }}</td>
          <td>{{ schedule.process }}</td>
          <td>{{ schedule.deliverydate }}</td>
          <td>{{ schedule.status }}</td>
          <td>{{ schedule.remark }}</td>



        </tr>
        </tbody>
      </table>
    </div>
    <button @click="this.showArchivedJobsheet=false">Close</button>
  </div>



</template>

<script>
import draggable from 'vuedraggable'
import HeaderBar from "@/components/AppHeader.vue";
import axios from "axios";
import { differenceInDays } from 'date-fns';

export default {

  components: {
    HeaderBar,draggable,
  },

  data() {
    return {
      remarkModal:false,
      showArchivedJobsheet:false,
      searchScheduleQuery:'',
      statusModal:false,
      selectedMachine: null,
      machineModal: false,
      Message:'',
      showSuccessModal:false,
      processSchedule:[],
      selectedSchedule:[],
      selectedLabel: '',
      formModel:{
        jobsheet:'',
        status:'',
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
      maxCapacity:null,
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

    this.fetchSchedule();
    this.fetchJobsheet();
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

    archivedSchedule() {
      const data = this.scheduleInfo;
      const filteredData = data.filter((schedule) => schedule.status !== null);

      if (this.searchScheduleQuery === '') {
        return filteredData;
      } else {
        const query = this.searchScheduleQuery;
        return filteredData.filter(schedule => {
          return schedule.jobsheet.toString().includes(query);
        });
      }
    },
    activeSchedule() {
      const data = this.scheduleInfo;

      if (data.length === 0) {
        return []; // or an appropriate default value
      } else {
        return data.filter((schedule) => schedule.status !== 'Cancelled' && schedule.status !== 'Completed' && schedule.status !== 'Deleted');
      }
    },


    highlightedRows() {
      const currentDate = new Date();
      return this.selectedSchedule.map((row) => {
        // Convert the "deliverydate" from text to a Date object
        const deliveryDate = new Date(row.deliverydate);
        const daysRemaining = differenceInDays(deliveryDate, currentDate);

        console.log(`Delivery Date: ${deliveryDate}`);
        console.log(`Current Date: ${currentDate}`);
        console.log(`Days Remaining: ${daysRemaining}`);

        // Apply classes based on your criteria
        if (daysRemaining > 10) {
          row.rowClass = '';
        } else if (daysRemaining <= 10 && daysRemaining >= 8) {
          row.rowClass = 'light-green';
        } else if (daysRemaining < 8 && daysRemaining >= 5) {
          row.rowClass = 'green';
        } else if (daysRemaining < 5 && daysRemaining >= 2) {
          row.rowClass = 'yellow';
        } else if (daysRemaining < 2 && daysRemaining >= -5) {
          row.rowClass = 'orange';
        } else {
          row.rowClass = 'red';
        }

        return row;
      });
    },

    filteredRowsCapacity() {
      const filteredRows = this.filteredRows;

      if (filteredRows.length === 0) {
        return 0; // or an appropriate default value
      } else {
        return filteredRows.reduce((total, row) => {
          const lengthAsNumber = parseFloat(row.totallength);
          return total + (isNaN(lengthAsNumber) ? 0 : lengthAsNumber);
        }, 0);
      }
    },

    filteredCapacity() {
      if (this.selectedProcess === '') {
        return null; // or an appropriate default value
      } else {
        const query = this.selectedProcess;
        const matchingProcess = this.processList.find(process => {
          return process.process === query;
        });

        return matchingProcess ? matchingProcess.maxcapacity : null; // or an appropriate default value
      }
    },

    filteredRows() {
      if (this.selectedProcess === null) {
        return this.scheduleInfo;
      } else {
        const query = this.selectedProcess;
        const filteredData = this.activeSchedule.filter(schedule => {
          return schedule.process.includes(query);
        });

        if (filteredData.length === 0) {
          // Return an empty array if no items are found in the filtered data
          return [];
        }

        // Sort the filtered data by tableid in ascending order
        filteredData.sort((a, b) => a.scheduleid - b.scheduleid);

        let maxScheduleId = 0;
        for (let i = 0; i < filteredData.length; i++) {
          if (filteredData[i].scheduleid !== null && filteredData[i].scheduleid > maxScheduleId) {
            maxScheduleId = filteredData[i].scheduleid;
          }
        }

        // Assign scheduleid values to null entries starting from the largest + 1
        let nextScheduleId = maxScheduleId + 1;
        for (let i = 0; i < filteredData.length; i++) {
          if (filteredData[i].scheduleid === null) {
            filteredData[i].scheduleid = nextScheduleId;
            nextScheduleId++;
          }
        }

        return filteredData;
      }
    },

    filteredJobsheet() {
      if (this.searchJobsheetQuery === '') {
        return this.jobsheetInfo;
      } else {
        const query = this.searchJobsheetQuery;
        return this.jobsheetInfo.filter(jobsheet => {
          return jobsheet.id.toString().includes(query);
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

    async unarchive(jobsheet) {
      try {
        const response = await axios.put('/api/updatestatus', {
          status: null,
          jobsheet: jobsheet,
        });

        if (response.status === 200) {
          console.log('Schedule updated successfully.');
          this.statusModal=false;
          await this.fetchSchedule()
          this.createProcessSchedule()
          this.remarkModal=false;
          this.showArchivedJobsheet=false;
          // Optionally, you can update your local data or perform other actions here.
        } else {
          console.error('Error updating schedule:', response.data.error);
          // Handle the error, e.g., display an error message to the user.
        }
      } catch (error) {
        console.error('Error updating schedule:', error);
        // Handle the error, e.g., display an error message to the user.
      }
    },


    async updateProcess() {
      try {
        const response = await axios.put('/api/updatecurrent', {
          process: this.formModel.process,
          jobsheet: this.formModel.jobsheet,
        });

        if (response.status === 200) {
          console.log('Schedule updated successfully.');
          await this.fetchSchedule()
          this.createProcessSchedule()
          this.remarkModal=false;
          // Optionally, you can update your local data or perform other actions here.
        } else {
          console.error('Error updating schedule:', response.data.error);
          // Handle the error, e.g., display an error message to the user.
        }
      } catch (error) {
        console.error('Error updating schedule:', error);
        // Handle the error, e.g., display an error message to the user.
      }
    },


    async showRemark(jobsheet) {
      this.formModel.jobsheet=jobsheet;
      this.remarkModal = true;
    },

    async updateRemark() {
      try {
        const response = await axios.put('/api/updateremark', {
          remark: this.formModel.remark,
          jobsheet: this.formModel.jobsheet,
        });

        if (response.status === 200) {
          console.log('Schedule updated successfully.');
          await this.fetchSchedule()
          this.createProcessSchedule()
          this.remarkModal=false;
          // Optionally, you can update your local data or perform other actions here.
        } else {
          console.error('Error updating schedule:', response.data.error);
          // Handle the error, e.g., display an error message to the user.
        }
      } catch (error) {
        console.error('Error updating schedule:', error);
        // Handle the error, e.g., display an error message to the user.
      }
    },

    async updateStatus() {
      try {
        const response = await axios.put('/api/updatestatus', {
          status: this.formModel.status,
          jobsheet: this.formModel.jobsheet,
        });

        if (response.status === 200) {
          console.log('Schedule updated successfully.');
          this.statusModal=false;
          await this.fetchSchedule()
          this.createProcessSchedule()
          this.remarkModal=false;
          // Optionally, you can update your local data or perform other actions here.
        } else {
          console.error('Error updating schedule:', response.data.error);
          // Handle the error, e.g., display an error message to the user.
        }
      } catch (error) {
        console.error('Error updating schedule:', error);
        // Handle the error, e.g., display an error message to the user.
      }
    },

    archiveSchedule(id,jobsheet){
      this.formModel.id = id
      this.formModel.jobsheet = jobsheet;
      this.statusModal = true;

    },

    async assignMachine(){
      await this.registerSchedule()
      this.isSearchJobsheet = !this.isSearchJobsheet;
      this.machineModal=false;
    },

    async handleRowReorder() {
      if (this.scheduleInfo.length === 0) {
        // Do nothing if there are no items in scheduleInfo
        return;
      }

      this.processSchedule = this.selectedSchedule;
      console.log(this.processSchedule);

      for (let i = 0; i < this.processSchedule.length; i++) {
        const id = this.processSchedule[i].id;
        await axios.put("/api/updateprocessschedule", {
          scheduleid: i + 1, // Set the new scheduleid based on the new index
          id,
        });
      }
    },

    createProcessSchedule(){
      this.selectedSchedule = this.filteredRows
      this.highlightedRows
      console.log(this.scheduleInfo[0].process)
      console.log(this.filteredRows)
    },

    async deleteSchedule() {
      try {
        const response = await axios.delete('/api/deleteschedule', {
          data: {
            id: this.formModel.id,
          },
        });
        if (response.status === 200) {
          console.log('schedule deleted successfully');
          // Update the users list after deletion
          this.statusModal=false;
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
              process: this.selectedMachine,
              finishing: this.formModel.finishing,
              diecut :this.formModel.dieCutType,
              quantity :this.formModel.quantityOrder,
              machine: this.formModel.machine,
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

    isJobSheetDuplicate(jobSheetIdentifier) {
      return this.scheduleInfo.some(item => item.jobsheet === jobSheetIdentifier);
    },

    async pickJobsheet(jobsheet) {
      const jobSheetIdentifier = jobsheet.id; // Change this to the actual identifier property
      console.log('picked jobsheet', jobSheetIdentifier)
      console.log(this.isJobSheetDuplicate(jobSheetIdentifier))

      // Check if it's a duplicate
      if (this.isJobSheetDuplicate(jobSheetIdentifier)) {
        // Handle the case where it's a duplicate, e.g., show an error message
        this.Message = 'Duplicate Jobsheet Picked';
        this.showSuccessModal = true;

        return;
      }
      this.machineModal= true;
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

      console.log(this.selectedProcess);
      // You can add any other logic here based on the selected department
      if (this.selectedProcess === process) {
        // If the clicked department is already selected, clear the selection
        this.selectedProcess = null;
      } else {
        // Otherwise, set the selected department
        this.selectedProcess = process; // Set the selected department
        this.createProcessSchedule();
      }
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
            maxcapacity:machineData.maxcapacity,

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
        this.selectedProcess = null;
      } else {
        // Otherwise, set the selected department
        this.selectedDepartment = department;
        this.selectedProcess = null;

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

.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column ;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.draggable-item {
  cursor: move; /* Change cursor to a 4-pointed arrow when hovering */
}



.table-container-schedule {
  height: 400px; /* Set the desired maximum height */
  width: 95%;
  overflow-y: auto; /* Add vertical scroll if necessary */
  background-color: white;
  justify-self: center;
  display: inline-flex;
}

.scheduleboard-header {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-evenly;
}

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

.searchmaterial-menu {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table-container {
  width: 80%;
  overflow-y: auto; /* Add vertical scroll if necessary */
  background-color: white;
  display: flex;
  flex-direction: column;
}

/* Light Green */
.light-green {
  background-color: lightgreen;
}

/* Green */
.green {
  background-color: green;
}

/* Yellow */
.yellow {
  background-color: yellow;
}

/* Orange */
.orange {
  background-color: orange;
}

/* Red */
.red {
  background-color: red;
}

/* Dark Red */
.dark-red {
  background-color: darkred;
}


button{
  margin:1px;
}

</style>
