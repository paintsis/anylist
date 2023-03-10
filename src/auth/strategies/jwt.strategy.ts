import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from "src/users/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interfaces";
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService: ConfigService, private readonly _authService : AuthService){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload) : Promise<User>{
        const { id } = payload;
        const user = await this._authService.revalidateUser(id)
        
        return user;

        throw new UnauthorizedException();
    }
}

/**
 * [10:48, 2/3/2023] Ariel Tello: 45.173.219.165
[10:48, 2/3/2023] Ariel Tello: cabelnet
Cabel12345
 */