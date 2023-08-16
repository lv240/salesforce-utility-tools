public with sharing class AccountController {
   
    @AuraEnabled (cacheable=true)
    public static List<Account> searchAccounts(String keySearch){
        String strAccName = keySearch + '%';
        List<Account> accList = [SELECT Id, Name, Type, Phone, Industry, Website FROM Account WHERE Name LIKE: strAccName];   
        return accList;
    }    
}