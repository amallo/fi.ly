import { useState } from "react"
import { PopupSharingVideoComponent } from "./popup-sharing-video"
import { Button } from "../ui/button"
import { Forward } from "lucide-react"

export const ButtonShareVideoComponent = () => {
    const [isOpened, setIsOpened] = useState(false)
    return <>
            <PopupSharingVideoComponent isOpened={isOpened} onOpenChange={setIsOpened} />
            <p className="text-gray-500">Aucun</p>
            <Button variant="outline" onClick={() => setIsOpened(true)}>              
                <Forward  />
            </Button>
        </>
}