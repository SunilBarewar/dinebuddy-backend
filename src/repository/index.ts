import { FloorTableRepository } from "@/repository/floor-table.repository";

export class Repository {
  private static instance: Repository;

  public readonly floorTable = new FloorTableRepository();

  private constructor() {}

  public static getInstance(): Repository {
    if (!Repository.instance) {
      Repository.instance = new Repository();
    }

    return Repository.instance;
  }
}
