import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto) {
    const isExistUser = await this.findUserByEmail(dto.email);

    if (isExistUser) {
      throw new BadRequestException('User has already registered');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      ...dto,
      password: hash,
    });

    await this.userRepo.save(user);

    const payload = { sub: user.id, email: user.email };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user_id: user.id,
    };
  }

  async login(dto: LoginUserDto) {
    const user = await this.findUserByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const payload = { sub: user.id, email: user.email };

    const token = this.jwtService.sign(payload);

    console.log(token);
    console.log(user.id);

    return {
      access_token: token,
      user_id: user.id,
    };
  }

  private async findUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
}
