import { LightningElement, track } from 'lwc';
import testclassData from '@salesforce/apex/testClass_Dashboard.testclassData';
import getSobjectData from '@salesforce/apex/testClass_Dashboard.getSobjectData';
import userId from '@salesforce/apex/testClass_Dashboard.userId';
import customListViews from '@salesforce/apex/testClass_Dashboard.customListViews';
import customListViewQuery from '@salesforce/apex/testClass_Dashboard.customListViewQuery';
import userEmail from '@salesforce/apex/testClass_Dashboard.userEmail';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';

export default class Testclass extends LightningElement {
   // @track currentFilter = ALL_PRIORITY;
    @track isExpanded = false;
    emailButton=false;
    @track customFormModal = false; 
    @track sobjectlist = [];
    ClassNames=[];
    dataArray =[]
    showData =[]
    showFinalData =[]
    @track childopenDropDown = false;
    @track childinputValue = "";
    childoptions;
    @track childoptionsToDisplay;
    childvalue = "";
    @track label = ""
    delaytimeout;
    selectedFields = [];
    filterObjectlist = [];
    valueField=[]
    @track showSearchedValues = false;
    selectedsobject = '';
    isLoading = true;
    finalSoqlString = '';
    options=[];
    values = [];
    showTable=true;
    tableColumns=[];
    tableData=[];
    customListView=false
    LastModifiedUserId;
    userEmails;
    filterOptionsList;

    @track
    filterList = [
        {
            'filterField': '',
            'operation': '',
            'value': '',
            'logic': '',
            'showadd': true
        }
    ];
    filterOptions = [
        { 'label': '=', 'value': '=' },
        { 'label': '!=', 'value': '!=' },
        { 'label': '<', 'value': '<' },
        { 'label': '<=', 'value': '<=' },
        { 'label': '>', 'value': '>' },
        { 'label': '>=', 'value': '>=' },
    ];
    logicOptions = [
        { 'label': 'OR', 'value': 'OR' },
        { 'label': 'AND', 'value': 'AND' },
    ];
    opty;
    listViewQuery;

