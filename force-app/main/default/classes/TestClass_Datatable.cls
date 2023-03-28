public class TestClass_Datatable {
 @AuraEnabled(cacheable=true)
        public static DataTableResponse GetWrapperOfSObjectFieldColumnActionValues(String TableName)
        {
            List<DataTableColumns> lstDataColumns            = new List<DataTableColumns>();
            List<SObject> lstDataTableData                   = new List<SObject>();
            List<string> columnList                          = new List<string>();
            List<string> fieldAPINameList                    = new List<string>();
    
            Query_Editor__Testclass_DynamicDatatable__mdt	 TableComponentMetadata = [SELECT Id, DeveloperName, Query_Editor__Field_Value__c, Query_Editor__Header_Value__c, Query_Editor__Query__c, Query_Editor__Table_Title__c FROM Query_Editor__Testclass_DynamicDatatable__mdt WHERE DeveloperName =: TableName];
    
            if(TableComponentMetadata.Query_Editor__Header_Value__c != null)
            {
                columnList = TableComponentMetadata.Query_Editor__Header_Value__c.split(',');
            }
    
            if(TableComponentMetadata.Query_Editor__Field_Value__c != null)
            {
                fieldAPINameList = TableComponentMetadata.Query_Editor__Field_Value__c.split(',');
            }
    
            for(integer i = 0; i < columnList.size(); i++)
            {
    
                DataTableColumns datacolumns = new DataTableColumns( columnList[i].trim() , 
                                                                    fieldAPINameList[i].substringBefore(':').trim(), 
                                                                    fieldAPINameList[i].substringAfter(':').trim());
    
                lstDataColumns.add(datacolumns);
            }
    
            for(SObject SObjectItem : Database.query(TableComponentMetadata.Query_Editor__Query__c))
            {
                lstDataTableData.add(SObjectItem);
            }
    
            DataTableResponse finalWrapper   = new DataTableResponse();
            finalWrapper.TableTitle          = TableComponentMetadata.Query_Editor__Table_Title__c;
            finalWrapper.lstDataTableColumns = lstDataColumns;
            finalWrapper.lstDataTableData    = lstDataTableData;
            return finalWrapper;
        }
    
       public class DataTableColumns {
            @AuraEnabled
            public String label {get;set;}
            @AuraEnabled       
            public String fieldName {get;set;}
            @AuraEnabled
            public String type {get;set;}
    
            public DataTableColumns(String label, String fieldName, String type)
            {
                this.label     = label;
                this.fieldName = fieldName;
                this.type      = type;          
            }
        }
        
        public class DataTableResponse {
            @AuraEnabled
            public List<DataTableColumns> lstDataTableColumns {get;set;}
            @AuraEnabled
            public List<sObject> lstDataTableData {get;set;}
            @AuraEnabled
            public String TableTitle {get;set;}       
        }
}