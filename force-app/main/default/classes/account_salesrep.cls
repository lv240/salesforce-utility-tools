public class account_salesrep {
    public static void acclimit(list<account> newacc){
        if(newacc.size() <= 5){
            for(account acc : newacc){
            acc.Query_Editor__Sales_Rep__c = acc.OwnerId;
        } 
        }else{
      throw new System.LimitException('You can only create up to 5 records at a time.');
        }
       
    }

}