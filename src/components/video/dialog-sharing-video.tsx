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

export const DialogSharingVideoComponent = ({videoId, isOpened, onOpenChange}: PopupSharingVideoComponentProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validForHours, setValidForHours] = useState<number|undefined>(24)
    const [enablePassword, setEnablePassword] = useState(false)
    const [enableExpiration, setEnableExpiration] = useState(false)
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
                    <div className="mb-4">
                        <h4 className="text-sm font-bold">Partages</h4>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-1">
                                        <div className="flex items-center bg-gray-200 rounded px-2 py-1">
                                            <span className="text-sm text-gray-600">john@example.com</span>
                                            <button className="ml-1 text-gray-400 hover:text-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center bg-gray-200 rounded px-2 py-1">
                                            <span className="text-sm text-gray-600">jane@example.com</span>
                                            <button className="ml-1 text-gray-400 hover:text-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <h4 className="text-sm font-bold">Nouveau partage</h4>
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
                    <h4 className="text-sm font-bold">Options</h4>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="col-span-4 flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="enable-password"
                                checked={!!enablePassword}
                                onChange={(e) => {
                                    setEnablePassword(e.target.checked)
                                }}
                            />
                            <Label htmlFor="enable-password">Protéger par mot de passe</Label>
                        </div>
                        {enablePassword && (
                            <>
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
                            </>
                        )}
                        
                        <div className="col-span-4 flex items-center gap-2">
                            <input 
                                type="checkbox"
                                id="enable-expiration"
                                checked={enableExpiration}
                                onChange={(e) => {
                                    setEnableExpiration(e.target.checked)
                                }}
                            />
                            <Label htmlFor="enable-expiration">Définir une expiration</Label>
                        </div>

                        {enableExpiration && (
                            <>
                                <Label htmlFor="expiration" className="text-right">
                                    Expiration
                                </Label>
                                <div className="col-span-3 flex items-center gap-2">
                                    <Input
                                        id="expiration"
                                        type="number" 
                                        min="1"
                                        value={validForHours}
                                        onChange={(e) => setValidForHours(parseInt(e.target.value))}
                                        className="w-20"
                                    />
                                    <span className="text-sm text-gray-500">heures</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex flex-col gap-2 justify-end items-end">
                    <div className="flex flex-row justify-end gap-2">
                        <Button type="submit" variant="destructive">Supprimer</Button>
                        <Button type="submit">Partager</Button>
                    </div>
                    <p className="text-xs text-gray-400">Partage créé le 01/12/2024 à 13h</p>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}