public class descr {
 @AuraEnabled
    public static String getObjectDescription(string sObjectName){
        String sfdcURL = URL.getSalesforceBaseUrl().toExternalForm(); 
        String restAPIURL = sfdcURL + '/services/data/v55.0/sobjects/'+sObjectName+'/describe/';  
          
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
    }
    
    public static String getSessionIdFromVFPage(){
        String content = new PageReference('/apex/GenerateSession').getContent().toString();
        Integer s = content.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length(),
                e = content.indexOf('End_Of_Session_Id');
        return content.substring(s, e);
    }
}