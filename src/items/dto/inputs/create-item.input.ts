import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateItemInput {


    @Field(() => String)
    @IsString()
    name: string;

 /*    @Field( ()=>Float)
    @IsPositive()
    quantity:number;
 */

    @Field( ()=>String,{nullable: true})
    @IsString()
    @IsOptional()
    quantityUnit?: string;
}
