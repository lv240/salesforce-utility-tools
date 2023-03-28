import { LightningElement,track } from 'lwc';
import dogetuserInfo from '@salesforce/apex/Userd.dogetuserInfo';
import dogetInfo from '@salesforce/apex/Userd.dogetInfo';


export default class Infolwc extends LightningElement {
    @track userInfo=[];
    @track userData=[];
    
    connectedCallback() {
        //code
        dogetuserInfo()
        .then((result)=>{
            console.log(result);
          
            /*for(let data=0; data<result.length;data++){
                console.log('data',result[data])
                this.userData = result[data];
            }*/
        
            /*for (const [key, value] of Object.entries(JSON.parse(JSON.stringify(result)))) {

                this.userData.push({value:value, key:key});
                console.log(JSON.parse(JSON.stringify(this.userData)));
                console.log('abc',this.userData)
            } */


            /*const keyValue = () => Object.entries(input).forEach(([key,value]) => {
                console.log(key,value)
              })*/

              for (let [key, value] of Object.entries(result)) {
                console.log(key, value);
                this.userInfo.push({key:key,value:value});
            }

           
              
        }).catch(error => {
                console.error(error);
                this.showNotification('Error',err.body.message,'Error');
         });
         dogetInfo()
         .then((result)=>{
             console.log(result);
             for (let [key, value] of Object.entries(result)) {
                 console.log(key, value);
                 this.userInfo.push({key:key,value:value});
             }
            });
    }


   /*  connectedCallback() { 
        //code
        dogetInfo()
        .then((result)=>{
            console.log(result);
            for (let [key, value] of Object.entries(result)) {
                console.log(key, value);
                this.userData.push({key:key,value:value});
            }

              
        }).catch(error => {
                console.error(error);
                this.showNotification('Error',err.body.message,'Error');
         });
 } */
}