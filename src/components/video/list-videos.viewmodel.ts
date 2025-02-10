import { useCases } from "@/context/usecase.provider"
import { StoredFile } from "@/core/models/stored-file.model"
import { useState } from "react"

export const useListVideosViewModel = () => {
    const [page, setPage] = useState(1)
    const [videos, setVideos] = useState<StoredFile[]>([])
  
    const { getLastVideos } = useCases()
    

    const refresh = async() => {
        return getLastVideos({count: 10, page})
            .then(({videos}) => setVideos(videos))
    }

    return {
        page,
        videos,
        countVideos : videos.length,
        refresh
    }
    
}
