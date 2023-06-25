import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthCredentialsDTO } from 'src/dtos/auth/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  public async login(
    @Body() authCredentials: AuthCredentialsDTO,
  ): Promise<any> {
    return this.authService.login(authCredentials);
  }
}
