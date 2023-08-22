<template>
  <h2>ECS Label Specification<label for="costingnumber">Costing Number: {{ newCostingId }}</label></h2>
  <div class="group-container">
    <div class="table-container">
      <div class="searchmaterial-menu">
      </div>
      <table>
        <thead>
        <tr>
          <th>Costing Number</th>
          <th>Mastercard</th>
          <th>Label name</th>
          <th>Facestock</th>
          <th>Width</th>
          <th>Pitch</th>
          <th>Color</th>
          <th>Across</th>
          <th>Around</th>
          <th>Gear</th>
          <th>Process</th>
          <th>Finishing</th>
          <th>Foil Cost</th>
          <th>Laminate</th>
          <th>Laminate Cost</th>
          <th>Material Cost</th>
          <th>Varnish</th>
          <th>Varnish Cost</th>
          <th>Ink</th>
          <th>Ink Cost</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="costing in costingInfo" :key="costing.id">
          <td>{{ costing.id }}</td>
          <td>{{ costing.mastercard }}</td>
          <td>{{ costing.labelname }}</td>
          <td>{{ costing.material }}</td>
          <td>{{ costing.width }}</td>
          <td>{{ costing.pitch }}</td>
          <td>{{ costing.color }}</td>
          <td>{{ costing.across }}</td>
          <td>{{ costing.around }}</td>
          <td>{{ costing.gear }}</td>
          <td>{{ costing.process }}</td>
          <td>{{ costing.finishing }}</td>
          <td>{{ costing.foilcost }}</td>
          <td>{{ costing.laminate }}</td>
          <td>{{ costing.laminatecost }}</td>
          <td>{{ costing.materialcost }}</td>
          <td>{{ costing.varnish }}</td>
          <td>{{ costing.varnishcost }}</td>
          <td>{{ costing.ink }}</td>
          <td>{{ costing.inkcost }}</td>
        </tr>
        </tbody>
      </table>
  </div>
  <div class="group-container">
    <div class="form-group">
      <label for="quantity">Quantity Ordered:</label>
      <input type="text" id="quantity" placeholder="Key in quantity to quote (use ; for multiple moq)" @input="getMoq" v-model="quantity" required />
    </div>
    <div class="form-group">
      <label for="printing length total">Label printing length total:</label>
      <input type="text" id="finishing" v-model="calculatePrintingLengthTotal" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing gap">Label gap:</label>
      <input type="text" id="finishing" v-model="calculateBackPrint" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">Label printing length:</label>
      <input type="text" id="finishing" v-model="calculatePrintingLength" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing gap">Cold Foil Plate Cost:</label>
      <input type="text" id="finishing" v-model="calculateFoilPlate" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">Label wastage:</label>
      <input type="text" id="finishing" v-model="machineSpec.wastage" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing gap">Back print m:</label>
      <input type="text" id="finishing" v-model="calculateBackPrint" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">Label color setting length:</label>
      <input type="text" id="finishing" v-model="calculateSettingLengthColor" required />
    </div>
    <div class="form-group">
      <label for="printing length">ink cost:</label>
      <input type="text" id="finishing" v-model="calculateInkCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">Label joints setting length:</label>
      <input type="text" id="finishing" v-model="calculateJointLengthWastage" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">material width:</label>
      <input type="text" id="finishing" v-model="calculateMaterialWidth" required readonly/>
    </div>
    <div class="form-group">
      <label for="laminate cost">Laminate cost:</label>
      <input type="text" id="finishing" v-model="calculateLaminateCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">varnish cost:</label>
      <input type="text" id="finishing" v-model="calculateVarnishCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">material price:</label>
      <input type="text" id="finishing" v-model="formModel.facestockCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">paper cost:</label>
      <input type="text" id="finishing" v-model="calculatePaperMaterialPrice" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">plate cost:</label>
      <input type="text" id="finishing" v-model="calculatePlatePrice" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">diecut cost:</label>
      <input type="text" id="finishing" v-model="calculateDieCut" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">fixed cost:</label>
      <input type="text" id="finishing" v-model="calculateFixedCosts" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing gap">Foil Cost:</label>
      <input type="text" id="finishing" v-model="calculateFoilCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">total tooling cost:</label>
      <input type="text" id="finishing" v-model="totalToolingCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">sum material</label>
      <input type="text" id="finishing" v-model="sumMaterial" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">sum Cost:</label>
      <input type="text" id="finishing"  v-model="sumCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">Unit Cost:</label>
      <input type="text" id="finishing"  v-model="unitCost" required readonly/>
    </div>
    <div class="form-group">
      <label for="printing length">margin:</label>
      <input type="text" id="finishing" @input="setMargin" v-model="margin" required/>
    </div>
    <div class="form-group">
      <label for="printing length">RSP:</label>
      <input type="text" id="finishing"  v-model="RSP" required readonly/>
    </div>


  </div>
  <div class="group-container">
    <div class="form-group">
    </div>
    <div class="form-group">
      <button @click="runAsyncFunctions" id="registercosting">Next</button>
  </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {

  components: {
    //HeaderBar,
  },

  data() {
    return {
      machineInfo:[],
      costingInfo:[],
      margin: 0.7,
      wastage:1.05,
      selectedFinishing:'',
      selectedProcess:'',
      gap:'',
      printingLength:[],
      quantity:'',
      moq:[],
      newCostingId:"",
      machine: 'ECS340',
      username: null,
      currentTime: null,
      input:{
        settingLength:0,
      },
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
        facestockCost:'',
        laminateCost:'',
        foilCost:'',
        finishing:'',
        process:'',
        varnish:'',
        varnishCost:'',
        ink:'',
        inkCost:'',
      },
      fixedCost:{
        ECS340: 0.05219,
        AVTInspection: 0.0261 ,
        AutoCut: 0.0261,
        numberingMachine:0.0261,
        kopack13: 0.0261,
        sonata:0.01,
        iwasaki:0.0261,
        gallus4:0.01,
        bagMaking:0.005,
        gravureSlitting:0.0261,
        gravurePrinting:0.0052,
        lamination:0.0052,
        utecoPrinting:0.0418,
        utecoSlitting:0.0261,
        packing:0.01,
        EM280:0.0261,
        rhyguan:0.0261,
        digital:0.0522,
        k1Printing:0.021,
        k1Slitting:0.0261,


      },
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
      }
    };
  },

  computed: {

    splitProcess(){
      let data = this.formModel.process;
      const splitData = data.split(',');

      const splitData1 = [];
      const splitData2 = [];

      for (let i = 0; i < splitData.length; i++) {
        if (i % 2 === 0) {
          splitData1.push(splitData[i]);
        } else {
          splitData2.push(splitData[i]);
        }
      }
      return splitData2;
    },

    getMargin(){
      return this.margin ;

    },

    RSP(){
      let sum=[]
      for(let i=0;i<this.moq.length;i++) {
        const paperCost = this.calculatePaperMaterialPrice[i];
        const varnishCost = this.calculateVarnishCost[i];
        const inkCost = this.calculateInkCost[i];
        const fixedCost = this.calculateFixedCosts[i];
        const toolingCost = this.totalToolingCost;
        const total = paperCost+varnishCost+inkCost+fixedCost+toolingCost;
        sum.push(total/this.moq[i]/this.margin);

      }
      return sum.map((value) => parseFloat(value.toFixed(4)));
    },

    unitCost(){
      let sum=[]
      for(let i=0;i<this.moq.length;i++) {
        const paperCost = this.calculatePaperMaterialPrice[i];
        const varnishCost = this.calculateVarnishCost[i];
        const inkCost = this.calculateInkCost[i];
        const fixedCost = this.calculateFixedCosts[i];
        const toolingCost = this.totalToolingCost;
        const total = paperCost+varnishCost+inkCost+fixedCost+toolingCost;
        sum.push(total/this.moq[i]);
      }
      return sum.map((value) => parseFloat(value).toFixed(4));
    },

    sumCost(){
      let sum=[]
      for(let i=0;i<this.moq.length;i++) {
        const paperCost = this.calculatePaperMaterialPrice[i];
        const varnishCost = this.calculateVarnishCost[i];
        const inkCost = this.calculateInkCost[i];
        const fixedCost = this.calculateFixedCosts[i];
        const toolingCost = this.totalToolingCost;
        const total = paperCost+varnishCost+inkCost+fixedCost+toolingCost;
        sum.push(total);
      }
      return sum.map((value) => parseFloat(value).toFixed(4));
    },

    sumMaterial(){
      let sum=[]
      for(let i=0;i<this.moq.length;i++) {
        const paperCost = this.calculatePaperMaterialPrice[i];
        const varnishCost = this.calculateVarnishCost[i];
        const inkCost = this.calculateInkCost[i];
        const fixedCost = this.calculateFixedCosts[i];
        const laminateCost = this.calculateLaminateCost[i];
        const foilCost = this.calculateFoilCost[i];
        const total = paperCost+varnishCost+inkCost+fixedCost+laminateCost+foilCost;
        sum.push(total);
      }
      return sum.map((value) => parseFloat(value.toFixed(4)));
    },

    totalToolingCost(){
      const sum = this.calculatePlatePrice + this.calculateDieCut + this.calculateFoilPlate;
      return parseFloat(sum).toFixed(3);
    },

    //i dont even know how this part works
    calculateFixedCosts() {
      const fixedCosts = this.splitProcess;
      const totalFixedCosts = []; //intialize for fixed cost matrix

      for (let i = 0; i < this.calculatePrintingLengthTotal.length; i++) {//sets loop parameter to go through each length
        let currentLength = this.calculatePrintingLengthTotal[i];
        let lengthFixedCosts = 0;//initialize for summing fixed cost for length

        for (let j = 0; j < fixedCosts.length; j++) {//loops through the process of length
          const fixedCost = fixedCosts[j];//calls the first process fixed cost
          lengthFixedCosts += fixedCost * currentLength;//sums the whole process of fixedcost x length
        }

        totalFixedCosts.push(lengthFixedCosts); //push each fixed cost to respective length
      }

      return totalFixedCosts.map((value) => parseFloat(value.toFixed(4)));

    },

    calculateDieCut(){
      if(this.calculateMaterialWidth>300){
        return 1500;
      }
      if(this.calculateMaterialWidth<300 && this.calculateMaterialWidth>200){
        return 1200
      }
      if(this.calculateMaterialWidth<200 && this.calculateMaterialWidth>100){
        return 800
      }
      else{
        return 300
      }
    },

    calculatePlatePrice(){
      let color = this.formModel.color;
      let platePrice = this.machineSpec.platePrice; //rm/m2
      let length = parseFloat(this.formModel.pitch/1000); //m
      let width = parseFloat(this.formModel.width/1000); //m
      //let gap = parseFloat(this.calculateGap)/1000;
      let plateArea =  length * width * this.formModel.around * this.formModel.across*1.1;
      let plateCost = plateArea * platePrice * color;
      return parseFloat(plateCost.toFixed(2));

    },

    calculateGap(){
      let gap =null;
      gap = parseFloat(((this.formModel.gear*this.machineSpec.gearPitch)/this.formModel.around)) - parseInt(this.formModel.pitch);
      return parseFloat(gap.toFixed(3));
    },

    calculatePrintingLengthTotal(){
      let printLength=null;
      printLength=this.moq.map(moq => moq *
          (((parseInt(this.formModel.pitch)+parseInt(this.calculateGap))/this.formModel.across)/1000)
          * (1+this.machineSpec.wastage)
          +parseInt(this.calculateSettingLengthColor)
          +parseInt(this.calculateJointLengthWastage)
          +parseInt(this.calculateBackPrint)

      );
      return printLength;
    },

    calculatePrintingLength(){
      let printLength=null;
      printLength=this.moq.map(moq => moq *
          (((parseInt(this.formModel.pitch)+parseFloat(this.calculateGap))/this.formModel.across)/1000)
          );
      return printLength.map((value) => parseFloat(value.toFixed(4)));
    },

    calculateSettingLengthColor(){
        let setting = 0;
        let settingLengthColor = this.machineSpec.settingLength;
        let color = this.formModel.color;
        setting = color * settingLengthColor
        return setting;
    },

    calculateJointLengthWastage(){
      let jointLength=null;
      let rollLength = this.machineSpec.rollLength;
      let jointWastage = this.machineSpec.jointWastage;
      let printLength = this.moq.map(moq => moq *
          (((parseFloat(this.formModel.pitch)+parseFloat(this.calculateGap))/this.formModel.across)/1000)
      );
      let numberOfJoints = printLength.map(print=> Math.floor(print / rollLength));
      jointLength = numberOfJoints.map(joint => Math.round(joint * jointWastage));
      return jointLength;
    },

    calculateMaterialWidth(){
      let matWidth = null;
      matWidth = this.formModel.across * ((this.machineSpec.gapAcross)+parseInt(this.formModel.width))-(this.machineSpec.gapAcross)+(this.machineSpec.trim);
      return matWidth;
    },

    calculateInkCost(){
      let printLength = this.calculatePrintingLengthTotal;
      let materialWidth = this.calculateMaterialWidth/1000;
      let inkCost = this.formModel.inkCost/1000; //rm/g
      let color = this.formModel.color;
      let coatingWeight = this.machineSpec.coatingWeight; //g/m2
      let inkUse = printLength.map(length=> ((length)*materialWidth*inkCost*color*coatingWeight)*1.05);
      return inkUse.map((value) => parseFloat(value.toFixed(2)));

    },

    calculateVarnishCost() {
      let printLength = this.calculatePrintingLengthTotal;
      let materialWidth = this.calculateMaterialWidth / 1000;

      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let varnishCount = finishingArray.filter(item => item.trim() === 'varnish').length;

        let varnishCost = this.formModel.varnishCost / 1000; // rm/g
        let coatingWeight = this.machineSpec.coatingWeight; // g/m2

        let varnishUse = printLength.map(length => length * materialWidth * varnishCost * varnishCount * coatingWeight);
        return varnishUse.map(value => parseFloat(value.toFixed(2)));
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }
    },

    calculateLaminateCost() {
      let printLength = this.calculatePrintingLengthTotal
      let materialWidth = this.calculateMaterialWidth / 1000;

      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let laminateCount = finishingArray.filter(item => item.trim() === 'laminate').length;

        let laminateCost = this.formModel.laminateCost; // rm/m2

        let laminateUse = printLength.map(length => length * materialWidth * laminateCount * laminateCost);
        return laminateUse.map(value => parseFloat(value.toFixed(2)));
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }
    },

    calculateFoilCost() {
      let printLength = this.calculatePrintingLengthTotal
      let materialWidth = this.calculateMaterialWidth / 1000;

      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let foilCount = finishingArray.filter(item => item.trim() === 'coldfoil').length;

        let foilCost = this.formModel.foilCost; // rm/m2

        let foilUse = printLength.map(length => length * materialWidth * foilCount * foilCost);
        return foilUse.map(value => parseFloat(value.toFixed(2)));
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }
    },

    calculateFoilPlate() {


      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let foilCount = finishingArray.filter(item => item.trim() === 'coldfoil').length;
        let color = this.formModel.color;
        let platePrice = this.machineSpec.platePrice; //rm/m2
        let length = parseFloat(this.formModel.pitch/1000); //m
        let width = parseFloat(this.formModel.width/1000); //m
        //let gap = parseFloat(this.calculateGap)/1000;
        let plateArea =  length * width * this.formModel.around * this.formModel.across*1.1;
        let plateCost = plateArea * platePrice * color*foilCount;
        return parseFloat(plateCost.toFixed(2));
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }
    },

    calculatePaperMaterialPrice(){
      let price = this.formModel.facestockCost;
      let printLength = this.calculatePrintingLengthTotal;
      let materialWidth = this.calculateMaterialWidth/1000;
      let paperUse = printLength.map(length=> length*materialWidth*price);
      return paperUse.map((value)=> parseFloat(value.toFixed(2)));

    },

    calculateBackPrint: function () {
      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let printCount = finishingArray.filter(item => item.trim() === 'backprint').length;

        let settingMat = 250; // rm/m2

        let matuse = settingMat * printCount;
        return matuse;
      } else {
        return 0; // Return an empty array if formModel.finishing is undefined
      }
    },





  },


  created() {

    this.getMachine();

    this.getMoq();

    this.getInfo();

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

    setMargin(){
      this.margin = this.getMargin;
    },


    storeValue(){
      this.gap=this.calculateGap;
      this.printingLength=this.calculatePrintingLength;
    },


    getMoq() {
      if (this.quantity) {
        // Split the input string by ';'
        let quantities = this.quantity.split(';').map(qty => qty.trim());

        // Convert each quantity to a number and store in the moq array
        this.moq = quantities.map(qty => parseInt(qty, 10));
      } else {
        this.moq = []; // Clear the moq array if no input
      }

    },

    async getInfo() {
      this.newCostingId = sessionStorage.getItem('costingnumber');
      try {
        const response = await axios.get('/api/getcosting', {
          params: {
            id: parseInt(this.newCostingId) // Pass the costing ID as a query parameter
          }
        });

        const allCostingInfo = response.data;
        this.costingInfo = response.data;

        // fuck chat gpt for fucking me real good here
        this.formModel.mastercard = allCostingInfo[0].mastercard; // Set the selected material
        this.formModel.labelName = allCostingInfo[0].labelname; // Set the selected material
        this.formModel.facestock = allCostingInfo[0].material; // Set the selected material
        this.formModel.width = parseFloat(allCostingInfo[0].width); // Set the selected material
        this.formModel.pitch = parseFloat(allCostingInfo[0].pitch); // Set the selected material
        this.formModel.color = parseInt(allCostingInfo[0].color); // Set the selected material
        this.formModel.across = parseInt(allCostingInfo[0].across); // Set the selected material
        this.formModel.around = parseInt(allCostingInfo[0].around); // Set the selected material
        this.formModel.gear = parseInt(allCostingInfo[0].gear); // Set the selected material
        this.formModel.process = allCostingInfo[0].process; // Set the selected material
        this.formModel.finishing = allCostingInfo[0].finishing; // Set the selected material
        this.formModel.foil = allCostingInfo[0].foil; // Set the selected material
        this.formModel.foilCost = parseFloat(allCostingInfo[0].foilcost); // Set the selected material
        this.formModel.laminate = allCostingInfo[0].laminate; // Set the selected material
        this.formModel.laminateCost = parseFloat(allCostingInfo[0].laminatecost); // Set the selected material
        this.formModel.facestockCost = parseFloat(allCostingInfo[0].materialcost); // Set the selected material
        this.formModel.varnishCost = parseFloat(allCostingInfo[0].varnishcost); // Set the selected material
        this.formModel.inkCost = parseFloat(allCostingInfo[0].inkcost); // Set the selected material
        this.formModel.ink = allCostingInfo[0].ink; // Set the selected material
        this.formModel.varnish = allCostingInfo[0].varnish; // Set the selected material



        console.log(this.costingInfo);
      } catch (error) {
        console.error('Error fetching mastercard:', error);
      }
    },

    async getMachine() {
      this.machine = sessionStorage.getItem('machine');
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
  height: 200px; /* Set the desired maximum height */
  width: 800px;
  overflow-y: auto; /* Add vertical scroll if necessary */
  background-color: white;
  display: inline-block;
  justify-self: center;
}

.group-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.form-group {
  flex: 0 0 calc(50% - 20px); /* Adjust the width as needed */
  margin-right: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>
