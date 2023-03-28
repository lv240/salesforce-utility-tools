import { LightningElement,track  } from 'lwc';
import getUserDetails from '@salesforce/apex/Userdata.getUserDetails';
export default class ObjectSchema extends LightningElement {


    @track wrapper;
    @track Userdata;
   
    
    isLoading = true;


    jsonString = '';
    @track attributes = [];
    @track address=[];
    @track photos=[];
    @track urls=[];
    @track organization_id=[];




    connectedCallback() {
        //code
        getUserDetails()
        .then((result)=>{
            this.wrapper = result;
            console.log(result);
            console.log('wrapper', JSON.stringify(this.wrapper));
            this.Userdata=[];
            this.address=[];
            this.urls = [];
            this.photos = [];
            this.organization_id = [];
            for (const [key, value] of Object.entries(this.wrapper)) {
                if (key !== 'address' && key !== 'urls' && key !== 'photos' && key !== 'organization_id'){
                    this.Userdata.push({value:value, key:key});
                
                }else if(key === 'urls'){   
                    console.log('i am here',JSON.stringify(value));
                    Object.entries(value).forEach(([key, value]) => {
                        var url ={}
                        console.log('i am here',`${key}`);
                        url['key'] = `${key}`;
                        url['value'] = `${value}`;
                        this.urls.push(url);
                    });
                    /* for(let data in value){
                        console.log(value[data])
                    } */

                  /*  for(let data in urls){
                    console.log(`${data}: ${urls[data]}`)
                   } */
                }

                console.log('aaaaaaaa',JSON.stringify(this.urls));


                }
            }
        )};
}