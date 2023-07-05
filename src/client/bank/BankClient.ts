import { SandboxException } from "../../exception/SandboxException";
import { ApiClientConfig } from "../../interface/ApiClientConfig.interface";
import { URL } from "../../types/Endpoint";
import { RestClient } from "../RestClient";

/**
 *
 *
 * @export
 * @class BankClient
 * @extends {RestClient}
 */
export class BankClient extends RestClient {

    /**
     * Creates an instance of PANClient.
     * @param {ApiClientConfig} config
     * @memberof PANClient
     */
    constructor(config: ApiClientConfig) {
        super(config);
    }


    /**
     *
     *
     * @param {string} ifsc
     * @return {*}  {Promise<unknown>}
     * @memberof BankClient
     */
    async fetchBankDetailsByIfsc(ifsc: string): Promise<unknown> {
        try {
            const response = await super.get({ url: URL.GET_BANK_BY_IFSC, params: [ifsc] })
            return response;
        }
        catch (error: unknown) {
            if (error instanceof SandboxException) {
                throw error
            }
            throw new SandboxException({
                message: (error instanceof SandboxException) ? (error.message ? error.message : "Failed to fetch Bank Details") : "Failed to fetch Bank Details",
                code: (error instanceof SandboxException) ? (error.code ? error.code : 500) : 500
            });
        }

    }

    /**
     *
     *
     * @param {string} ifsc
     * @param {string} accountNumber
     * @param {string} name
     * @param {string} mobile
     * @return {*}  {Promise<unknown>}
     * @memberof BankClient
     */
    async verifyBankAccount(ifsc: string, accountNumber: string, name?: string, mobile?: string): Promise<unknown> {
        try {
            const response = await super.get({ url: URL.BANK_VERIFICATION, params: [ifsc, accountNumber, name, mobile] })
            return response['data']
        }
        catch (error: unknown) {
            if (error instanceof SandboxException) {
                throw error
            }
            throw new SandboxException({
                message: (error instanceof SandboxException) ? (error.message ? error.message : "Failed to verify bank account") : "Failed to verify bank account",
                code: (error instanceof SandboxException) ? (error.code ? error.code : 500) : 500
            });
        }
    }

    /**
     *
     *
     * @param {string} virtualPaymentAddress
     * @param {string} name
     * @return {*}  {Promise<unknown>}
     * @memberof BankClient
     */
    async verifyUpi(virtualPaymentAddress: string, name?: string): Promise<unknown> {
        try {
            const response = await super.get({ url: URL.UPI_VERIFICATION, params: [virtualPaymentAddress, name] })
            return response['data']
        }
        catch (error: unknown) {
            if (error instanceof SandboxException) {
                throw error
            }
            throw new SandboxException({
                message: (error instanceof SandboxException) ? (error.message ? error.message : "Failed to verify UPI") : "Failed to verify UPI",
                code: (error instanceof SandboxException) ? (error.code ? error.code : 500) : 500
            });
        }

    }
}