import { LightningElement } from 'lwc';
import getSobjectData from '@salesforce/apex/testClass_Dashboard.getSobjectData';
export default class TestclassDashboard extends LightningElement {
    sobjectlist;
    connectedCallback() {
        //getting all sobjects from apex class and we are storing the objects in an variable
        getSobjectData()
            .then((result) => {
                this.sobjectlist = result;
                console.log(result)
                this.isLoading = false;
            }).catch(error => {
                console.error(error);
                this.showNotification('Error', err.body.message, 'Error');
            });
    }
}