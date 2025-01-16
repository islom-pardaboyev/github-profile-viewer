import { api } from ".";

export const getUserDataApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: (username: string) => `${username}`,
        }),
    }),
})

export const { useGetUserDataQuery } = getUserDataApi;
