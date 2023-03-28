public class UserInfoWrapper {
    
        @AuraEnabled
        public boolean active;
        @AuraEnabled
        public address address;
        
        @AuraEnabled 
        public String email;	    //gowtham.guddanti@fissionlabs.com
        @AuraEnabled
        public boolean email_verified;
        @AuraEnabled
         public String family_name;	    //Labs
        @AuraEnabled 
        public String given_name;	    //Fission
        @AuraEnabled
         public String language;	    //en_US
        @AuraEnabled 
        public String locale;	    //en_US
        @AuraEnabled
         public String name;	    //Fission Labs
        @AuraEnabled
         public String nickname;	    //fissionlabslwc
        @AuraEnabled 
        public String organization_id;	    //00D5i0000088peJEAQ
        @AuraEnabled
         public photos photos;
        @AuraEnabled 
        public String picture;	    //https://fissionlabs77-dev-ed.file.force.com/profilephoto/005/F
        @AuraEnabled 
        public String preferred_username;	    //fissionlabslwc@sfdc.com
        @AuraEnabled
         public String profile;	    //https://fissionlabs77-dev-ed.my.salesforce.com/0055i000004ht4fAAA
        @AuraEnabled
         public String sub;	    //https://login.salesforce.com/id/00D5i0000088peJEAQ/0055i000004ht4fAAA
        @AuraEnabled 
        public String updated_at;	    //2022-12-12T15:32:31Z
        @AuraEnabled 
        public urls urls;
        @AuraEnabled 
        public String user_id;	    //0055i000004ht4fAAA
        @AuraEnabled 
        public String user_type;	    //STANDARD
        @AuraEnabled
         public Integer utcOffset;	    //-28800000
        @AuraEnabled
         public String zoneinfo;	    //America/Los_Angeles
        class address {
            @AuraEnabled 
            public String country;	    //IN
        }
    
        class photos {
            @AuraEnabled 
            public String thumbnail;	    //https://fissionlabs77-dev-ed.file.force.com/profilephoto/005/T
            @AuraEnabled 
            public String picture;	    //https://fissionlabs77-dev-ed.file.force.com/profilephoto/005/F
        }
    
        class urls {
            @AuraEnabled public String custom_domain;	    //https://fissionlabs77-dev-ed.my.salesforce.com
            @AuraEnabled  public String feed_elements;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/data/v{version}/chatter/feed-elements
            @AuraEnabled public String feed_items;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/data/v{version}/chatter/feed-items
            @AuraEnabled public String users;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/data/v{version}/chatter/users
            @AuraEnabled public String groups;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/data/v{version}/chatter/groups
            @AuraEnabled public String feeds;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/data/v{version}/chatter/feeds
            @AuraEnabled public String profile;	    //https://fissionlabs77-dev-ed.my.salesforce.com/0055i000004ht4fAAA
            @AuraEnabled public String tooling_rest;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/data/v{version}/tooling/
            @AuraEnabled public String tooling_soap;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/Soap/T/{version}/00D5i0000088peJ
            @AuraEnabled public String recent;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/data/v{version}/recent/
            @AuraEnabled public String query;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/data/v{version}/query/
            @AuraEnabled public String search;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/data/v{version}/search/
            @AuraEnabled public String sobjects;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/data/v{version}/sobjects/
            @AuraEnabled public String rest;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/data/v{version}/
            @AuraEnabled public String partner;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/Soap/u/{version}/00D5i0000088peJ
            @AuraEnabled public String metadata;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/Soap/m/{version}/00D5i0000088peJ
            @AuraEnabled public String enterprise;	    //https://fissionlabs77-dev-ed.my.salesforce.com/services/Soap/c/{version}/00D5i0000088peJ
        }
    
}