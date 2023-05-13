import {Body, Controller, Get, Inject, Post, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {UserLoginDto} from "@app/common";
import {GoogleAuthGuard} from "@app/common";
import {VkAuthGuard} from "@app/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";



@ApiTags("Авторизация пользователей")
@Controller("/auth")
export class AppAuthController {
    constructor(@Inject("AUTH") private readonly usersClient: ClientProxy) {};

    @ApiOperation({
        summary: `Авторизация через email и пароль. В ответ получаете jwt-token, который нужно поместить` +
            'в заголовки запроса ("Authorization: Bearer jwt-token")'
    })
    @ApiResponse({status: 200, type: String})
    @Post("/login")
    async login(@Body() userLoginDto: UserLoginDto) {
        return this.usersClient.send({
            cmd: "login"
        }, {
            userLoginDto
        });
    };

    @ApiOperation({summary: 'Авторизация через google(gmail) аккаунт'})
    @ApiResponse({status: 200, type: String})
    @UseGuards(GoogleAuthGuard)
    @Get("google/login")
    handleLogin() {
        return {msg: "Google auth - success"}
    };

    @ApiOperation({summary: 'Авторизация через аккаунт vkontakte'})
    @UseGuards(VkAuthGuard)
    @Get("vk/login")
    vkLogin() {
        return {msg: "VK auth - success"}
    };

    @UseGuards(GoogleAuthGuard)
    @Get("google/redirect")
    handleRedirect() {
        return {msg: "Google auth - success"}
    };

    @UseGuards(VkAuthGuard)
    @Get("vk/redirect")
    vkRedirect() {
        return {msg: "VK auth - success"}
    };
}