public with sharing class ConvertObjectDetails {
    @AuraEnabled()
        public static String convert(String objectName,String currentObject,String currentRecordid,List<String> fieldsName) {
            String myListStirng = string.join(fieldsName,',');
            Id recordid=currentRecordid;
            List<sObject> test =Database.query('SELECT ' +myListStirng+' FROM ' +currentObject+' WHERE Id=:recordid');
            try {
            String objName = objectName;
            String recordName = 'Salesforce';
            List<String> lstName = myListStirng.split(',');
            sObject sObj = Schema.getGlobalDescribe().get(objName).newSObject();
           
            for(SObject record : test){
               
                for(Integer i = 0; i < lstName.size(); i++){
                sObj.put(lstName[i], record.get(lstName[i]));
               
                }
               
                Insert sObj ;
            }
           
             for (SObjectField field : Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap().values())
               {
                 if (!field.getDescribe().isNillable() && !field.getDescribe().isUpdateable())
                 {
                     system.debug('Required Fields -'+field);
                 }
              }
           return sObj.Id ;
            }
               catch (Exception e) {
               String errorMsg = e.getMessage();
               throw new AuraHandledException(ErrorMsg);
           }
            
       }
   }