public class AcctoCon {
    public static void accTocon(List<Account> newacc){
         List<Contact> conList = new List<Contact>();
        for(Account acc : newacc){
            
        Contact con = new Contact();
        con.AccountId = acc.Id;
            con.FirstName = 'test';
            con.LastName = acc.Name;
            conList.add(con);
       }
        insert conList;
    }
}