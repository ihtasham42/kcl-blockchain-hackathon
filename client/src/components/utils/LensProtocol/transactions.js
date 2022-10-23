import { apolloClientAuth } from '../LensProtocol/apollo';
import { HAS_TX_BEEN_INDEXED } from "./queries"
import { gql } from '@apollo/client';

export const hasTxBeenIndexed = (txHash) => {
    return apolloClientAuth.query({
        query: gql(HAS_TX_BEEN_INDEXED),
        variables: {
            request: {
                txHash,
            },
        },
        fetchPolicy: 'network-only',
    })
}

export const pollUntilIndexed = async (txHash) => {
    while (true) {
        const result = await hasTxBeenIndexed(txHash);
        console.log(result)
        const response = result.data.hasTxHashBeenIndexed;
        if (response.__typename === 'TransactionIndexedResult') {
            if (response.metadataStatus) {
                if (response.metadataStatus.status === 'SUCCESS') {
                    return response;
                }

                if (response.metadataStatus.status === 'METADATA_VALIDATION_FAILED') {
                    throw new Error(response.metadataStatus.reason);
                }
            } else {
                if (response.indexed) {
                    return response;
                }
            }

            // sleep for a second before trying again
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // it got reverted and failed!
        // throw new Error(response.reason);
    }
};
