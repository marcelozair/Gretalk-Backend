import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/db/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'none-password',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy]
})
export class AuthModule {}
