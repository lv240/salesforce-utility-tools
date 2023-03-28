trigger TriggerAccounttoContact on Contact (before insert) {
      AccountContact.updateAccounttoContact(Trigger.new);
}