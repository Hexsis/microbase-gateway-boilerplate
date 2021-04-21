import path from 'path';
import { buildFederatedSchema } from '@apollo/federation';
import { SchemaDirectiveVisitor } from 'apollo-server';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { GraphQLSchema } from 'graphql';
import { directiveResolvers } from '../services/graphql/directive';

const getFederatedSchema = (serviceName: string): GraphQLSchema => {
    const typesArray = [
        ..._loadApiSchemas(serviceName),
        ..._loadCommonSchemas()
    ];
    const resolversArray = [
        ..._loadApiResolvers(serviceName),
        ..._loadCommonResolvers()
    ];
    const schema = buildFederatedSchema({
        typeDefs: mergeTypeDefs(typesArray),
        resolvers: mergeResolvers(resolversArray)
    });

    SchemaDirectiveVisitor.visitSchemaDirectives(schema, directiveResolvers);

    return schema;
};

const _loadApiSchemas = (serviceName: string): any[] => _loadFiles(`../services/${serviceName}/api/**/schema.gql`);
const _loadCommonSchemas = (): any[] => _loadFiles('../services/graphql/**/schema.gql');
const _loadApiResolvers = (serviceName: string): any[] => _loadFiles(`../services/${serviceName}/api/**/resolver.js`);
const _loadCommonResolvers = (): any[] => _loadFiles('../services/graphql/**/resolver.js');

const _loadFiles = (glob: string) => loadFilesSync(path.join(__dirname, glob));

export {
    getFederatedSchema
}