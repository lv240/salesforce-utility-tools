public class AccountContact {
    public static void updateAccounttoContact(List<Contact> conList){
        set<id> setacc = new set<id>();
        for(Contact con : conList){
            if(con.AccountId != null){
                setacc.add(con.AccountId);
            }
            list<account> acclist = [select id, phone, fax from account where id in : setacc];
            for(account acc : acclist){
        for(Contact c : conList){
            if(c.AccountId == acc.Id){
                c.Phone = acc.Phone;
                c.Fax = acc.Fax;
            }
        }
            }
           /* if(mapacc.containsKey(con.AccountId)){
                account a = mapacc.containsKey(con.AccountId);
            con.phone = a.Phone;
            con.Fax = a.Fax;
            }*/
        }
    }

}