/**
 *
 *
 * @export
 * @class SandboxException
 * @extends {Error}
 */
export class SandboxException extends Error {

    code: number | undefined;
    timestamp: number | undefined;
    transaction_id: string | undefined;

    /**
     * Creates an instance of SandboxException.
     * @param {{ message: string, code?: number, timestamp?: number, transaction_id?: string }} { message: message, code: code, timestamp: timestamp, transaction_id: transaction_id }
     * @memberof SandboxException
     */
    constructor({ message: message, code: code, timestamp: timestamp, transaction_id: transaction_id }:
        { message: string, code?: number, timestamp?: number, transaction_id?: string }) {
        super(message)

        this.name = this.constructor.name;
        this.code = code;
        this.timestamp = timestamp;
        this.transaction_id = transaction_id;

        Object.setPrototypeOf(this, SandboxException.prototype)
    }
}
