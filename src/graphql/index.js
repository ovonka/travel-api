import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';

import { typeDefs as baseTypeDefs } from './schema/index.js';
import { cityResolvers } from './resolvers/city.js';

export const typeDefs = mergeTypeDefs(baseTypeDefs);
export const resolvers = mergeResolvers([cityResolvers]);
