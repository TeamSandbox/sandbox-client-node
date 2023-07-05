import { ApiClientConfig } from "../interface/ApiClientConfig.interface";
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
     * @param {ApiClientConfig} sessionCredentials
     * @memberof ApiClient
     */
    constructor(config: ApiClientConfig) {
        super(config);

        this.PAN = new PANClient(config)
        this.BANK = new BankClient(config)
        this.MCA = new MCAClient(config)
        this.GST = new PublicClient(config)

    }
}