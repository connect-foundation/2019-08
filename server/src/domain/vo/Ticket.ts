import {Column} from "typeorm";

export class Ticket {
  @Column({unique: true})
  private readonly id: string;

  constructor(id?: string) {
    this.id = id || this.generate();
  }

  private generate() {
    return this.rand() + this.rand();
  };

  private rand() {
    return Math.random().toString(36).substr(2);
  };

  asObject(): object {
    return {id: this.id};
  };

  getId() {
    return this.id;
  }
}