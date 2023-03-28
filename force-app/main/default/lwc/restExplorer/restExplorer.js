import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import datas from '@salesforce/apex/restExplorer1.datas';
import deleteApi from '@salesforce/apex/restExplorer1.deleteRecord';
import patchApi from '@salesforce/apex/restExplorer1.updateRecord';
import apipost from '@salesforce/apex/restExplorer1.createRecord';
//import LightningPrompt from 'lightning/prompt';
import LightningAlert from 'lightning/alert';

export default class RestExplorer extends LightningElement {
    showSpinner=false;
    endPointValue = '/services/data/v56.0/';
    executeBoth = false;
    executeData = false;
    textBody=false;
    execute = false;
    arrayOfObjects; 
    stringValueList;
    finalarrayList;
    versions;
    selectedRestMethod;
    objectValueList;
    textareachangevalue;
    requestBody;
    showError=false;
    showError1=false;
    errortemp=false;
    resulttemp=false;
    resulttemp1=false;
    errortemp1=false;
    getresult=[];
    getresult1=[];
    storeduplicate=[];
    storeduplicate1=[];
    dispatchEvent;
    showResult=false;
    iamLabelArray;
    iamLabelObject;
    getError;
    showGetError=false;
    
    

    get options() {
        return [
            { label: 'Get', value: 'Get' },
            { label: 'Post', value: 'Post' },
            { label: 'Patch', value: 'Patch' },
            { label: 'Delete', value: 'Delete' }

        ];
    }

    handleSelected(event){
        console.log(event.target.value);  
        this.selectedRestMethod=event.target.value;
        if(this.selectedRestMethod =='Post'){
            this.textBody=true;
            this.executeBoth = false; //get
           this.executeData = false;  //get
           this.executeObject= false; //get
           this.execute= false; //get
           this.showGetError= false; //get
           this.showError= false;  //delete
           this.showError1=false //patch
           this.showResult=false; //patch
           this.endPointValue='/services/data/v56.0/sobjects';
          
        }
         else if(this.selectedRestMethod =='Patch'){
            this.textBody=true; 
            this.executeBoth = false; //get
           this.executeData = false;  //get
           this.executeObject= false; //get
           this.execute=false;  //get
           this.showGetError= false; //get
           this.errortemp1=false; //post
            this.resulttemp1=false; //post
            this.showError= false;  //delete
            this.endPointValue='/services/data/v56.0/sobjects';
        }
        else if(this.selectedRestMethod =='Get'){
            this.textBody= false;
            this.errortemp1=false;
            this.resulttemp1=false;
            this.showError1=false //patch
           this.showResult=false; //patch
            this.showError= false;  //delete
            this.endPointValue='/services/data/v56.0';
            
        }
        else if(this.selectedRestMethod =='Delete'){
            this.textBody=false;
            this.executeBoth = false; //get
            this.executeData = false; //get
            this.executeObject= false; //get
            this.execute = false; //get
            this.showGetError= false; //get
            this.errortemp1=false;  //post
            this.resulttemp1=false; //post
            this.endPointValue='/services/data/v56.0/sobjects';
            this.showError1=false //patch
            this.showResult=false; //patch
            
        }

       
    }

    inputChange(event) {

        this.endPointValue = event.target.value;

    }

    textareachangehandler(event)
    {
     
     this.requestBody=this.textareachangevalue= event.target.value;
    // console.log(this.textareachangevalue);
          
    }

   // showNaveen=false;
   handleReset(){
    this.endPointValue='/services/data/v56.0/';
    this.showError=false;
    this.showError1=false;
    this.errortemp=false;
    this.resulttemp=false;
    this.resulttemp1=false;
    this.errortemp1=false;
    this.executeBoth = false;
    this.executeData = false;
    //this.textBody=false;
    this.execute = false;
    this.showResult=false;
    this.textareachangevalue='';
    this.executeObject=false;
    this.showGetError=false;
    //this.selectedRestMethod = '';

   }

   
    handleExecute(event) {
        if(this.selectedRestMethod == null){
            LightningAlert.open({
                message: 'Please select the Http Method',
                theme: 'error', 
                label: 'Error!', 
                variant: 'header',
            });

        }
        else{
        if(this.selectedRestMethod =='Get'){
            this.showSpinner=true;
            console.log('Hi Iam an Get');
            this.getData();
        }
        else if(this.selectedRestMethod =='Post' && this.textareachangevalue!= null){
           this.textBody=true;
           console.log('Hi Iam an Post');
           this.postRecord();
        }
        else if(this.selectedRestMethod =='Patch'&& this.textareachangevalue != null){
           // this.showSpinner=true;
            this.textBody=true;
            console.log('Hi Iam an Patch');
            this.patchRecord();   
        }
        else if(this.selectedRestMethod =='Delete'){
            this.showSpinner=true;
            console.log('Hi Iam an Delete');
            this.deleteRecord();
            
        }
        else //(this.selectedRestMethod =='Patch'&&this.textareachangevalue==null)
        {
            LightningAlert.open({
                message: 'Must include a Request Body.',
                theme: 'error', 
                label: 'Error!', 
                variant: 'header',
            });

        }
    }
        //else if(this.selectedRestMethod =='Post'&&this.textareachangevalue==null){
          //  LightningAlert.open({
          //      message: 'Must include a Request Body.',
          //      theme: 'error', 
           //     label: 'Error!', 
          //      variant: 'header',
          //  });

       // }
        this.storeduplicate=[];
        this.storeduplicate1=[];

       
     }


