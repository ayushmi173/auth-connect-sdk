import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {

  getTestingStatus(): string {
    return "Hello, I am working!";
  }
}
