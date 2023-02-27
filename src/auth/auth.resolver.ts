import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SingupInput } from './dto/inputs/singup.input';
import { AuthResponse } from './dto/types/auth-response';
import { LoginInput } from './dto/inputs/login.input';

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

}
