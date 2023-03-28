import { LightningElement, track } from 'lwc';
import getObjects from '@salesforce/apex/SchemaGen.getObjects';
import getObjectMetadata from '@salesforce/apex/SchemaGen.getObjectMetadata';
export default class SobjectInfo extends LightningElement {
    @track childopenDropDown = false;
    @track childinputValue = "";
    childoptions;
    @track childoptionsToDisplay;
    childvalue = "";
    @track label = ""
    delaytimeout;
    sobjectlist = [];
    selectedFields = [];
   
    filterObjectlist = [];
    @track showSearchedValues = false;

    @track
    sobjectlist = [];
    selectedsobject = '';
    isLoading = true;


    @track attributes=[];
    @track fields=[];
    @track childRelationships=[];
    @track recordTypeInfos=[];
    @track supportedScopes=[];

    @track wrapper;
    @track fieldscount;
    @track childcount;
    @track recordcount;
    @track scopecount;

    connectedCallback() {
        //code
        getObjects()
            .then((result) => {
                console.log(result);
                this.sobjectlist = result;
                this.isLoading = false;
            }).catch(error => {
                console.error(error);
                this.showNotification('Error', err.body.message, 'Error');
            });
    }

    handleSobjectChange(event) {
        this.jsonString = '';
        this.selectedsobject = event.detail.value;
        //this.resetEditor();
        this.getSobjectDescription();
    }

    handleKeyPress(event) {

        const csearchKey = event.target.value;
        this.setInputValue(csearchKey);

        console.log('Iam here' + csearchKey);

        this.filterDropdownList(csearchKey);

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

    handleFieldsChange(event) {
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


    getSobjectDescription() {
        // alert(this.selectedsobject);
        this.isLoading = true;
       
        getObjectMetadata({
            'sObjectName': this.selectedsobject
        }).then((result) => {
            this.wrapper = result;
            console.log('wrapper', JSON.stringify(this.wrapper));

            this.attributes=[];
            this.fields=[];
            this.childRelationships=[];
            this.recordTypeInfos=[];
            this.supportedScopes=[];
this.fieldscount = this.wrapper.fields.length;
this.childcount = this.wrapper.childRelationships.length;
this.recordcount = this.wrapper.recordTypeInfos.length;
this.scopecount = this.wrapper.supportedScopes.length;

            for (const [key, value] of Object.entries(this.wrapper)) {
                if (key !== 'childRelationships' && key !== 'fields' && key !== 'recordTypeInfos' && key !== 'supportedScopes'){
                    this.attributes.push({value:value, key:key});
                    console.log('Naveen'+this.attributes);

                }   

                if (key === 'fields') {   
                    console.log('i am here',key);
                    value.forEach(item => {
                        var field = {};
                        field['name'] = item.label;
                        console.log('i >>>> ', field);

                        var fieldattributes = [];
                        for (const [key, value] of Object.entries(item)) {
                            fieldattributes.push({value:value, key:key});
                        }
                        field['fieldattribute'] = fieldattributes;
                      //  console.log('i am here attributes', field['attributes']);

                        this.fields.push(field);
                    });
                } else if(key === 'childRelationships') {
                    console.log('i am here',key);
                    value.forEach(items => {
                        console.log('value', value);

                        var child = {};
                        child['name'] = items.childSObject;
                        console.log('i am here item', child);

                        var cattributes = [];
                        for (const [key, value] of Object.entries(items)) {
                            cattributes.push({value:value, key:key});
                        }
                        child['cattribute'] = cattributes;
                     
                        this.childRelationships.push(child);

                    });
                } else  if (key === 'recordTypeInfos') {   
                    console.log('i am here',key);
                    value.forEach(recorditem => {
                        var record = {};
                        record['name'] = recorditem.developerName;
                        console.log('i >>>> ', record);

                        var recordattributes = [];
                        for (const [key, value] of Object.entries(recorditem)) {
                            if(key != 'urls'){
                                recordattributes.push({value:value, key:key});

                            }
                        }
                        record['recordattribute'] = recordattributes;
                      //  console.log('i am here attributes', field['attributes']);
                          console.log('i am here record', record);

                        this.recordTypeInfos.push(record);
                    });
                } else if (key === 'supportedScopes') {   
                    console.log('i am here',key);
                    value.forEach(item => {
                        var field = {};
                        field['name'] = item.name;
                        console.log('i >>>> ', field);

                        var fieldattributes = [];
                        for (const [key, value] of Object.entries(item)) {
                            fieldattributes.push({value:value, key:key});
                        }
                        field['fieldattribute'] = fieldattributes;
                      //  console.log('i am here attributes', field['attributes']);

                        this.supportedScopes.push(field);
                    });
                }
              }
            }).catch(error => {
                this.isLoading = false;
                console.error(JSON.stringify(error));
            }).finally(() => {
                this.isLoading = false;
            });

    }


    get hasattributes() {
        return this.attributes === undefined || this.attributes.length === 0;
    }
    get hadfields() {
        return this.fields === undefined || this.fields.length === 0;
    }
    get hadchild() {
        return this.childRelationships === undefined || this.childRelationships.length === 0;
    }
    get hadrecord() {
        return this.recordTypeInfos === undefined || this.recordTypeInfos.length === 0;
    }
    get hadsupport() {
        return this.supportedScopes === undefined || this.supportedScopes.length === 0;
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
                get scopeValue(){
                    return 'supportedScopes' +' ('+ this.scopecount + ')';
                    }
}