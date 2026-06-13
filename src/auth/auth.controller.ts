import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { User } from '../users/entities/user.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // Ai cũng đăng ký được
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public() // Ai cũng đăng nhập được
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  logout(@CurrentUser() user: User) {
    return this.authService.logout(user.id);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refresh(@CurrentUser() user: User) {
    return this.authService.refreshTokens(user);
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
