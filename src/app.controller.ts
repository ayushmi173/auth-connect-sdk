import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckResult } from "@nestjs/terminus";
import { AppService } from "./app.service";

@Controller("/health")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HealthCheck()
  getHealth(): Promise<HealthCheckResult> {
    return this.appService.getHealthStatus();
  }
}
