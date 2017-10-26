export default (oprID) => (`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sgb="http://xmlns.oracle.com/Enterprise/Tools/schemas/SGB_LEADS_REQ_MSG.v1">
<soapenv:Header/>
<soapenv:Body>
   <sgb:SGB_LEADS_REQ_MSG>         
     <sgb:MsgData>
      <sgb:Transaction>
            <sgb:SGB_LEAD_REQ_WK class="R">
               <sgb:OPRID>${oprID}</sgb:OPRID>
            </sgb:SGB_LEAD_REQ_WK>
      </sgb:Transaction>
      </sgb:MsgData>
   </sgb:SGB_LEADS_REQ_MSG>
</soapenv:Body>
</soapenv:Envelope>`)