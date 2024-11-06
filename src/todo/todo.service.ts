// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TodoEntity } from './todo.entity';
// import { CreateTodoDto } from './create-todo.dto';
// import { UpdateTodoDto } from './update-todo.dto';

// @Injectable()
// export class TodoService {
//   constructor(
//     @InjectRepository(TodoEntity)
//     private todoRepository: Repository<TodoEntity>,
//   ) {}

//   findAll(): Promise<TodoEntity[]> {
//     return this.todoRepository.find();
//   }
//   create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
//     const newTodo = this.todoRepository.create(createTodoDto);
//     return this.todoRepository.save(newTodo);
//   }

//   // Méthode pour mettre à jour un Todo existant
//   async update(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
//     const todo = await this.todoRepository.findOne({
//       where: { id: parseInt(id, 10) }, // Assure-toi que l'id est un entier
//     });

//     if (!todo) {
//       throw new NotFoundException('Todo not found');
//     }

//     Object.assign(todo, updateTodoDto);
//     return this.todoRepository.save(todo);
//   }
//     // Supprimer un todo
//     async deleteTodo(id: number): Promise<void> {
//       await this.todoRepository.delete(id);
//     }
// }

// src/todo/todo.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { StatusEnum } from './status.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  // Créer un nouveau todo
  async createTodo(name: string, description: string): Promise<TodoEntity> {
    const todo = this.todoRepository.create({ name, description, status: StatusEnum.PENDING });
    return await this.todoRepository.save(todo);
  }

  // Récupérer tous les todos
  async getTodos(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  // Récupérer un todo par son ID
  async getTodoById(id: number): Promise<TodoEntity> {
    return await this.todoRepository.findOneBy({ id });
  }

  // Mettre à jour le statut d'un todo
  async updateTodoStatus(id: number, status: StatusEnum): Promise<TodoEntity> {
    const todo = await this.getTodoById(id);
    todo.status = status;
    return await this.todoRepository.save(todo);
  }

  // Supprimer un todo
  async deleteTodo(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
