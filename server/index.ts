import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { serviceList, GATEWAY_LOCAL_SERVICE } from './config/serviceDiscovery';
import { CustomRemoteDataSource, CustomLocalDataSource } from './utils/buildService';
import { extractJwt } from './services/auth/api/utils/jwtTools';

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
        return { user: extractJwt(request) };
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