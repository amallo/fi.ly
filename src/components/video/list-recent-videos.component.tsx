"use client"

import { useCases } from "@/context/usecase.provider"
import { StoredFile } from "@/core/models/stored-file.model"
import { useState, useEffect, useCallback } from "react"
import { Button } from "../ui/button"
import { Forward, Trash } from "lucide-react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { ButtonShareVideoComponent } from "./button-share-video"


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
      <div className="flex flex-row justify-center px-32 py-8">
        <Card className="flex flex-1 flex-col gap-2 space-y-2 mt-2">
          {videos.length === 0 && page === 1 ? (
            <CardHeader className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-gray-500 font-normal">Pas de vidéo</h1>
            </CardHeader>
          ) : (
            <>
            <CardHeader className="flex flex-row justify-center gap-4">
              <h4 className="text-gray-500 font-bold">Mes Vidéos</h4>
              
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>{`Vos dernières vidéos`}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] font-bold">Vidéos</TableHead>
                    <TableHead className="text-center font-bold">Partages</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell className="font-medium">
                        <div className="min-w-0 flex-1 flex flex-col">
                          <p className="truncate text-gray-500">
                            {video.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {video.createdAt.toISOString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="flex flex-row justify-center items-center gap-2 text-right">
                        <ButtonShareVideoComponent  />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive">
                          <Trash  />
                        </Button>
                      </TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
              
    
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
            </CardContent>
            </>
          )}
        </Card>
      </div>
    );
}