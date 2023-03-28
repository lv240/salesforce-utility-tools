public class Sampleclass {
     public Result Result;
	class Result {
		public GetUserInfoResult GetUserInfoResult;
	}

	class GetUserInfoResult {
		@AuraEnabled public String accessibility_mode;	    //
		@AuraEnabled public String currency_symbol;	    //
		@AuraEnabled public String organization_id;	    //
		@AuraEnabled public String organization_multi_currency;	    //
		@AuraEnabled public String organization_name;	    //
		@AuraEnabled public String org_default_currency_iso_code;	    //
		@AuraEnabled public String profile_id;	    //
		@AuraEnabled public String role_id;	    //
		@AuraEnabled public String session_seconds_valid;	    //
		@AuraEnabled public String user_default_currency_iso_code;	    //
		@AuraEnabled public String user_email;	    //
		@AuraEnabled public String user_full_name;	    //
		@AuraEnabled public String user_id;	    //
		@AuraEnabled public String user_language;	    //
		@AuraEnabled public String user_locale;	    //
		@AuraEnabled public String user_name;	    //
		@AuraEnabled public String user_time_zone;	    //
		@AuraEnabled public String user_type;	    //
		@AuraEnabled public String user_ui_skin;	    //
	}
 
}