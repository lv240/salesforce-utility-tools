@isTest
private class TestRunAs2 {
    
   public static testMethod void testRunAs() {
        // Setup test data
        // Create a unique UserName
        //String uniqueUserName = 'standarduser' + DateTime.now().getTime() + '@testorg.com';
        // This code runs as the system user
        //Profile p = [SELECT Id FROM Profile WHERE Name='sut profile'];
        //User u = new User(Alias = 'hpand', Email='standarduser@testorg.com',
        //EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
        //LocaleSidKey='en_US', ProfileId = p.Id,
        //TimeZoneSidKey='America/Los_Angeles',
         //UserName=uniqueUserName);

        //System.runAs(u) {
              // The following code runs as user 'u'
              //System.debug('Current User: ' + UserInfo.getUserName());
              //System.debug('Current Profile: ' + UserInfo.getProfileId());
              //
          User u3 = [SELECT Id FROM User WHERE UserName='hpandya@sfdc.com'];
         System.runAs(u3) {
            System.debug('Current User: ' + UserInfo.getUserName());
            System.debug('Current Profile: ' + UserInfo.getProfileId());
         }

    }
}