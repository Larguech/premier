import { Module } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
@Module({
    providers: [
      {
        provide: 'UUID',
        useValue: uuidv4,
      },
    ],
    exports: ['UUID'], // On exporte pour que d'autres modules puissent l'utiliser
  })

export class CommonModuleModule {}
