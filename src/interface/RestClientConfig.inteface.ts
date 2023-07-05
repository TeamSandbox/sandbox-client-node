import { ApiSessionCredentialProvider } from "../auth/ApiSessionProvider";
import { ApiSessionCredentials } from "../auth/ApiSessionCredentials";

export interface RestClientConfig {
    sessionCredentials?: ApiSessionCredentials;
    sessionCredentialsProvider?: ApiSessionCredentialProvider;
}