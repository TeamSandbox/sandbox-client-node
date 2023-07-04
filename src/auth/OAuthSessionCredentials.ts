import { ApiSessionCredentials } from "./ApiSessionCredentials";

/**
 *
 *
 * @export
 * @class OAuthSessionCredentials
 * @extends {ApiSessionCredentials}
 */
export class OAuthSessionCredentials extends ApiSessionCredentials {

    protected resourceOwnerToken: string;

    /**
     * Creates an instance of OAuthSessionCredentials.
     * @param {string} apiKey
     * @param {string} apiUserToken
     * @param {string} resourceOwnerToken
     * @memberof OAuthSessionCredentials
     */
    constructor(apiKey: string, apiUserToken: string, resourceOwnerToken: string) {
        super(apiKey, apiUserToken);
        this.resourceOwnerToken = resourceOwnerToken;
    }

    /**
     *
     *
     * @return {*}  {string}
     * @memberof OAuthSessionCredentials
     */
    public getApiKey(): string {
        return this.apiKey;
    }

    /**
     *
     *
     * @param {string} apiKey
     * @return {*}  {OAuthSessionCredentials}
     * @memberof OAuthSessionCredentials
     */
    public withApiKey(apiKey: string): OAuthSessionCredentials {
        this.apiKey = apiKey;
        return this;
    }

    /**
     *
     *
     * @return {*}  {string}
     * @memberof OAuthSessionCredentials
     */
    public getAccessToken(): string {
        return this.resourceOwnerToken;
    }

    /**
     *
     *
     * @param {string} accessToken
     * @return {*}  {OAuthSessionCredentials}
     * @memberof OAuthSessionCredentials
     */
    public withAccessToken(accessToken: string): OAuthSessionCredentials {
        this.resourceOwnerToken = accessToken;

        return this;
    }

    /**
     *
     *
     * @return {*}  {string}
     * @memberof OAuthSessionCredentials
     */
    public getApiUserToken(): string {
        return super.getAccessToken();
    }

}
