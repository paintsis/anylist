import { Injectable, BadRequestException } from '@nestjs/common';
import { SingupInput } from './dto/inputs/singup.input';
import { AuthResponse } from './dto/types/auth-response';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/inputs/login.input';
import * as bcrytp from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly usersService : UsersService, private readonly _jwtService: JwtService){}


    private getJwtToken(userId: string){
        return    this._jwtService.sign({ id: userId })
    }

    async singup(singupInput : SingupInput ) : Promise<AuthResponse>{
        //Todo: crear usuario
        const user = await this.usersService.create(singupInput)
        //Todo: crear jwt
        const token = this.getJwtToken(user.id)
        return { token, user};
    }

async login( loginInput: LoginInput ):Promise<AuthResponse>{
    const user = await this.usersService.findOne( loginInput.email );

    if(!bcrytp.compareSync(loginInput.password, user.password)) throw new BadRequestException('Email / Password do not match')
    const token  = this.getJwtToken(user.id)

    return {
        token,
        user
    }
}
    
}
