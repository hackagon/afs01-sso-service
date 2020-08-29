import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { OauthServiceRepository } from './oauth-service.repository';
import { ConsoleService } from 'nestjs-console';

@Injectable()
export class OauthServiceService {
  constructor(
    @InjectRepository(OauthServiceRepository) private oauthServiceRepo: OauthServiceRepository,
    private consoleService: ConsoleService
  ) {
    const cli = this.consoleService.getCli();

    this.consoleService.createCommand({
      command: "get-services",
      description: "Get all services"
    }, this.getServices, cli)

    this.consoleService.createCommand({
      command: "create-service <name> <url>",
      description: "Get all services"
    }, this.createService, cli)
  }

  getServices = async () => {
    const services = await this.oauthServiceRepo.find();
    console.log(services);
    return services
  }

  createService = async (name: string, url: string) => {
    const service = await this.oauthServiceRepo.create({ name, url }).save();
    console.log(service)
    return service;
  }
}