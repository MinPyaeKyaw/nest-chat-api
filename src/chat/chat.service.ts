import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(content: string, userId: string) {
    return this.prisma.message.create({
      data: {
        content,
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async messages() {
    return this.prisma.message.findMany();
  }
}
