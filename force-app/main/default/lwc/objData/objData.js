import { LightningElement,track  } from 'lwc';
import getObjects from '@salesforce/apex/SchemaGen.getObjects';
import getObjectDescription from '@salesforce/apex/SchemaGen.getObjectDescription';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Objdata extends LightningElement {

    @track childopenDropDown = false;
    @track childinputValue = "";
     childoptions;
    @track childoptionsToDisplay;
     childvalue = "";
    @track label = ""
    delaytimeout;
    sobjectlist=[];
    selectedFields = [];
    fields = [];
    filterObjectlist=[];
    @track showSearchedValues = false; 

    @track 
    sobjectlist = [];
    selectedsobject = '';
    isLoading = true;


    jsonString = '';
    
    @track metattriaData=[];
    @track childData=[];
    @track childDataMeta=[];

    @track attributes=[];
    @track fields=[];


    connectedCallback() {
        //code
        getObjects()
        .then((result)=>{
            console.log(result);
            this.sobjectlist = result;
            this.isLoading = false;
        }).catch(error => {
                console.error(error);
                this.showNotification('Error',err.body.message,'Error');
         });
    }

    handleSobjectChange(event){
        this.jsonString = '';
        this.selectedsobject = event.detail.value;
       //this.resetEditor();
        this.getSobjectDescription();
    }

    handleKeyPress(event) {
        
        const csearchKey = event.target.value;
        this.setInputValue(csearchKey);

        console.log('Iam here' + csearchKey);
       /*  if (this.delaytimeout) {
            window.clearTimeout(this.delaytimeout);
        }

        this.delaytimeout = setTimeout(() => { */
            this.filterDropdownList(csearchKey);
      /*   }, 300); */
     //   this.isShowResult = true;
        this.showSearchedValues = true;
    }
  
    filterDropdownList(key) {

        console.log('LOG::' + key);
        const cfilteredOptions = this.sobjectlist.filter(p => String(p.label).toLowerCase().startsWith(key.toLowerCase()));
        console.log('LOG::b' + JSON.stringify(cfilteredOptions))
        this.filterObjectlist = JSON.parse(JSON.stringify(cfilteredOptions));
    }

    optionsClickHandler(event) {
        const selectedsobject = event.target.closest('li').dataset.value;
        const label = event.target.closest('li').dataset.label;
        console.log(selectedsobject);
        this.csetValues(selectedsobject, label);
        this.setInputValue(selectedsobject);
        this.togglechildOpenDropDown(false);
        this.getSobjectDescription();
        this.showSearchedValues = false; 
       // this.isShowResult = false;
    }
  
     handleFieldsChange(event){
        this.selectedFields = event.detail.value;
      }
     
    resetParameters() {
        this.setInputValue("");
        this.childoptionsToDisplay = this.childoptions;
    }

    setInputValue(selectedsobject) {
        this.childinputValue = selectedsobject;
    }

    
    csetValues(value, label) {
        this.label = label;
        this.selectedsobject = value;
    }


    togglechildOpenDropDown(ctoggleState) {
        this.childopenDropDown = ctoggleState;
    }

    getSobjectDescription(){
        // alert(this.selectedsobject);
         this.isLoading = true;
         getObjectDescription({
              'sObjectName':this.selectedsobject
          })
         .then((result)=>{
             console.log('abc',result);
             let _result =  JSON.stringify(JSON.parse(result), null, 2);
             console.log('bcd',_result);
             this.jsonString =JSON.parse(_result) ;
             console.log('cdef',this.jsonString);

             

const actionOverride = this.jsonString.actionOverrides[0];
console.log('cde',actionOverride);

for(var key in actionOverride){
    this.metattriaData.push({value: actionOverride[key], key:key});
}
for(var val in this.jsonString){
    
    this.childData.push({value: this.jsonString[val], key:val});
}
for(var childData in this.jsonString.childRelationships){  
    this.childDataMeta.push({value: this.jsonString[childData], key:childData});
}
/* for (const [key, value] of Object.entries(this.jsonString.childRelationships)) {
    console.log('childsssss >>',key, value);
  } */


         }).catch(error => {
                 console.error(error);
              //   this.showNotification('Error',err.body.message,'Error');
          }).finally(()=>{
            this.isLoading = false;

          });
 
     }

     /* get supportedscopes(){
        const abc = this.jsonString.supportedScopes[0];
        console.log('cde',abc);
        for(var val in abc){
            this.childData.push({value: abc[val], key:val});
     }
    } */
    get hasattributes() {
        return this.metattriaData === undefined || this.metattriaData === 0;

     }
    
}