/**
 *
 *
 * @export
 * @class ApiSessionCredentials
 */
export class ApiSessionCredentials {

    protected apiKey: string;

    protected accessToken: string;

    /**
     * Creates an instance of ApiSessionCredentials.
     * @param {string} apiKey
     * @param {string} accessToken
     * @memberof ApiSessionCredentials
     */
    constructor(apiKey: string, accessToken: string) {
        this.apiKey = apiKey;

        this.accessToken = accessToken;
    }

    /**
     *
     *
     * @return {*}  {string}
     * @memberof ApiSessionCredentials
     */
    public getApiKey(): string {
        return this.apiKey;
    }

    /**
     *
     *
     * @param {string} apiKey
     * @return {*}  {ApiSessionCredentials}
     * @memberof ApiSessionCredentials
     */
    public withApiKey(apiKey: string): ApiSessionCredentials {
        this.apiKey = apiKey;
        return this;
    }

    /**
     *
     *
     * @return {*}  {string}
     * @memberof ApiSessionCredentials
     */
    public getAccessToken(): string {
        return this.accessToken;
    }

    /**
     *
     *
     * @param {string} accessToken
     * @return {*}  {ApiSessionCredentials}
     * @memberof ApiSessionCredentials
     */
    public withAccessToken(accessToken: string): ApiSessionCredentials {
        this.accessToken = accessToken;

        return this;
    }

}
