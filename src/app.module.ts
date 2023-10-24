import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { StationsModule } from './stations/stations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URL: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_USER: Joi.string().required(),
        PORT: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('MONGO_URL'),
          auth: {
            password: configService.get('MONGO_PASSWORD'),
            username: configService.get('MONGO_USER'),
          },
          autoCreate: true,
          dbName: configService.get('MONGO_DB'),
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    StationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
