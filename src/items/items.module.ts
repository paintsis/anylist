import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
  providers: [ItemsResolver, ItemsService],
  exports: [ItemsService, TypeOrmModule],
  imports:[
    TypeOrmModule.forFeature([
      Item
    ])
  ]
})
export class ItemsModule {}
