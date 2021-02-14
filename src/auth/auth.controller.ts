import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService) { }

    @Post('/signup')
    userSignUp(@Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO) {
        console.log(authCredentialDTO)
        return this.authService.userSignUp(authCredentialDTO);
    }
}



