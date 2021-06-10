import { Injectable, Logger } from "@nestjs/common";
import { HealthCheckService, TypeOrmHealthIndicator } from "@nestjs/terminus";
@Injectable()
export class AppService {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private logger: Logger
  ) {}

  getHealthStatus() {
    this.logger.log("Health status is getting checked", AppService.name);
    return this.health.check([async () => this.db.pingCheck("typeorm")]);
  }
}
