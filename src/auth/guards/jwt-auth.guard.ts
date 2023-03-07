import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import * as request from 'supertest';

export class JwtAuthGyard extends AuthGuard( 'jwt') {
    getRequest( context: ExecutionContext ){
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
    }
}