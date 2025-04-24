import { forwardRef, Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ApiClientService {
  private readonly axiosInstance: AxiosInstance;
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
    this.axiosInstance = axios.create({
      baseURL: process.env.SMART_URL,
    });
  }

  async getApiWithToken(url: string, tokenType: string, params?: any) {
    try {
      const token = await this.authService.getToken(tokenType);
      const response = await this.axiosInstance({
        method: 'get',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        params, // optional query params
      });

      console.log(
        `GET Request -> URL: ${url}, PARAMS: ${JSON.stringify(params)}`,
      );
      console.log(`Response -> ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error: any) {
      console.error(`GET Error: ${JSON.stringify(error.response?.data)}`);
      throw new Error('GET so‘rovda xatolik yuz berdi');
    }
  }

  async postApi(url: string, data: any) {
    try {
      const response = await this.axiosInstance({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      });
      console.log(`Request -> URL: ${url}, DATA: ${data}`);
      console.log(`Response -> ${response.data}`);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Unknown error occurred';
      console.log(`Error: ${errorMessage}`);
      throw new Error(`API request failed: ${errorMessage}`);
    }
  }

  async postApiWithToken(url: string, tokenType: string, data: any) {
    try {
      const token = await this.authService.getToken(tokenType);
      const response = await this.axiosInstance({
        method: 'post',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data,
      });

      console.log(`Request -> URL: ${url}, DATA: ${data}`);
      console.log(`Response -> ${response.data}`);
      return response.data;
    } catch (error: any) {
      console.log(`Error: ${error.response?.data}`);
      return error.response?.data;
    }
  }

  async putApiWithToken(url: string, tokenType: string, data: any) {
    try {
      const token = await this.authService.getToken(tokenType);
      const response = await this.axiosInstance({
        method: 'put',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data,
      });

      console.log(`PUT Request -> URL: ${url}, DATA: ${JSON.stringify(data)}`);
      console.log(`Response -> ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error: any) {
      console.log(`PUT Error: ${JSON.stringify(error.response?.data)}`);
      return error.response?.data;
    }
  }
}
