import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ AuthModule ],
      inject: [ JwtService ],
      useFactory: async (jwtService: JwtService ) => ({
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault],
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context({req }){
          //const token = req.headers.authorization?.replace('Bearer ','')
          //if( !token ) throw Error('token needed');

          //const payload = jwtService.decode(token);
          //if(payload) throw Error('Token not valid')
        }
      }),
   
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
     
    }),


    /*  GraphQLModule.forRoot<ApolloDriverConfig>({
       driver: ApolloDriver,
       playground: false,
       plugins:[ApolloServerPluginLandingPageLocalDefault],
       autoSchemaFile: join(process.cwd(),'src/schema.gql')
     }), */
    ItemsModule,
    UsersModule,
    AuthModule,
    SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
