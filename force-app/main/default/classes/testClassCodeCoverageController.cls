public class testClassCodeCoverageController {
    @AuraEnabled
    public static string datas(){
        string toolingSoql='/services/data/v56.0/tooling/query?q=SELECT+ApexClassOrTrigger.Id,+ApexClassOrTrigger.Name,+TestMethodName,+NumLinesCovered,+NumLinesUncovered,+CreatedBy.Name,+LastModifiedBy.name+FROM+ApexCodeCoverage';
       Http http = new Http();   
        HttpRequest req = new HttpRequest();  
        req.setMethod('GET'); 
        req.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
        req.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+toolingSoql);
        httpResponse res=new httpResponse();
        try {  
            res=http.send(req);
           if (res.getStatusCode() == 200 ) {  
                string body=res.getBody();//data
                system.debug(body); 
                /*Map<String,Object> results=(Map<String,Object>)JSON.deserializeUntyped(body);
                system.debug(results);*/
               return body;
                
               } 
            else {  
                System.debug('Error Response' + res.getBody());    
            }   
        } catch( System.Exception e) {  
            System.debug('ERROR: '+ e);  
            throw e;  
        }  
        return Null;
        
    }
    
     public static String getSessionIdFromVFPage(){
        string content = new PageReference('/apex/GenerateSession').getContent().toString();
        Integer start = content.indexOf('Start') + 'Start'.length(),
              endT = content.indexOf('End');
        return content.substring(start, endT);
        
        
    }


}