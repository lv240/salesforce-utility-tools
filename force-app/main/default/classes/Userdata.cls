public with sharing class Userdata
{

    
  //description : method used to fetch all the sObjects
  /*@AuraEnabled
  public static List<Map<String,String>> getObjects(){
      List<Map<String,String>> objectMap = new List<Map<String,String>>();
      for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()){
         String name = objTyp.getDescribe().getName();
         String label = objTyp.getDescribe().getLabel();
       /*  if(!name.containsignorecase('history') && !name.containsignorecase('tag') &&
              !name.containsignorecase('share') && !name.containsignorecase('feed') && 
               !name.containsignorecase('group') && !name.containsignorecase('public') &&
              !objTyp.getDescribe().isCustomSetting() && objTyp.getDescribe().isCreateable() &&
              objTyp.getDescribe().getRecordTypeInfos().size() > 0){  
              Map<String,String> sObjectDetails = new Map<String,String>();   
                  sObjectDetails.put('label',label);
                  sObjectDetails.put('value',name);
                objectMap.add(sObjectDetails);
       //  }
      }
  System.debug(objectMap);
      if(objectMap != null && objectMap.size() > 0){
        return objectMap;   
      }else{
        return null;
    }
}*/

  
    /*@AuraEnabled
     public static String getUserDetails(){
        String sfdcURL = URL.getSalesforceBaseUrl().toExternalForm(); 
        String restAPIURL = sfdcURL + '/services/oauth2/userinfo';  
          
        HttpRequest httpRequest = new HttpRequest();  
        httpRequest.setMethod('GET');   
        httpRequest.setHeader('Authorization', 'Bearer ' + getSessionIdFromVFPage()); 
        httpRequest.setEndpoint(restAPIURL);  
        String response = '';
        try {  
                 Http http = new Http();   
                 HttpResponse httpResponse = http.send(httpRequest);  
                 if (httpResponse.getStatusCode() == 200 ) {  
                   
                
                       response = JSON.serialize( JSON.deserializeUntyped(httpResponse.getBody()) );  
                 } else {  
                       System.debug(' httpResponse ' + httpResponse.getBody() );  
                       throw new CalloutException( httpResponse.getBody() );  
                 }   
        } catch( System.Exception e) {  
                 System.debug('ERROR: '+ e);  
                 throw e;  
        }  
        System.debug(' ** response ** : ' + response );  
        
        return response;
    }*/

    @AuraEnabled
    public static UserInfoWrapper getUserDetails(){
        // String sfdcURL = URL.getSalesforceBaseUrl().toExternalForm(); 
        // String restAPIURL = 'callout:CallmeBack/services/data/v55.0/sobjects/'+sObjectName+'/describe/';        
       
        
        Http http = new Http();   
        
        HttpRequest httpRequest = new HttpRequest();  
        httpRequest.setMethod('GET'); 
        //httpRequest.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
         //httpRequest.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v55.0/sobjects/'+sObjectName+'/describe/');
        
       httpRequest.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
       httpRequest.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/oauth2/userinfo'); 
        
        //httpRequest.setEndpoint('callout:Sosl/services/data/v55.0/sobjects/'+sObjectName+'/describe/');  
        try {  
            HttpResponse httpResponse = http.send(httpRequest); 
            
            System.debug(httpResponse.getBody());
            
            if (httpResponse.getStatusCode() == 200 ) {  
                return  ( UserInfoWrapper) JSON.deserialize(httpResponse.getBody(),  UserInfoWrapper.class); 
                
            } else {  
                System.debug(' httpResponse ' + httpResponse.getBody() );  
                throw new CalloutException( httpResponse.getBody() );  
            }   
        } catch( System.Exception e) {  
            System.debug('ERROR: '+ e);  
            throw e;  
        }  
        
    }
    
    public static String getSessionIdFromVFPage(){
        String content = new PageReference('/apex/GenerateSession').getContent().toString();
       
          
        Integer s = content.indexOf('Start') + 'Start'.length(),
            e = content.indexOf('End');
        return content.substring(s, e);
       
    }
}