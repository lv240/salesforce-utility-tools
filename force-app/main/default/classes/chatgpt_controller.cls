public with sharing class chatgpt_controller {
    @AuraEnabled(cacheable=true)
    public static List<String> getResponse(String input) {
        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setEndpoint('https://api.openai.com/v1/engines/davinci/jobs');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization', 'Bearer <API_KEY>');
        
        String requestBody = '{"prompt":"' + input + '","max_tokens":100}';
        req.setBody(requestBody);
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        List<String> response = new List<String>();
        if (res.getStatusCode() == 200) {
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
           // response.add((String) responseMap.get('choices')[0].get('text'));
        } else {
            response.add('Error in API call: ' + res.getStatusCode() + ' ' + res.getStatus());
        }
        
        return response;
    }
}