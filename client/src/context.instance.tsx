import { HttpProviderDependencies } from "./@context/http-providers/http-providers";
import { StorageProviderDependencies } from "./@context/storage-providers/storage-providers";
import { RepositoryDependencies } from "./@context/repositories/index";
import { ServiceDependencies } from "./@context/services/index";
export class Context {
  private apies: HttpProviderDependencies;
  private storages: StorageProviderDependencies;
  private repositories: RepositoryDependencies;
  services: ServiceDependencies;
  constructor() {
    this.apies = new HttpProviderDependencies();
    this.storages = new StorageProviderDependencies();
    this.repositories = new RepositoryDependencies(this.apies, this.storages);
    this.services = new ServiceDependencies(this.repositories);
  }
}
