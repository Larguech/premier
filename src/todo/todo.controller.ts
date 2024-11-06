// import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
// import { TodoService } from './todo.service';
// import { TodoEntity } from './todo.entity';
// import { CreateTodoDto } from './create-todo.dto';
// import { UpdateTodoDto } from './update-todo.dto';

// @Controller('todos')
// export class TodoController {
//   constructor(private readonly todoService: TodoService) {}

//   // @Get()
//   // findAll(): Promise<TodoEntity[]> {
//   //   return this.todoService.findAll();
//   // }

//   // @Post()
//   // create(@Body() todo: Partial<TodoEntity>): Promise<TodoEntity> {
//   //   return this.todoService.create(todo);
//   // }
//   // @Post()
//   // async create(@Body() createTodoDto: CreateTodoDto) {
//   //   return this.todoService.create(createTodoDto);
//   // }
 
//   // @Patch(':id')
//   // async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
//   //   return this.todoService.update(id, updateTodoDto);
//   // }
// }

// src/todo/todo.controller.ts
import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { StatusEnum } from './status.enum';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // Endpoint pour créer un todo
  @Post()
  async createTodo(
    @Body('name') name: string,
    @Body('description') description: string,
  ): Promise<TodoEntity> {
    return this.todoService.createTodo(name, description);
  }

  // Endpoint pour obtenir tous les todos
  @Get()
  async getTodos(): Promise<TodoEntity[]> {
    return this.todoService.getTodos();
  }

  // Endpoint pour obtenir un todo par ID
  @Get(':id')
  async getTodoById(@Param('id') id: number): Promise<TodoEntity> {
    return this.todoService.getTodoById(id);
  }

  // Endpoint pour mettre à jour le statut d'un todo
  @Patch(':id/status')
  async updateTodoStatus(
    @Param('id') id: number,
    @Body('status') status: StatusEnum,
  ): Promise<TodoEntity> {
    return this.todoService.updateTodoStatus(id, status);
  }

  // Endpoint pour supprimer un todo
  @Delete(':id')
  async deleteTodo(@Param('id') id: number): Promise<void> {
    return this.todoService.deleteTodo(id);
  }
}
