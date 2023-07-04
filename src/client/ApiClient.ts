import { ApiSessionCredentials } from "../auth/ApiSessionCredentials";
import { ApiSessionProvider } from "./ApiSessionProvider";
import { RestClient } from "./RestClient";
import { BankClient } from "./bank/BankClient";
import { PublicClient } from "./gst/gsp/PublicClient";
import { MCAClient } from "./mca/MCAClient";
import { PANClient } from "./pan/PANClient";

/**
 *
 *
 * @export
 * @class ApiClient
 * @extends {RestClient}
 */
export class ApiClient extends RestClient {

    public PAN: PANClient
    public BANK: BankClient
    public MCA: MCAClient
    public GST: PublicClient

    /**
     * Creates an instance of ApiClient.
     * @param {ApiSessionCredentials} sessionCredentials
     * @memberof ApiClient
     */
    constructor(sessionCredentials: ApiSessionProvider) {
        super(sessionCredentials);

        this.PAN = new PANClient(sessionCredentials)
        this.BANK = new BankClient(sessionCredentials)
        this.MCA = new MCAClient(sessionCredentials)
        this.GST = new PublicClient(sessionCredentials)

    }
}