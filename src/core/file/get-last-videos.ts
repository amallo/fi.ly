import { ClientDependencies } from "../client-dependencies"

export const createGetLastVideosFn = ({fileGateway, authGateway} : ClientDependencies) => {
    return async (params: {count: number, page: number}) => {
        await authGateway.current()
        const files = await fileGateway.getLast(params)
        return { videos: files }
    }
}

export type GetLastVideosFn = ReturnType<typeof createGetLastVideosFn>