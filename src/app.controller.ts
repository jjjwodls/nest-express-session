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
import * as Slack from 'slack-node';

const webhook =
  'https://hooks.slack.com/services/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';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const slack = new Slack();
    slack.setWebhook(webhook);
    try {
      throw new Error('에러 테스트 좀 하자!!');
    } catch (e) {
      const slackOption = {
        text: `:bug: ${e.stack}`,
      };
      slack.webhook(slackOption, (err, response) => {
        console.log(err);
        console.log(response);
      });
    }

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
