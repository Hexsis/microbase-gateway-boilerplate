import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { serviceList } from './config/serviceDiscovery';
import { CustomDataSource } from './utils/buildService';

const gateway = new ApolloGateway({
    serviceList,
    buildService({ url }) {
        return new CustomDataSource({ url });
    }
});

const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: async (request) => {
        const user = { isAuthenticated: true, id: '123', role: 'customer' }
        return { user };
    },
    persistedQueries: false, // TODO: Add
    uploads: false,
    cors: false,
    // logger
});

(async () => {
    const { url } = await server.listen();
    console.log(`\nServer running at ${url}\n`);
})();