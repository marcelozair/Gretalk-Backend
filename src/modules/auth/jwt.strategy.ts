import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { JWTPayload } from './auth.service';
import { UserDocument } from 'src/db/schemas/user.schema';
import { UnauthorizedException } from '@nestjs/common/exceptions'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'none-password',
    });
  }

  async validate(payload: JWTPayload): Promise<UserDocument> {
    const user = await this.usersService.getUserById(payload.userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
