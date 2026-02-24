import { FloorTableRepository } from "@/repository/floor-table.repository";

export class Repository {
  private static instance: Repository | null = null;

  public readonly floorTable = new FloorTableRepository();

  private constructor() {}

  public static getInstance(): Repository {
    const instance = (Repository.instance ??= new Repository());

    return instance;
  }
}
