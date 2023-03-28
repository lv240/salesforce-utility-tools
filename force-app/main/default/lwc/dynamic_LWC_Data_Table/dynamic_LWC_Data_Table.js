import { LightningElement, track, wire } from 'lwc';
import getDynamicTableDataList from '@salesforce/apex/TestClass_Datatable.GetWrapperOfSObjectFieldColumnActionValues';


export default class Dynamic_LWC_Data_Table extends LightningElement {
    @track DataTableResponseWrappper;
    @track finalSObjectDataList;


    @wire(getDynamicTableDataList, {TableName: 'Fields_List'})
    wiredContacts({ error, data }) 
    {
        if(data) 
        {
            console.log(data)
           let sObjectRelatedFieldListValues = [];
            
           for (let row of data.lstDataTableData) 
           {
                const finalSobjectRow = {}
                let rowIndexes = Object.keys(row); 
                rowIndexes.forEach((rowIndex) => 
                {
                    const relatedFieldValue = row[rowIndex];
                    if(relatedFieldValue.constructor === Object)
                    {
                        this._flattenTransformation(relatedFieldValue, finalSobjectRow, rowIndex)        
                    }
                    else
                    {
                        finalSobjectRow[rowIndex] = relatedFieldValue;
                    }
                    
                });
                sObjectRelatedFieldListValues.push(finalSobjectRow);
            }
            this.DataTableResponseWrappper = data;
            this.finalSObjectDataList = sObjectRelatedFieldListValues;
        } 
        else if (error) 
        {
            this.error = error;
        }
    }
    
    _flattenTransformation = (fieldValue, finalSobjectRow, fieldName) => 
    {        
        let rowIndexes = Object.keys(fieldValue);
        rowIndexes.forEach((key) => 
        {
            let finalKey = fieldName + '.'+ key;
            finalSobjectRow[finalKey] = fieldValue[key];
        })
    }
}