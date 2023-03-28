@isTest
public class RunAsTestExample {
    //Test method
    public static testMethod void testRunAs() {
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User'];
        
        UserRole userRole = [SELECT Id FROM UserRole WHERE Name='COO'];
        
        //Create our test user
        User u = new User(
            alias = 'random', email='random@salesforce.com', 
            emailencodingkey='UTF-8', lastname='random', 
            localesidkey='en_US', languagelocalekey='en_US',
            profileid = p.Id, userroleid = userRole.Id,
            timezonesidkey='America/Los_Angeles',
            username='randomuser@salesforceTest.com'
        );
        //Insert user record
        insert u;
        
              //create account record
        Account a = new Account(name='Acme');
        //Insert account - this will cause mixed dml error as we have already inserted a user record
        insert a;
        
        
        
    }
}