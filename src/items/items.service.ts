import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { timeEnd } from 'console';
import { Repository } from 'typeorm';
import { CreateItemInput } from './dto/inputs/create-item.input';
import { UpdateItemInput } from './dto/inputs/update-item.input';
import { Item } from './entities/item.entity';
import { User } from '../users/entities/user.entity';
import { use } from 'passport';

@Injectable()
export class ItemsService {

  constructor( @InjectRepository( Item ) private readonly itemsRepository : Repository< Item> ){}

  async create(createItemInput: CreateItemInput, user: User) : Promise<Item> {
    const newItem = this.itemsRepository.create({...createItemInput, user});
    return await this.itemsRepository.save(newItem);
    //return newItem;
  }

  async findAll(user: User ) : Promise<Item[]> {
    console.log(user)
    return this.itemsRepository.find({
      where: {
        user: {
          id: user.id
        }
      }
    });
    //return [];
  }

  async findOne(id: string, user: User) : Promise<Item> {
    const item = this.itemsRepository.findOne({ where: {
      id: id,
      user: {
        id: user.id
      }
    } } );

    if(!item) throw new NotFoundException('Item with id: ')
    return item;
    //return `This action returns a #${id} item`;
  }

  async update(id: string, updateItemInput: UpdateItemInput, user:User) : Promise<Item> {
    await this.findOne(id,user);
    const item = await this.itemsRepository.preload(updateItemInput);
    return this.itemsRepository.save(item);

    //return;
  }
  async itemCountByUser(user: User) : Promise<number>{
    return this.itemsRepository. count({
      where: {
       user: {
        id: user.id
       }
      }
    })
  }
  
  async remove(id: string, user: User) : Promise<Item> {
    const item =  await this.findOne( id , user)
     await this.itemsRepository.remove(item);
     return {...item, id}
    //return `This action removes a #${id} item`;
  }
}
