export interface InviteRepositoryType {
  send(snugId: string, emails: string[]): Promise<boolean>;
}
