import { SupabaseClient } from "@supabase/supabase-js";
import { FileUploadHandler } from "./file-upload.handler";
import { UploadFile } from "../models/upload-file.model";

export class SupabaseFileUploadHandler implements FileUploadHandler {
    constructor(private supabase: SupabaseClient) {}

    async upload(params: UploadFile): Promise<void> {
        const {originPath} = params
        const buffer = await fetch(originPath).then(res => res.arrayBuffer())
        const { error } = await this.supabase
            .storage
            .from('avatars')
            .upload(`privates/${params.type}/${params.id}.png`, buffer, {
                cacheControl: '3600',
                upsert: false
            })
        if (error) {
            throw new Error(error.message)
        }
    }
}
