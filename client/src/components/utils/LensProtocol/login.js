import { apolloClient } from './apollo'
import { GET_CHALLENGE, AUTHENTICATION } from './queries'
import { gql } from '@apollo/client'

export const generateChallenge = (address) => {
    return apolloClient.query({
        query: gql(GET_CHALLENGE),
        variables: {
            request: {
                address,
            },
        },
    });
};

export const authenticate = (address, signature) => {
    return apolloClient.mutate({
        mutation: gql(AUTHENTICATION),
        variables: {
            request: {
                address,
                signature,
            },
        },
    });
};