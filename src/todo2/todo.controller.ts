import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';

@Controller('todos2')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<TodoEntity[]> {
    return this.todoService.findAll();
  }

  // @Post()
  // create(@Body() todo: Partial<TodoEntity>): Promise<TodoEntity> {
  //   return this.todoService.create(todo);
  // }
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }
 
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }
}
// ex6*****************************************

// import { Controller, Post, Body } from '@nestjs/common';
// import { TodoService } from './todo.service';
// import { CreateTodoDto } from './create-todo.dto';
// import { TodoEntity } from './todo.entity';

// @Controller('todos3')
// export class TodoController {
//   constructor(private readonly todoService: TodoService) {}

//   @Post()
//   async addTodo(
//     @Body() createTodoDto: CreateTodoDto,
//   ): Promise<TodoEntity> {
//     return this.todoService.addTodo(createTodoDto);
//   }
// }
