public class userPermissons {
    
    public static void objectsVisible(){
    
    list<ObjectPermissions> lst=
                               [SELECT sObjectType, PermissionsCreate, PermissionsRead, PermissionsEdit, 
                                PermissionsDelete, PermissionsModifyAllRecords, PermissionsViewAllRecords 
                                FROM ObjectPermissions 
                                WHERE ParentId IN ( 
                                                   SELECT Id 
                                                   FROM PermissionSet 
                                                   WHERE PermissionSet.Profile.Name = 'System Administrator')];
    }

}