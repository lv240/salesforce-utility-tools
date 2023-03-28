trigger acc_trigger on Account (before insert) {
account_salesrep.acclimit(trigger.new);
}