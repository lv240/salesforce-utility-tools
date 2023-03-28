public class ShowAllAccountsController 
{
Public List<Account> lstAccounts{get;set;}

    Public ShowAllAccountsController()
    {
        lstAccounts = new List<Account>();
        
        lstAccounts = [Select id, name, rating, industry, annualrevenue, 
                                phone, fax, type, customerpriority__C, active__C
                                        from Account 
                                            Order by name];
    }
}