"use client"

import { useCases } from "@/context/usecase.provider"
import { StoredFile } from "@/core/models/stored-file.model"
import { useState, useEffect, useCallback } from "react"
import { ButtonAddVideoComponent } from "./button-add-video"
import { Button } from "./ui/button"
import { Forward, Share, Trash } from "lucide-react"


const videoPerPage = 3
export const ListRecentVideosComponent = () => {
    const { getLastVideos } = useCases()
    const [videos, setVideos] = useState<StoredFile[]>([])
    const [page, setPage] = useState(1)
    useEffect(() => {
        getLastVideos({count: videoPerPage , page})
          .then(({videos}) => setVideos(videos))
    }, [getLastVideos, page])
  
    const nextPage = useCallback(() => {
        setPage(page + 1)
    }, [page])
  
    const previousPage = useCallback(() => {
        setPage(page - 1)
    }, [page])
  
  
    return (
      <div className="p-4">
        {videos.length === 0 && page === 1 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-gray-500">Pas de vidéo</p>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {videos.map((video) => (
                <li key={video.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-gray-500">
                        {video.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {video.createdAt.toISOString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="secondary">
                        <Forward  />
                      </Button>
                      <Button variant="destructive">
                          <Trash  />
                      </Button>
                      
                    </div>
                  </div>
                </li>
              ))}
            </ul>
  
            <div className="mt-4 flex items-center justify-between">
              <button
                disabled={page === 1}
                
                className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                onClick={() => previousPage()}
              >
                Précédent
              </button>
              <span className="text-sm text-gray-500">
                Page {page}
              </span>
              <button
                className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                disabled={videos.length < videoPerPage}
                
                onClick={() => nextPage()}
              >
                Suivant
              </button>
            </div>
          </>
        )}
      </div>
    );
}