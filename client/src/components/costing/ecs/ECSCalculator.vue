<template>
  <div class="container">
    <div>
      <!-- Display the costing number received from the parent -->
      <p>Received Costing Number: {{ receivedCostingNumber }}</p>
      <!-- Input field to modify the costing number -->
      <input v-model="modifiedCostingNumber" type="number" />
      <button @click="updateCostingData">Update Parent</button>
    </div>
    <div>
      <h2>ECS Label Specification
        <label for="costingnumber">Costing Number: {{ newCostingId }}</label></h2>
    </div>
    <div>
      <div class="group-container">
        <div class ="table">
          <header>COSTING TABLE</header>
          <div class="table-container">
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
        </div>
      </div>
    </div>
    <div>
      <h2>USER INPUT</h2>
      <div class="group-container">
        <div class="form-group">
          <div class="form-item">
            <label for="quantity">Quantity Ordered:</label>
            <input type="text" id="quantity" placeholder="Key in quantity to quote (use ; for multiple moq)" @input = "getMoq" v-model="this.formModel.orderQuantity" required />
          </div>
        </div>
        <div class = "form-group">
          <div class="form-item">
            <label for="printing-type">Diecut:</label>
            <input id="printing-type" v-model="this.formModel.dieCutType" required readonly/>
          </div>
        </div>
        <div class="form-group">
          <div class="form-item">
            <label for="printing length">material price:</label>
            <input type="text" id="finishing" v-model="formModel.facestockCost" required readonly/>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div>
        <h2>PRICING FIELD</h2>
        <div class="group-container">
          <div class="form-group">
            <div class="form-item">
              <label for="printing length">Unit Cost:</label>
              <input type="text" id="finishing"  v-model="unitCost" required readonly/>
            </div>
            <div class="form-item">
              <label for="printing length">Unit Cost Without Tooling:</label>
              <input type="text" id="finishing"  v-model="unitCostWithoutTooling" required readonly/>
            </div>
          </div>
          <div class = "form-group">
            <div class="form-item">
              <label for="printing length">margin:</label>
              <input type="text" id="finishing" @input="setMargin" v-model="margin" required/>
            </div>
          </div>
          <div class="form-group">
            <div class="form-item">
              <label for="printing length">RSP:</label>
              <input type="text" id="finishing"  v-model="RSP" required readonly/>
            </div>
            <div class="form-item">
              <label for="printing length">Current Selling Price:</label>
              <input type="text" id="finishing"  v-model="sellingPrice" required readonly/>
            </div>
            <div class="form-item">
              <label for="printing length">Current Margin:</label>
              <input type="text" id="finishing"  v-model="calculateCurrentMargin" required readonly/>
            </div>
          </div>
        </div>
      </div>
      <h2>TOTAL COST</h2>
      <div class="group-container">
        <div class="form-group">
          <div class="form-item">
            <label for="printing length">fixed cost:</label>
            <input type="text" id="finishing" v-model="calculateFixedCosts" required readonly/>
          </div>
        </div>
        <div class="form-group">
          <div class="form-item">
            <label for="printing length">total material cost</label>
            <input type="text" id="finishing" v-model="totalMaterialCost" required readonly/>
          </div>
        </div>
        <div class = "form-group">
          <div class="form-item">
            <label for="printing length">total tooling cost:</label>
            <input type="text" id="finishing" v-model="totalToolingCost" required readonly/>
          </div>
        </div>
        <div class="form-group">
          <div class="form-item">
            <label for="printing length">sum Cost:</label>
            <input type="text" id="finishing"  v-model="sumCost" required readonly/>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2>CALCULATED LENGTH FIELD</h2>
      <div class="group-container">
        <div class="form-group">
          <div class="form-item">
            <label for="printing length total">Label printing length total:</label>
            <input type="text" id="finishing" v-model="calculatePrintingLengthTotal" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing gap">Back print m:</label>
            <input type="text" id="finishing" v-model="calculateBackPrint" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing length">Label wastage:</label>
            <input type="text" id="finishing" v-model="machineSpec.wastage" required readonly/>
          </div>
        </div>
        <div class = "form-group">
          <div class="form-item">
            <label for="printing length">Label printing length:</label>
            <input type="text" id="finishing" v-model="calculatePrintingLength" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing length">Label color setting length:</label>
            <input type="text" id="finishing" v-model="calculateSettingLengthColor" required />
          </div>
        </div>
        <div class="form-group">
          <div class="form-item">
            <label for="printing gap">Sheet Form Setting:</label>
            <input type="text" id="finishing" v-model="calculateSheetFormLength" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing length">Label joints setting length:</label>
            <input type="text" id="finishing" v-model="calculateJointLengthWastage" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing gap">Process Wastage:</label>
            <input type="text" id="finishing" v-model="calculateProcessWastage" required readonly/>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2>MATERIAL COST</h2>
      <div class="group-container">
        <div class="form-group">
          <div class="form-item">
            <label for="printing length">ink cost:</label>
            <input type="text" id="finishing" v-model="calculateInkCost" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing length">varnish cost:</label>
            <input type="text" id="finishing" v-model="calculateVarnishCost" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing length">total paper cost</label>
            <input type="text" id="finishing" v-model="calculatePaperMaterialPrice" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing gap">Multi Form Ink:</label>
            <input type="text" id="finishing" v-model="calculateMultiformInk" required readonly/>
          </div>
        </div>
        <div class="form-group">
          <div class="form-item">
            <label for="laminate cost">Laminate cost:</label>
            <input type="text" id="finishing" v-model="calculateLaminateCost" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing gap">Multi Form Material:</label>
            <input type="text" id="finishing" v-model="calculateMultiformMaterial" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing gap">Kill Glue Cost:</label>
            <input type="text" id="finishing" v-model="calculateKillGlueCost" required readonly/>
          </div>
        </div>
        <div class="form-group">
          <div class="form-item">
            <label for="printing gap">Foil Cost:</label>
            <input type="text" id="finishing" v-model="calculateFoilCost" required readonly/>
          </div>
          <div class="form-item">

          </div>
          <div class="form-item">

          </div>
        </div>
      </div>
    </div>
    <div>
      <h2>TOOLING COST</h2>
      <div class="group-container">
        <div class="form-group">
          <div class="form-item">
            <label for="printing gap">Perforated Die Cut:</label>
            <input type="text" id="finishing" v-model="calculatePerforatedCut" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing gap">Silk Screen Plate Price:</label>
            <input type="text" id="finishing" v-model="calculateSilkscreenPlate" required readonly/>
          </div>
      </div>
        <div class="form-group">
          <div class = "form-item">
            <label for="printing length">diecut cost:</label>
            <input type="text" id="finishing" v-model="calculateDieCut" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing gap">Back Cut:</label>
            <input type="text" id="finishing" v-model="calculateBackCutCutter" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing length">plate cost:</label>
            <input type="text" id="finishing" v-model="calculatePlatePrice" required readonly/>
          </div>
        </div>
        <div class="form-group">
          <div class="form-item">
            <label for="printing gap">Hot Stamping Plate:</label>
            <input type="text" id="finishing" v-model="calculateHotStampingPlate" required readonly/>
          </div>
          <div class="form-item">
            <label for="printing gap">Cold Foil Plate Cost:</label>
            <input type="text" id="finishing" v-model="calculateFoilPlate" required readonly/>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2>DONE</h2>
      <div class="group-container">
        <div class="form-group">
          <button @click="runAsyncFunctions" id="registercosting">Next</button>
        </div>
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

  props: {
    costingNumber: Number, // Define a prop to receive the costingNumber from the parent
  },

  data() {
    return {
      receivedCostingNumber: this.costingNumber,
      modifiedCostingNumber: this.costingNumber,
      sellingPrice:[],
      machineInfo:[],
      costingInfo:[],
      margin: 0.2,
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
        currentSellingPrice:'',
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
        orderQuantity:'',
        dieCutType: 'flexible',

      },
      machineSpec:{
        maxWidth:'',
        coatingWeight:'',
        trim:'',
        jointWastage:'',
        rollLength: '',
        settingLength:'',
        wastage:'',
        gearPitch:'',
        platePrice:'',
        gapAcross:'',
        solidDiecutPrice:'',
        flexibleDiecutPrice:'',
        flatbedDiecutPrice:'',
        silkScreenPlatePrice:'',
        hotStampingPlatePrice:'',
      },
      save:{
        RSP:'',
        currentSellingPrice: '',
        totalToolingCost:'',
        unitCost:'',
        costingId:'',
        gap:'',
        materialWidth:'',
        totalCost:'',
        inkCost:'',
        paperCost:'',
        laminateCost:'',
        varnishCost:'',
        foilCost:'',
        totalmaterialCost:'',
        fixedCost:'',
        dieCutCost:'',
        plateCost:'',
        settingLength:'',
        wastageLength:'',
        totalLength:'',

      },
    };
  },

  computed: {

    calculateCurrentMargin(){
      const unitCost = this.unitCost;
      const sellingPrice = this.sellingPrice;

// Calculate the margin for each entry and store in the margins array
      const margins = sellingPrice.map((price, index) => {
        return ((price - unitCost[index]) / price) * 100;
      });

      console.log(margins); // Array of calculated margins
      return margins.map((value) => parseFloat(value.toFixed(2)))

    },

    calculateProcessWastage(){
      let wastage = this.splitProcessWastage;
      let splitData1=[];
      let currentwastage = 0;
      for (let i = 0; i < wastage.length; i++) {
        splitData1.push(parseInt(currentwastage) + parseInt(wastage[i]));
        currentwastage = splitData1[i];
      }
      return currentwastage;
    },

    splitProcessWastage(){
      let data = this.formModel.process;
      const splitData = data.split(',');

      const splitData1 = [];

      for (let i = 2; i < splitData.length; i+=3) {
        splitData1.push(splitData[i]);
      }
      return splitData1;
    },

    splitProcessCost(){
      let data = this.formModel.process;
      const splitData = data.split(',');

      const splitData1 = [];

      for (let i = 1; i < splitData.length; i+=3) {
        splitData1.push(splitData[i]);
      }
      return splitData1;
    },

    getMargin(){
      return this.margin ;

    },

    RSP(){
      let rsp=[]
      for(let i=0;i<this.moq.length;i++) {
        const unitcost = this.unitCost[i];
        const margin = 1/(parseInt(1)-parseFloat(this.margin));
        const sp = unitcost*margin;
        rsp.push(sp);
      }
      return rsp.map((value) => parseFloat(value.toFixed(4)));
    },

    unitCostWithoutTooling(){
      let sum=[]
      for(let i=0;i<this.moq.length;i++) {
        const quantity = this.moq[i];
        const materialCost = this.totalMaterialCost[i];
        const fixedCost = this.calculateFixedCosts[i];
        const total = ((materialCost+fixedCost)/quantity);
        sum.push(total);
      }
      return sum.map((value) => parseFloat(value).toFixed(4));
    },


    unitCost(){
      let unitcost=[]
      for(let i=0;i<this.moq.length;i++) {
        const sum = this.sumCost[i];
        const moq = this.moq[i];
        const uc = sum/moq;
        unitcost.push(uc);
      }
      return unitcost.map((value) => parseFloat(value).toFixed(4));
    },

    sumCost(){
      let sum=[]
      const toolingCost = this.totalToolingCost;
      for(let i=0;i<this.moq.length;i++) {
        const materialCost = this.totalMaterialCost[i];
        const fixedCost = this.calculateFixedCosts[i];
        const total = parseFloat(materialCost)+parseFloat(fixedCost)+parseFloat(toolingCost);
        sum.push(total);
      }
      return sum.map((value) => parseFloat(value).toFixed(2));
    },

    totalMaterialCost(){
      let sum=[]
      for(let i=0;i<this.moq.length;i++) {
        const paperCost = this.calculatePaperMaterialPrice[i];
        const varnishCost = this.calculateVarnishCost[i];
        const inkCost = this.calculateInkCost[i];
        const fixedCost = this.calculateFixedCosts[i];
        const laminateCost = this.calculateLaminateCost[i];
        const foilCost = this.calculateFoilCost[i];
        const killGlueCost = this.calculateKillGlueCost[i];
        const multiFormMaterialCost = this.calculateMultiformMaterial[i];
        const multiFormInkCost = this.calculateMultiformInk[i];



        const total = paperCost+varnishCost+inkCost+fixedCost+laminateCost+foilCost+killGlueCost+multiFormMaterialCost+multiFormInkCost;
        sum.push(total);
      }
      return sum.map((value) => parseFloat(value.toFixed(2)));
    },


    calculatePrintingLengthTotal(){
      let printLength=null;
      printLength=this.moq.map(moq => moq *
          (((((parseFloat(this.formModel.pitch)+parseFloat(this.calculateGap))/1000)/this.formModel.across))
          * (1+parseFloat(this.machineSpec.wastage)))
          +parseInt(this.calculateSettingLengthColor)
          +parseInt(this.calculateJointLengthWastage)
          +parseInt(this.calculateBackPrint)
          +parseInt(this.calculateKillGlueLength)
          +parseInt(this.calculateSheetFormLength)
          +parseInt(this.calculateProcessWastage)

      );
      return printLength.map((value) => parseFloat(value.toFixed(0)));
    },

    calculatePrintingLengthWastage(){
      let printLength=null;
      printLength=this.moq.map(moq => moq *
          (((((parseFloat(this.formModel.pitch)+parseFloat(this.calculateGap))/1000)/this.formModel.across))
              * (parseFloat(this.machineSpec.wastage)))
          +parseInt(this.calculateJointLengthWastage)
          +parseInt(this.calculateBackPrint)
          +parseInt(this.calculateKillGlueLength)
          +parseInt(this.calculateSheetFormLength)
          +parseInt(this.calculateProcessWastage)

      );
      return printLength.map((value) => parseFloat(value.toFixed(0)));
    },



    totalToolingCost(){
      const sum = this.calculatePlatePrice + this.calculateDieCut +
          this.calculateFoilPlate +this.calculateKillGluePlate+this.calculateHotStampingPlate
          +this.calculateBackCutCutter+this.calculatePerforatedCut;
      return parseFloat(sum).toFixed(3);
    },

    //i dont even know how this part works
    calculateFixedCosts() {
      const fixedCosts = this.splitProcessCost;
      const totalFixedCosts = []; //intialize for fixed cost matrix

      for (let i = 0; i < this.calculatePrintingLengthTotal.length; i++) {//sets loop parameter to go through each length
        let currentLength = this.calculatePrintingLengthTotal[i];
        let lengthFixedCosts = 0;//initialize for summing fixed cost for length

        for (let j = 0; j < fixedCosts.length; j++) {//loops through the process of length
          const fixedCost = fixedCosts[j];//calls the first process fixed cost
          lengthFixedCosts += parseFloat(fixedCost) * currentLength;//sums the whole process of fixedcost x length
        }

        totalFixedCosts.push(lengthFixedCosts); //push each fixed cost to respective length
      }

      return totalFixedCosts.map((value) => parseFloat(value.toFixed(4)));

    },

    calculateDieCut(){
      let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
      let diecut = finishingArray.filter(item => item.trim() === 'diecut').length;
      let diecutType = this.formModel.dieCutType.toLowerCase(); //
      if(diecut>0) {
        if (diecutType === "flexible") {
          const diecutPrice = this.machineSpec.flexibleDiecutPrice * this.calculateMaterialWidth / 1000;
          return diecutPrice;
        }
        if (diecutType === "flatbed") {
          const diecutPrice = this.machineSpec.flatbedDiecutPrice * ((2 * parseInt(this.formModel.pitch) / 1000) + (2 * parseInt(this.formModel.width) / 1000)) + parseInt(80);
          return diecutPrice;
        }
        if (diecutType === "solid") {
          const diecutPrice = this.machineSpec.solidDiecutPrice * this.calculateMaterialWidth / 1000;
          return diecutPrice;
        }
      }
      return 0;

    },

    calculatePerforatedCut(){
      let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
      let diecut = finishingArray.filter(item => item.trim() === 'perforated').length;
      let perforated = diecut * 50
      return perforated;

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
      gap = parseFloat(((this.formModel.gear*this.machineSpec.gearPitch)/this.formModel.around)) - parseFloat(this.formModel.pitch);
      return parseFloat(gap.toFixed(3));
    },

    calculatePrintingLength(){
      let printLength=null;
      printLength=this.moq.map(moq => moq *
          (((parseFloat(this.formModel.pitch)+parseFloat(this.calculateGap))/this.formModel.across)/1000)
          );
      return printLength.map((value) => parseFloat(value.toFixed(0)));
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
        let platePrice = this.machineSpec.platePrice; //rm/m2
        let length = parseFloat(this.formModel.pitch/1000); //m
        let width = parseFloat(this.formModel.width/1000); //m
        //let gap = parseFloat(this.calculateGap)/1000;
        let plateArea =  length * width * this.formModel.around * this.formModel.across*1.1;
        let plateCost = plateArea * platePrice *foilCount;
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

    calculateBackPrint(){
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

    calculateKillGlueCost() {
      let printLength = this.calculatePrintingLengthTotal;
      let materialWidth = this.calculateMaterialWidth / 1000;

      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let killGlueCount = finishingArray.filter(item => item.trim() === 'killglue').length;

        let killGlueCost = this.formModel.varnishCost / 1000; // rm/g
        let coatingWeight = this.machineSpec.coatingWeight; // g/m2

        let killGlueUse = printLength.map(length => length * materialWidth * killGlueCost * killGlueCount * coatingWeight);
        return killGlueUse.map(value => parseFloat(value.toFixed(2)));
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }
    },

    calculateKillGluePlate() {


      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let killGlueCount = finishingArray.filter(item => item.trim() === 'killglue').length;
        let platePrice = this.machineSpec.platePrice; //rm/m2
        let length = parseFloat(this.formModel.pitch/1000); //m
        let width = parseFloat(this.formModel.width/1000); //m
        //let gap = parseFloat(this.calculateGap)/1000;
        let plateArea =  length * width * this.formModel.around * this.formModel.across*1.1;
        let plateCost = plateArea * platePrice *killGlueCount;
        return parseFloat(plateCost.toFixed(2));
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }
    },

    calculateKillGlueLength(){
      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let printCount = finishingArray.filter(item => item.trim() === 'killglue').length;

        let settingMat = 250; // rm/m2

        let matuse = settingMat * printCount;
        return matuse;
      } else {
        return 0; // Return an empty array if formModel.finishing is undefined
      }
    },

    calculateHotStampingPlate() {


      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let hotStampingCount = finishingArray.filter(item => item.trim() === 'hotstamp').length;
        let platePrice = this.machineSpec.hotStampingPlatePrice; //rm/m2
        let length = parseFloat(this.formModel.pitch/1000); //m
        let width = parseFloat(this.formModel.width/1000); //m
        //let gap = parseFloat(this.calculateGap)/1000;
        let plateArea =  length * width * this.formModel.across*1.1;
        let plateCost = plateArea * platePrice *hotStampingCount;
        return parseFloat(plateCost.toFixed(2));
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }
    },

    calculateSilkscreenPlate() {


      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let silkScreenPlate = finishingArray.filter(item => item.trim() === 'silkscreen').length;
        let platePrice = this.machineSpec.silkScreenPlatePrice; //rm/m2
        let length = parseFloat(this.formModel.pitch/1000); //m
        let width = parseFloat(this.formModel.width/1000); //m
        //let gap = parseFloat(this.calculateGap)/1000;
        let plateArea =  length * width * this.formModel.across * this.formModel.across * 1.1;
        let plateCost = plateArea * platePrice *silkScreenPlate;
        return parseFloat(plateCost.toFixed(2));
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }
    },

    calculateBackCutCutter() {


      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let backCutPlate = finishingArray.filter(item => item.trim() === 'backcut').length;
        let plateCost = backCutPlate * 50
        return parseFloat(plateCost.toFixed(2));
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }
    },

    calculateMultiformMaterial() {
      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let printLength = this.calculatePrintingLengthTotal;
        let materialWidth = this.calculateMaterialWidth / 1000;
        let formCost = 1.4;
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let multiformCount = finishingArray.filter(item => item.trim() === 'multiform').length;
        let formUse = printLength.map(length => length * materialWidth * formCost * multiformCount);
        return formUse.map(value => parseFloat(value.toFixed(2)));
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }
    },

    calculateMultiformInk(){

      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let multiformCount = finishingArray.filter(item => item.trim() === 'multiform').length;
        let printLength = this.calculatePrintingLengthTotal;
        let materialWidth = this.calculateMaterialWidth/1000;
        let inkCost = this.formModel.inkCost/1000; //rm/g
        let color = this.formModel.color;
        let coatingWeight = this.machineSpec.coatingWeight; //g/m2
        let inkUse = printLength.map(length=> ((length)*materialWidth*inkCost*color*coatingWeight*multiformCount)*1.05);
        return inkUse.map((value) => parseFloat(value.toFixed(2)));
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }

    },

    calculateSheetFormLength(){
      if (this.formModel.finishing) { // Check if formModel.finishing is defined
        let finishingArray = this.formModel.finishing.toLowerCase().split(','); // Convert the string to an array
        let sheetFormCount = finishingArray.filter(item => item.trim() === 'sheetform').length;
        let rollLength = 1000;
        let jointWastage = 1; //how much material required to autocut
        let printLength = this.moq.map(moq => moq *
            (((parseFloat(this.formModel.pitch)+parseFloat(this.calculateGap))/this.formModel.across)/1000)
        );
        let numberOfJoints = printLength.map(print=> Math.ceil(print / rollLength));//how many rolls
        let jointLength = numberOfJoints.map(joint => Math.round(joint * jointWastage * sheetFormCount));//how many autocut need to reload
        return jointLength;
      } else {
        return []; // Return an empty array if formModel.finishing is undefined
      }

    },



  },

  created() {

    this.getCurrentSellingPrice();

    this.getMachine();

    this.getInfo();

    this.getMoq();

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

    updateCostingData() {
      // Emit a custom event to update the parent with the modified costingNumber
      this.$emit("updateCostingData", this.modifiedCostingNumber);
    },

    setMargin(){
      this.margin = this.getMargin;
    },

    saveCalculation(){
      this.save.totalToolingCost = this.totalToolingCost;
      this.save.unitCost = this.unitCost;
      this.save.costingId = this.newCostingId;
      this.save.gap = this.calculateGap;
      this.save.printingLength = this.calculatePrintingLength;
      this.save.materialWidth = this.calculateMaterialWidth;
      this.save.totalCost = this.sumCost;
      this.save.inkCost = this.calculateInkCost;
      this.save.paperCost = this.calculatePaperMaterialPrice;
      this.save.laminateCost = this.calculateLaminateCost;
      this.save.varnishCost = this.calculateVarnishCost;
      this.save.foilCost = this.calculateFoilCost;
      this.save.totalMaterialCost = this.totalMaterialCost;
      this.save.fixedCost = this.calculateFixedCosts;
      this.save.dieCutCost = this.calculateDieCut;
      this.save.plateCost = this.calculatePlatePrice;
      this.save.settingLength = this.calculateSettingLengthColor;
      this.save.wastageLength = this.calculatePrintingLengthWastage;
      this.save.totalLength = this.calculatePrintingLengthTotal;
      this.save.currentMargin = this.calculateCurrentMargin;
      this.save.RSP = this.RSP;



    },

    emitValue(){
      const costingdata=this.formModel;
      const calculated=this.save;
      const machinespec = this.machineSpec;
      this.$emit('machine', machinespec);
      this.$emit('calculated', calculated);
      this.$emit('costingdata', costingdata);

    },

    getMoq() {
      if (this.formModel.orderQuantity) {
        // Split the input string by ';'
        let quantities = this.formModel.orderQuantity.split(';').map(qty => qty.trim());

        // Convert each quantity to a number and store in the moq array
        this.moq = quantities.map(qty => parseInt(qty, 10));
      } else {
        this.moq = []; // Clear the moq array if no input
      }

    },

    getCurrentSellingPrice() {
      if (this.formModel.currentSellingPrice) {
        // Split the input string by ';'
        let quantities = this.formModel.currentSellingPrice.split(';').map(qty => qty.trim());

        // Convert each quantity to a number and store in the moq array
        this.sellingPrice = quantities.map(qty => parseFloat(qty).toFixed(4));
      } else {
        this.selling = []; // Clear the moq array if no input
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
        this.formModel.orderQuantity = allCostingInfo[0].quantity; // Set the selected material
        this.formModel.dieCutType = allCostingInfo[0].diecut; // Set the selected material
        this.formModel.currentSellingPrice = allCostingInfo[0].sellingprice; // Set the selected material
        this.getCurrentSellingPrice()

        this.getMoq();
        this.emitValue();
        this.saveCalculation();



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
        this.machineSpec.hotStampingPlatePrice=allMachineInfo[0].hotstampingplateprice;
        this.machineSpec.silkScreenPlatePrice=allMachineInfo[0].silkscreenplateprice;
        this.machineSpec.flexibleDiecutPrice=allMachineInfo[0].flexiblediecutprice;
        this.machineSpec.flatbedDiecutPrice=allMachineInfo[0].flatbeddiecutprice;
        this.machineSpec.solidDiecutPrice=allMachineInfo[0].soliddiecutprice;
        this.machineSpec.machineName = allMachineInfo[0].machinename;

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


.table{
  margin: 10px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
}

.container{
  margin :10px;
  display: flex;
  flex-direction: column ;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}

.form-item{
  margin: 10px;
  width: 400px;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  justify-items: center;
}
.form-group {
  margin-right: 20px;
  margin-bottom: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
}

.table-container {
  height: auto;
  overflow-y: auto; /* Add vertical scroll if necessary */
  background-color: white;
  display: flex;
}

.group-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px
}

.form-group {
  margin-right: 20px;
  margin-bottom: 10px;
  display: grid;
  align-items: center;
  justify-content: space-evenly;
}

select{
  width: 100%;
  height: 35px;
  margin-left: 20px;
}


</style>
