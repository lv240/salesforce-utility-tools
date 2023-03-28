import { LightningElement,track,api } from 'lwc';
import getObjects from '@salesforce/apex/SOQLEditorController.getObjects';
import { NavigationMixin } from 'lightning/navigation';
import BulkDelete from '@salesforce/apex/CSVImportController.BulkDelete';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Delete extends LightningElement {
    @track 
    sobjectlist = [];
    selectedsobject = '';
    @api
    myRecordId;
    value1;
    isEnabled =  false;
    isShow = false;
    connectedCallback() {
        //getting all sobjects from apex class and we are storing the objects in an variable
        getObjects()
        .then((result)=>{
            this.sobjectlist = result;
            this.isLoading = false;
            this.isShow = true;
        }).catch(error => {
                console.error(error);
                this.showNotification('Error',err.body.message,'Error');
         });
    }
/*
        This method is used to set the selected object
        event : used to get the selected object
    */
    handleSobjectChange(event){
        this.selectedsobject = event.target.value;
    }
    value = ''; 
    get options() {
        return [
            { label: 'Multiple Upload', value: 'Multiple' },
           // { label: 'Single Upload', value: 'Single' },
        ];
    }
    @track MultipleVal = false;
    @track SingleVal = false;
    get acceptedFormats() {
        return ['.csv'];
       }
    handleChange(event) {    
        this.value = event.detail.value;        
        if (this.value == 'Multiple'){
            this.MultipleVal = true;
        }else{
            this.MultipleVal = false;
        }       
        if (this.value == 'Single'){
            this.SingleVal = true;
        }else{
            this.SingleVal = false;
        }
        
    }
     SingleRecord(event) {
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: this.selectedsobject,
                    actionName: 'delete'
                }                
            });
    }
    @track contentDocumentId;
    @track recordCount;
    uploadFileHandler( event ) {
        const uploadedFiles = event.detail.files;
        // to get document id
        this.contentDocumentId=uploadedFiles[0].documentId;
        console.log('heyyyy',this.contentDocumentId);
        BulkDelete({ contentDocumentId : this.contentDocumentId,
            objectName : this.selectedsobject })
        .then((result)=>{
          this.recordCount=result;
          const event = new ShowToastEvent({
          title: 'Success',
          message:'records deleted Successfully.',
           variant:'success',
           mode:'dismissible'
           });
           this.dispatchEvent(event);
         })
        .catch((error)=>{
           this.error = error;
           const event=new ShowToastEvent({
              title:'Error',
              variant:'error',
              message:'Error while deleteding Records',
              mode:'dismissible'
           })
           this.dispatchEvent(event);
        })
    }
}