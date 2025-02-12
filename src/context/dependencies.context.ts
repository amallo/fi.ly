import { ClientDependencies } from "@/core/client-dependencies";
import React from "react";


export const createDepenciesContext = () => {
    const context = React.createContext<ClientDependencies | null>(null);
    return context;
}
