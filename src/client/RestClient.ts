import axios, { AxiosInstance } from 'axios';
import { gzip } from 'pako';
import { ApiSessionCredentials } from "../auth/ApiSessionCredentials";
import { ApiSessionCredentialProvider } from '../auth/ApiSessionProvider';
import { SandboxException } from '../exception/SandboxException';
import { Options } from "../interface/Options.interface";
import { RestClientConfig } from '../interface/RestClientConfig.inteface';
import { Endpoint } from "../types/Endpoint";

/**
 *
 *
 * @export
 * @class RestClient
 */
export class RestClient {

    protected sessionCredentialProvider?: ApiSessionCredentialProvider;
    protected sessionCredentials?: ApiSessionCredentials;
    protected client: AxiosInstance

    /**
     * Creates an instance of RestClient.
     * @param {ApiSessionCredentials} sessionCredentials
     * @memberof RestClient
     */
    constructor(config: RestClientConfig) {
        if (config.sessionCredentials == null && config.sessionCredentialsProvider == null) {
            throw new SandboxException({ message: "Failed to instantiate client: pass either of SessionCredentials or SessionCredntialProvider" })
        }
        this.sessionCredentials = config.sessionCredentials
        this.sessionCredentialProvider = config.sessionCredentialsProvider;
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
        let sessionCredentials: ApiSessionCredentials;

        if (this.sessionCredentials) {
            sessionCredentials = this.sessionCredentials;
        }
        else {
            sessionCredentials = await this.sessionCredentialProvider!.provide();
        }

        // Implement retry
        request.headers['x-api-key'] = sessionCredentials.getApiKey();
        request.headers['Authorization'] = sessionCredentials.getAccessToken();
        request.headers['User-Agent'] = 'node/sandbox-api-client/1.0.0';

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
        console.info("Error", error);
        switch (error.response.data.code) {
            case 403:
                switch (error.response.data.message) {
                    case "Access token has expired": {
                        let sessionCredentials: ApiSessionCredentials;
                        if (this.sessionCredentials) {
                            sessionCredentials = this.sessionCredentials;
                        }
                        else {
                            sessionCredentials = await this.sessionCredentialProvider!.provide();
                        }


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