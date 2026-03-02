import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    await this.findOne(id);

    return this.prisma.user.update({ where: { id }, data });
  }

async remove(id: number) {
  const user = await this.prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  await this.prisma.user.delete({ where: { id } });

  return { message: 'User deleted successfully' };
}
}