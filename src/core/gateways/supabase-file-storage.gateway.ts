import { SupabaseClient } from "@supabase/supabase-js";
import { StoredFile } from "../models/stored-file.model";
import { FileStorageGateway, UploadFileParams } from "./file-storage.gateway";
import { AuthenticatedUser } from "../models/authenticated-user.model";

export class SupabaseFileStorageGateway implements FileStorageGateway {
    constructor(private supabase: SupabaseClient) {}

    async getLast(params: {count: number, page: number}): Promise<StoredFile[]> {
        const rangeIndexFrom = (params.page - 1) * params.count
        const rangeIndexTo = params.page * params.count
        console.log("rangeIndexFrom", rangeIndexFrom, "rangeIndexTo", rangeIndexTo)
        const {data, error} = await this.supabase
            .from("files")
            .select("*")
            .range(rangeIndexFrom, rangeIndexTo)
            .limit(params.count)
        if (error) {
            console.error(error)
            throw new Error("Error fetching last files")
        }
        if (!data) {
            return []
        }
        return Promise.resolve(data.map((file) => ({id: file.id, name: file.name, type: file.type, createdAt: new Date(file.created_at), by: new AuthenticatedUser(file.by), folderId: file.folder_id})))
    }

    async upload(params: UploadFileParams): Promise<void> {
        const {data, file} = params
        const { error } = await this.supabase
            .storage
            .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME!)
            .upload(file.folderId + "/" + file.id, data, {
                cacheControl: '3600',
                upsert: true
            })
        if (error) {
            throw new Error(error.message)
        }
        const { error: errorInsert } = await this.supabase
        .from('files')
        .insert({  id: file.id, type: file.type, created_at: file.createdAt.toISOString(), name: params.file.name, folder_id: params.file.folderId })
        
        if (errorInsert) {
            throw new Error(errorInsert.message)
        }
    }
}