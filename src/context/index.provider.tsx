"use client"
import { createDevDependencies } from "@/core/dependencies"
import { UseCasesProvider } from "./usecase.provider"
import { DepenciesProvider } from "./depencies.provider"

export const Providers = ({children}: {children: React.ReactNode}) => {
    return (
    <DepenciesProvider dependencies={createDevDependencies()}>
        <UseCasesProvider>
            {children}
        </UseCasesProvider>
    </DepenciesProvider>
    )
}