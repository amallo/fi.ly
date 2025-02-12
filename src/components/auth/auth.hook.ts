import { useDependencies } from "@/context/depencies.provider"
import { AuthenticatedUser } from "@/core/auth/models/authenticated-user.model"
import { useEffect, useState } from "react"

export const useAuth = () => {
    const dependencies = useDependencies()
    const [current, setCurrent] = useState<AuthenticatedUser | null>(null)
    useEffect(() => {
        dependencies.authGateway.current().then((current) => {
            console.log("current", current)
            setCurrent(current)
        })
    }, [current])
    return {
        current,
    }
}