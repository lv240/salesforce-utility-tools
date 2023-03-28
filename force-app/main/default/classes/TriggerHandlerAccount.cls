public class TriggerHandlerAccount {
    public static void preventDuplicateRecords(List<Account> accList){
     // map<string,account> accmap = new map<string,account>();
      set<string> accset = new set<string>();
        for(account acc : accList){
         // accmap.put(acc.Phone,acc);
          accset.add(acc.Phone);  
        }
             set<string> abc = new set<string>();
        for(account a : [select id, phone from account where id in : accset]){
            abc.add(a.phone);
        }

        for(account acc : accList){
            if(abc.contains(acc.Phone)){
                acc.Phone.adderror('duplicate phone');
            }
        }
    }
}