import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';
import { StatusEnum } from './status.enum';


@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {
  }

  findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  async addTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(newTodo);
  }

  // Méthode pour mettre à jour un Todo existant
  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({
      where: { id: parseInt(id, 10) }, // Assure-toi que l'id est un entier
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    todo.deletedAt = new Date();
    return this.todoRepository.save(todo);
  }

  async restoreTodo(id: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({
      where: { id: parseInt(id, 10) },
      withDeleted: true,
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    if (!todo.deletedAt) {
      throw new NotFoundException('Todo is not deleted');
    }

    todo.deletedAt = null;
    return this.todoRepository.save(todo);
  }


  async getTodosCountByStatus(): Promise<{ [key: string]: number }> {
    const pendingCount = await this.todoRepository.count({
      where: { status: StatusEnum.PENDING },
    });

    const inProgressCount = await this.todoRepository.count({
      where: { status: StatusEnum.IN_PROGRESS },
    });

    const completedCount = await this.todoRepository.count({
      where: { status: StatusEnum.COMPLETED },
    });

    return {
      [StatusEnum.PENDING]: pendingCount,
      [StatusEnum.IN_PROGRESS]: inProgressCount,
      [StatusEnum.COMPLETED]: completedCount,
    };
  }

  async findTodo(id: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({
      where: { id: parseInt(id, 10) }, // Assurez-vous que l'ID est un entier
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async findFilteredTodos(
    name?: string,
    description?: string,
    status?: StatusEnum,
    page: number = 1,  // Default page to 1
    limit: number = 10, // Default limit to 10
  ): Promise<TodoEntity[]> {
    const whereConditions: any = {};

    if (name) {
      whereConditions.name = Like(`%${name}%`); // Match name partially
    }

    if (description) {
      whereConditions.description = Like(`%${description}%`); // Match description partially
    }

    if (status) {
      whereConditions.status = status; // Exact match for status
    }

    // Calculate skip and take based on page and limit
    const skip = (page - 1) * limit;
    const take = limit;

    // Fetch todos with pagination
    return this.todoRepository.find({
      where: whereConditions,
      skip,  // Skip the first (page - 1) * limit records
      take,  // Limit the number of records returned
    });
  }

}
