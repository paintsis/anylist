import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SingupInput } from './dto/inputs/singup.input';
import { AuthResponse } from './dto/types/auth-response';
import { LoginInput } from './dto/inputs/login.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGyard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from './enums/valid-roles.enums';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(()=>  AuthResponse ,{name:'signup'}  )
   async signup(@Args('signupIput') signupInput: SingupInput  ) : Promise<AuthResponse>{
    
    return this.authService.singup(signupInput) ;
   // return this.authService.sigup*si()
  } 

  @Mutation( ()=> AuthResponse, {name: 'login'} )
  async login(@Args('loginInput') loginInput: LoginInput ) : Promise<AuthResponse> {
      return this.authService.login(loginInput);
  }

  @Query( ()=> AuthResponse, {name:'revalidate'} )
  @UseGuards(JwtAuthGyard)
  async revalidateToken( @CurrentUser([ValidRoles.admin]) user: User  ) : Promise<AuthResponse> {
    throw new Error('')
    //return this.authService.revalidate();
  }



}
