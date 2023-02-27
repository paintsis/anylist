import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { timeEnd } from 'console';
import { Repository } from 'typeorm';
import { CreateItemInput } from './dto/inputs/create-item.input';
import { UpdateItemInput } from './dto/inputs/update-item.input';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {

  constructor( @InjectRepository( Item ) private readonly itemsRepository : Repository< Item> ){}

  async create(createItemInput: CreateItemInput) : Promise<Item> {
    const newItem = this.itemsRepository.create(createItemInput);
    return await this.itemsRepository.save(newItem);
    //return newItem;
  }

  async findAll() : Promise<Item[]> {
    return this.itemsRepository.find();
    //return [];
  }

  async findOne(id: string) : Promise<Item> {
    const item = this.itemsRepository.findOneBy({ id } );

    if(!item) throw new NotFoundException('Item with id: ')
    return item;
    //return `This action returns a #${id} item`;
  }

  async update(id: string, updateItemInput: UpdateItemInput) : Promise<Item> {
    const item = await this.itemsRepository.preload(updateItemInput);
    return this.itemsRepository.save(item);

    //return;
  }

  async remove(id: string) : Promise<Item> {
    const item =  await this.findOne( id )
     await this.itemsRepository.remove(item);
     return {...item, id}
    //return `This action removes a #${id} item`;
  }
}
