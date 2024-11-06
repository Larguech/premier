import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { CommonModuleModule } from '../common-module/common-module.module';//************** */

@Module({
  imports: [CommonModuleModule],//********************* */
  providers: [TestService],
  controllers: [TestController]
})
export class TestModule {}
