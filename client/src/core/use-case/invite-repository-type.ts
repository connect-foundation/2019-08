export interface InviteRepositoryType {
  send(emails: string[]): Promise<boolean>;
}
