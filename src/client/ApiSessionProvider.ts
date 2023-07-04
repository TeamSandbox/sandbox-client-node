import { Endpoint, URL } from "Endpoint";
import axios, { AxiosInstance } from "axios";
import jwt from 'jsonwebtoken';
import { ApiSessionCredentials } from "../auth/ApiSessionCredentials";
import { ApiUserCredentials } from "../auth/ApiUserCredentials";
import { SandboxException } from "../exception/SandboxException";

export class ApiSessionProvider {
    private apiUserCredentials: ApiUserCredentials;
    private accessToken?: string;
    private client: AxiosInstance;
    constructor(apiUserCredentials: ApiUserCredentials) {
        this.apiUserCredentials = apiUserCredentials;
        this.client = axios.create({
        })
    }

    async provide(): Promise<ApiSessionCredentials> {
        let accessToken: string;
        if (!this.accessToken) {
            accessToken = await this.authenticate();
        }
        else {
            const decodedData = jwt.decode(this.accessToken)
            if (new Date(decodedData!['exp'] * 1000) < (new Date())) {
                accessToken = await this.authorize(this.accessToken);
            }
            else {
                accessToken = this.accessToken;
            }
        }
        const apiSessionCredentials: ApiSessionCredentials = new ApiSessionCredentials(this.apiUserCredentials.getApiKey(), accessToken);
        return apiSessionCredentials;
    }

    /**
 *
 *
 * @return {*}  {Promise<string>}
 * @memberof ApiClientBuilder
 */
    private async authenticate(): Promise<string> {
        try {

            const headers = {
                'Content-Type': 'application/json',
                "x-api-key": this.apiUserCredentials.getApiKey(),
                "x-api-secret": this.apiUserCredentials.getApiSecret()
            }

            return this.client.post(Endpoint.build(URL.AUTHENTICATE, null), null, { headers: headers })
                .then(response => {
                    if (response.status != 200) {
                        throw new SandboxException(response.data);
                    }
                    return response.data["access_token"];
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
        catch (error) {
            throw new SandboxException({ message: "Network call failed", code: 422 });
        }
    }


    /**
     *
     *
     * @param {string} accessToken
     * @param {string} [requestToken]
     * @return {*}  {Promise<string>}
     * @memberof ApiClientBuilder
     */
    async authorize(accessToken: string, requestToken?: string): Promise<string> {
        try {
            // Post
            const headers = {
                'Content-Type': 'application/json',
                "x-api-key": this.apiUserCredentials.getApiKey(),
                "Authorization": accessToken
            }

            return this.client.post(Endpoint.build(URL.AUTHORIZE, requestToken != null ? requestToken : accessToken), null, { headers: headers })
                .then(response => {
                    if (response.status != 200) {
                        throw new SandboxException(response.data);
                    }
                    return response.data["access_token"];

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
        catch (error) {
            throw new SandboxException({ message: "Network call failed", code: 422 });
        }
    }

}