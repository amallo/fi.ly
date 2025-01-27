import { ArrowUp, Plus, Share, Video } from "lucide-react"
import { ButtonAddVideoComponent } from "../button-add-video"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export const HeaderSummarizeDashboard = ()=>{
    return <div className="bg-blue-200 flex  p-4 justify-between gap-4">
        <div className="flex flex-row items-stretch justify-between gap-4">
            <Card >
                <CardHeader>
                    <CardTitle className="flex  justify-around gap-2 items-center">
                        <div className="rounded-full bg-green-500 p-2">
                            <Plus className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-sm text-gray-500 font-medium">AJOUTER</h4>
                        
                    </CardTitle>
                </CardHeader>
                <CardContent>
                <ButtonAddVideoComponent label="" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex  justify-start gap-2 items-center">
                        <div className="rounded-full bg-purple-500 p-2">
                            <Video className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-sm text-gray-500 font-medium">VIDEOS</h4>
                        
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row justify-start items-baseline gap-2">
                    <p className="text-xl font-normal">4</p>
                    <p className="flex flex-row justify-start text-sm items-baseline   text-green-600 font-normal gap-1">
                            <span className="flex gap-2">+35%</span>
                            <span className="text-xs text-gray-500 font-normal">Dernière semaine</span>
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="flex  justify-around gap-2 items-center">
                        <div className="rounded-full bg-orange-600 p-2">
                            <Share className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-sm text-gray-500 font-medium">PARTAGE</h4>
                        
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row justify-start items-center gap-2">
                    <p className="text-xl font-normal">4</p>
                    <p className="flex flex-row justify-start text-sm items-center   text-green-600 font-normal gap-1">
                            <span className="flex gap-2">+35%</span>
                            <span className="text-xs text-gray-500 font-normal">Par jour</span>
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
}