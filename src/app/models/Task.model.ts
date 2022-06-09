export class Task {
  createdAt!: Date;
  state!: boolean;
  title!: string;
  id!: string;

  constructor({ }: { task?: Task; } = {}) {}
}
