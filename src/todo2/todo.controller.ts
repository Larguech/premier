import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query, BadRequestException} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';
import { BaseEntity } from './base.entity';
import { StatusEnum } from './status.enum';



@Controller('todos2')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('filtered')
  async findFilteredTodos(
    @Query('name') name?: string,
    @Query('description') description?: string,
    @Query('status') status?: string, // Receive status as string
  ): Promise<TodoEntity[]> {
    if (status && !Object.values(StatusEnum).includes(status as StatusEnum)) {
      throw new BadRequestException('Invalid status value');
    }

    return this.todoService.findFilteredTodos(name, description, status as StatusEnum);
  }

  @Get()
  findAll(): Promise<TodoEntity[]> {
    return this.todoService.findAll();
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.addTodo(createTodoDto);
  }
 
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string): Promise<TodoEntity> {
    return this.todoService.deleteTodo(id);
  }

  @Patch(':id/restore')
  async restoreTodo(@Param('id') id: string): Promise<TodoEntity> {
    return this.todoService.restoreTodo(id);
  }

  @Get('status-count')
  async getTodosCountByStatus() {
    return this.todoService.getTodosCountByStatus();
  }

  @Get(':id')
  async findTodo(@Param('id') id: string): Promise<TodoEntity> {
    try {
      return await this.todoService.findTodo(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


}