    getData() {
        datas({
            'endpointUrl': this.endPointValue
        }).then((result) => {
            console.log(result);
            this.showSpinner=false;
            const val = JSON.parse(result);
           // this.arrayOfObjects = JSON.parse(result);
           // console.log({val});
           // this.listVal=[];
            this.versions=[];
            if (Array.isArray(val)) {
                console.log('Hello Iam an arrayofObject entering First If');
                for(let i of val){
                    let resultObj = {};
                    let attributesArr = [];
                    for(let j in i){
                      if(j == "label"){
                        resultObj["name"] = i[j];
                      }
                      let attributesObj = {};
                      attributesObj["key"] = j;
                      attributesObj["value"] = i[j];
                      attributesArr.push(attributesObj);
                    }
                    resultObj["attributes"] = attributesArr;
                    this.versions.push(resultObj);
                  }
               // this.versions = val;
                console.log('Hi Iam an val : '+ JSON.stringify(this.versions));
                this.executeData = !this.executeData;
                this.execute =false;
                this.executeBoth= false;
                this.executeObject=false;
            }
            else {
                console.log('Iam Not an array of object Entering First else');
                this.stringValueList=[];
                this.finalarrayList=[];
                this.objectValueList=[];
                for(const[key,value] of Object.entries(val)){
                    console.log('Hi Iam an key of the val :'+key);
                    console.log('Hi Iam an value of the val :'+value);
                    if(typeof(value) === 'string'||typeof(value) === 'number'|| Array.isArray(value)||typeof(value) === 'object'|| value === null){
                        console.log('Hi Iam both string and arrayvalue --> inside first inner if : '+value);
                        if(typeof(value) === 'string'||typeof(value) === 'number'|| value === null){
                            console.log('Hi Iam an string value --> inside first inner inner if');
                            console.log('Iam an string value : '+value);
                            this.stringValueList.push({ value: value, key: key });
                            console.log('Hi Iam an stringvalueLisst : ' + JSON.stringify(this.stringValueList));
                            this.execute =!this.execute;
                            this.executeBoth= false;
                            this.executeObject=false;
                            this.executeData=false;
                        }
                        else if(Array.isArray(value)){
                            console.log(JSON.stringify(value));
                            console.log('>>>>>>>>>>>>>>>>>> '+key);
                            this.iamLabelArray=key;
                            for(let i of value){
                               let resultObj = {};
                               let attributesArr = [];
                               for(let j in i){
                               if(j == "Name"){
                                resultObj[j] = i[j];
                                }else{
                                if( (typeof(i[j]) === "object") && (i[j] !== null) ){
                                  for(let k in i[j]){
                                  let innerAttributesObj = {};
                                  innerAttributesObj["key"] = k;
                                  innerAttributesObj["value"] = i[j][k];
                                  attributesArr.push(innerAttributesObj);
                                } 
                               }else{
                                let innerAttributesObj = {};
                                innerAttributesObj["key"] = j;
                                innerAttributesObj["value"] = i[j];
                                attributesArr.push(innerAttributesObj);
                                }
                               }
                            }
                              resultObj["attributes"] = attributesArr;
                              this.finalarrayList.push(resultObj);
                            }
                          this.execute =false;
                          this.executeBoth= !this.executeBoth;
                          console.log('im an finalArrayList : '+JSON.stringify(this.finalarrayList));
                        }
                  
                        else if(typeof(value) === 'object'){
                        console.log('Hi Iam in the form of object ! so iam entering inside ');
                        console.log(' Iam an new object :'+JSON.stringify(value));
                        this.iamLabelObject=key;
                       for(let i in value){
                        if( (typeof(value[i]) === "object") && (value[i] !== null) ){
                          for(let j in value[i]){
                            let innerAttributesObj = {};
                            innerAttributesObj["Key"] = j;
                            innerAttributesObj["Value"] = value[i][j];
                            this.objectValueList.push(innerAttributesObj);
                          }
                        }else{
                          let innerAttributesObj = {};
                          innerAttributesObj["Key"] = i;
                          innerAttributesObj["Value"] = value[i];
                          this.objectValueList.push(innerAttributesObj);
                        }
                    }
                    this.executeBoth= false;
                    this.executeObject=!this.executeObject;
                    console.log('im an objectvalue :'+JSON.stringify(this.objectValueList));
                    }  
                }
                } 
            }

           // console.log(JSON.stringify(this.finalarrayList));

        })
            .catch((e) => {
                console.log('Error : ' + e);
                this.getError = e;
                this.showGetError= !this.showGetError;
            })
    }
    //Delete Method:

