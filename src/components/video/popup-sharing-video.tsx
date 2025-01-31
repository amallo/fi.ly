import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

type PopupSharingVideoComponentProps = {
    videoId: string
    isOpened: boolean
    onOpenChange: (isOpened: boolean) => void
}

export const PopupSharingVideoComponent = ({videoId, isOpened, onOpenChange}: PopupSharingVideoComponentProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Dialog open={isOpened} onOpenChange={onOpenChange}>
           <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Partager la vidéo</DialogTitle>
                    <DialogDescription>
                        Envoyez un lien sécurisé par email pour partager votre vidéo.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-3"
                            placeholder="exemple@email.com"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Mot de passe
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Partager</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}