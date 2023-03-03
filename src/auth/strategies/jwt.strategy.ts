import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from "src/users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService: ConfigService){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: any) : Promise<User>{
        return
    }
}