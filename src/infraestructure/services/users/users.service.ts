import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/application/users/dtos/create-user.dto';
import { UpdateUserDto } from 'src/application/users/dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneByEmailByPassword(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role']
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    console.log({ id, updateUserDto })
    const userToUpdate = await this.usersRepository.findOneBy({ id });

    if (!userToUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    if (!updatedUser) {
    throw new NotFoundException(`User with ID ${id} not found after update`);
    }
    return updatedUser;
  }
  
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
