import axios, { AxiosInstance } from 'axios';
import { gzip } from 'pako';
import { ApiSessionCredentials } from "../auth/ApiSessionCredentials";
import { SandboxException } from '../exception/SandboxException';
import { Options } from "../interface/Options.interface";
import { Endpoint } from "../types/Endpoint";
import { ApiSessionProvider } from './ApiSessionProvider';

/**
 *
 *
 * @export
 * @class RestClient
 */
export class RestClient {

    protected sessionProvider: ApiSessionProvider;

    protected client: AxiosInstance

    /**
     * Creates an instance of RestClient.
     * @param {ApiSessionCredentials} sessionCredentials
     * @memberof RestClient
     */
    constructor(sessionProvider: ApiSessionProvider) {
        this.sessionProvider = sessionProvider;
        this.client = axios.create();
        this.client.interceptors.request.use(async request => this.requestOnFulfilled(request), error => this.requestOnRejected(error))
        this.client.interceptors.response.use(async response => this.responseOnFulfilled(response), error => this.responseOnRejected(error))

    }

    /**
     *
     *
     * @param {Options} options
     * @return {*} 
     * @memberof RestClient
     */
    async get(options: Options) {

        const headers = options.headers ? options.headers : {};
        // const sessionCredentials = await this.sessionProvider.provide();
        // Object.assign(headers, { 'x-api-key': sessionCredentials.getApiKey() })
        // Object.assign(headers, { 'Authorization': sessionCredentials.getAccessToken() })

        // Get
        return this.client.get(Endpoint.build(options.url!, options.params), { headers: headers })
            .then(response => {
                if (response.status != 200) {
                    throw new SandboxException(response.data);
                }
                return response.data;

            }).catch(error => {
                if (error instanceof SandboxException) {
                    throw error
                }
                throw new SandboxException({
                    message: error?.response?.data != null ? error.response.data.message : error.message,
                    code: error?.response?.data != null ? error.response.data.code : 500
                });
            });
    }


    /**
     *
     * @param {string} url
     * @param {*} data
     * @param {OptionsV2} options
     * @return {*} 
     * @memberof RestClient
     */
    async post(url: string, data: unknown, options: Options) {

        // const sessionCredentials = await this.sessionProvider.provide();

        const headers = {
            // 'x-api-key': sessionCredentials.getApiKey(),
            // 'Authorization': sessionCredentials.getAccessToken(),
            ...(options.headers ? options.headers : {})
        }

        if (typeof headers['Content-Encoding'] === 'string') {
            if (headers['Content-Encoding'].includes('gzip')) {
                data = gzip(JSON.stringify(data));
            }
        }

        return this.client.post(Endpoint.build(url, options.params), data, { headers: headers })
            .then((response) => {
                if (response.status != 200) {
                    throw new SandboxException(response.data);
                }
                return response.data;
            }).catch(error => {
                if (error instanceof SandboxException) {
                    throw error
                }
                throw new SandboxException({
                    message: error?.response?.data != null ? error.response.data.message : error.message,
                    code: error?.response?.data != null ? error.response.data.code : 500
                });
            });
    }


    /**
     *
     * @param {string} url
     * @param {...any[]} args
     * @return {*} 
     * @memberof RestClient
     */
    async delete(url: string, args: Options) {
        // Delete

        // const sessionCredentials = await this.sessionProvider.provide();

        const headers = {
            'Content-Type': 'application/json',
            // "x-api-key": sessionCredentials.getApiKey(),
            // "Authorization": sessionCredentials.getAccessToken()
        }

        return this.client.delete(Endpoint.build(url, args), { headers: headers })
            .then(response => {
                if (response.status != 200) {
                    throw new SandboxException(response.data);
                }
                return response.data;

            }).catch(error => {
                if (error instanceof SandboxException) {
                    throw error
                }
                throw new SandboxException({
                    message: error?.response?.data != null ? error.response.data.message : error.message,
                    code: error?.response?.data != null ? error.response.data.code : 500
                });
            });
    }

    private async requestOnFulfilled(request) {

        const sessionCredentials = await this.sessionProvider.provide();

        // Implement retry
        request.headers['x-api-key'] = sessionCredentials.getApiKey();
        request.headers['Authorization'] = sessionCredentials.getAccessToken();
        request.headers['User-Agent'] = 'node/sandbox-api-client/1.1.0';

        return request
    }

    private async requestOnRejected(error) {
        console.error("Exception error from request interceptor: ", error)
    }


    private async responseOnFulfilled(response) {
        return response
    }
    private async responseOnRejected(error) {
        let retryResponse
        switch (error.response.data.code) {
            case 403:
                switch (error.response.data.message) {
                    case "Access token has expired": {

                        const sessionCredentials: ApiSessionCredentials = await this.sessionProvider.provide();

                        error.config.headers['Authorization'] = sessionCredentials.getAccessToken()
                        retryResponse = await this.client.request(error.config)
                        return retryResponse
                    }
                    default: {
                        return error
                    }
                }

            default:
                return error
        }
    }
}