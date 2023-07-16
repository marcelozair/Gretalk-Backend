import {
  BadRequestException,
  ForbiddenException,
  HttpException,
} from '@nestjs/common/exceptions';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CREATED, OK } from 'src/constants/httpStatus';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { CredentialsDto, RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Inject(UsersService)
  private readonly userService: UsersService;

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res() res: Response, @Body() registerUser: RegisterUserDto) {
    const { password, email } = registerUser;
    const userExist = await this.userService.findByEmail(email);

    if (userExist) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await this.authService.encryptPassowrd(password);

    const user = await this.userService.createUser({
      ...registerUser,
      password: hashPassword,
      bio: null,
      picture: null,
    });

    const { authorization } = await this.authService.generateToken(user.id);

    return res.status(CREATED).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        picture: user.picture,
        authorization,
      },
    });
  }

  @Post('sign-in')
  async signIn(@Res() res: Response, @Body() credencials: CredentialsDto) {
    const { email, password } = credencials;

    const userExist = await this.userService.findByEmail(email);

    if (!userExist) return new BadRequestException('User do not found');

    const passwordIsValid = await this.authService.comparePassword(
      password,
      userExist.password,
    );

    if (!passwordIsValid) {
      throw new HttpException('Password is invalid', HttpStatus.BAD_REQUEST);
    }

    const { authorization } = await this.authService.generateToken(
      userExist.id,
    );

    return res.status(OK).json({
      user: {
        id: userExist.id,
        username: userExist.username,
        email: userExist.email,
        bio: userExist.bio,
        picture: userExist.picture,
        authorization,
      },
    });
  }
}
