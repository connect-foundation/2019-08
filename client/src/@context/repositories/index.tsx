import { StorageProviderDependencies } from "../storage-providers/storage-providers";
import { HttpProviderDependencies } from "../http-providers/http-providers";

export class RepositoryDependencies {
  constructor(
    apies: HttpProviderDependencies,
    storage: StorageProviderDependencies
  ) {}
}
