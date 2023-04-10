import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGyard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enums';
import { ItemsService } from 'src/items/items.service';

@Resolver(() => User)
@UseGuards( JwtAuthGyard )
export class UsersResolver {
  constructor(private readonly usersService: UsersService, private readonly _itemService : ItemsService) {}



  @Query(() => [User], { name: 'users' })
  findAll( @Args() validRoles: ValidRolesArgs , @CurrentUser([ValidRoles.admin]) user: User ) : Promise<User[]> {
    console.log(validRoles)
    return this.usersService.findAll(validRoles.roles);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string, 
          @CurrentUser([ValidRoles.admin]) user: User ) : Promise<User> {
    return this.usersService.findOneByid(id);
  }


   @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput, @CurrentUser() user: User) {
    return this.usersService.update(updateUserInput.id, updateUserInput, user);
  }
 
  @Mutation(() => User, {name: 'blockUser'})
  blockUser(@Args('id', { type: () => ID }) id: string,
  @CurrentUser([ValidRoles.admin]) user: User
  ) : Promise<User> {
    return this.usersService.block(id, user);
  }

  @ResolveField(()=> Int, {name: 'ItemCounter'})

  async itemCount(  
    @CurrentUser([ValidRoles.admin]) admin: User,
     @Parent() user: User  ) : Promise<number>{
     return this._itemService.itemCountByUser(user)
  }

}
