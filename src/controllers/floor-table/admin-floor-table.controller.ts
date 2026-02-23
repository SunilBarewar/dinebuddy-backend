import type { Request, Response } from "express";

import { FloorTableService } from "@/services/floor-table.service";
import type {
  TAdminFloorTableController,
  TBranchIdParams,
  TCreateTableBody,
  TFloorIdParams,
  TReorderFloorsBody,
  TTableIdParams,
  TUpdateFloorBody,
  TUpdateFloorLayoutBody,
  TUpdateTableBody,
  TUpdateTableStatusBody,
} from "@/validators/floor-table.validator";

export class AdminFloorTableController {
  private static instance: AdminFloorTableController;

  private readonly service = new FloorTableService();

  private constructor() {}

  public static getInstance(): AdminFloorTableController {
    if (!AdminFloorTableController.instance) {
      AdminFloorTableController.instance = new AdminFloorTableController();
    }

    return AdminFloorTableController.instance;
  }

  public createFloor: TAdminFloorTableController["createFloor"] = async (
    req,
    res,
  ): Promise<void> => {
    const { branchId } = req.params;
    const { displayOrder, name } = req.body;

    const floor = await this.service.createFloor({
      branchId,
      displayOrder,
      name,
    });

    res.status(201).json({
      data: floor,
      message: "Floor created successfully",
      status: "success",
    });
  };

  public getFloorsByBranch: TAdminFloorTableController["getFloorsByBranch"] =
    async (req, res): Promise<void> => {
      const { branchId } = req.params;
      const floors = await this.service.getFloorsByBranch(branchId);

      res.json({
        data: floors,
        message: "Floors fetched successfully",
        status: "success",
      });
    };

  public getFloorById = async (req: Request, res: Response): Promise<void> => {
    const { floorId } = req.params as TFloorIdParams;
    const floor = await this.service.getFloorById(floorId);

    res.json({
      data: floor,
      message: "Floor fetched successfully",
      status: "success",
    });
  };

  public updateFloor = async (req: Request, res: Response): Promise<void> => {
    const { floorId } = req.params as TFloorIdParams;
    const payload = req.body as TUpdateFloorBody;
    const floor = await this.service.updateFloor(floorId, payload);

    res.json({
      data: floor,
      message: "Floor updated successfully",
      status: "success",
    });
  };

  public deleteFloor = async (req: Request, res: Response): Promise<void> => {
    const { floorId } = req.params as TFloorIdParams;

    await this.service.deleteFloor(floorId);

    res.json({
      message: "Floor deleted successfully",
      status: "success",
    });
  };

  public reorderFloors = async (req: Request, res: Response): Promise<void> => {
    const { branchId } = req.params as TBranchIdParams;
    const { items } = req.body as TReorderFloorsBody;
    const floors = await this.service.reorderFloors(branchId, items);

    res.json({
      data: floors,
      message: "Floors reordered successfully",
      status: "success",
    });
  };

  public createTable = async (req: Request, res: Response): Promise<void> => {
    const { floorId } = req.params as TFloorIdParams;
    const { branchId, posX, posY, shape, status, tableNumber } =
      req.body as TCreateTableBody;

    const table = await this.service.createTable({
      branchId,
      floorId,
      posX,
      posY,
      shape,
      status,
      tableNumber,
    });

    res.status(201).json({
      data: table,
      message: "Table created successfully",
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

  public getTableById = async (req: Request, res: Response): Promise<void> => {
    const { tableId } = req.params as TTableIdParams;
    const table = await this.service.getTableById(tableId);

    res.json({
      data: table,
      message: "Table fetched successfully",
      status: "success",
    });
  };

  public updateTable = async (req: Request, res: Response): Promise<void> => {
    const { tableId } = req.params as TTableIdParams;
    const payload = req.body as TUpdateTableBody;
    const table = await this.service.updateTable(tableId, payload);

    res.json({
      data: table,
      message: "Table updated successfully",
      status: "success",
    });
  };

  public deleteTable = async (req: Request, res: Response): Promise<void> => {
    const { tableId } = req.params as TTableIdParams;

    await this.service.deleteTable(tableId);

    res.json({
      message: "Table deleted successfully",
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

  public updateFloorLayout = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { floorId } = req.params as TFloorIdParams;
    const { items } = req.body as TUpdateFloorLayoutBody;
    const tables = await this.service.updateFloorLayout(floorId, items);

    res.json({
      data: tables,
      message: "Floor layout updated successfully",
      status: "success",
    });
  };
}
