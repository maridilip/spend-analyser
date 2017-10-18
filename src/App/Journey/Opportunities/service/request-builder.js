export default () => (`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://siebel.com/webservices">
<soapenv:Header>
      <UsernameToken xmlns="http://siebel.com/webservices">BRANCHWOW</UsernameToken>
      <PasswordText xmlns="http://siebel.com/webservices">BRANCHWOW</PasswordText>
      <SessionType xmlns="http://siebel.com/webservices">None</SessionType>
   </soapenv:Header>
   <soapenv:Body>
      <web:GetOpportunities_Input>
         <web:AssignedTo></web:AssignedTo>
         <web:StartRow>0</web:StartRow>
         <web:PageSize>5</web:PageSize>
         <web:SortSpec></web:SortSpec>
         <web:IsLastRow></web:IsLastRow>
         <web:Banker_LId>L098510</web:Banker_LId>
         <web:MyTeam></web:MyTeam>
      </web:GetOpportunities_Input>
   </soapenv:Body>
</soapenv:Envelope>`)