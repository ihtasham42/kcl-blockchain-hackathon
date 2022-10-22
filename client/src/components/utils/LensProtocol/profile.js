import { GET_PROFILES, CREATE_PROFILE } from "./queries";
import { apolloClient, apolloClientAuth } from './apollo'
import { gql } from '@apollo/client'

export const getProfile = async (ownedBy) => {
    const request = { ownedBy };
    const profilesFromProfileIds = await apolloClient.query({
        query: gql(GET_PROFILES),
        variables: {
            request,
        },
    });
    return profilesFromProfileIds.data?.profiles?.items[0];
}

export const createProfile = (createProfileRequest) => {
    return apolloClientAuth.mutate({
        mutation: gql(CREATE_PROFILE),
        variables: {
            request: createProfileRequest
        },
    })
}