import { apolloClientAuth, apolloClient } from "./apollo";
import { gql } from '@apollo/client'
import { CREATE_POST_TYPED_DATA, EXPLORE_PUBLICATIONS } from './queries'


export const createPostTypedData = (createPostTypedDataRequest) => {
    return apolloClientAuth.mutate({
        mutation: gql(CREATE_POST_TYPED_DATA),
        variables: {
            request: createPostTypedDataRequest,
        },
    });
};

export const explorePublications = (explorePublicationQueryRequest) => {
    return apolloClient.query({
        query: gql(EXPLORE_PUBLICATIONS),
        variables: {
            request: explorePublicationQueryRequest
        },
    })
}