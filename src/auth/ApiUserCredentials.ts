/**
 *
 *
 * @export
 * @class ApiUserCredentials
 */
export class ApiUserCredentials {

    protected apiKey: string;

    protected apiSecret: string;

    /**
     * Creates an instance of ApiUserCredentials.
     * @param {string} apiKey
     * @param {string} apiSecret
     * @memberof ApiUserCredentials
     */
    constructor(apiKey: string, apiSecret: string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    /**
     *
     *
     * @return {*}  {string}
     * @memberof ApiUserCredentials
     */
    public getApiKey(): string {
        return this.apiKey;
    }

    /**
     *
     *
     * @return {*}  {string}
     * @memberof ApiUserCredentials
     */
    public getApiSecret(): string {
        return this.apiSecret;
    }

}
