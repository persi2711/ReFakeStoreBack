import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('load')
  @ApiOperation({
    summary: 'Metodo para cargar los productos a la base de datos',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        password: { type: 'string', example: 'password' },
      },
    },
  })
  async loadData(@Body('password') password: string) {
    return this.appService.loadData(password);
  }
}
