import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray } from "class-validator";
import { ValidRoles } from "src/auth/enums/valid-roles.enums";

@ArgsType()
export class ValidRolesArgs {

    @Field(() => [String], { nullable: true }  )
    @IsArray()
    roles: string[] = []
}