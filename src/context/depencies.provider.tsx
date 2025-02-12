"use client"
import { useContext } from "react";
import { ClientDependencies } from "@/core/client-dependencies";
import { createDepenciesContext } from "./dependencies.context";

const DependenciesContext = createDepenciesContext()
export const DepenciesProvider = ({children, dependencies}: {children: React.ReactNode, dependencies: ClientDependencies}) => {
    return <DependenciesContext.Provider value={dependencies}>{children}</DependenciesContext.Provider>
}

export const useDependencies = () => {
    const value = useContext(DependenciesContext)
    if(!value){
        throw new Error("DepenciesProvider not found")
    }
    return value
}