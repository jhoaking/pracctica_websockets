import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';


import { CreateUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { User } from './entities/auth.entity';
import { JwtPayload } from './interface/auth-user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;

    try {
      const user = this.userRepository.create({
        password: bcrypt.hashSync(password, 10),
        createdAt: new Date(),
        ...rest,
      });

      await this.userRepository.save(user);
      return { user };
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true },
      });
      if (!user) throw new UnauthorizedException(`email : ${email} not valid`);

      if (!bcrypt.compare(password, user.password)) {
        throw new UnauthorizedException(`password : ${password} not valid`);
      }

      return {
        message: 'se mando el codigo de verificacon a tu email',
        user,
      };
    } catch (error) {
      console.log(error);
    }
  }
  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async checkStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }
}