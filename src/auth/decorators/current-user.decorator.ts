import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums/valid-roles.enums';

export const CurrentUser = createParamDecorator( (roles : ValidRoles[] =[], context: ExecutionContext)=>{
    const ctx = GqlExecutionContext.create( context )
    const user = ctx.getContext().req.user ;

    if(!user) throw new InternalServerErrorException('No user inside the request');

    if(roles.length === 0) return user;

    for(let role of user.roles){
        if (roles.includes(role as ValidRoles)){
            return user
        }
    }
    throw new ForbiddenException('User need a valid role')
    //return user;
})