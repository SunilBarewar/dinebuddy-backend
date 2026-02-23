import type { Request, Response } from "express";

import { FloorTableService } from "@/services/floor-table.service";
import type {
  TBranchIdParams,
  TFloorIdParams,
  TTableIdParams,
  TUpdateTableStatusBody,
} from "@/validators/floor-table.validator";

export class FloorTableController {
  private static instance: FloorTableController;

  private readonly service = new FloorTableService();

  private constructor() {}

  public static getInstance(): FloorTableController {
    if (!FloorTableController.instance) {
      FloorTableController.instance = new FloorTableController();
    }

    return FloorTableController.instance;
  }

  public getFloorsByBranch = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { branchId } = req.params as TBranchIdParams;
    const floors = await this.service.getFloorsByBranch(branchId);

    res.json({
      data: floors,
      message: "Floors fetched successfully",
      status: "success",
    });
  };

  public getTablesByFloor = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { floorId } = req.params as TFloorIdParams;
    const tables = await this.service.getTablesByFloor(floorId);

    res.json({
      data: tables,
      message: "Tables fetched successfully",
      status: "success",
    });
  };

  public getBranchFloorPlan = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { branchId } = req.params as TBranchIdParams;
    const floorPlan = await this.service.getBranchFloorPlan(branchId);

    res.json({
      data: floorPlan,
      message: "Branch floor plan fetched successfully",
      status: "success",
    });
  };

  public getTableById = async (req: Request, res: Response): Promise<void> => {
    const { tableId } = req.params as TTableIdParams;
    const table = await this.service.getTableById(tableId);

    res.json({
      data: table,
      message: "Table fetched successfully",
      status: "success",
    });
  };

  public getAvailableTablesByBranch = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { branchId } = req.params as TBranchIdParams;
    const tables = await this.service.getAvailableTablesByBranch(branchId);

    res.json({
      data: tables,
      message: "Available tables fetched successfully",
      status: "success",
    });
  };

  public updateTableStatus = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { tableId } = req.params as TTableIdParams;
    const { status } = req.body as TUpdateTableStatusBody;
    const table = await this.service.updateTableStatus(tableId, status);

    res.json({
      data: table,
      message: "Table status updated successfully",
      status: "success",
    });
  };
}
