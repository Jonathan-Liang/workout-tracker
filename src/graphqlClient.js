import { GraphQLClient } from 'graphql-request';

const url = 'https://targahna.us-east-a.ibm.stepzen.net/api/call-chest/graphql';

const apiKey = process.env.EXPO_PUBLIC_GRAPHQL_KEY;

const client = new GraphQLClient(url, {
    headers: {
        Authorization: 
            `apikey ${apiKey}`, 
    }
});

export default client;