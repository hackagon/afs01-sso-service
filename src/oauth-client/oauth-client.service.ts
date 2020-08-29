import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OauthClientRepository } from './oauth-client.repository';
import { ConsoleService } from "nestjs-console";

@Injectable()
export class OauthClientService {
  constructor(
    @InjectRepository(OauthClientRepository) private oauthClientRepo: OauthClientRepository,
    private consoleService: ConsoleService
  ) {
    const cli = this.consoleService.getCli();

    this.consoleService.createCommand({
      command: "get-clients",
      description: "Get all clients"
    }, this.getClients, cli)

    this.consoleService.createCommand({
      command: "create-client <name> <url>",
      description: "Create a client"
    }, this.createClient, cli)
  }

  getClients = async () => {
    const clients = await this.oauthClientRepo.find()
    console.log(clients);
    return clients;
  }

  createClient = async (name: string, url: string) => {
    const client = await this.oauthClientRepo.create({ name, url }).save()
    console.log(client);
    return client;
  }

  async getClientByName(name: string) {
    return await this.oauthClientRepo.findOne({ where: { name } });
  }

  async findClientById(clientId: string) {
    const foundClient = await this.oauthClientRepo.findOne(clientId)
    if (!foundClient) throw new NotFoundException("Client Not Found");

    return foundClient;
  }
}