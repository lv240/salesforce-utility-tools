public class testClass_Dashboard {
@AuraEnabled(cacheable=true)
    public static string testclassData(){
        string toolingSoql='/services/data/v56.0/tooling/query?q=SELECT+ApexClassOrTrigger.Id,+ApexClassOrTrigger.Name,+TestMethodName,+NumLinesCovered,+NumLinesUncovered,+CreatedBy.Name,+LastModifiedBy.name,+LastModifiedById+FROM+ApexCodeCoverage';
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
        String content = '';
        if (System.Test.isRunningTest()) {
            content= 'Start00D5i0000088peJ!ARoAQHs5Z_jUVy89TW8wCLKrIn06_KHXhjMMx9al4JRqstGCT6h56_qoE6JUuDnErr3rO72FO9Fg7XDzf3S1E0PRbHJbyy59End';
        } else {
            content = new PageReference('/apex/GenerateSession').getContent().toString();
        }
        
        Integer s = content.indexOf('Start') + 'Start'.length(),
            e = content.indexOf('End');
        return content.substring(s, e);
        
        
    }
    @AuraEnabled
    public static string testClassResult(){
        string toolingSoql='/services/data/v56.0/tooling/query?q=select+ApexClassId,+ApexClass.Name,+ApexLogId,+ApexTestRunResultId,+AsyncApexJobId,+Message,+MethodName,+Outcome,+QueueItemId,+RunTime,+StackTrace,+TestTimestamp+From+ApexTestResult';
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

    @AuraEnabled
    public static string getSobjectData(String SoqlString){
        
string toolingSoql='/services/data/v56.0/tooling/query?q='+SoqlString;
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
      @AuraEnabled
    public static string userEmail(List<string> toEmail){
        list<Messaging.SingleEmailMessage>sendEmail=new list<Messaging.SingleEmailMessage>();

        Messaging.SingleEmailMessage Mail=new Messaging.SingleEmailMessage();
        List<string> toEmailaDD=new list<string>{'gowtham.guddanti@fissionlabs.com'};
        Mail.setToAddresses(toEmailaDD);
        Mail.subject='Test Result Failed';
        Mail.setPlainTextBody('The Below test class is failed to cover the required test coverage');
        sendEmail.add(Mail);
       
        list<Messaging.SingleEmailMessage>senEmail=new list<Messaging.SingleEmailMessage>{mail};
            Messaging.SendEmailResult[] Results=Messaging.sendEmail(sendEmail);
        system.debug(Results);
        if(results[0].success){
            string result = 'Email Sent Successfully';
            return result;
        }
        else {
            string result='Unable to send Email';
            return result;
        }
       
        }
    @AuraEnabled
    public static list<user> userId(string LastModifiedUserId){
        list<user>userEmail=[select id,name,email from user where id= :LastModifiedUserId];
        return userEmail;
    }
    
    @AuraEnabled
    public static list<Query_Editor__Listview__c> customListViews(){
        list<Query_Editor__Listview__c> ListView=[select id,name,Query_Editor__List_view_Query__c from Query_Editor__Listview__c ];
        return ListView;
    }
    
    @AuraEnabled
    public static list<Query_Editor__Listview__c> customListViewQuery(string selectedListViewName){
        list<Query_Editor__Listview__c> ListView=[select id,name,Query_Editor__List_view_Query__c from Query_Editor__Listview__c where name=:selectedListViewName ];
        return ListView;    
    }
    
    @AuraEnabled
    public static list<Query_Editor__TestResultListview__c> customListViewsTestResult(){
        list<Query_Editor__TestResultListview__c> ListViewTest=[select id,Name,Query_Editor__listViewQuery__c from Query_Editor__TestResultListview__c ];
        return ListViewTest;
    }
    
    @AuraEnabled
    public static list<Query_Editor__TestResultListview__c> customListViewQueryTestResult(string selectedListViewName){
        list<Query_Editor__TestResultListview__c> ListViewTestResult=[select id,Name,Query_Editor__listViewQuery__c from Query_Editor__TestResultListview__c where Name=:selectedListViewName ];
        return ListViewTestResult;    
    }
    
    
    
    
    
  /*   @AuraEnabled
    public static testclass_Dashboard_Wrapper getSobjectData(String SoqlString){
   Http http = new Http();    
        HttpRequest httpRequest = new HttpRequest();  
        httpRequest.setMethod('GET'); 
        httpRequest.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
        httpRequest.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/tooling/query?q='+SoqlString); 
        try {  
            HttpResponse httpResponse = http.send(httpRequest); 
            
            System.debug(httpResponse.getBody());
            
            if (httpResponse.getStatusCode() == 200 ) {  
                return  (testclass_Dashboard_Wrapper) JSON.deserialize(httpResponse.getBody(), testclass_Dashboard_Wrapper.class); 
                
            } else {  
                System.debug(' httpResponse ' + httpResponse.getBody() );  
                throw new CalloutException( httpResponse.getBody() );  
            }   
        } catch( System.Exception e) {  
            System.debug('ERROR: '+ e);  
            throw e;  
        }
}*/
}