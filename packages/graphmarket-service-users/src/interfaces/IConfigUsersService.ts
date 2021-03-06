import {
  IConfigNode,
  IConfigGraphQL,
  IConfigToken,
  IConfigDatabase,
  IConfigRedis,
  IConfigPhoneAdapter,
  IConfigEmailAdapter,
  IConfigUploadAdapter,
} from '@graphmarket/interfaces';

/**
 * Users service configuration.
 */
export default interface IConfigUsersService {
  readonly NODE: IConfigNode;
  readonly GRAPHQL: IConfigGraphQL;
  readonly TOKEN: IConfigToken;
  readonly DATABASE: IConfigDatabase;
  readonly REDIS: IConfigRedis;
  readonly ADAPTERS: {
    readonly PHONE: IConfigPhoneAdapter;
    readonly EMAIL: IConfigEmailAdapter;
    readonly UPLOAD: IConfigUploadAdapter;
  };
}
