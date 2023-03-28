public with sharing class ReportOutController {
    public Project_Report_Out__c reportOut { get; set; }
    
    public ReportOutController() {
        reportOut = new Project_Report_Out__c();
    }
    
    public PageReference saveReportOut() {
        insert reportOut;
        
        // Send email
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] { UserInfo.getUserEmail() };
        email.setToAddresses(toAddresses);
        email.setSubject('Report Out Details Saved');
        email.setPlainTextBody('Report Out Name: ' + reportOut.Name + '\n' +
                               'Report Out Date: ' + reportOut.Report_Out_Date__c + '\n' +
                               'Total Work %: ' + reportOut.Total_Work__c + '\n' +
                               'Percentage of Work Completed: ' + reportOut.Percentage_of_work_completed__c + '\n' +
                                'Remaining Work %: ' + reportOut.Remaining_Work__c + '\n' +
                              'Status: ' + reportOut.Status__c);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
        
        // Show confirmation page
        PageReference confirmationPage = new PageReference('/apex/ProjectReportOutConfirmationPage');
        confirmationPage.setRedirect(true);
               return confirmationPage;
    }
    
    public PageReference deleteReportOut() {
        reportOut =  [Select id ,Name from Project_Report_Out__c Where Name =: reportOut.Name];
        
              
          delete reportOut;
        
        
        // Show confirmation page
        PageReference confirmationPage = new PageReference('/apex/ReportDeleteConfirmationPage');
        confirmationPage.setRedirect(true);
        return confirmationPage;
            
        }
    }