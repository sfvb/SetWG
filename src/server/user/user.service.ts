import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOneById(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async getOneByName(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(externalId: string): Promise<User> {
    const newUser = this.userRepository.create({
      externalId,
      username: externalId,
    });
    return this.userRepository.save(newUser);
  }

  async updateUser(id: string, username: string): Promise<User> {
    const user = await this.getOneById(id);
    user.username = username;
    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.getOneById(id);
    return this.userRepository.remove(user);
  }

  async findOneOrCreate(externalId: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { externalId } });
    if (!user) {
      user = await this.createUser(externalId);
    }
    return user;
  }
}
