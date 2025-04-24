import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CheckLimitDto,
  CreateOrderDto,
  UpdateOrderStatusDto,
} from './dto/smart.dto';
import { ApiClientService } from 'src/api-client/api-client.service';

@Injectable()
export class SmartBillService {
  constructor(private readonly apiService: ApiClientService) {}

  async checkLimit(data: CheckLimitDto) {
    console.log(data, 'dt');
    const body = {
      passport: data.passport,
      phone: data.phone,
      birth_date: data.birth_date,
    };

    try {
      const response = this.apiService.postApiWithToken(
        '/merchant/orders/loan/check',
        '1',
        body,
      );
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedException(
          'API orqali autentifikatsiya muvaffaqiyatsiz',
        );
      }
      throw new InternalServerErrorException('Tizimda xatolik yuz berdi');
    }
  }

  async createOrder(data: CreateOrderDto) {
    const body = {
      passport: data.passport,
      birth_date: data.birth_date,
      phone: data.phone,
      shipping_price: data.shipping_price,
      installment_period: data.installment_period,
      contacts: data.contacts?.map((contact) => ({
        phone: contact.phone,
        full_name: contact.full_name,
        contact_type: contact.contact_type,
      })),
      items: data.items.map((item) => ({
        name: item.name,
        price: item.price,
        ikpu: item.ikpu,
        package_code: '',
        quantity: item.quantity,
      })),
    };

    try {
      const response = await this.apiService.postApiWithToken(
        '/external/order/create',
        '1',
        body,
      );
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedException(
          'API orqali autentifikatsiya muvaffaqiyatsiz',
        );
      }
      throw new InternalServerErrorException('Tizimda xatolik yuz berdi');
    }
  }

  async updateOrderStatus(orderId: string, dto: UpdateOrderStatusDto) {
    try {
      const response = await this.apiService.putApiWithToken(
        `/merchant/orders/status-change/${orderId}`,
        '1',
        dto,
      );
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedException('Token noto‘g‘ri yoki muddati tugagan');
      }
      throw new InternalServerErrorException(
        'Buyurtma statusini o‘zgartirishda xatolik yuz berdi',
      );
    }
  }

  async getOrderById(orderId: string): Promise<any> {
    try {
      const response = await this.apiService.getApiWithToken(
        `/merchant/orders/${orderId}`,
        '1',
      );
      console.log(`GET Request -> Order ID: ${orderId}`);
      console.log(`Response -> ${JSON.stringify(response.data)}`);
      return response;
    } catch (error: any) {
      console.error(
        `GET Order Error -> ${JSON.stringify(error.response?.data)}`,
      );
      throw new Error('Buyurtmani olishda xatolik yuz berdi');
    }
  }
  
}
