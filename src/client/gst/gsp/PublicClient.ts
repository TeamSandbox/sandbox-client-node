import { SandboxException } from "../../../exception/SandboxException";
import { ApiClientConfig } from "../../../interface/ApiClientConfig.interface";
import { URL } from "../../../types/Endpoint";
import { RestClient } from "../../RestClient";

/**
 *
 *
 * @export
 * @class PublicClient
 * @extends {RestClient}ss
 */
export class PublicClient extends RestClient {

    /**
     * Creates an instance of PANClient.
     * @param {ApiClientConfig} config
     * @memberof PublicClient
     */
    constructor(config: ApiClientConfig) {
        super(config);
    }


    /**
     *
     *
     * @param {string} gstin
     * @return {*}  {Promise<unknown>}
     * @memberof PublicClient
     */
    async searchGstin(gstin: string): Promise<unknown> {
        try {
            const response = await super.get({ url: URL.GET_DETAILS_BY_GSTIN, params: [gstin] })
            return response['data']
        }
        catch (error: unknown) {
            if (error instanceof SandboxException) {
                throw error
            }
            throw new SandboxException({
                message: (error instanceof SandboxException) ? (error.message ? error.message : "Failed to fetch business datails by GSTIN") : "Failed to fetch business datails by GSTIN",
                code: (error instanceof SandboxException) ? (error.code ? error.code : 500) : 500
            });
        }
    }

    /**
     *
     *
     * @param {string} gstin
     * @param {string} financialYear
     * @return {*}  {Promise<unknown>}
     * @memberof PublicClient
     */
    async trackGSTReturn(gstin: string, financialYear: string): Promise<unknown> {
        try {
            const response = await super.get({ url: URL.TRACK_GST_RETURN, params: [gstin, financialYear] })
            return response['data']
        }
        catch (error: unknown) {
            if (error instanceof SandboxException) {
                throw error
            }
            throw new SandboxException({
                message: (error instanceof SandboxException) ? (error.message ? error.message : "Failed to track GST return") : "Failed to track GST return",
                code: (error instanceof SandboxException) ? (error.code ? error.code : 500) : 500
            });
        }
    }

    async searchGstinByPan(pan: string, stateCode: string): Promise<unknown> {
        try {
            const response = await super.get({ url: URL.SEARCH_GSTIN_BY_PAN, params: [pan, stateCode] })
            return response['data']
        }
        catch (error: unknown) {
            if (error instanceof SandboxException) {
                throw error
            }
            throw new SandboxException({
                message: (error instanceof SandboxException) ? (error.message ? error.message : "Failed to search gstin by pan") : "Failed to search gstin by pan",
                code: (error instanceof SandboxException) ? (error.code ? error.code : 500) : 500
            });
        }
    }


}