export class Command {
  action = undefined;

  constructor(action) {
    this.action = action;
  }

  execute() {
    if (this.action) {
      this.action();
    }
  }
}

Command.types = {
  UPDATE: 'update',
};
