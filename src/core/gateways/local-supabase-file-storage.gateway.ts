import { SupabaseClient } from "@supabase/supabase-js";
import { StoredFile } from "../models/stored-file.model";
import { FileStorageGateway } from "./file-storage.gateway";

export class LocalSupabaseFileStorageGateway implements FileStorageGateway {
    constructor(private supabase: SupabaseClient) {}

    async getLast(params: {count: number, page: number}): Promise<StoredFile[]> {
       const {data, error} = await this.supabase
            .from("files")
            .select("*")
            .range((params.page - 1) * params.count, params.page * params.count)
        if (error) {
            console.error(error)
            throw new Error("Error fetching last files")
        }
        if (!data) {
            return []
        }
        return Promise.resolve(data.map((file) => ({id: file.id, type: file.type, createdAt: file.created_at})))
    }
}