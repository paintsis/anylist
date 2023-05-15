import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SEED_ITEMS, SEED_USERS } from './data/seed-data';
import { UsersService } from 'src/users/users.service';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class SeedService {
    private isProd: boolean;
    constructor( private readonly _configService : ConfigService, 
        @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly _userService: UsersService,
        private readonly itemsService: ItemsService,
        
        ) {
        this.isProd = _configService.get('STATE') === 'prod';
    }
    async executeSeed(){
        if(this.isProd) throw new UnauthorizedException();
        
        await this.deleteDatabase()
       const user =  await this.loadUsers();
       await this.loadItems( user );
        return true
    }

    async deleteDatabase(){
        await this.itemRepository.createQueryBuilder()
        .delete()
        .where({})
        .execute();

        await this.userRepository.createQueryBuilder()
        .delete()
        .where({})
        .execute();
    }

    async loadUsers(): Promise<User> {
        const users =  [];
        
        for(const user of SEED_USERS){
            users.push( await this._userService.create(user) )
        }
        return users[0];
    }
    async loadItems( user: User ): Promise<void> {

        const itemsPromises = [];

        for (const item of SEED_ITEMS ) {
            itemsPromises.push( this.itemsService.create( item, user ) );
        }

        await Promise.all( itemsPromises );

    }


}
