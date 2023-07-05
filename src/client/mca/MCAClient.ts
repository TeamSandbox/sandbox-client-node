import { SandboxException } from "../../exception/SandboxException";
import { ApiClientConfig } from "../../interface/ApiClientConfig.interface";
import { URL } from "../../types/Endpoint";
import { RestClient } from "../RestClient";

/**
 *
 *
 * @export
 * @class MCAClient
 * @extends {RestClient}
 */
export class MCAClient extends RestClient {

      /**
     * Creates an instance of PANClient.
     * @param {ApiClientConfig} config
     * @memberof MCAClient
     */
      constructor(config: ApiClientConfig) {
        super(config);
    }

    /**
     *
     *
     * @param {string} din
     * @param {string} [consent]
     * @param {string} [reason]
     * @return {*}  {Promise<unknown>}
     * @memberof MCAClient
     */
    async fetchDirectorMasterData(din: string, consent?: string, reason?: string): Promise<unknown> {
        try {
            const response = await super.get({ url: URL.GET_DIRECTOR_MASTER_DATA, params: [din, consent, reason] })
            return response['data']
        }
        catch (error: unknown) {
            if (error instanceof SandboxException) {
                throw error
            }
            throw new SandboxException({
                message: (error instanceof SandboxException) ? (error.message ? error.message : "Failed to fetch director master data") : "Failed to fetch director master data",
                code: (error instanceof SandboxException) ? (error.code ? error.code : 500) : 500
            });
        }

    }

    /**
     *
     *
     * @param {string} cin
     * @param {string} [consent]
     * @param {string} [reason]
     * @return {*}  {Promise<unknown>}
     * @memberof MCAClient
     */
    async fetchCompanyMasterData(cin: string, consent?: string, reason?: string): Promise<unknown> {
        try {
            const response = await super.get({ url: URL.GET_COMPANY_MASTER_DATA, params: [cin, consent, reason] })
            return response['data']
        }
        catch (error: unknown) {
            if (error instanceof SandboxException) {
                throw error
            }
            throw new SandboxException({
                message: (error instanceof SandboxException) ? (error.message ? error.message : "Failed to fetch company master data") : "Failed to fetch company master data",
                code: (error instanceof SandboxException) ? (error.code ? error.code : 500) : 500
            });
        }

    }

}