   /********************************************************************************************************/
   connectedCallback() {
    testclassData()
    .then((result) => {
            console.log(result);
               const val=JSON.parse(result);
               console.log(val);
               let data=val.records;
               let obj={};
               this.testCoverageData=[];
               this.searchableData=[];
               data.forEach(element => {
                obj={};
                obj['ClassName']=element.ApexClassOrTrigger.Name;
                const fin=[]
                const objs={}
                objs['ClassId']=element.ApexClassOrTrigger.Id;
                objs['ClassName']=element.ApexClassOrTrigger.Name;
                objs['TestMethodName']=element.TestMethodName;
                objs['NumLinesCovered']=element.NumLinesCovered;
                objs['NumLinesUncovered']=element.NumLinesUncovered;
                objs['CreatedUser']=element.CreatedBy.Name;
                objs['ModifiedUser']=element.LastModifiedBy.Name;
                objs['ModifiedUserId']=element.LastModifiedById;
                objs['TotalTestCoverage']=element.NumLinesCovered/(element.NumLinesCovered + element.NumLinesUncovered)*100 +'%';
                fin.push(objs);
                obj['dataValue']=fin;
               this.searchableData.push(obj);
               console.log('get on the way',this.searchableData)

            });
               data.forEach(element => {
                const classed ={}
                classed['label']=element.ApexClassOrTrigger.Name
               //console.log(element);
               obj['ClassId']=element.ApexClassOrTrigger.Id;
               obj['ClassName']=element.ApexClassOrTrigger.Name;
               obj['TestMethodName']=element.TestMethodName;
               obj['NumLinesCovered']=element.NumLinesCovered;
               obj['NumLinesUncovered']=element.NumLinesUncovered;
               obj['CreatedUser']=element.CreatedBy.Name;
               obj['ModifiedUser']=element.LastModifiedBy.Name;
               obj['ModifiedUserId']=element.LastModifiedById;
               let num = element.NumLinesCovered/(element.NumLinesCovered + element.NumLinesUncovered);
               if (isNaN(num)){ 
               num = 0;
               obj['TotalTestCoverage']=num*100 +'%';
               }
               else{
               obj['TotalTestCoverage']=Math.round(num*100) +'%';
               }
               this.testCoverageData.push(obj);
               this.ClassNames.push(classed);
               obj={};

            });
            
             // console.log(this.testCoverageData);
              let tempRecs=[];
              this.testCoverageData.forEach(element=>{
              let tempRec = Object.assign( {}, element );  
              tempRec.Name = '/'+tempRec.ClassId;
              tempRecs.push( tempRec);
            })
            for(var i=0; i<tempRecs.length; i++){
                tempRecs[i].rowNumber = i+1;
            }
              this.finalData=tempRecs;
              this.recordsToDisplay= this.finalData;
              this.recordList=this.finalData;
              this.totalRecords = this.recordList.length;         
              this.pageSize = this.pageSizeOptions[0]; 
              this.paginationHelper();
            }).catch(error => {
              console.error(error);
              this.showNotification('Error', err.body.message, 'Error');
        });
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
          this.opty = [
                { label: 'Id', value: 'ApexClassOrTrigger.Id' },
                { label: 'Name', value: 'ApexClassOrTrigger.Name' },
                { label: 'Covered Lines', value: 'NumLinesCovered' },
                { label: 'Un-coveredLines', value: 'NumLinesUncovered' },
                { label: 'Modified By', value: 'LastModifiedBy.name' },
                { label: 'Created By', value: 'CreatedBy.Name' },
            ];
        
        const items =[];
        for(let i=0;i<this.opty.length;i++){
            console.log('item',this.opty[i])
    items.push(this.opty[i])

        }
        console.log('item',items)
        this.options.push(...items);
        console.log('options',this.options)
this.values.push(...['ApexClassOrTrigger.Id','ApexClassOrTrigger.Name','TestMethodName','NumLinesCovered','NumLinesUncovered','LastModifiedBy.name','CreatedBy.Name']);
console.log('values',this.values)

customListViews().then((result)=>{

    console.log('My new result :'+JSON.stringify(result));
    const lists=result;
    this.filterOptionsList=[];
    lists.forEach(element=>{
        console.log('Iam an element : '+JSON.stringify(element));
        console.log(element.Name);
        this.filterOptionsList.push({ value: element.Name, label: element.Name });
    })
    console.log(this.filterOptionsList);
}).catch((Error)=>{
    console.log(Error);
})

}
      handleKeyPress(event) {
        const csearchKey = event.target.value;
        this.setInputValue(csearchKey);
        this.filterDropdownList(csearchKey);
        this.showSearchedValues = true;
    }
    filterDropdownList(key) {
        const cfilteredOptions = this.ClassNames.filter(p => String(p.label).toLowerCase().startsWith(key.toLowerCase()));
        console.log(cfilteredOptions)
        this.filterObjectlist = JSON.parse(JSON.stringify(cfilteredOptions));
        console.log(this.filterObjectlist)
    }
    optionsClickHandler(event) {
        //const selectedsobject = event.target.closest('li').dataset.value;
        //console.log(selectedsobject)
        const label = event.target.closest('li').dataset.label;
        console.log(label)
        this.csetValues(label);
        this.setInputValue(label);
        this.togglechildOpenDropDown(false);
        this.showSearchedValues = false;
        this.emailButton=true;
        if(label != '' ){
            for(let i in this.searchableData){
                console.log('arrat>>>',this.searchableData[i])
                if(label === this.searchableData[i].ClassName){
                    console.log('I am here')
                    // for (const [key, value] of Object.entries(this.searchableData[i])) {
                        this.showData.push(this.searchableData[i]);
                        console.log('hiiiiiiiiiii'+JSON.stringify(this.showData));
                   // }  
                     
                } 
            }
        }
        if(label != '' ){
            for(let i in this.testCoverageData){
                console.log('Comeonman',this.testCoverageData[i])
                if(label === this.testCoverageData[i].ClassName){
                    console.log('I am here')
                     for (const [key, value] of Object.entries(this.testCoverageData[i])) {
                        this.showFinalData.push(this.testCoverageData[i]);
                        console.log('helooooo'+JSON.stringify(this.showFinalData));
                    }  
                     
                } 
            }
        }
    }
    sendEmail(){
        for(let x of this.showFinalData){
            console.log('Iam X : '+JSON.stringify(x));
           if(x.key==='ModifiedUserId'){
            console.log(x.value);
            this.LastModifiedUserId=x.value;
           }
           console.log(this.LastModifiedUserId);
        }

        userId({'LastModifiedUserId': this.LastModifiedUserId})
        .then((result) => {
           // console.log('MyUser'+result);
           let emailList=[];
            for(const x of result){
                console.log('Iam an email : '+x.Email)
                     emailList.push(x.Email)   
            }
            this.userEmails=JSON.stringify(emailList).replace(/"/g, "'");
            console.log('iam an user emails : '+this.userEmails);
    })

    userEmail({'toEmail':this.userEmails}).then((result)=>{
        console.log(result);
         const event = new ShowToastEvent({
             title: 'Sucess Toast',
             message: 'Mail sent sucessfully',
             variant: 'success'      
         });
         this.dispatchEvent(event);
     }).catch((error)=>{
         console.log('Iam error :'+JSON.stringify(error));
         const event = new ShowToastEvent({
             title: 'Failure Toast',
             message: 'Failed to send email',
             variant:'success'

         });
          this.dispatchEvent(event);

     })
}
    
    setInputValue(label) {
        this.childinputValue = label;
    }
    csetValues(value, label) {
        this.label = label;
        this.label = value;
    }
    togglechildOpenDropDown(ctoggleState) {
        this.childopenDropDown = ctoggleState;
    }
    customShowModalPopup() {            
        this.customFormModal = true;
    }
    customHideModalPopup() {    
        this.customListView = false;
        this.customFormModal = false;
    }
    handleFieldsChange(event) {
        this.selectedFields = event.detail.value;
        this.generateSoqlString();
    }
     letters = /^[A-Za-z]+$/;
    generateSoqlString() {
        let soqlString = 'SELECT+';
        soqlString += this.selectedFields.join(',+');
        soqlString += '+FROM+ApexCodeCoverage'
         //WHERE Conditions
         let filtersListData = JSON.parse(JSON.stringify(this.filterList));
         if (filtersListData) {
             let whereCondition = '';
             filtersListData.forEach(eachFilterRow => {
                 if (eachFilterRow.filterField && eachFilterRow.operation && eachFilterRow.value || eachFilterRow.logic) {
                    if(eachFilterRow.value.match(this.letters)){
                     whereCondition += eachFilterRow.filterField +'+'+ eachFilterRow.operation +'+\''+ eachFilterRow.value +'\''+'\''+ eachFilterRow.logic + '\ ';
                    }else{
                        whereCondition += eachFilterRow.filterField +'+'+ eachFilterRow.operation +'+'+ eachFilterRow.value +'\''+ eachFilterRow.logic + '\ ';  
                    }
                    }
             });
             if (whereCondition) {
                 whereCondition = whereCondition.substr(0, whereCondition.length - 2);
                 soqlString += '+WHERE+' + whereCondition;
             }
         }
        this.finalSoqlString = soqlString;

    }
    customCustomList(){
        this.customListView = false;
    }
    saveCustomList(){
        getSobjectData({
            'SoqlString': this.finalSoqlString
        })
        .then(result => {
            this.showTable=false;
            this.customListView = false;
            //this.isLoading = false;
           this.generateHeaders(result);
           this.prepareTableData(result);
        }).catch(err => {
            console.error(err);
          })
          refreshApex(this.filterOptionsList);
          this.createCustomList();
          window.location.reload();


    }
    saveQuery(){
        getSobjectData({
            'SoqlString': this.finalSoqlString
        }).then(result => {
            this.showTable=false;
            this.customFormModal = false;
            refreshApex(this.filterOptionsList)

            //this.isLoading = false;
           this.generateHeaders(result);
           this.prepareTableData(result);
        }).catch(err => {
            console.error(err);
          })
          this.handleFieldsChange();
    }
    checkboxChecked(){
        this.customListView=true;
    }
    generateHeaders(result) {
           let columnss = [];
            const queryResult = JSON.parse(result)
            console.log('query result',JSON.parse(result))
            console.log('query result>>>>>>>>',queryResult.records[0])
             const queryResultRecord = queryResult.records[0];
             for (const [key, value] of Object.entries(queryResultRecord)) {
                const keys = key;
                const values =value;
                console.log('I am here',`${key}:${value}`)
                columnss.push({
                    label: `${key}`,
                    fieldName: `${key}`,
                });  

                              console.log('77777777777',columnss)
        }  
        columnss.splice(0, 1); // first element removed
        this.tableColumns = columnss;  
        console.log('787877',this.tableColumns)
 
    }
    prepareTableData(result) {
        let processedData = []
        console.log('result here>>>>>>',result)
        const queryResult = JSON.parse(result)
        console.log('query result',JSON.parse(result))
        const queryResultRecord = queryResult.records;
        console.log('query >>>>>>>>',queryResultRecord)
        for (const [key, value] of Object.entries(queryResultRecord)) {
            let eachRow = [];
            console.log(value)
            
                for(let a in value){
                  /*   if(typeof value[a] === 'object'){
                        
                    } */
                    if(typeof value[a] != 'object'){
                        eachRow.push({
                            'cellValue': `${value[a]}`,
                        })
                    }else if(typeof value[a] === 'object'){
                        const beta = value[a].Name
                    console.log('i want data',value[a].Name)
                    if(beta != 'undefined'){
                    eachRow.push({
                        'cellValue': `${beta}`,
                    })
                }/* else if (this.selectedFields === 'Id') {
                    console.log('hey i am here')
                    if(value[a] != 'undefined'){
                        eachRow.push({
                            'cellValue': `${value[a]}`,
                        })
                    }
                    } */
                }
                    /* const beta = value[a].Name
                    console.log('i want data',value[a].Name)
                    if(beta != 'undefined'){
                    eachRow.push({
                        'cellValue': `${beta}`,
                    })
                }else if(beta === 'undefined')
                {
                    eachRow.push({
                        'cellValue': `${value[a].Id}`,
                    })   
                } */
                }
            
           eachRow.splice(0, 1); // first element removed
            processedData.push(eachRow)
            console.log('processedData',processedData)
        }
        this.tableData = processedData;
        }
    soqlChanged(event) {
        this.finalSoqlString = event.detail.value;
        this.diableSubmit = false;
    }
    testCoverageData;
    finalData;
    recordsToDisplay;
   

     Columns = [
        { label: 'Class Name', fieldName: 'Name',type: "url",sortable: "true",  
        typeAttributes: { label: { fieldName: "ClassName" }, target: "_blank" }},
        { label: 'Test MethodName', fieldName: 'TestMethodName',cellAttributes: { alignment: 'center' } },
        { label: 'Covered Lines', fieldName: 'NumLinesCovered',cellAttributes: { alignment: 'center' } },
        { label: 'Un-coveredLines', fieldName: 'NumLinesUncovered',cellAttributes: { alignment: 'center' } },
        { label: 'Test Coverage', fieldName: 'TotalTestCoverage',cellAttributes: { alignment: 'center' } },
        { label: 'Modified By', fieldName: 'ModifiedUser'},
        { label: 'Created By', fieldName: 'CreatedUser'}
    ]; 
    alphabet;

    sortBy;
    sortDirection;
    /***************************************Pagination Variables*********************************************/
    pageSizeOptions = [ 5, 10, 15];
    pageNumber=1;
    totalRecords=0;
    pageSize
    totalPages
    recordList=[];
  
/***************************************************filter records*************************************************************/
      
    handleFilterChange(event){
        const selectedLetter=event.target.dataset.filter.toLowerCase();
        let filterRecords=[];
            this.recordsToDisplay=this.finalData;
        if(this.recordsToDisplay){
        for (let record of this.recordsToDisplay) {
            let valuesArray = Object.values(record);
            console.log('iam an valuesArray'+valuesArray)
            for (let val of valuesArray) {
            let strVal = String(val);
            console.log('Hi Iam an strVal'+strVal);
            if (strVal) {
            if (strVal.toLowerCase().startsWith(selectedLetter)) {
            filterRecords.push(record);
            console.log(filterRecords);
            break;
            }
            }
            }
            }
            this.recordsToDisplay = filterRecords;
            this.recordList=filterRecords;
            //console.log(this.recordList);
            this.totalRecords = this.recordList.length;         
            this.pageSize = this.pageSizeOptions[0]; 
            this.paginationHelper();
            console.log(this.recordsToDisplay);   
        }          
    }

/***************************************************sorting******************************************************************************/
    /*doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.recordsToDisplay));
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === 'asc' ? 1: -1;
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        this.recordsToDisplay = parseData;
    }    */

/*****************************************************Pagination******************************************************************/
    get DisableFirst() {
        return this.pageNumber == 1;
    }
    get DisableLast() {
        return this.pageNumber == this.totalPages;
    }
    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
    }
    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }
    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }
    firstPage() {
        this.pageNumber = 1;
        this.paginationHelper();
    }
    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }

    paginationHelper() {
        this.recordsToDisplay = [];
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.recordsToDisplay.push(this.recordList[i]);
        }
    }
    addFilterRow() {
        this.filterList.push(
            {
                'filterField': '',
                'operation': '',
                'value': '',
                'logic': '',
                'showadd': false
            }
        );
    }
    removeFilterRow(event) {
        let index = event.currentTarget.dataset.rowindex;
        let filterListIs = JSON.parse(JSON.stringify(this.filterList));
        filterListIs.splice(index, 1); // Remove 1 element starting at indexValue
        this.filterList = filterListIs
        this.generateSoqlString();
    }
    filterFieldChanged(event) {
        let index = event.currentTarget.dataset.rowindex;
        this.filterList[index].filterField = event.detail.value;
        this.generateSoqlString();
    }
    filterOperationChanged(event) {
        let index = event.currentTarget.dataset.rowindex;
        this.filterList[index].operation = event.detail.value;
        this.generateSoqlString();
    }
    filterValueChanged(event) {
        let index = event.currentTarget.dataset.rowindex;
        this.filterList[index].value = event.detail.value;
        this.generateSoqlString();
    }
    filterlogicChanged(event) {
        let index = event.currentTarget.dataset.rowindex;
        this.filterList[index].logic = event.detail.value;
        this.generateSoqlString();
    }
    listviewName;
    handleListView(event){
       this.listviewName=event.target.value;
    }

    createCustomList(){
        var fields = {'Name' : this.listviewName, 'Query_Editor__List_view_Query__c' : this.finalSoqlString};
        // Record details to pass to create method with api name of Object.
        var objRecordInput = {'apiName' : 'Query_Editor__Listview__c', fields};
        // LDS method to create record.
        createRecord(objRecordInput).then(response => {
            alert('Listview created with Id: ' +response.id);
        }).catch(error => {
            alert('Error: ' +JSON.stringify(error));
        });
    
    }
    selectedListView='ALL';
    handleChangeListView(event){
        console.log('Iam clicked');
        console.log(event.target);
        this.isExpanded = !this.isExpanded;
    this.selectedListView=event.target.dataset.filter;
    console.log('result',this.selectedListView);
    customListViewQuery({'selectedListViewName': this.selectedListView})
    .then((result)=>{
        console.log(result);
        this.listViewQuery=result[0].Query_Editor__List_view_Query__c;
        console.log('list>>>>>>>>>>',this.listViewQuery)
        if(this.listViewQuery != undefined){
            getSobjectData({
                'SoqlString': this.listViewQuery
            }).then(result => {
                console.log('hhhhhhhhhhhh',result)
                this.showTable=false;
                //this.isLoading = false;
               this.generateHeaders(result);
               this.prepareTableData(result);
            }).catch(err => {
                console.error(err);
              }) 
         }
       /*  for(let a in result){
            console.log('aaaaaaaaaaaaaa',result[a].Query_Editor__List_view_Query__c)
            hgfd=result[a];
        } */
//console.log('list<<<<<<<<<<<<<',this.listViewQuery)
    }).catch((error)=>{
        console.log(error);
    })
    console.log('wow>>>>>>>>>>',this.listViewQuery)
     }

/*      getData(){
        if(this.listViewQuery != undefined){
        getSobjectData({
            'SoqlString': this.listViewQuery
        }).then(result => {
            console.log('hhhhhhhhhhhh',result)
            this.showTable=false;
            //this.isLoading = false;
           this.generateHeaders(result);
           this.prepareTableData(result);
        }).catch(err => {
            console.error(err);
          }) 
     }
    } */
    handleClickExtend() {
        this.isExpanded = !this.isExpanded;
    }
    get dropdownTriggerClass() {
        if (this.isExpanded) {
            return 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click custom_list_view slds-is-open'
        } else {
            return 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click custom_list_view'
        }
    }

}