import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encrypt, validate } from 'src/helpers/bcrypt';

export interface JWTPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async encryptPassowrd(password: string): Promise<string> {
    return encrypt(password);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return validate(password, hash);
  }

  async generateToken(id: string) {
    const payload: JWTPayload = { userId: id };
    return {
      authorization: this.jwtService.sign(payload),
    };
  }
}
