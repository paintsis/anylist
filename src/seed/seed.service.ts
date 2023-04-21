import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
    private isProd: boolean;
    constructor( private readonly _configService : ConfigService ) {
        this.isProd = _configService.get('STATE') === 'prod';
    }
    async executeSeed(){
        if(this.isProd) throw new UnauthorizedException();

        return true
    }
}
