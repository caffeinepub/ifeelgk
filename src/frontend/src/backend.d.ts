import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactRequest {
    collaborationRequest: boolean;
    name: string;
    email: string;
    message: string;
}
export interface backendInterface {
    /**
     * / Retrieve all contact requests, including collaboration inquiries
     */
    getAllContactRequests(): Promise<Array<ContactRequest>>;
    getArtistInfo(): Promise<string>;
    /**
     * / Submit a general inquiry or collaboration request
     */
    submitContactRequest(name: string, email: string, message: string, collaborationRequest: boolean): Promise<void>;
}
