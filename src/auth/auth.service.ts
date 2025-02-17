import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiClientService } from '../api-client/api-client.service';
import { LoginDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity, 'main')
    private readonly authRepo: Repository<AuthEntity>,
    @Inject(forwardRef(() => ApiClientService))
    private readonly apiService: ApiClientService,
  ) {}

  //   tokenni olish
  async getToken(type: string) {
    const auth = await this.authRepo.findOneBy({
      email: process.env.SMART_LOGIN,
    });
    if (!auth) {
      throw new Error('Authentication data not found');
    }
    if (type === '1') {
      return auth.access_token;
    }
    if (type === '2') {
      return auth.refresh_token;
    }
  }

  async loginSmart(data: LoginDto) {
    const user = await this.authRepo.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Client not found');
    }
    if (data.password != user.password) {
      throw new UnauthorizedException('Wrong email or password');
    }
    try {
      const response = await this.apiService.postApi(
        '/merchant/auth/login',
        data,
      );
      user.access_token = response.access_token;
      user.refresh_token = response.refresh_token;
      user.full_name = response.full_name;
      user.token_type = response.token_type;
      user.expires_in = response.expires_in;
      await this.authRepo.save(user);

      return {
        success: true,
        access_token: user.access_token,
        expire: user.expires_in,
      };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedException(
          'API orqali autentifikatsiya muvaffaqiyatsiz',
        );
      }
      throw new InternalServerErrorException('Tizimda xatolik yuz berdi');
    }
  }

  async refreshToken() {
    const user = await this.authRepo.findOneBy({
      email: process.env.SMART_LOGIN,
    });
    if (!user) {
      throw new UnauthorizedException('Client not found');
    }
    try {
      const response = await this.apiService.postApiWithToken(
        '/merchant/auth/refresh',
        '2',
        {},
      );
      user.access_token = response.access_token;
      user.refresh_token = response.refresh_token;
      user.full_name = response.full_name;
      user.token_type = response.token_type;
      user.expires_in = response.expires_in;
      await this.authRepo.save(user);

      return {
        success: true,
        access_token: user.access_token,
        expire: user.expires_in,
      };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedException(
          'API orqali autentifikatsiya muvaffaqiyatsiz',
        );
      }
      throw new InternalServerErrorException('Tizimda xatolik yuz berdi');
    }
  }
}
