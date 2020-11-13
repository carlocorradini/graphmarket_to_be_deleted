import path from 'path';
import http from 'http';
import { AddressInfo } from 'net';
import { ApolloServer } from 'apollo-server-express';
import { buildSchemaSync } from 'type-graphql';
import { ConnectionOptions, createConnection, getConnection, useContainer } from 'typeorm';
import { AlreadyHasActiveConnectionError } from 'typeorm/error/AlreadyHasActiveConnectionError';
import { Container } from 'typedi';
import blacklist from 'express-jwt-blacklist';
import config from '@app/config';
import logger from '@app/logger';
import { IContext } from '@app/types';
import { AuthorizationMiddleware } from '@app/middlewares';
import { EnvUtil } from '@app/util';
import app from '@app/server/App';

/**
 * Application Server.
 */
export default class Server {
  /**
   * Singleton server instance.
   */
  private static instance: Server;

  /**
   * Http server instance.
   */
  private server?: http.Server;

  /**
   * Construct the server. Throw errors if configuration fails.
   */
  private constructor() {
    // this.app = express();
    this.server = undefined;
    this.configure();

    logger.info('Server is ready');
  }

  /**
   * Configure the server and services applying checks.
   */
  private configure(): void {
    logger.debug('Server configuration started');

    Server.configureChecks();
    Server.configureServices();
    this.configureServer();

    logger.debug('Server configuration finished');
  }

  /**
   * To allow dependency injection, the server must be instantiated
   * before connecting to the database.
   */
  // eslint-disable-next-line class-methods-use-this
  private static configureChecks(): void {
    const conn = getConnection();
    throw new AlreadyHasActiveConnectionError(conn.name);
  }

  /**
   * Configure application services.
   */
  // eslint-disable-next-line class-methods-use-this
  private static configureServices(): void {
    // JWT blacklist
    blacklist.configure({
      strict: false,
      store: {
        type: 'redis',
        url: config.REDIS.URL,
      },
    });
  }

  /**
   * Configure the server.
   */
  // eslint-disable-next-line class-methods-use-this
  private configureServer(): void {
    // Dependency injection
    useContainer(Container);

    // Apollo server
    const server = new ApolloServer({
      schema: buildSchemaSync({
        resolvers: [path.join(__dirname, '..', config.GRAPHQL.RESOLVERS)],
        authChecker: AuthorizationMiddleware,
        container: Container,
      }),
      playground: config.GRAPHQL.PLAYGROUND,
      tracing: !EnvUtil.isProduction(),
      context: ({ req, res }) => {
        const context: IContext = {
          req,
          res,
          user: req.user,
        };

        return context;
      },
    });
    logger.debug('Apollo server configured');

    server.applyMiddleware({ app, path: config.GRAPHQL.PATH });
    logger.debug(`Express middleware applied to Apollo Server on path ${config.GRAPHQL.PATH}`);
  }

  /**
   * Return the current server instance.
   * If the instance is undefined a new instance is created.
   *
   * @returns Current server instance
   */
  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
      logger.debug('Server instantiated');
    }

    return Server.instance;
  }

  /**
   * Start the server listening for connections.
   *
   * @param port - Listening port
   * @returns Server listening address information
   */
  public async start(port: number = config.NODE.PORT): Promise<AddressInfo> {
    if (this.server) {
      logger.warn('Server is already started');
      return this.server.address() as AddressInfo;
    }

    await createConnection(<ConnectionOptions>{
      type: config.DATABASE.TYPE,
      url: config.DATABASE.URL,
      extra: {
        ssl: config.DATABASE.SSL,
      },
      synchronize: config.DATABASE.SYNCHRONIZE,
      logging: config.DATABASE.LOGGING,
      entities: [path.join(__dirname, '..', config.DATABASE.ENTITIES)],
      migrations: [path.join(__dirname, '..', config.DATABASE.MIGRATIONS)],
      subscribers: [path.join(__dirname, '..', config.DATABASE.SUBSCRIBERS)],
      cache: {
        type: 'ioredis',
        options: {
          password: config.REDIS.PASSWORD,
          host: config.REDIS.HOST,
          port: config.REDIS.PORT,
        },
      },
    });
    logger.info('Database connected');

    return new Promise((resolve, reject) => {
      this.server = app
        .listen(port, () => {
          const addressInfo: AddressInfo = this.server!.address() as AddressInfo;
          logger.info(
            `Server started and listening at ${addressInfo.address} on port ${addressInfo.port}`,
          );
          resolve(addressInfo);
        })
        .on('error', (error) => {
          logger.error(`Server not started due to ${error}`);
          reject(error);
        });
    });
  }

  /**
   * Stop the server.
   */
  public async stop(): Promise<void> {
    if (!this.server) {
      logger.warn('Server is not started');
      return undefined;
    }

    // Disconnect databse
    await getConnection().close();
    logger.info('Database disconnected');

    // Shutdown server
    return new Promise((resolve, reject) => {
      this.server!.close((error) => {
        if (error) {
          logger.error(`Server not stopped due to ${error}`);
          reject(error);
        }

        this.server = undefined;
        logger.info('Server stopped');
        resolve();
      });
    });
  }
}
