trigger TriggeronAccount on Account (before insert) {
    if(trigger.isbefore){
        if(trigger.isinsert){
            TriggerHandlerAccount.preventDuplicateRecords(trigger.new);
        }
    }
}