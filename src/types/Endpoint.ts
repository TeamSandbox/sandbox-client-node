/**
 *
 *
 * @export
 * @class Endpoint
 */
export class Endpoint {
    static USER_AGENT = "node/sandbox-api-client/1.1.0";
  
    static API_VERSION = "1.0.0";
  
    static BASE_URL = "https://api.sandbox.co.in";
  
    /**
     *
     *
     * @static
     * @param {string} endpoint
     * @param {*} args
     * @return {*} 
     * @memberof Endpoint
     */
    static build(endpoint: string, args: unknown) {
      let url = Endpoint.BASE_URL.concat(endpoint.toString());
      const regex = "\\{(\\w*)\\}";
  
      let i = 0;
  
      let matches
      const argsArray: Array<unknown> = args instanceof Array?args:[args]
      do {
        matches = url.match(regex);
        if (matches != null) {
          url = url.replace(
            matches[0],
            args != null &&
              argsArray.length > i &&
              argsArray[i] != null &&
              (argsArray[i] as string).toString() !== ""
              ? (argsArray[i] as string).toString()
              : ""
          );
        }
  
        i++;
      } while (matches != null);
  
      return url.toString();
    }
  
  }
  
  
  export enum URL {
    /** authenticate. */
    AUTHENTICATE = "/authenticate",
  
    /** authorize. */
    AUTHORIZE = "/authorize?request_token={requestToken}",
    
    /* BANK VERIFICATION ENDPOINTS */
    
    /** ifsc verification */
    GET_BANK_BY_IFSC = "/bank/{ifsc}",

    /**penny drop bank verification */
    BANK_VERIFICATION = "/bank/{ifsc}/accounts/{account_number}/verify?name={name}&mobile={mobile}",
  
    /** upi verification */
    UPI_VERIFICATION = "/bank/upi/{virtual_payment_address}?name={name}",

    /** MCA ENDPOINTS */

    /** get director master data */
    GET_DIRECTOR_MASTER_DATA = "/mca/directors/{din}?consent={consent}&reason={reason}",

    /** GET_COMPANY_MASTER_DATA */
    GET_COMPANY_MASTER_DATA = "/mca/companies/{cin}?consent={consent}&reason={reason}",
  
    /* PAN ENDPOINTS */
  
    /** verify pan basic. */
    VERIFY_PAN_BASIC = "/pans/{pan}/verify?consent={consent}&reason={reason}&uuid={uuid}",
    
    /** verify pan advance */
    VERIFY_PAN_ADVANCE = "/kyc/pan",

    /** get pan aadhaar link status. */
    GET_PAN_AADHAAR_LINK_STATUS = "/it-tools/pans/{pan}/pan-aadhaar-status?aadhaar_number={aadhaar}",
  
    /* TAX PAYER ENDPOINTS */
    
    /** get details of GSTIN */
    GET_DETAILS_BY_GSTIN = "/gsp/public/gstin/{gstin}", 

    /** track gst return */
		TRACK_GST_RETURN = "/gsp/public/gstr?gstin={gstin}&financial_year={financial_year}",

    /** search gstin by pan */
		SEARCH_GSTIN_BY_PAN = "/gsp/public/pan/{pan}?state_code={state_code}",


    
  }
  