import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  postHello(
    @Body() userData: { email: string; pwd: string },
    @Response() res,
  ): Response {
    console.log(userData);
    return res.send(userData);
  }
}
