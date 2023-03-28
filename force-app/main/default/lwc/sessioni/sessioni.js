import { LightningElement,track } from 'lwc';

import dogetuserInfo from '@salesforce/apex/UserInfoClass.dogetuserInfo';

//import getUserDetails from '@salesforce/apex/Userdata.getUserDetails';

export default class Sessioni extends LightningElement {


    
    //@track 
    //sobjectlist = [];
    //selectedsobject = '';
    //isLoading = true;
    @track userInfo=[];
    @track userData=[];


    //jsonString = '';
    


    connectedCallback() {
        //code
        dogetuserInfo()
        .then((result)=>{
            console.log(result);
            for(let data=0; data<result.length;data++){
                console.log('data',result[data])
                this.userData = result[data];
            }
            /* for (const [key, value] of Object.entries(result)) {
                this.userData.push({value:value, key:key});
                console.log('abc',this.userData)
            } */
        }).catch(error => {
                console.error(error);
                this.showNotification('Error',err.body.message,'Error');
         });
    }

   /* connectedCallback() {
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
    }*/

  
    
   
     

}