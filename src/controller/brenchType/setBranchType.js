const axios = require("axios");
const xml2js = require("xml2js");

const parseOptions = {
  explicitArray: false, // Don't put single child elements in an array
  mergeAttrs: true, // Merge attributes and elements with the same name
};

const setMenu = async (menuType, automatic, branch_id) => {
  const soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://nomad.org/CustomUI">
  <soapenv:Header/>
  <soapenv:Body>
     <cus:NomadTerminalBranchType_Input>
        <cus:BranchType>${menuType}</cus:BranchType>
        <cus:Automatic>${automatic}</cus:Automatic>
        <cus:BranchTypeId>${branch_id}</cus:BranchTypeId>
     </cus:NomadTerminalBranchType_Input>
  </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const result = await axios.post("http://10.10.111.73:3859", soapRequest);
    const parsedResult = await new Promise((resolve, reject) => {
      xml2js.parseString(result.data, parseOptions, (err, parsedData) => {
        if (err) {
          reject(err);
        } else {
          resolve(parsedData);
        }
      });
    });

    const branches = parsedResult["soapenv:Envelope"]["soapenv:Body"];
    console.log(JSON.stringify(branches, null, 2)); // Convert to JSON and print
    return JSON.stringify(branches, null, 2).trim();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it outside
  }
};

module.exports = setMenu;
