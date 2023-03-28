import { LightningElement,track,wire } from 'lwc';
import getObjects from '@salesforce/apex/SchemaGenerator.getObjects';
import objInfo from '@salesforce/apex/SchemaGenerator.objInfo';

export default class SobjectData extends LightningElement {
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
   // @track isShowResult = true;  
    @track 
    selectedsobject = '';
    isLoading = true;


    @track metaData;
    @track metattriaData=[];
    @track metarecData=[];
@track actualResults=[];

@track fieldscount;

    connectedCallback() {
        //code
        getObjects()
        .then((result)=>{
            console.log(result);
            this.sobjectlist = result;
            this.isLoading = false;
            this.pfilterObjectlist = result;
            this.SearchedValues = false; 
        }).catch(error => {
                console.error(error);
                this.showNotification('Error',error.body.message,'Error');
         });
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
         objInfo({
              'sObjectName':this.selectedsobject
          })
         .then((result)=>{
            console.log( result);

             this.metaData = result ;
 this.fieldscount = this.metaData.fieldWrapper.length;
 this.childcount = this.metaData.childRelationshipwrapper.length;


             //TODO use object.keys to create a map
             for(var key in this.metaData.attributes){
                this.metattriaData.push({value: this.metaData.attributes[key], key:key});
            }
            for(var rec in this.metaData.recordTypes){
                this.metarecData.push({value: this.metaData.recordTypes[rec], key:rec});
            }
            this.recordcount = this.metarecData.length;


            console.log('LOG: ' + JSON.stringify(this.metaData.childRelationshipwrapper));
            

         }).catch(error => {
                 console.error(error);
              //   this.showNotification('Error',err.body.message,'Error');
          }).finally(()=>{
            this.isLoading = false; 

          });
 
     }
   
     activeSectionsMessage = '';

     handleSectionToggle(event) {
         const openSections = event.detail.openSections;
 
         if (openSections.length === 0) {
             this.activeSectionsMessage = 'All sections are closed';
         } else {
             this.activeSectionsMessage =
                 'Open sections: ' + openSections.join(', ');
         }
     }

     get hasChildRelationShips() {
        return this.metaData.childRelationshipwrapper === undefined || this.metaData.childRelationshipwrapper.length === 0;
     }
     get hascustomStandardFields() {
        return this.metaData.customStandardFields === undefined || this.metaData.customStandardFields.length === 0;
     }
     get hasattributes() {
        return this.metattriaData === undefined || this.metattriaData === 0;

     }
     get hasrecordTypes() {
        return this.metarecData === undefined || this.metarecData === 0;
     } 
     get FieldValue(){
        return 'Fields' +' ('+ this.fieldscount + ')';
        }
        get ChildValue(){
            return 'child Relationships' +' ('+ this.childcount + ')';
            }
            get RecordValue(){
                return 'recordTypes' +' ('+ this.recordcount + ')';
                }
    

}