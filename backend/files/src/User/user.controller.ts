import { Body, Controller, Get, Param, Post } from '@nestjs/common';

const route = 'users';

@Controller(route)
export class UserController {
  @Get()
  readAll() {
    return `GET all users`;
  }

  @Get(':id')
  readOne(@Param() param) {
    return `GET user by ID `;
  }

  @Post()
  create(@Body() body) {
    const response = body.map((user) => ({
      message: 'User successfully created',
      data: user,
    }));
    return response;
  }
}
