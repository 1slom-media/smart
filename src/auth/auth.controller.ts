import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('smart-login')
  async login(@Body() data: LoginDto) {
    return this.authService.loginSmart(data);
  }

  @ApiOperation({ summary: 'Refresh Token' })
  @Get('smart-refresh')
  async loginIdea() {
    return this.authService.refreshToken();
  }
}
