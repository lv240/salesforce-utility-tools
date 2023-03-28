public class sobjectdescription {
    @AuraEnabled
    Public static SchemaWrapper objInfo(string objectName){
        SchemaWrapper wrapper = new SchemaWrapper();
        wrapper.fields = getFieldsFromSObject(objectName);
        wrapper.childRelationship=getChildObjInfo(objectName);
        return wrapper;
    }
  
    private static List<Map<String,String>> getFieldsFromSObject(string sObjectName){
             List<Map<String,String>> fieldsMap = new List<Map<String,String>>();
        Schema.SObjectType targetType = Schema.getGlobalDescribe().get(sObjectName);
        Map<String, Schema.SObjectField> fieldMap = targetType.getDescribe().fields.getMap();
            for (Schema.SObjectField field : fieldMap.values()) {
                	Map<String,String> fieldDetails = new Map<String,String>();   
                	fieldDetails.put('label',field.getDescribe().getLabel());
                    fieldDetails.put('value',field.getDescribe().getName());
                	fieldsMap.add(fieldDetails);
                 System.debug(field.getDescribe().getName());
             }
        
        return fieldsMap;
    }
    
    public static List<Map<String,String>> getChildObjInfo(string objectName){
       List<Map<String,String>> childMap = new List<Map<String,String>>();
        map<string,sobjectType>objChildInfo=schema.getGlobalDescribe();
        for(string obj:objChildInfo.keyset()){
            if(objectName==obj){
           schema.DescribeSObjectResult res=objChildInfo.get(obj).getdescribe();
                for(schema.ChildRelationship childObj:res.getchildRelationships()){
                   Map<String,String> childDetails = new Map<String,String>(); 
                    childDetails.put('Name', childObj.relationshipname);
                    childDetails.put('Label',childObj.relationshipname);
                    
                    childMap.add(childDetails);
                    system.debug('child>>'+childMap);
                }           
        }
    }return childMap;     
    }
    
    public static List<Map<String,String>> getObjInfo(string objectName){
       List<Map<String,String>> objinfo = new List<Map<String,String>>();
        map<string,sobjectType>objChildInfo=schema.getGlobalDescribe();
        for(string obj:objChildInfo.keyset()){
            if(objectName==obj){
           schema.DescribeSObjectResult res=objChildInfo.get(obj).getdescribe();
                for(schema.ChildRelationship childObj:res.getchildRelationships()){
                   Map<String,String> childDetails = new Map<String,String>(); 
                    childDetails.put('Name', childObj.relationshipname);
                    childDetails.put('Label',childObj.relationshipname);
                    
                    objinfo.add(childDetails);
                    system.debug('child>>'+objinfo);
                }           
        }
    }return objinfo;     
    }
    

   
    
    public class SchemaWrapper {
        @AuraEnabled
        public List<Map<String,String>> fields;
        @AuraEnabled
        public list<Map<string,string>> childRelationship;
       
    }

}