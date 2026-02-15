import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { normalizeEmail } from '@bdd/utils';
import { PrismaService } from '../common/prisma.service';
import { LoginEmailDto, RegisterEmailDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async registerWithEmail(dto: RegisterEmailDto) {
    const email = normalizeEmail(dto.email);
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Email already in use');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        provider: 'EMAIL'
      }
    });

    return this.buildAuthResponse(user);
  }

  async loginWithEmail(dto: LoginEmailDto) {
    const email = normalizeEmail(dto.email);
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user?.passwordHash) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.buildAuthResponse(user);
  }

  async requestPhoneOtp(phone: string) {
    return {
      message: `OTP flow placeholder for ${phone}. Integrate SMS provider + verification worker.`
    };
  }

  async googleOAuthPlaceholder() {
    return { message: 'Google OAuth placeholder. Add strategy + callback handling.' };
  }

  private async buildAuthResponse(user: User) {
    const accessToken = await this.jwtService.signAsync({ sub: user.id, email: user.email, phone: user.phone });
    return { accessToken, userId: user.id };
  }
}
