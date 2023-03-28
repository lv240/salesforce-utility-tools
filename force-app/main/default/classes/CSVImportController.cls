public class CSVImportController {
    @AuraEnabled
    public static List<Map<String,String>> getObjects(){
        List<Map<String,String>> objectMap = new List<Map<String,String>>();
        for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()){
            schema.DescribeSObjectResult describeObj=objTyp.getDescribe();
            if(describeObj.isAccessible()==true){
                String name = describeObj.getName();
                String label = describeObj.getLabel();
                Map<String,String> sObjectDetails = new Map<String,String>();   
                sObjectDetails.put('label',label);
                sObjectDetails.put('value',name);
                objectMap.add(sObjectDetails);
            }
            
        }
        System.debug(objectMap.size());
        return objectMap;   
        
    }
    
    public static string myJobId;
    @AuraEnabled
    public static void BulkInsert(id contentDocumentId, string objectName){
        ContentVersion contentVersionObj = [ SELECT Id, VersionData FROM 
                                            ContentVersion WHERE 
                                            ContentDocumentId =:contentDocumentId ];
        //Creating  a Bulk job by requesting through salesforce endpoint.
        //POST method is used for creating a job
        //Body should be in a JSON format and should includes the operation and object where we are performing insert operation.
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
        request.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest');
        request.setHeader('content-type', 'application/json' );
        String body = '{ '+
            '"externalIdFieldName": "Id",'+  
            '"lineEnding": "CRLF",'+ 
            '"operation": "insert",'+ 
            '"object": "'+objectName+'",'+ 
            '"contentType": "CSV"'+
            '}';
        
        request.setBody(body);
        Http h = new Http();
        HttpResponse resp = h.send(request);  
        System.debug('res>>>>>: ' + resp.getbody());
        if(resp.getStatusCode() == 200) {
            Map<String, Object> respMap = (Map<String, Object>) Json.deserializeUntyped(resp.getBody());
            system.debug('respMap'+respMap);
            String jobId = (String)respMap.get('id');
            CSVImportController.myJobId=jobId;
            system.debug(CSVImportController.myJobId);
            system.debug('jobId'+jobId);
            //Sending  CSV data using body.
            HttpRequest request1 = new HttpRequest();
            request1.setMethod('PUT');
            request1.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
            request1.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest/'+jobId+'/batches'); 
            request1.setHeader('content-type', 'text/csv' );
            request1.setBody(contentVersionObj.VersionData.toString());
            Http h1 = new Http();
            HttpResponse resp1 = h1.send(request1);
            System.debug('resp1>>>>>: ' + resp1.getbody());
            if(resp1.getStatusCode() == 201){
                //Closing  a Bulk job to insert of records to be processed.
                HttpRequest request2 = new HttpRequest();
                request2.setMethod('PATCH');
                request2.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
                request2.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest/'+jobId);
                request2.setHeader('content-type', 'application/json');
                request2.setBody('{"state" : "UploadComplete"}');
                Http h2 = new Http();
                HttpResponse resp2 = h2.send(request2);
                System.debug('resp2>>>>>: ' + resp2.getbody());
            }
            
        }
    }
    
    public static void naveen(){
        string  jobsId = CSVImportController.myJobId;
        system.debug(jobsId);
       list<AsyncApexJob> apexJob  = [select id, Status from AsyncApexJob where id =:'7505i00000CU4hjAAD'];
       system.debug(apexJob);
    }
     @AuraEnabled
    public static string testClassResult(){
        string toolingSoql='/services/data/v56.0/tooling/query?q=select+Id,+status+From+AsyncApexJob+where+id+=+7505i00000CU4hjAAD';
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
    public static void BulkUpdate(id contentDocumentId, string objectName){
        ContentVersion contentVersionObj = [ SELECT Id, VersionData FROM 
                                            ContentVersion WHERE 
                                            ContentDocumentId =:contentDocumentId ];
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
        request.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest');
        request.setHeader('content-type', 'application/json' );
        String body = '{ '+
            '"externalIdFieldName": "Id",'+  
            '"lineEnding" : "LF",'+ 
            '"operation" : "update",'+ 
            '"object" : "'+objectName+'",'+ 
            '"contentType" : "CSV"'+
            '}';
        
        request.setBody(body);
        Http h = new Http();
        HttpResponse resp = h.send(request);  
        System.debug('res>>>>>: ' + resp.getbody());
        if(resp.getStatusCode() == 200) {
            Map<String, Object> respMap = (Map<String, Object>) Json.deserializeUntyped(resp.getBody());
            system.debug('respMap'+respMap);
            String jobId = (String)respMap.get('id');
            system.debug('jobId'+jobId);
            HttpRequest request1 = new HttpRequest();
            request1.setMethod('PUT');
            request1.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
            request1.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest/'+jobId+'/batches'); 
            request1.setHeader('content-type', 'text/csv' );
            request1.setBody(contentVersionObj.VersionData.toString());
            Http h1 = new Http();
            HttpResponse resp1 = h1.send(request1);
            System.debug('resp1>>>>>: ' + resp1.getbody());
            if(resp1.getStatusCode() == 201){
                HttpRequest request2 = new HttpRequest();
                request2.setMethod('PATCH');
                request2.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
                request2.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest/'+jobId);
                request2.setHeader('content-type', 'application/json');
                request2.setBody('{"state" : "UploadComplete"}');
                Http h2 = new Http();
                HttpResponse resp2 = h2.send(request2);
                System.debug('resp2>>>>>: ' + resp2.getbody());
            }
            
        }
    }
    @AuraEnabled
    public static void BulkUpsert(id contentDocumentId, string objectName){
        ContentVersion contentVersionObj = [ SELECT Id, VersionData FROM 
                                            ContentVersion WHERE 
                                            ContentDocumentId =:contentDocumentId ];
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
        request.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest');
        request.setHeader('content-type', 'application/json' );
        String body = '{ '+
            '"externalIdFieldName": "Id",'+  
            '"lineEnding" : "CRLF",'+ 
            '"operation" : "upsert",'+ 
            '"object" : "'+objectName+'",'+ 
            '"contentType" : "CSV"'+
            '}';
        
        request.setBody(body);
        Http h = new Http();
        HttpResponse resp = h.send(request);  
        System.debug('res>>>>>: ' + resp.getbody());
        if(resp.getStatusCode() == 200) {
            Map<String, Object> respMap = (Map<String, Object>) Json.deserializeUntyped(resp.getBody());
            system.debug('respMap'+respMap);
            String jobId = (String)respMap.get('id');
            system.debug('jobId'+jobId);
            HttpRequest request1 = new HttpRequest();
            request1.setMethod('PUT');
            request1.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
            request1.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest/'+jobId+'/batches'); 
            request1.setHeader('content-type', 'text/csv' );
            request1.setBody(contentVersionObj.VersionData.toString());
            Http h1 = new Http();
            HttpResponse resp1 = h1.send(request1);
            System.debug('resp1>>>>>: ' + resp1.getbody());
            if(resp1.getStatusCode() == 201){
                HttpRequest request2 = new HttpRequest();
                request2.setMethod('PATCH');
                request2.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
                request2.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest/'+jobId);
                request2.setHeader('content-type', 'application/json');
                request2.setBody('{"state" : "UploadComplete"}');
                Http h2 = new Http();
                HttpResponse resp2 = h2.send(request2);
                System.debug('resp2>>>>>: ' + resp2.getbody());
            }
            
        }
    }
    @AuraEnabled
    public static void BulkDelete(id contentDocumentId, string objectName){
        ContentVersion contentVersionObj = [ SELECT Id, VersionData FROM 
                                            ContentVersion WHERE 
                                            ContentDocumentId =:contentDocumentId ];
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
        request.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest');
        request.setHeader('content-type', 'application/json' );
        String body = '{ '+
            '"externalIdFieldName": "Id",'+  
            '"lineEnding" : "CRLF",'+ 
            '"operation" : "delete",'+ 
            '"object" : "'+objectName+'",'+ 
            '"contentType" : "CSV"'+
            '}';
        
        request.setBody(body);
        Http h = new Http();
        HttpResponse resp = h.send(request);  
        System.debug('res>>>>>: ' + resp.getbody());
        if(resp.getStatusCode() == 200) {
            Map<String, Object> respMap = (Map<String, Object>) Json.deserializeUntyped(resp.getBody());
            system.debug('respMap'+respMap);
            String jobId = (String)respMap.get('id');
            system.debug('jobId'+jobId);
            HttpRequest request1 = new HttpRequest();
            request1.setMethod('PUT');
            request1.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
            request1.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest/'+jobId+'/batches'); 
            request1.setHeader('content-type', 'text/csv' );
            request1.setBody(contentVersionObj.VersionData.toString());
            Http h1 = new Http();
            HttpResponse resp1 = h1.send(request1);
            System.debug('resp1>>>>>: ' + resp1.getbody());
            if(resp1.getStatusCode() == 201){
                HttpRequest request2 = new HttpRequest();
                request2.setMethod('PATCH');
                request2.setHeader('Authorization', 'Bearer '  +getSessionIdFromVFPage()); 
                request2.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v56.0/jobs/ingest/'+jobId);
                request2.setHeader('content-type', 'application/json');
                request2.setBody('{"state" : "UploadComplete"}');
                Http h2 = new Http();
                HttpResponse resp2 = h2.send(request2);
                System.debug('resp2>>>>>: ' + resp2.getbody());
            }
            
        }
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
}