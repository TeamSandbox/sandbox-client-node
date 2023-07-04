import { ApiClientBuilder, ApiUserCredentials } from "..";

(async () => {

    try {
        const credentials = new ApiUserCredentials("key_live_la*****************************w", "secret_live_ni*****************************p")
        
        const apiClient = await ApiClientBuilder.basic().withCredentials(credentials).build()

        const pan = "XXXPX1234X";
        const consent = "Y";
        const reason = "For opening Demat account";

        const response = await apiClient.PAN.verifyPanAdvance(pan, consent, reason)

        console.info(response)
    }
    catch (error) {
        console.error(error);
    }
})();