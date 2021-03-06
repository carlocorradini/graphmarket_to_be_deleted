import {
  IConfigNode,
  IConfigGraphQL,
  IConfigDatabase,
  IConfigRedis,
  IConfigEmailAdapter,
} from '@graphmarket/interfaces';

/**
 * Purchases service configuration.
 */
export default interface IConfigPurchasesService {
  readonly NODE: IConfigNode;
  readonly GRAPHQL: IConfigGraphQL;
  readonly DATABASE: IConfigDatabase;
  readonly REDIS: IConfigRedis;
  readonly ADAPTERS: {
    readonly EMAIL: IConfigEmailAdapter;
  };
}
