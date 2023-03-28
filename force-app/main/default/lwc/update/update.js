import { LightningElement,track } from 'lwc';
import getObjects from '@salesforce/apex/SOQLEditorController.getObjects';
import { NavigationMixin } from 'lightning/navigation';
import BulkUpdate from '@salesforce/apex/CSVImportController.BulkUpdate';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Update extends  NavigationMixin(LightningElement) {
    @track 
    sobjectlist = [];
    selectedsobject = '';
    recordID = '';
    connectedCallback() {
        //getting all sobjects from apex class and we are storing the objects in an variable
        getObjects()
        .then((result)=>{
            this.sobjectlist = result;
            this.isLoading = false;
        }).catch(error => {
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
    handleIdChange(event){
        this.recordID = event.detail.value;
    }
    value = ''; 
    get options() {
        return [
            { label: 'Multiple Upload', value: 'Multiple' },
            { label: 'Single Upload', value: 'Single' },
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
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.recordID,
                    objectApiName: this.selectedsobject, // objectApiName is optional
                    actionName: 'edit'
                }
            });
    }
    @track contentDocumentId;
    @track recordCount;
    uploadFileHandler( event ) {
        const uploadedFiles = event.detail.files;
        // to get document id
        this.contentDocumentId=uploadedFiles[0].documentId;
        BulkUpdate({ contentDocumentId : this.contentDocumentId,
            objectName : this.selectedsobject })
        .then((result)=>{
          this.recordCount=result;  
          const event = new ShowToastEvent({
          title: 'Success',
          message:'records Updated Successfully.',
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
              message:'Error while Updated Records',
              mode:'dismissible'
           })
           this.dispatchEvent(event);
        })
    }
}