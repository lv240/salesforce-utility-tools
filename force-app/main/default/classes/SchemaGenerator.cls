public with sharing class SchemaGenerator {
    //description : method used to fetch all the sObjects
    @AuraEnabled
    public static List<Map<String,String>> getObjects(){
        List<Map<String,String>> objectMap = new List<Map<String,String>>();
        for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()){
           String name = objTyp.getDescribe().getName();
           String label = objTyp.getDescribe().getLabel();
                Map<String,String> sObjectDetails = new Map<String,String>();   
                    sObjectDetails.put('label',label);
                    sObjectDetails.put('value',name);
                  objectMap.add(sObjectDetails);
         
        }
    System.debug(objectMap);
        if(objectMap != null && objectMap.size() > 0){
          return objectMap;   
        }else{
            return null;
        }
    }
    
    @AuraEnabled
     Public static SchemaWrapper objInfo(string sObjectName){
         SchemaWrapper wrapper = new SchemaWrapper();
         wrapper.fieldWrapper = getFieldsFromSObject(sObjectName);
         wrapper.childRelationshipwrapper=getChildObjInfo(sObjectName);
         wrapper.attributes=getObjInfo(sObjectName);
         wrapper.recordTypes=getRTInfo(sObjectName);     
         return wrapper;
     }
   
     //getting fields
     private static List<FieldsWrapper> getFieldsFromSObject(string sObjectName){
              List<FieldsWrapper> fieldsMap = new List<FieldsWrapper>();
         Schema.SObjectType targetType = Schema.getGlobalDescribe().get(sObjectName);
         Map<String, Schema.SObjectField> fieldMap = targetType.getDescribe().fields.getMap();
             for (Schema.SObjectField field : fieldMap.values()) { 
                     FieldsWrapper wrapper = new FieldsWrapper();
                     wrapper.label = field.getDescribe().getLabel();
                     wrapper.value = field.getDescribe().getName();      
                     wrapper.attributes = getFieldObjInfo(field);
                     fieldsMap.add(wrapper);
                  System.debug(field.getDescribe().getName());
              }
         
         return fieldsMap;
     }
      //childobjects
      public static List<ChildWrapper> getChildObjInfo(string sObjectName){
         List<ChildWrapper> childMap = new List<ChildWrapper>();
          map<string,sobjectType>objChildInfo=schema.getGlobalDescribe();
          for(string obj:objChildInfo.keyset()){
              if(sObjectName==obj){
             schema.DescribeSObjectResult res=objChildInfo.get(obj).getdescribe();
                  for(schema.ChildRelationship childObj:res.getchildRelationships()){
                      system.debug(childObj);
                      ChildWrapper childDetails = new ChildWrapper(); 
                     // childDetails.put('RelationshipName', childObj.relationshipname);
                     childDetails.label = childObj.relationshipname;
                     childDetails.childattributes = getObjInchildfo(childObj);
  
                      //childDetails.put('isCascadeDelete()', '' +childObj.isCascadeDelete());
                      childMap.add(childDetails);
                      system.debug('child>>'+childMap);
                  }           
          }
      }return childMap;     
      }
    
      public static List<childttributeData> getObjInchildfo(schema.ChildRelationship childObj){
       
        List<childttributeData> attList = new List<childttributeData>();
          childttributeData cascadedelete = new childttributeData();
          cascadedelete.attribute = 'CascadeDdelete';
          cascadedelete.value = '' + childObj.cascadedelete;
                      
          childttributeData relationshipName = new childttributeData();
          relationshipName.attribute = 'Relationship Name';
          relationshipName.value = '' + childObj.getRelationshipName();
          
          childttributeData RestrictedDelete = new childttributeData();
          RestrictedDelete .attribute = 'Restricted Delete';
          RestrictedDelete .value = '' + childObj.isRestrictedDelete(); 
          
          childttributeData DeprecatedAndHidden = new childttributeData();
          DeprecatedAndHidden.attribute = 'isDeprecatedAndHidden';
          DeprecatedAndHidden.value = '' + childObj.isDeprecatedAndHidden();

          childttributeData childSobject = new childttributeData();
          childSobject.attribute = 'ChildSobject';
          childSobject.value = '' + childObj.getChildSObject();

          childttributeData field = new childttributeData();
          field.attribute = 'Field';
          field.value = '' + childObj.getField();
                      
                      
              attList.add(cascadedelete);
              attList.add(relationshipName);
              attList.add(RestrictedDelete);
              attList.add(DeprecatedAndHidden);
              attList.add(childSobject);
              attList.add(field);

                    
                    
          
          system.debug(attList);
      return attList;
      }
 
     //recordType
 
     //recordType
     public static Map<String,String> getRTInfo(string sObjectName){
         Map<String,String> rTDetails = new Map<String,String>();
         map<string,sobjectType>objRtInfo=schema.getGlobalDescribe();
         for(string obj:objRtInfo.keyset()){
             if(sObjectName==obj){
            schema.DescribeSObjectResult res=objRtInfo.get(obj).getdescribe();
                 for(schema.recordTypeInfo rt:res.getRecordTypeInfos()){ 
                     rTDetails.put('Developer Name',rt.DeveloperName);
                     rTDetails.put('Name',rt.Name);  
                     rTDetails.put('RecordType',rt.RecordTypeId);
                     rTDetails.put('Active','' + rt.isActive());
                     rTDetails.put('Available','' + rt.isAvailable());
                     rTDetails.put('DefaultRecordTypeMapping','' + rt.isDefaultRecordTypeMapping());
                     rTDetails.put('Master','' + rt.isMaster());      
                 }           
         }
     }return rTDetails;     
     }
 
     
    
 
 
     //attributes
     public static List<AttributeData> getFieldObjInfo(Schema.SObjectField fieldName){
 
                Schema.DescribeFieldResult field= fieldName.getDescribe();
          
                 List<AttributeData> attList = new List<AttributeData>();
                     AttributeData Accesable = new AttributeData();
                     Accesable.attribute = 'Accessible';
                     Accesable.value = '' + field.isAccessible();
 
                     AttributeData Cascade = new AttributeData();
                     Cascade.attribute = 'CascadeDelete';
                     Cascade.value = '' + field.isCascadeDelete();
 
                     AttributeData Createable = new AttributeData();
                     Createable.attribute = 'Createable';
                     Createable.value = '' + field.isCreateable();
 
                     AttributeData DeprecatedAndHidden = new AttributeData();
                     DeprecatedAndHidden.attribute = 'DeprecatedAndHidden';
                     DeprecatedAndHidden.value = '' + field.isDeprecatedAndHidden();
 
                     AttributeData Custom = new AttributeData();
                     Custom.attribute = 'Custom';
                     Custom.value = '' + field.isCustom();
 
                     AttributeData Updateable = new AttributeData();
                     Updateable.attribute = 'Updateable';
                     Updateable.value = '' + field.isUpdateable();
 
                     AttributeData Label = new AttributeData();
                     Label.attribute = 'Label';
                     Label.value = '' + field.getLabel();
 
                     AttributeData Name = new AttributeData();
                     Name.attribute = 'Name';
                     Name.value = '' + field.getName();
 
                     AttributeData Unique = new AttributeData();
                     Unique.attribute = 'Unique';
                     Unique.value = '' + field.isUnique();
 
                     AttributeData ByteLength = new AttributeData();
                     ByteLength.attribute = 'ByteLength';
                     ByteLength.value = '' + field.getByteLength();
 
                     AttributeData WriteRequiresMasterRead = new AttributeData();
                     WriteRequiresMasterRead.attribute = 'WriteRequiresMasterRead';
                     WriteRequiresMasterRead.value = '' + field.isWriteRequiresMasterRead();
                     AttributeData Sortable = new AttributeData();
                     Sortable.attribute = 'Sortable';
                     Sortable.value = '' + field.isSortable();
                     AttributeData SearchPrefilterable = new AttributeData();
                     SearchPrefilterable.attribute = 'SearchPrefilterable';
                     SearchPrefilterable.value = '' + field.isSearchPrefilterable();
                     AttributeData isCaseSensitive = new AttributeData();
                     isCaseSensitive.attribute = 'CaseSensitive';
                     isCaseSensitive.value = '' + field.isCaseSensitive();
                     AttributeData Calculated = new AttributeData();
                     Calculated.attribute = 'Calculated';
                     Calculated.value = '' + field.isCalculated();
                     AttributeData DefaultedOnCreate = new AttributeData();
                     DefaultedOnCreate.attribute = 'DefaultedOnCreate';
                     DefaultedOnCreate.value = '' + field.isDefaultedOnCreate();
                     AttributeData DependentPicklist = new AttributeData();
                     DependentPicklist.attribute = 'DependentPicklist';
                     DependentPicklist.value = '' + field.isDependentPicklist();
                     AttributeData AutoNumber = new AttributeData();
                     AutoNumber.attribute = 'AutoNumber';
                     AutoNumber.value = '' + field.isAutoNumber();
                     AttributeData isGroupable = new AttributeData();
                     isGroupable.attribute = 'Groupable';
                     isGroupable.value = '' + field.isGroupable();
                     AttributeData isfilterable = new AttributeData();
                     isfilterable.attribute = 'filterable';
                     isfilterable.value = '' + field.isfilterable();
                     AttributeData isNamefield = new AttributeData();
                     isNamefield.attribute = 'Namefield';
                     isNamefield.value = '' + field.isNamefield();
                     AttributeData isNamePointing = new AttributeData();
                     isNamePointing.attribute = 'NamePointing';
                     isNamePointing.value = '' + field.isNamePointing();
                     AttributeData isNillable = new AttributeData();
                     isNillable.attribute = 'Nillable';
                     isNillable.value = '' + field.isNillable();
                     AttributeData isPermissionable = new AttributeData();
                     isPermissionable.attribute = 'Permissionable';
                     isPermissionable.value = '' + field.isPermissionable();
                     AttributeData AiPredictionField = new AttributeData();
                     AiPredictionField.attribute = 'AiPredictionField';
                     AiPredictionField.value = '' + field.isAiPredictionField();
                     AttributeData Digits = new AttributeData();
                     Digits.attribute = 'Digits';
                     Digits.value = '' + field.getDigits();
                     AttributeData IdLookup = new AttributeData();
                     IdLookup.attribute = 'IdLookup';
                     IdLookup.value = '' + field.isIdLookup();
                     AttributeData Length = new AttributeData();
                     Length.attribute = 'Length';
                     Length.value = '' + field.getLength();
                     AttributeData Precision = new AttributeData();
                     Precision.attribute = 'Precision';
                     Precision.value = '' + field.getPrecision();
                     AttributeData ReferenceTo = new AttributeData();
                     ReferenceTo.attribute = 'ReferenceTo';
                     ReferenceTo.value = '' + field.getReferenceTo();
                     AttributeData RelationshipName = new AttributeData();
                     RelationshipName.attribute = 'RelationshipName';
                     RelationshipName.value = '' + field.getRelationshipName();
                     AttributeData Scale = new AttributeData();
                     Scale.attribute = 'Scale';
                     Scale.value = '' + field.getScale();
                     AttributeData SOAPType = new AttributeData();
                     SOAPType.attribute = 'SOAPType';
                     SOAPType.value = '' + field.getSOAPType();
                     AttributeData isRestrictedPicklist = new AttributeData();
                     isRestrictedPicklist.attribute = 'RestrictedPicklist';
                     isRestrictedPicklist.value = '' + field.isRestrictedPicklist();
                     AttributeData getType = new AttributeData();
                     getType.attribute = 'Type';
                     getType.value = '' + field.getType();
                     AttributeData isUnique = new AttributeData();
                     isUnique.attribute = 'Unique';
                     isUnique.value = '' + field.isUnique();

                     attList.add(AiPredictionField);
                     attList.add(AutoNumber);
                     attList.add(ByteLength);
                     attList.add(Calculated);
                     attList.add(isCaseSensitive);
                     attList.add(Createable);
                     attList.add(Custom);
                     attList.add(DefaultedOnCreate);
                     attList.add(DeprecatedAndHidden);
                     attList.add(Digits);
                     attList.add(isfilterable);
                     attList.add(isGroupable);
                     attList.add(IdLookup);
                     attList.add(Label);
                     attList.add(Length);
                     attList.add(Name);
                     attList.add(isNamefield);
                     attList.add(isNamePointing);
                     attList.add(isNillable);
                     attList.add(isPermissionable);
                     attList.add(Precision);
                     attList.add(isRestrictedPicklist);
                     attList.add(Scale);
                     attList.add(SearchPrefilterable);
                     attList.add(SOAPType);
                     attList.add(Sortable);
                     attList.add(Updateable);
                     attList.add(getType);
                     attList.add(isUnique);


                     attList.add(Accesable);
                     attList.add(Cascade);
                     attList.add(WriteRequiresMasterRead);
                     attList.add(DependentPicklist);
                     attList.add(isPermissionable);
                     attList.add(ReferenceTo);
                     attList.add(RelationshipName);
 
                     return attList;
          }
 
     
     //attributes
      public static map<string,string> getObjInfo(string sObjectName){
        
         map<string,string> objInfo=new map<string,string>();
          for(schema.SObjectType objType : schema.getGlobalDescribe().values()){
              schema.DescribeSObjectResult desObj=objType.getDescribe();
              string name =objType.getDescribe().getLocalName();
              string label=objType.getDescribe().getLabel();
              if(name == sObjectName){
                objInfo.put('Associate EntityType ',desObj.getAssociateEntityType());
                objInfo.put('Associate ParentEntity ',desObj.getAssociateParentEntity());
                objInfo.put('Createable ','' + desObj.isCreateable());
                objInfo.put('Custom ','' + desObj.isCustom());
                objInfo.put('CustomSetting ','' + desObj.isCustomSetting());
                objInfo.put('Default Implementation ',desObj.getDefaultImplementation());
                objInfo.put('Deletable ','' + desObj.isDeletable());
                objInfo.put('DeprecatedAndHidden ','' + desObj.isDeprecatedAndHidden());
                objInfo.put('FeedEnabled ','' + desObj.isFeedEnabled());
                objInfo.put('Hassubtypes ','' + desObj.getHasSubtypes());
                objInfo.put('Implementedby ',desObj.getImplementedBy());
                objInfo.put('ImplementsInterfaces ',desObj.getImplementsInterfaces());
                objInfo.put('Interface ','' + desObj.getIsInterface());
                objInfo.put('subtype ','' + desObj.getIsSubtype());
                objInfo.put('KeyPrefix ',desObj.getKeyPrefix());
                objInfo.put('Label ',desObj.getLabel());
                objInfo.put('LabelPlural ',desObj.getLabelPlural());
                objInfo.put('Mergeable ','' + desObj.isMergeable());
                 objInfo.put('MruEnabled ','' + desObj.isMruEnabled());
                 objInfo.put('Name ',desObj.getName());
                 objInfo.put('Queryable ','' + desObj.isQueryable());

                 objInfo.put('LocalName ',desObj.getLocalName());
               
                
                 objInfo.put('Accessable ','' + desObj.isAccessible());
                
                 
                 objInfo.put('Searchable ','' + desObj.isSearchable());
                 objInfo.put('Undeletable ','' + desObj.isUndeletable());
                 objInfo.put('Updateable ','' + desObj.isUpdateable());
               
              }
          }
          
          return objInfo;
        
     }  
         
    
       public class SchemaWrapper {
         @AuraEnabled
         public List<FieldsWrapper> fieldWrapper;
         @AuraEnabled
         public list<ChildWrapper> childRelationshipwrapper;
         @AuraEnabled
         public Map<String,String> attributes;
         @AuraEnabled
         public Map<String,String> recordTypes;
         /*  @AuraEnabled
         public List<Map<String,String>> fieldAttributes; */ 
  
     }
 
     public class FieldsWrapper { 
         @AuraEnabled
         public String label;
         @AuraEnabled
         public String value;
         @AuraEnabled
         public List<AttributeData> attributes;
     }
 
     public class AttributeData { 
         @AuraEnabled
         public String attribute;
         @AuraEnabled
         public String value;
     }
     public class ChildWrapper { 
         @AuraEnabled
         public String label;
         @AuraEnabled
         public List<childttributeData> childattributes;
     }
 
     public class childttributeData { 
         @AuraEnabled
         public String attribute;
         @AuraEnabled
         public String value;
     }
 
     
 }