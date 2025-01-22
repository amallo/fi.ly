import { SupabaseClient } from "@supabase/supabase-js";
import { FileUploadHandler } from "./file-upload.handler";
import { UploadFile } from "../models/upload-file.model";

export type SupabaseFileUploadHandlerConfig = {
    bucketName: string
}  

export class SupabaseFileUploadHandler implements FileUploadHandler {
    constructor(private supabase: SupabaseClient, private config: SupabaseFileUploadHandlerConfig) {}

    async upload(params: UploadFile): Promise<void> {
        const {originPath} = params
        const buffer = await fetch(originPath).then(res => res.arrayBuffer())
        const { error } = await this.supabase
            .storage
            .from(this.config.bucketName)
            .upload(`public/${params.type}/${params.id}`, buffer, {
                cacheControl: '3600',
                upsert: true
            })
        if (error) {
            throw new Error(error.message)
        }
        const { error: errorInsert } = await this.supabase
        .from('files')
        .insert({  id: params.id, type: params.type, created_at: params.at.toISOString() })
        
        if (errorInsert) {
            throw new Error(errorInsert.message)
        }
    }
}