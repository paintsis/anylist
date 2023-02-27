import { ObjectType, Field, Int, ID, Float,  } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'items'})
@ObjectType()
export class Item {

    @PrimaryGeneratedColumn('uuid')
    @Field( ()=>ID)
    id: string;
    
    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field( ()=>Float)
    quantity:number;

    @Column()
    @Field( ()=>String,{nullable: true})
    quantityUnit: string;

}
