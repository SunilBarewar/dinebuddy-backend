import httpStatus from "http-status";
import { HttpError } from "@/exceptions/http-error";
import { Repository } from "@/repository";
import type {
  ICreateFloorInput,
  ICreateTableInput,
  ILayoutUpdateInput,
  IReorderFloorInput,
  IUpdateFloorInput,
  IUpdateTableInput,
  TTableShape,
  TTableStatus,
} from "@/types/floor-table.types";

export class FloorTableService {
  private repository = Repository.getInstance();

  // ─── Assertion helpers ──────────────────────────────────────────────────────

  private async assertBranchExists(branchId: string): Promise<void> {
    const branch = await this.repository.floorTable.findBranchById(branchId);

    if (!branch) {
      throw new HttpError(httpStatus.NOT_FOUND, "Branch not found");
    }
  }

  private async assertFloorExists(floorId: string): Promise<void> {
    const floor = await this.repository.floorTable.findFloorById(floorId);

    if (!floor) {
      throw new HttpError(httpStatus.NOT_FOUND, "Floor not found");
    }
  }

  private async assertFloorBelongsToBranch(
    floorId: string,
    branchId: string,
  ): Promise<void> {
    const floor = await this.repository.floorTable.findFloorById(floorId);

    if (!floor) {
      throw new HttpError(httpStatus.NOT_FOUND, "Floor not found");
    }

    if (floor.branchId !== branchId) {
      throw new HttpError(
        httpStatus.BAD_REQUEST,
        "Floor does not belong to the provided branch",
      );
    }
  }

  private async assertTableExists(tableId: string): Promise<void> {
    const table = await this.repository.floorTable.findTableById(tableId);

    if (!table) {
      throw new HttpError(httpStatus.NOT_FOUND, "Table not found");
    }
  }

  // ─── Validation helpers ─────────────────────────────────────────────────────

  private validateTableStatus(status: string): status is TTableStatus {
    return (
      status === "AVAILABLE" ||
      status === "RESERVED" ||
      status === "OCCUPIED" ||
      status === "INACTIVE"
    );
  }

  private validateTableShape(shape: string): shape is TTableShape {
    return (
      shape === "SQUARE" ||
      shape === "RECTANGLE" ||
      shape === "ROUND" ||
      shape === "CUSTOM"
    );
  }

  // ─── Floor methods ──────────────────────────────────────────────────────────

  public async createFloor(input: ICreateFloorInput) {
    await this.assertBranchExists(input.branchId);

    return this.repository.floorTable.createFloor(input);
  }

  public async getFloorsByBranch(branchId: string) {
    await this.assertBranchExists(branchId);

    return this.repository.floorTable.findFloorsByBranchId(branchId);
  }

  public async getFloorById(floorId: string) {
    await this.assertFloorExists(floorId);

    return this.repository.floorTable.findFloorById(floorId);
  }

  public async updateFloor(floorId: string, input: IUpdateFloorInput) {
    await this.assertFloorExists(floorId);

    return this.repository.floorTable.updateFloor(floorId, input);
  }

  public async deleteFloor(floorId: string) {
    await this.assertFloorExists(floorId);

    return this.repository.floorTable.deleteFloor(floorId);
  }

  public async reorderFloors(branchId: string, input: IReorderFloorInput[]) {
    await this.assertBranchExists(branchId);

    if (input.length === 0) {
      throw new HttpError(
        httpStatus.BAD_REQUEST,
        "At least one floor reorder item is required",
      );
    }

    await this.repository.floorTable.reorderFloors(branchId, input);

    return this.repository.floorTable.findFloorsByBranchId(branchId);
  }

  // ─── Table methods ──────────────────────────────────────────────────────────

  public async createTable(input: ICreateTableInput) {
    await this.assertBranchExists(input.branchId);
    await this.assertFloorBelongsToBranch(input.floorId, input.branchId);

    if (!this.validateTableStatus(input.status)) {
      throw new HttpError(httpStatus.BAD_REQUEST, "Invalid table status");
    }

    if (!this.validateTableShape(input.shape)) {
      throw new HttpError(httpStatus.BAD_REQUEST, "Invalid table shape");
    }

    return this.repository.floorTable.createTable(input);
  }

  public async getTablesByFloor(floorId: string) {
    await this.assertFloorExists(floorId);

    return this.repository.floorTable.findTablesByFloorId(floorId);
  }

  public async getTableById(tableId: string) {
    await this.assertTableExists(tableId);

    return this.repository.floorTable.findTableById(tableId);
  }

  public async updateTable(tableId: string, input: IUpdateTableInput) {
    await this.assertTableExists(tableId);

    if (input.status && !this.validateTableStatus(input.status)) {
      throw new HttpError(httpStatus.BAD_REQUEST, "Invalid table status");
    }

    if (input.shape && !this.validateTableShape(input.shape)) {
      throw new HttpError(httpStatus.BAD_REQUEST, "Invalid table shape");
    }

    if (input.branchId && input.floorId) {
      await this.assertFloorBelongsToBranch(input.floorId, input.branchId);
    }

    return this.repository.floorTable.updateTable(tableId, input);
  }

  public async deleteTable(tableId: string) {
    await this.assertTableExists(tableId);

    return this.repository.floorTable.deleteTable(tableId);
  }

  public async updateTableStatus(tableId: string, status: string) {
    if (!this.validateTableStatus(status)) {
      throw new HttpError(httpStatus.BAD_REQUEST, "Invalid table status");
    }

    await this.assertTableExists(tableId);

    return this.repository.floorTable.updateTableStatus(tableId, status);
  }

  public async updateFloorLayout(floorId: string, input: ILayoutUpdateInput[]) {
    await this.assertFloorExists(floorId);

    if (input.length === 0) {
      throw new HttpError(
        httpStatus.BAD_REQUEST,
        "At least one layout update item is required",
      );
    }

    await this.repository.floorTable.updateTablesLayout(floorId, input);

    return this.repository.floorTable.findTablesByFloorId(floorId);
  }

  // ─── Floor-plan / availability ──────────────────────────────────────────────

  public async getBranchFloorPlan(branchId: string) {
    await this.assertBranchExists(branchId);

    return this.repository.floorTable.findBranchFloorPlan(branchId);
  }

  public async getAvailableTablesByBranch(branchId: string) {
    await this.assertBranchExists(branchId);

    return this.repository.floorTable.findAvailableTablesByBranchId(branchId);
  }
}

export const floorTableService = new FloorTableService();
