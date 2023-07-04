import { SandboxException } from "../../exception/SandboxException";
import { URL } from "../../types/Endpoint";
import { ApiSessionProvider } from "../ApiSessionProvider";
import { RestClient } from "../RestClient";

/**
 *
 *
 * @export
 * @class PANClient
 * @extends {RestClient}
 */
export class PANClient extends RestClient {

    /**
     * Creates an instance of PANClient.
     * @param {ApiSessionProvider} sessionCredentials
     * @memberof PANClient
     */
    constructor(sessionCredentials: ApiSessionProvider) {
        super(sessionCredentials);
    }


    /**
     *
     *
     * @param {string} pan
     * @param {string} consent
     * @param {string} reason
     * @return {*}  {Promise<unknown>}
     * @memberof PANClient
     */
    async verifyPanBasic(pan: string, consent?: string, reason?: string): Promise<unknown> {

        try {

            const response = await super.get({ url: URL.VERIFY_PAN_BASIC, params: [pan, consent, reason] });

            return response['data'];
        }
        catch (error: unknown) {
            if (error instanceof SandboxException) {
                throw error
            }
            throw new SandboxException({
                message: (error instanceof SandboxException) ? (error.message ? error.message : "Failed to verify PAN") : "Failed to verify PAN",
                code: (error instanceof SandboxException) ? (error.code ? error.code : 500) : 500
            });
        }
    }

    /**
     *
     *
     * @param {string} pan
     * @param {string} consent
     * @param {string} reason
     * @return {*}  {Promise<unknown>}
     * @memberof PANClient
     */
    async verifyPanAdvance(pan: string, consent?: string, reason?: string): Promise<unknown> {
        try {
            const data = {
                pan: pan,
                consent: consent,
                reason: reason
            }
            const response = await super.post(URL.VERIFY_PAN_ADVANCE, data, { params: [] })

            return response['data']
        }
        catch (error: unknown) {
            if (error instanceof SandboxException) {
                throw error
            }
            throw new SandboxException({
                message: (error instanceof SandboxException) ? (error.message ? error.message : "Failed to execute advance PAN verification") : "Failed to execute advance PAN verification",
                code: (error instanceof SandboxException) ? (error.code ? error.code : 500) : 500
            });
        }
    }

    /**
     *
     *
     * @param {string} pan
     * @param {string} aadhaarNumber
     * @return {*}  {Promise<unknown>}
     * @memberof PANClient
     */
    async getAadharLinkStatus(pan: string, aadhaarNumber: string): Promise<unknown> {

        try {
            const response = await super.get({ url: URL.GET_PAN_AADHAAR_LINK_STATUS, params: [pan, aadhaarNumber] });

            return response['data'];
        }
        catch (error: unknown) {
            if (error instanceof SandboxException) {
                throw error
            }
            throw new SandboxException({
                message: (error instanceof SandboxException) ? (error.message ? error.message : "Failed to get status") : "Failed to get status",
                code: (error instanceof SandboxException) ? (error.code ? error.code : 500) : 500
            });
        }
    }

}