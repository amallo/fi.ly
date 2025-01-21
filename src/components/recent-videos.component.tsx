"use client"

import { useCases } from "@/context/usecase.provider"
import { StoredFile } from "@/core/models/stored-file.model"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"

export const RecentVideosComponent = () => {
    const { getLastVideos } = useCases()
    const [videos, setVideos] = useState<StoredFile[]>([])
    const [page, setPage] = useState(1)
    useEffect(() => {
        getLastVideos({count: 10, page}).then(({videos}) => setVideos(videos))
    }, [getLastVideos, page])
  
    const nextPage = useCallback(() => {
        setPage(page + 1)
    }, [])
  
    const previousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1)
        }
    }, [])
  
  
    return (
      <div className="p-4">
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-gray-500">Pas de vidéo</p>
            <Link
              href="/videos/new"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Ajouter une vidéo
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {videos.map((video) => (
                <li key={video.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {"sdsds"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {video.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
  
            <div className="mt-4 flex items-center justify-between">
              <button
                className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                disabled={page === 1}
                onClick={() => nextPage()}
              >
                Précédent
              </button>
              <button
                className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                disabled={videos.length < 5}
                onClick={() => previousPage()}
              >
                Suivant
              </button>
            </div>
          </>
        )}
      </div>
    );
}