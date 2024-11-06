import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { CommonModuleModule } from './common-module/common-module.module'; //ex1
//import { TestModule } from './test/test.module'; //ex1
// imports: [CommonModuleModule, TestModule],//ex1

import { TypeOrmModule } from '@nestjs/typeorm';
//import { TodoModule } from './todo/todo.module';//ex avant ex4
// import { TodoEntity } from './todo/todo.entity'; // Importe l'entité Todo ex4
import { TodoModule } from './todo2/todo.module';//ex5
 import { TodoEntity } from './todo2/todo.entity';//ex5


@Module({
//  imports: [CommonModuleModule, TestModule],
  //imports: [TodoModule],
  imports: [
    // Configuration de la connexion à la base de données
    TypeOrmModule.forRoot({
      type: 'mysql', // Type de base de données 
      host: 'localhost', // Adresse du serveur de la base de données
      port: 3306, // Port de la base de données
      username: 'root', // Nom d'utilisateur de la base de données
      //password: '', // Mot de passe de la base de données
      database: 'todo_db', // Nom de la base de données
      autoLoadEntities: true, // Liste des entités de la base de données
      synchronize: true, // Synchronise automatiquement les schémas de la base de données (false en production)
    }),
    TodoModule, // Module de l'application
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
