import { LightningElement, track } from 'lwc';
import getObjects from '@salesforce/apex/SchemaGen.getObjects';
import getObjectMetadata from '@salesforce/apex/SchemaGen.getObjectMetadata';
export default class SobjectTabset extends LightningElement {
    @track childopenDropDown = false;
    @track childinputValue = "";
    childoptions;
    @track childoptionsToDisplay;
    childvalue = "";
    @track label = ""
    delaytimeout;
    selectedFields = [];
    filterObjectlist = [];
    @track showSearchedValues = false;
    @track sobjectlist = [];
    selectedsobject = '';
    isLoading = true;
    @track attributes = [];
    @track fields = [];
    @track childRelationships = [];
    @track recordTypeInfos = [];
    @track supportedScopes = [];
    @track wrapper;
    @track fieldscount;
    @track childcount;
    @track recordcount;
    @track scopecount;
    connectedCallback() {
        //getting all sobjects from apex class and we are storing the objects in an variable
        getObjects()
            .then((result) => {
                this.sobjectlist = result;
                console.log(result)
                this.isLoading = false;
            }).catch(error => {
                console.error(error);
                this.showNotification('Error', err.body.message, 'Error');
            });
    }
    handleKeyPress(event) {
        const csearchKey = event.target.value;
        this.setInputValue(csearchKey);
        this.filterDropdownList(csearchKey);
        this.showSearchedValues = true;
    }
    filterDropdownList(key) {
        const cfilteredOptions = this.sobjectlist.filter(p => String(p.label).toLowerCase().startsWith(key.toLowerCase()));
        this.filterObjectlist = JSON.parse(JSON.stringify(cfilteredOptions));
    }
    optionsClickHandler(event) {
        const selectedsobject = event.target.closest('li').dataset.value;
        const label = event.target.closest('li').dataset.label;
        this.csetValues(selectedsobject, label);
        this.setInputValue(selectedsobject);
        this.togglechildOpenDropDown(false);
        this.getSobjectDescription();
        this.showSearchedValues = false;
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
/*
        This method is used to get the metadata of the object which we selected
        event : used to get the metadata of object.
    */
    getSobjectDescription() {
        this.isLoading = true;
        getObjectMetadata({
            'sObjectName': this.selectedsobject
        }).then((result) => {
            this.wrapper = result;
            this.attributes = [];
            this.fields = [];
            this.childRelationships = [];
            this.recordTypeInfos = [];
            this.supportedScopes = [];
            this.fieldscount = this.wrapper.fields.length;
            this.childcount = this.wrapper.childRelationships.length;
            this.recordcount = this.wrapper.recordTypeInfos.length;
            this.scopecount = this.wrapper.supportedScopes.length;
            for (const [key, value] of Object.entries(this.wrapper)) {
                if (key !== 'childRelationships' && key !== 'fields' && key !== 'recordTypeInfos' && key !== 'supportedScopes') {
                    this.attributes.push({ value: value, key: key });
                }
                if (key === 'fields') {
                    value.forEach(item => {
                        var field = {};
                        field['name'] = item.label;
                        var fieldattributes = [];
                        for (const [key, value] of Object.entries(item)) {
                            fieldattributes.push({ value: value, key: key });
                        }
                        field['fieldattribute'] = fieldattributes;
                        this.fields.push(field);
                    });
                } else if (key === 'childRelationships') {
                    value.forEach(items => {
                        var child = {};
                        child['name'] = items.childSObject;
                        var cattributes = [];
                        for (const [key, value] of Object.entries(items)) {
                            cattributes.push({ value: value, key: key });
                        }
                        child['cattribute'] = cattributes;
                        this.childRelationships.push(child);
                    });
                } else if (key === 'recordTypeInfos') {
                    value.forEach(recorditem => {
                        var record = {};
                        record['name'] = recorditem.developerName;
                        var recordattributes = [];
                        for (const [key, value] of Object.entries(recorditem)) {
                            if (key != 'urls') {
                                recordattributes.push({ value: value, key: key });
                            }
                        }
                        record['recordattribute'] = recordattributes;
                        this.recordTypeInfos.push(record);
                    });
                } else if (key === 'supportedScopes') {
                    value.forEach(item => {
                        var field = {};
                        field['name'] = item.name;
                        var fieldattributes = [];
                        for (const [key, value] of Object.entries(item)) {
                            fieldattributes.push({ value: value, key: key });
                        }
                        field['fieldattribute'] = fieldattributes;
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
    get FieldValue() {
        return 'Fields' + ' (' + this.fieldscount + ')';
    }
    get ChildValue() {
        return 'child Relationships' + ' (' + this.childcount + ')';
    }
    get RecordValue() {
        return 'recordTypes' + ' (' + this.recordcount + ')';
    }
    get scopeValue() {
        return 'supportedScopes' + ' (' + this.scopecount + ')';
    }
}