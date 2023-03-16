import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import * as bcrytp from 'bcrypt';
import { SingupInput } from 'src/auth/dto/inputs/singup.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private logger = new Logger('UserService');
  constructor( @InjectRepository(User) private readonly userRepository: Repository<User>){}

  async create(signUpInput: SingupInput):Promise<User> {
      try {
        const newUser = this.userRepository.create( {
          ...signUpInput,
          password: bcrytp.hashSync( signUpInput.password, 10)
        } )
        return await this.userRepository.save(newUser);

      } catch (error) {
        this.handleDBErrors(error);  
        //console.log(error);
          //throw new BadRequestException('algo salio mal')
      }
    //return 'This action adds a new user';
  }

  async findAll() : Promise<User[]> {
    return this.userRepository.find();
    //return [];
  }

  /**
   * 
   * @param email - busqueda por correo
   * @returns 
   */
  async findOne(email : string) : Promise<User> {
      //console.log(email)
      try {
        const user = await  this.userRepository.findOneByOrFail({email})
        //console.log(user)
        return user
      } catch (error) {
        throw new NotFoundException(`${email} not found`)
        //this.handleDBErrors(error)
      }
    //return ;
  }

async findOneByid(id: string){
  try {
    const user = await  this.userRepository.findOneByOrFail({id})
    //console.log(user)
    return user
  } catch (error) {
    throw new NotFoundException(`${id} not found`)
    //this.handleDBErrors(error)
  }
}

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<User> {
    return ;
  }

  private handleDBErrors( error : any ) : never{
    if(error.code === '23505'){
      throw new BadRequestException(error.detail.replace('Key',''))
    }

    if(error.code === 'error-001'){
      
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Please check server log')
  }
}
