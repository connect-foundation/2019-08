import {Column, Index} from "typeorm";

@Index("ticket_uniq_index", ["id"], { unique: true })
export class Ticket {
  @Column()
  private readonly id: string;

  private constructor(id: string) {
    this.id = id;
  }

  static generate(): Ticket {
    return new Ticket(Ticket.rand() + Ticket.rand());
  };

  static from(id: string): Ticket {
    return new Ticket(id);
  };

  // https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
  static rand(): string {
    return Math.random().toString(36).substr(2);
  };

  asObject(): object {
    return {id: this.id};
  };

  getValue(): string {
    return this.id;
  }
}