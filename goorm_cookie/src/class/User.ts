type UserParam = {
  id: number;
  name: string;
  isOnline?: boolean;
};

export default class User {
  constructor(
    public id: number,
    public name: string,
    public isOnline: boolean = false
  ) {}

  public static of({ id, name, isOnline }: UserParam): User {
    return new User(id, name, isOnline);
  }
}
