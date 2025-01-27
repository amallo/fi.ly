import { Dependencies } from "@/core/dependencies";
import React from "react";


export const createDepenciesContext = () => {
    const context = React.createContext<Dependencies | null>(null);
    return context;
}
