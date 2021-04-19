import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { serviceList, GATEWAY_LOCAL_SERVICE } from './config/serviceDiscovery';
import { CustomRemoteDataSource, CustomLocalDataSource } from './utils/buildService';

const gateway = new ApolloGateway({
    serviceList,
    buildService({ url }) {
        if (url?.includes(GATEWAY_LOCAL_SERVICE)) {
            return new CustomLocalDataSource(url.replace(GATEWAY_LOCAL_SERVICE, ''));
        }
        return new CustomRemoteDataSource({ url });
    }
});

const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: async (request) => {
        const user = { isAuthenticated: true, id: '123', role: 'customer' }
        return { user };
    },
    persistedQueries: false,
    uploads: false,
    cors: false,
    debug: false,
    // logger
});

(async () => {
    const { url } = await server.listen();
    console.log(`\nServer running at ${url}\n`);
})();