    deleteRecord(){
        deleteApi({"endpoint":this.endPointValue}).then(Response=>{
            
           // console.log(Response);
           const data=JSON.parse(Response);
           this.showSpinner=false;
           console.log(data);

            if(typeof(data)==='string'){
            const event = new ShowToastEvent({
                title: 'Record',
                message:
                    'Record is deleted successfully',
                    variant:'success'
            });
            this.dispatchEvent(event);
        }
            else{
                  this.showError=!this.showError;
                  this.errorData=data;
                  console.log(this.errorData);
               /* for(const[key,value] of Object.entries(data)){
                    console.log('Key'+key);
                    console.log('value'+JSON.stringify(value));
                }*/

            }
    

        }).catch(error=>{
            console.log(error);
        })

        }

  // PATCH Method

  patchRecord(){
    
    
    //console.log(this.textareachangevalue);
    if(this.textareachangevalue)
    {
        if(this.endPointValue){
            
          patchApi({"endPoint":this.endPointValue , "requestBody":this.requestBody })
            .then(Response => {  
              console.log("type of "+''+Response);
              this.showSpinner=false;
              
              const data=JSON.parse(Response);

          
         console.log('data'+data[0]);
        if(data){
          
      
        //console.log("parse data"+''+data);
        this.showError1=!this.showError1;
        //this.showError = true;
        this.errorData1=data;
        console.log(this.errorData);
      }
    
        else{
          //this.resulttemp=!this.resulttemp;
          this.showError1=false;
          const event = new ShowToastEvent({
            title: 'Sucess Toast',
            message: 'Record updated sucessfully',
            variant: 'success'      
        });
        this.dispatchEvent(event);
        this.resulttemp=true;

        }
        })
              .catch(error => {  
               console.log(''+error);  
               this.showSpinner=false;
                this.showResult=true;
              });
                
      }
  }
}
  // POST Method:
  
  postRecord()
  {
   if(this.textareachangevalue)
   {
       if(this.endPointValue){
           
           apipost({"endPoint":this.endPointValue , "requestBody":this.requestBody })
           .then(result => {  
            this.showSpinner=false;
           
           const val =JSON.parse(result);
           const valdup=val;

           console.log("Resukt : "+valdup.id);
          if(valdup.id){
           
            this.errortemp1=false;
            this.resulttemp1=true;
           
        
           for (const [key, value] of Object.entries(valdup)) {
               console.log(key,value);
               this.storeduplicate.push({key:key,value:value});
               this.getresult1=this.storeduplicate;
           }  }
           else{
            this.resulttemp1=false;
               this.errortemp1=true;
               
          console.log('sdfg'+JSON.stringify(valdup))
          console.log('this.getresult'+this.getresult)
          for(let a in valdup){
           console.log('getresult'+valdup[a])
           for (const [key, value] of Object.entries(valdup[a])) {
               console.log(key,value);
               this.storeduplicate1.push({key:key,value:value});
               this.getresult=this.storeduplicate1;
           }
          /*  for(let b in valdup[a]){
               this.getresult= valdup[a][b];
               console.log('finaly>>>>'+valdup[a][b])
           } */
          }
         
          
           }
           console.log('duplicate'+this.storeduplicate);
                      
           console.log('hrlgna;egl;g');

           })
               .catch(error => {  
                console.log(''+error);  
     
               });
                 
       }
   }
}

    
}