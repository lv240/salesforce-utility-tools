public class BasicCalculatorController {
        Public Integer firstNumber{get;set;}
    Public Integer secondNumber{get;set;}
    Public Integer resultValue{get;set;}
      
    Public void Add()
    {
        resultValue = firstNumber + secondNumber;
    }
    
    Public void Subtract()
    {
        resultValue = firstNumber - secondNumber;
    }
    
    Public void Multiply()
    {
        resultValue = firstNumber * secondnumber;
    }
    
    Public void Division()
    {
        if(secondNumber > 0)
        {
            resultValue = firstNumber / secondNumber;
            ApexPages.AddMessage(new ApexPages.Message(ApexPages.Severity.Confirm, 'Operation Completed Successfully.'));
        }
        else
            ApexPages.AddMessage(new ApexPages.Message(ApexPages.Severity.Error, 'Division Operation Cannot be Performed. As Second Number Value is Zero.'));
    }
    
    Public void Modulus()
    {
        resultValue = Math.Mod(firstNumber , secondNumber);
    }
}