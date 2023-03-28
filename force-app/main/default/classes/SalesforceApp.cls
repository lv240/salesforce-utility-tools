public class SalesforceApp {
    
    public static String getCasesFromSalesforceB(){
          Http http = new Http();
          HttpRequest req = new HttpRequest();
          req.setEndpoint('callout:SFDCB/services/apexrest/Cases');
          req.setMethod('GET');
        
         HttpResponse response = http.send(req);
        if(response.getStatusCode() == 200){
            System.debug(response.getBody());
            return response.getBody();
        }
        return '';
        
        
    }

}