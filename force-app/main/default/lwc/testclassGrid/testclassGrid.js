import { LightningElement,track } from 'lwc';
import testClassResult from '@salesforce/apex/testClass_Dashboard.testClassResult';
import getSobjectData from '@salesforce/apex/testClass_Dashboard.getSobjectData';
import customListViewsTestResult from '@salesforce/apex/testClass_Dashboard.customListViewsTestResult';
import customListViewQueryTestResult from '@salesforce/apex/testClass_Dashboard.customListViewQueryTestResult';
import { createRecord } from 'lightning/uiRecordApi';

export default class TestclassGrid extends LightningElement {
    @track isExpanded = false;
    @track customFormModal = false; 
    gridData;
    finalData;
    alphabet;
    recordsToDisplay;
    options=[];
    values = [];
    selectedFields = [];
    showTable=true;
    columns = [ { label: 'Class Name', fieldName: 'ClassName',type: "url",sortable: "true",  
    typeAttributes: { label: { fieldName: "Name" }, target: "_blank" }},
                {type: "text",fieldName: "MethodName",label: "Method Name"},
                {type: "text",fieldName: "Outcome",label: "Outcome"},
                {fieldName: "Message",label: "Message"},
                {fieldName: "RunTime", label: "RunTime"},
                {fieldName: "StackTrace",label: "StackTrace"}];
    pageSizeOptions = [3,5,10];
    totalRecords = 0; 
    pageSize; 
    totalPages; 
    pageNumber = 1;
    recordList=[];            
    customListView=false
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
    connectedCallback() {
        testClassResult()
            .then((result) => {
                  console.log('result',JSON.parse(result));
                   const val=JSON.parse(result);
                   const recval=val.records;
                   let tempArr = [];
                   // This Loop is for print Big array inside outer Object
                   for(let j of recval)
                   {
                    let obj = {};
                    if(tempArr.length == 0)
                     {
                      obj["ApexClassId"] = j.ApexClassId;
                      obj["Name"] = j.ApexClass.Name;
                      obj["Methods"] = [];
                      tempArr.push(obj);
                     }
                  let count = 0;
                  for(let k of tempArr){
                  if(j.ApexClassId == k.ApexClassId){
                  count++;
                 }
               }
              if(count == 0){
              let innerObj = {};
              innerObj["ApexClassId"] = j.ApexClassId;
              innerObj["Name"] = j.ApexClass.Name;
              innerObj["Methods"] = [];
              tempArr.push(innerObj);
         }              
       }
       console.log(tempArr);
       for(let j of recval){
        for(let k of tempArr){
            if(j.ApexClassId == k.ApexClassId){
                let insideObject = {};
                let compareObject = j;
                for(let m in compareObject){
                    if((m != "attributes") && (m != "ApexClass") && (m != "ApexClassId")){
                        insideObject[`${m}`] = compareObject[m];
                    }
                }
                k.Methods.push(insideObject);
            }
        }
    }
     console.log(tempArr);
     /***************************Children to grid table********************************************/
       for (let i = 0; i < tempArr.length; i++) {
        tempArr[i]._children = tempArr[i]["Methods"];
        }
        this.gridData = tempArr;
        console.log(this.gridData);
     /****************************Hyperlink to the Name********************************************/   
        let tempRecs=[];
        this.gridData.forEach(element=>{
        let tempRec = Object.assign( {}, element );  
        tempRec.ClassName = '/'+tempRec.ApexClassId;
        tempRecs.push( tempRec);
      })
        this.finalData=tempRecs;
        this.recordsToDisplay=this.finalData;
        console.log('i want it',this.recordsToDisplay)
        this.recordList=tempRecs;
        //console.log(this.recordList);
        this.totalRecords = this.recordList.length;         
        this.pageSize = this.pageSizeOptions[0]; 
        this.paginationHelper();
                   })
                   customListViewsTestResult().then((result)=>{

                    console.log('My new result :'+JSON.stringify(result));
                    const lists=result;
                    this.filterOptionsList=[];
                    lists.forEach(element=>{
                        console.log('Iam an element : '+JSON.stringify(element));
                        console.log(element.Name);
                        this.filterOptionsList.push({ value: element.Name, label: element.Name });
                    })
                    console.log(this.filterOptionsList);
                })
            .catch(error=>{
                console.log(error);
            })
            this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            this.opty = [
              /*   { label: 'ClassName', value: 'ApexClass.Name' },
                { label: 'Method Name', value: 'MethodName' } */
                { label: 'Outcome', value: 'Outcome' },
                { label: 'Message', value: 'Message' },
                { label: 'RunTime', value: 'RunTime' },
                { label: 'StackTrace', value: 'StackTrace' },
            ];
        
        const items =[];
        for(let i=0;i<this.opty.length;i++){
            console.log('item',this.opty[i])
    items.push(this.opty[i])

        }
        console.log('item',items)
        this.options.push(...items);
        console.log('options',this.options)
this.values.push(...['Outcome','Message','RunTime','StackTrace']);
console.log('values',this.values)
        }
/**************************************************FILTERING RECORDS***************************************************************/
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
/**********************************************************Pagination*****************************************************************/
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
            // set records to display on current page 
            for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
                if (i === this.totalRecords) {
                    break;
                }
                this.recordsToDisplay.push(this.recordList[i]);
            }
        }
    

      /*  connectedCallback() {
            testData()
                .then((result) => {
                    console.log('Results : '+JSON.stringify(result));
                    let parseData = result;
                    for (let i = 0; i < parseData.length; i++) {
                      parseData[i]._children = parseData[i]["Contacts"];
                    }
                    this.accounts = parseData;
                    console.log(this.accounts);
                       })
                .catch(error=>{
                    console.log(error);
                })
            }*/
            customShowModalPopup() {            
                this.customFormModal = true;
            }
            customHideModalPopup() {    
                this.customListView = false;
                this.customFormModal = false;
            }
            saveQuery(){
                getSobjectData({
                    'SoqlString': this.finalSoqlString
                }).then(result => {
                    console.log('lets do it bro',JSON.parse(result))
                    this.showTable=false;
                    this.customFormModal = false;
                    //this.isLoading = false;
                   this.generateHeaders(result);
                   this.prepareTableData(result);
                }).catch(err => {
                    console.error(err);
                  })
            }
            handleFieldsChange(event) {
                this.selectedFields = event.detail.value;
                this.generateSoqlString();
            }
            generateSoqlString() {
                let soqlString = 'SELECT+ApexClassId,+ApexClass.Name,+MethodName,+';
                soqlString += this.selectedFields.join(',+');
                soqlString += '+FROM+ApexTestResult'
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
                               }                          }
                      });
                      if (whereCondition) {
                          whereCondition = whereCondition.substr(0, whereCondition.length - 2);
                          soqlString += '+WHERE+' + whereCondition;
                      }
                  }
                 this.finalSoqlString = soqlString;
                 console.log('This is final query',this.finalSoqlString)
        
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
             columnss.splice(0, 1); // first element removed
             this.tableColumns = columnss;  
             console.log('787877',this.tableColumns)
      
         }
         prepareTableData(result) {
            console.log('result',JSON.parse(result));
                   const val=JSON.parse(result);
                   const recval=val.records;
                   let tempArr = [];
                   // This Loop is for print Big array inside outer Object
                   for(let j of recval)
                   {
                    let obj = {};
                    if(tempArr.length == 0)
                     {
                      obj["ApexClassId"] = j.ApexClassId;
                      obj["ApexClass"] = j.ApexClass.Name;
                      obj["Methods"] = [];
                      tempArr.push(obj);
                     }
                  let count = 0;
                  for(let k of tempArr){
                  if(j.ApexClassId == k.ApexClassId){
                  count++;
                 }
               }
              if(count == 0){
              let innerObj = {};
              innerObj["ApexClassId"] = j.ApexClassId;
              innerObj["ApexClass"] = j.ApexClass.Name;
              innerObj["Methods"] = [];
              tempArr.push(innerObj);
         }              
       }
       console.log(tempArr);
       for(let j of recval){
        for(let k of tempArr){
            if(j.ApexClassId == k.ApexClassId){
                let insideObject = {};
                let compareObject = j;
                for(let m in compareObject){
                    if((m != "attributes") && (m != "ApexClass") && (m != "ApexClassId")){
                        insideObject[`${m}`] = compareObject[m];
                    }
                }
                k.Methods.push(insideObject);
            }
        }
    }
     console.log(tempArr);
     /***************************Children to grid table********************************************/
       for (let i = 0; i < tempArr.length; i++) {
        tempArr[i]._children = tempArr[i]["Methods"];
        }
        this.gridData = tempArr;
        console.log(this.gridData);
     /****************************Hyperlink to the Name********************************************/   
        let tempRecs=[];
        this.gridData.forEach(element=>{
        let tempRec = Object.assign( {}, element );  
        tempRec.ClassName = '/'+tempRec.ApexClassId;
        tempRecs.push( tempRec);
      })
        this.finalData=tempRecs;
        this.recordsToDisplay=this.finalData;
        this.recordList=tempRecs;
        //console.log(this.recordList);
        this.totalRecords = this.recordList.length;         
        this.pageSize = this.pageSizeOptions[0]; 
        this.paginationHelper();
           // this.tableData = this.finalData;
            console.log('tabledat',this.tableData)
      }



            checkboxChecked(){
                this.customListView=true;
            }
            customCustomList(){
                this.customListView = false;
            }
            saveCustomList(){
                getSobjectData({
                    'SoqlString': this.finalSoqlString
                }).then(result => {
                    console.log(JSON.parse(result));
                    this.showTable=false;
                    this.customListView = false;
                    //this.isLoading = false;
                   this.generateHeaders(result);
                   this.prepareTableData(result);
                   this.createCustomList();
                }).catch(err => {
                    console.error(err);
                  })
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
            soqlChanged(event) {
                this.finalSoqlString = event.detail.value;
                this.diableSubmit = false;
            }
            listviewName;
            handleListView(event){
               this.listviewName=event.target.value;
            }
        
            createCustomList(){
                var fields = {'Name' : this.listviewName, 'Query_Editor__listViewQuery__c' : this.finalSoqlString};
                // Record details to pass to create method with api name of Object.
                var objRecordInput = {'apiName' : 'Query_Editor__TestResultListview__c', fields};
                // LDS method to create record.
                createRecord(objRecordInput).then(response => {
                 //   alert('Listview created with Id: ' +response.id);
                }).catch(error => {
                //    alert('Error: ' +JSON.stringify(error));
                });
            
            }
            selectedListView='ALL';
            handleChangeListView(event){
                this.isExpanded = !this.isExpanded;
                this.selectedListView=event.target.dataset.filter;
                            console.log('result',this.selectedListView);
            customListViewQueryTestResult({'selectedListViewName': this.selectedListView})
            .then((result)=>{
                console.log(result);
                this.listViewQuery=result[0].Query_Editor__listViewQuery__c;
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