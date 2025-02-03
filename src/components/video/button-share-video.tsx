import { useState } from "react"
import { DialogSharingVideoComponent } from "./dialog-sharing-video"
import { Button } from "../ui/button"
import { Forward } from "lucide-react"

export const ButtonShareVideoComponent = () => {
    const [isOpened, setIsOpened] = useState(false)
    return <>
            <DialogSharingVideoComponent isOpened={isOpened} onOpenChange={setIsOpened} videoId={'video'} />
            <p className="text-gray-500">Aucun</p>
            <Button variant="outline" onClick={() => setIsOpened(true)}>              
                <Forward  />
            </Button>
        </>
}