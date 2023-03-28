import { LightningElement,track } from 'lwc';
import getObjects from '@salesforce/apex/SOQLEditorController.getObjects';
import { NavigationMixin } from 'lightning/navigation';
import BulkUpsert from '@salesforce/apex/CSVImportController.BulkUpsert';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Upsert extends LightningElement {
       @track sobjectlist = [];
    selectedsobject = '';
    recordID = '';
    connectedCallback() {
        //getting all sobjects from apex class and we are storing the objects in an variable
        getObjects()
        .then((result)=>{
            this.sobjectlist = result;
            this.isLoading = false;
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
    handleIdChange(event){
        this.recordID = event.detail.value;
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
         this.contentDocumentId=uploadedFiles[0].documentId;
        BulkUpsert({ contentDocumentId : this.contentDocumentId,
            objectName : this.selectedsobject })
        .then((result)=>{
          this.recordCount=result;
          const event = new ShowToastEvent({
          title: 'Success',
          message:'records Upserted Successfully.',
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
              message:'Error while Upserted Records',
              mode:'dismissible'
           })
           this.dispatchEvent(event);
        })
    }
}