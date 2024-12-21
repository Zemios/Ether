import { Controller, Get } from '@nestjs/common';

@Controller('')
export class ApiController {
    @Get()
    show() {
        return 'Api'
    }
}
