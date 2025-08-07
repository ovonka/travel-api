import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';

import { typeDefs as baseTypeDefs } from './schema/index.js';
import { resolvers as baseResolvers } from './resolvers/index.js';

export const typeDefs = mergeTypeDefs(baseTypeDefs);
export const resolvers = mergeResolvers(baseResolvers);
