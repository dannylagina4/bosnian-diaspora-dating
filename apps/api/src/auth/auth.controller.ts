import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginEmailDto, PhoneOtpRequestDto, RegisterEmailDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/email')
  registerWithEmail(@Body() dto: RegisterEmailDto) {
    return this.authService.registerWithEmail(dto);
  }

  @Post('login/email')
  loginWithEmail(@Body() dto: LoginEmailDto) {
    return this.authService.loginWithEmail(dto);
  }

  @Post('phone/otp')
  phoneOtp(@Body() dto: PhoneOtpRequestDto) {
    return this.authService.requestPhoneOtp(dto.phone);
  }

  @Post('oauth/google')
  googleOAuthPlaceholder() {
    return this.authService.googleOAuthPlaceholder();
  }
}
