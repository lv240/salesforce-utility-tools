public  class Userd {
   
     
    /*@AuraEnabled
    Public static OrgWrapper sessionInfo(){
        OrgWrapper wrapper = new OrgWrapper();
          wrapper.sdata= dogetuserInfo();
          wrapper.bdata = dogetInfo();

          
          
         return wrapper;
    }*/
    
    @AuraEnabled
    Public static Map<string,string> dogetuserInfo(){
        
        Map<string,string> infolist = new Map<string,string>();
        
        //getUserInfoResult result = connection.getUserInfo();
        //infolist.put('result',resulklt)
        String FirstName = UserInfo.getFirstName();
        infolist.put( 'FirstName',FirstName);
       
        String LastName = UserInfo.getLastName();
        infolist.put('LastName',LastName);
      
        String Name = UserInfo.getName();
        infolist.put('Name',Name);
     
        String UserEmail = UserInfo.getUserEmail();
        infolist.put('UserEmail',UserEmail);
       
        String UserType = UserInfo.getUserType();
        infolist.put('UserType',UserType);
      
        String UserId = UserInfo.getUserId();
        infolist.put('UserId',UserId );
  
        String UserName = UserInfo.getUserName();
        infolist.put('UserName',UserName );
        
        String ProfileId = UserInfo.getProfileId();
        infolist.put('ProfileId',ProfileId);
       
        String UserRoleId = UserInfo.getUserRoleId();
        infolist.put('UserRoleId',UserRoleId );
     
        String SessionId = UserInfo.getSessionId();
        infolist.put('SessionId',SessionId);
        
        String DefaultCurrency = UserInfo.getDefaultCurrency();
        infolist.put( 'DefaultCurrency',DefaultCurrency );
        
        String Locale = UserInfo.getLocale();
        infolist.put('Locale',Locale);
        
        String  Language = UserInfo.getLanguage();
        infolist.put('Language',Language);
        
        String Id = UserInfo.getOrganizationId();
        infolist.put('Id',Id);
        
        String OrgName = UserInfo.getOrganizationName();
        infolist.put('OrgName',OrgName);
        
        String Theme = UserInfo.getUiTheme();
        infolist.put('Theme',Theme);
        
        String ThemeDisplayed = UserInfo.getUiThemeDisplayed();
        infolist.put('ThemeDisplayed',ThemeDisplayed);
        
        
        
        /*Boolean xyz = UserInfo.isCurrentUserLicensed('Name');
        infolist.put('xyz',xyz)*/
        
        
        return infolist;
    }
    
    
     @AuraEnabled
    Public static Map<String ,Boolean> dogetInfo(){
        
        Map<String,Boolean>  infolist = new  Map<String,Boolean>();
        //getUserInfoResult result = connection.getUserInfo();
        //System.debug(result);
       Boolean isMultiCurrencyOrganization = UserInfo.isMultiCurrencyOrganization();
        infolist.put('isMultiCurrencyOrganization',UserInfo.isMultiCurrencyOrganization() );

       


        
        
        
        return infolist;
            
       
        
        
    }
        
       
        /*public class OrgWrapper {
        @AuraEnabled
        public Map<String,String> sdata;
        @AuraEnabled
        public Map<String,Boolean> bdata;
        
    
        

        

        
    }*/
}