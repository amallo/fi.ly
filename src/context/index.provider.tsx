"use client"
import { createClientDependencies } from "@/core/client-dependencies"
import { UseCasesProvider } from "./usecase.provider"
import { DepenciesProvider } from "./depencies.provider"

export const Providers = ({children}: {children: React.ReactNode}) => {
    return (
    <DepenciesProvider dependencies={createClientDependencies({})}>
        <UseCasesProvider>
            {children}
        </UseCasesProvider>
    </DepenciesProvider>
    )
}