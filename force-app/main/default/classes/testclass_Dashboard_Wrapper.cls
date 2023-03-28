public class testclass_Dashboard_Wrapper {
   /*         @auraEnabled
    public Integer size;	//6
            @auraEnabled
	public Integer totalSize;	//6
            @auraEnabled
	public boolean done;
            @auraEnabled
	public cls_queryLocator queryLocator;
            @auraEnabled
	public String entityTypeName;	//ApexCodeCoverage
            @auraEnabled
	public cls_records[] records;
	public class cls_queryLocator {
	}*/
	public class cls_records {
        @auraEnabled
        public cls_attributes attributes;
        @auraEnabled
        public cls_ApexClassOrTrigger ApexClassOrTrigger;
        @auraEnabled
        public String TestMethodName;	//doTestCallout
        @auraEnabled
        public Integer NumLinesCovered;	//0
        @auraEnabled
        public Integer NumLinesUncovered;	//0
        @auraEnabled
        public cls_CreatedBy CreatedBy;
        @auraEnabled
        public cls_LastModifiedBy LastModifiedBy;
    }
    public class cls_attributes {
        @auraEnabled
        public String type;	//User
        @auraEnabled
        public String url;	///services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA
    }
    public class cls_ApexClassOrTrigger {
        @auraEnabled
        public cls_attributes attributes;
        @auraEnabled
        public String Id;	//01p5i00000JefbCAAR
        @auraEnabled
        public String Name;	//SOSLAttributes
    }
    public class cls_CreatedBy {
        @auraEnabled
        public cls_attributes attributes;
        @auraEnabled
        public String Name;	//Fission Labs
    }
    public class cls_LastModifiedBy {
        @auraEnabled
        public cls_attributes attributes;
        @auraEnabled
        public String Name;	//Fission Labs
    }
    public static testclass_Dashboard_Wrapper parse(String json){
        return (testclass_Dashboard_Wrapper) System.JSON.deserialize(json, testclass_Dashboard_Wrapper.class);
    }

	/*public static testMethod void testParse() {
		String json=		'{"size":6,"totalSize":6,"done":true,"queryLocator":null,"entityTypeName":"ApexCodeCoverage","records":[{"attributes":{"type":"ApexCodeCoverage","url":"/services/data/v56.0/tooling/sobjects/ApexCodeCoverage/7145i000003XcWmAAK"},"ApexClassOrTrigger":{"attributes":{"type":"Name","url":"/services/data/v56.0/tooling/sobjects/ApexClass/01p5i00000JefbCAAR"},"Id":"01p5i00000JefbCAAR","Name":"SOSLAttributes"},"TestMethodName":"doTestCallout","NumLinesCovered":0,"NumLinesUncovered":0,"CreatedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"},"LastModifiedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"}},{"attributes":{"type":"ApexCodeCoverage","url":"/services/data/v56.0/tooling/sobjects/ApexCodeCoverage/7145i000003XcWoAAK"},"ApexClassOrTrigger":{"attributes":{"type":"Name","url":"/services/data/v56.0/tooling/sobjects/ApexClass/01p5i00000JefbCAAR"},"Id":"01p5i00000JefbCAAR","Name":"SOSLAttributes"},"TestMethodName":"doTestObjectFields","NumLinesCovered":0,"NumLinesUncovered":0,"CreatedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"},"LastModifiedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"}},{"attributes":{"type":"ApexCodeCoverage","url":"/services/data/v56.0/tooling/sobjects/ApexCodeCoverage/7145i000003XcWqAAK"},"ApexClassOrTrigger":{"attributes":{"type":"Name","url":"/services/data/v56.0/tooling/sobjects/ApexClass/01p5i00000JefbCAAR"},"Id":"01p5i00000JefbCAAR","Name":"SOSLAttributes"},"TestMethodName":"doTestObjects","NumLinesCovered":0,"NumLinesUncovered":0,"CreatedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"},"LastModifiedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"}},{"attributes":{"type":"ApexCodeCoverage","url":"/services/data/v56.0/tooling/sobjects/ApexCodeCoverage/7145i000003Zt4LAAS"},"ApexClassOrTrigger":{"attributes":{"type":"Name","url":"/services/data/v56.0/tooling/sobjects/ApexClass/01p5i00000JdimpAAB"},"Id":"01p5i00000JdimpAAB","Name":"MetaDataWrapper"},"TestMethodName":"doTestCallout","NumLinesCovered":0,"NumLinesUncovered":2,"CreatedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"},"LastModifiedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"}},{"attributes":{"type":"ApexCodeCoverage","url":"/services/data/v56.0/tooling/sobjects/ApexCodeCoverage/7145i000003Zt4MAAS"},"ApexClassOrTrigger":{"attributes":{"type":"Name","url":"/services/data/v56.0/tooling/sobjects/ApexClass/01p5i00000JdimpAAB"},"Id":"01p5i00000JdimpAAB","Name":"MetaDataWrapper"},"TestMethodName":"doTestGetObjects","NumLinesCovered":0,"NumLinesUncovered":2,"CreatedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"},"LastModifiedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"}},{"attributes":{"type":"ApexCodeCoverage","url":"/services/data/v56.0/tooling/sobjects/ApexCodeCoverage/7145i000003Zt4OAAS"},"ApexClassOrTrigger":{"attributes":{"type":"Name","url":"/services/data/v56.0/tooling/sobjects/ApexClass/01p5i00000JdimpAAB"},"Id":"01p5i00000JdimpAAB","Name":"MetaDataWrapper"},"TestMethodName":"doTestWrapper","NumLinesCovered":2,"NumLinesUncovered":0,"CreatedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"},"LastModifiedBy":{"attributes":{"type":"User","url":"/services/data/v56.0/tooling/sobjects/User/0055i000004ht4fAAA"},"Name":"Fission Labs"}}]}';
		fromJSON obj = parse(json);
		System.assert(obj != null);
	}*/
    
    
}