public with sharing class SchemaClassExamples {

   public static void schemaMethodExamples(){

       
       if (Schema.SObjectType.User.fields.Name.isAccessible()) {
       }
         System.debug(Schema.sObjectType.User.fields.Name.isAccessible());
      
       
           
       
   }
}