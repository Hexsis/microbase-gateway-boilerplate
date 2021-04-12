import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { serviceList } from './config/serviceDiscovery';
import { AuthenticatedDataSource } from './utils/buildService';

const gateway = new ApolloGateway({
    serviceList,
    buildService({ url }) {
        return new AuthenticatedDataSource({ url });
    }
});

const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: async (request) => {
        // let user = await checkJWTGraphql(request);
        // return { user, pubsub };
        const user = { isAuthenticated: true, id: '123', role: 'customer' }
        return { user };
    },
});

(async () => {
    const { url } = await server.listen();
    console.log(`Server started at: ${url}`);
})();