public class restExplorer1 {
   
    
    // GET METHOD
    @AuraEnabled
    public static string datas(string endpointUrl){
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' +getSessionIdFromVFPage());
        req.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+ endpointUrl);
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
        return null;
    }
    //DELETE METHOD
    @AuraEnabled
    public static string deleteRecord(string endpoint){
        HttpRequest req= new HttpRequest();
        Http http = new Http();
        HttpResponse response = new HttpResponse();
        // Steps to follow :-
        // 1. hit end point - REQUEST
        //
        req.setMethod('DELETE');
        req.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+ endpoint);
        req.setHeader('Authorization', 'Bearer ' +getSessionIdFromVFPage());
        //2. Method of data pasing (REQUEST method)
        try{
            response=http.send(req);
            //If repsonse is OK It will return status code 204
            if(response.getStatusCode()==204){
                string body='Record is deleted..!!';
                return body;
            }
            else{
                string body=response.getBody();
                system.debug(body);
                return body;
            }
        }
        catch(exception e){
            system.debug(e);
        }
        return null;
    }
    // POST METHOD
    @AuraEnabled
    public static string createRecord(string endPoint, string requestBody){
        // string endPoint= System.Label.Movies;
        // endPoint=endPoint+'/6';
        HttpRequest req= new HttpRequest();
        Http http = new Http();
        HttpResponse response = new HttpResponse();
        // Steps to follow :-
        // 1. hit end point - REQUEST
        //
        req.setMethod('POST');
        req.setHeader('Authorization', 'Bearer ' +getSessionIdFromVFPage());
        req.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+ endPoint);
        //system.debug('URL'+url.getSalesforceBaseUrl().toExternalForm()+endPoint);
        req.setHeader('Content-Type', 'application/json');
        req.setBody(requestBody);
        //2. Method of data pasing (REQUEST method)
        try{
            response=http.send(req);
            //If repsonse is OK It will return status code 204
            if(response.getStatusCode()==201){
                string body=response.getBody();
                System.debug('Body'+body);
                return body;
            }
            else{
                string body=response.getBody();
                system.debug('Error ::'+body);
                return body;
            }
        }
        catch(exception e){
            system.debug(e);
        }
        return null;
    }
    // PATCH METHOD
    @AuraEnabled
    public static string updateRecord(string endPoint, string requestBody){
        HttpRequest req= new HttpRequest();
        Http http = new Http();
        HttpResponse response = new HttpResponse();
        // Steps to follow :-
        // 1. hit end point - REQUEST
        //
        // String requestBody = '{"Name":"Madhu from apex"}';
        req.setMethod('PATCH');
        req.setHeader('Authorization', 'Bearer ' +getSessionIdFromVFPage());
        req.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+ endPoint);
        req.setHeader('Content-Type', 'application/json');
        req.setBody(requestBody);
        //2. Method of data pasing (REQUEST method)
        try{
            response=http.send(req);
            //If repsonse is OK It will return status code 200
            if(response.getStatusCode()==200){
                system.debug('Record is created');
                string body=response.getBody();
                System.debug('Body'+body);
                return body;
            }
            else{
                string body=response.getBody();
                system.debug('Error ::'+body);
                return body;
            }
        }
        catch(exception e){
            system.debug(e);
        }
        return null ;
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