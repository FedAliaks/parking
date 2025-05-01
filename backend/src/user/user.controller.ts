import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() newUser: CreateUserDto) {
    return this.userService.create(newUser);
  }

  @Post('login')
  login(@Body() user: LoginUserDto) {
    return this.userService.login(user);
  }
}
