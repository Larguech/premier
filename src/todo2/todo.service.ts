import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {} //ex6
  // constructor(
  //   @InjectRepository(TodoEntity)
  //   private readonly todoRepository: Repository<TodoEntity>,
  // ) {}

  // async addTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
  //   const newTodo = this.todoRepository.create(createTodoDto);
  //   return await this.todoRepository.save(newTodo);
  // }


  findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(newTodo);
  }

  // Méthode pour mettre à jour un Todo existant
  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({
      where: { id: parseInt(id, 10) }, // Assure-toi que l'id est un entier
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }
}
