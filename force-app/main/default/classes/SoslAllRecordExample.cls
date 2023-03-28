public class SoslAllRecordExample {
 public static void queryAllObjects(string search){
       HttpRequest req = new HttpRequest();
       req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
       req.setHeader('Content-Type', 'application/json');

       req.setEndpoint(Url.getSalesforceBaseUrl().toExternalForm()+'/services/data/v52.0/search/?q=find+{'+search+'}');
       req.setMethod('GET');

       Http h = new Http();
       HttpResponse res = h.send(req);

       System.debug(res.getBody());
   }
}