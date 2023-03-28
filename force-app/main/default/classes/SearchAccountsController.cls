public class SearchAccountsController 
{
   Public String searchText{get;set;}
   Public List<Account> lstAccounts{get;set;}
   
   Public void SearchAccountRecords()
   {
       lstAccounts = new List<Account>();
   
       if(searchText != Null && searchText != '')
       {
          lstAccounts = [Select id, name, rating, industry, annualrevenue, 
                                       type, phone, fax, customerpriority__C, active__C
                                                   from Account
                                                           Where name Like : searchText+'%'];
       }
       else
           ApexPages.AddMessage(new ApexPages.Message(ApexPages.Severity.Warning, 'Please Enter the Search Content.'));
   }
}