"use client"
import { createDevDependencies } from "@/core/dependencies"
import { UseCasesProvider } from "./usecase.provider"

export const Providers = ({children}: {children: React.ReactNode}) => {
    return <UseCasesProvider dependencies={createDevDependencies()}>
            {children}
    </UseCasesProvider>
}