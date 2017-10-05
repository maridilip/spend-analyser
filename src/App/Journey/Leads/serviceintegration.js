import React, { Component } from "react";
import axios from "axios"
import { parseString } from "xml2js"

import { extractKeyFromObject } from '../../utils'

const serviceUrl = "https://crmdevx.trusted.stg.com.au:9444/PSIGW/PeopleSoftServiceListeningConnector"
const inputXml = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sgb="http://xmlns.oracle.com/Enterprise/Tools/schemas/SGB_LEADS_REQ_MSG.v1">
   <soapenv:Header/>
   <soapenv:Body>
      <sgb:SGB_LEADS_REQ_MSG>
         <sgb:FieldTypes>
            <sgb:SGB_LEAD_REQ_WK class="R">
               <!--Optional:-->
               <sgb:OPRID type="CHAR"/>
            </sgb:SGB_LEAD_REQ_WK>
            <sgb:PSCAMA class="R">
               <!--Optional:-->
               <sgb:LANGUAGE_CD type="CHAR"/>
               <!--Optional:-->
               <sgb:AUDIT_ACTN type="CHAR"/>
               <!--Optional:-->
               <sgb:BASE_LANGUAGE_CD type="CHAR"/>
               <!--Optional:-->
               <sgb:MSG_SEQ_FLG type="CHAR"/>
               <!--Optional:-->
               <sgb:PROCESS_INSTANCE type="NUMBER"/>
               <!--Optional:-->
               <sgb:PUBLISH_RULE_ID type="CHAR"/>
               <!--Optional:-->
               <sgb:MSGNODENAME type="CHAR"/>
            </sgb:PSCAMA>
         </sgb:FieldTypes>
         <sgb:MsgData>
            <!--Zero or more repetitions:-->
            <sgb:Transaction>
               <sgb:SGB_LEAD_REQ_WK class="R">
                  <!--Optional:-->
                  <sgb:OPRID IsChanged="?">C79351</sgb:OPRID>
               </sgb:SGB_LEAD_REQ_WK>
               <sgb:PSCAMA class="R">
                  <!--Optional:-->
                  <sgb:LANGUAGE_CD IsChanged="?">?</sgb:LANGUAGE_CD>
                  <!--Optional:-->
                  <sgb:AUDIT_ACTN IsChanged="?">?</sgb:AUDIT_ACTN>
                  <!--Optional:-->
                  <sgb:BASE_LANGUAGE_CD IsChanged="?">?</sgb:BASE_LANGUAGE_CD>
                  <!--Optional:-->
                  <sgb:MSG_SEQ_FLG IsChanged="?">?</sgb:MSG_SEQ_FLG>
                  <!--Optional:-->
                  <sgb:PROCESS_INSTANCE IsChanged="?">?</sgb:PROCESS_INSTANCE>
                  <!--Optional:-->
                  <sgb:PUBLISH_RULE_ID IsChanged="?">?</sgb:PUBLISH_RULE_ID>
                  <!--Optional:-->
                  <sgb:MSGNODENAME IsChanged="?">?</sgb:MSGNODENAME>
               </sgb:PSCAMA>
            </sgb:Transaction>
         </sgb:MsgData>
      </sgb:SGB_LEADS_REQ_MSG>
   </soapenv:Body>
</soapenv:Envelope>`
class Leads extends Component {
    componentDidMount() {
        const instance = axios.create()
        instance.defaults.headers.post['Content-Type'] = 'text/xml';
        // instance.defaults.headers.post['Access-Control-Allow-Origin'] = "*";
        instance.defaults.headers.post['SOAPAction'] = 'SGB_BANKER_LEADS_DETAILS.v1';
        // instance.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE';
        // instance.defaults.headers.post['Access-Control-Allow-Credentials'] = true;
        // instance.defaults.headers.post['ccess-Control-Request-Headers'] = "Content-Type";

        instance.post(serviceUrl, inputXml).then((res) => {
            const stripPre = res.data
            parseString(stripPre, { trim: true }, (err, jsonData) => {
                const SiebelMessage = extractKeyFromObject(jsonData, "SiebelMessage")
                const listData = extractKeyFromObject(SiebelMessage, "WbcOpportunityLightweightMs")
                console.log("res", listData)
            })
        })
    }

    render() {
        return <span>Transaction Summary page</span>;
    }
}

export default Leads