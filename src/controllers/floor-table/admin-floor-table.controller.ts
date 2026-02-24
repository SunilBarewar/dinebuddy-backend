import { FloorTableService } from "@/services/floor-table.service";
import { sendSuccessResponse } from "@/utils/response-formatter";
import httpStatus from "http-status";
import type { TAdminFloorTableController as TController } from "@/validators/floor-table.validator";

export class AdminFloorTableController {
  private static instance: AdminFloorTableController | null = null;

  private readonly service = new FloorTableService();

  private constructor() {}

  public static getInstance(): AdminFloorTableController {
    const instance = (AdminFloorTableController.instance ??=
      new AdminFloorTableController());

    return instance;
  }

  public createFloor: TController["createFloor"] = async (req, res) => {
    const { branchId } = req.params;
    const { displayOrder, name } = req.body;

    const floor = await this.service.createFloor({
      branchId,
      displayOrder,
      name,
    });

    sendSuccessResponse(res, httpStatus.CREATED, {
      data: floor,
      message: "Floor created successfully",
    });
  };

  public getFloorsByBranch: TController["getFloorsByBranch"] = async (
    req,
    res,
  ) => {
    const { branchId } = req.params;
    const floors = await this.service.getFloorsByBranch(branchId);

    sendSuccessResponse(res, 200, {
      data: floors,
      message: "Floors fetched successfully",
    });
  };

  public getFloorById: TController["getFloorById"] = async (req, res) => {
    const { floorId } = req.params;
    const floor = await this.service.getFloorById(floorId);

    sendSuccessResponse(res, httpStatus.OK, {
      data: floor,
      message: "Floor fetched successfully",
    });
  };

  public updateFloor: TController["updateFloor"] = async (req, res) => {
    const { floorId } = req.params;
    const payload = req.body;
    const floor = await this.service.updateFloor(floorId, payload);

    sendSuccessResponse(res, 200, {
      data: floor,
      message: "Floor updated successfully",
    });
  };

  public deleteFloor: TController["deleteFloor"] = async (req, res) => {
    const { floorId } = req.params;

    await this.service.deleteFloor(floorId);

    sendSuccessResponse(res, httpStatus.OK, {
      message: "Floor deleted successfully",
    });
  };

  public reorderFloors: TController["reorderFloors"] = async (req, res) => {
    const { branchId } = req.params;
    const { items } = req.body;
    const floors = await this.service.reorderFloors(branchId, items);

    sendSuccessResponse(res, httpStatus.OK, {
      data: floors,
      message: "Floors reordered successfully",
    });
  };

  public createTable: TController["createTable"] = async (req, res) => {
    const { floorId } = req.params;
    const { branchId, posX, posY, shape, status, tableNumber } = req.body;

    const table = await this.service.createTable({
      branchId,
      floorId,
      posX,
      posY,
      shape,
      status,
      tableNumber,
    });

    sendSuccessResponse(res, httpStatus.CREATED, {
      data: table,
      message: "Table created successfully",
    });
  };

  public getTablesByFloor: TController["getTablesByFloor"] = async (
    req,
    res,
  ): Promise<void> => {
    const { floorId } = req.params;
    const tables = await this.service.getTablesByFloor(floorId);

    sendSuccessResponse(res, httpStatus.OK, {
      data: tables,
      message: "Tables fetched successfully",
    });
  };

  public getTableById: TController["getTableById"] = async (
    req,
    res,
  ): Promise<void> => {
    const { tableId } = req.params;
    const table = await this.service.getTableById(tableId);

    sendSuccessResponse(res, httpStatus.OK, {
      data: table,
      message: "Table fetched successfully",
    });
  };

  public updateTable: TController["updateTable"] = async (req, res) => {
    const { tableId } = req.params;
    const payload = req.body;
    const table = await this.service.updateTable(tableId, payload);

    return sendSuccessResponse(res, httpStatus.OK, {
      data: table,
      message: "Table updated successfully",
    });
  };

  public deleteTable: TController["deleteTable"] = async (req, res) => {
    const { tableId } = req.params;

    await this.service.deleteTable(tableId);

    sendSuccessResponse(res, httpStatus.OK, {
      message: "Table deleted successfully",
    });
  };

  public updateTableStatus: TController["updateTableStatus"] = async (
    req,
    res,
  ) => {
    const { tableId } = req.params;
    const { status } = req.body;
    const table = await this.service.updateTableStatus(tableId, status);

    return sendSuccessResponse(res, httpStatus.OK, {
      data: table,
      message: "Table status updated successfully",
    });
  };

  public updateFloorLayout: TController["updateFloorLayout"] = async (
    req,
    res,
  ) => {
    const { floorId } = req.params;
    const { items } = req.body;
    const tables = await this.service.updateFloorLayout(floorId, items);

    return sendSuccessResponse(res, httpStatus.OK, {
      data: tables,
      message: "Floor layout updated successfully",
    });
  };
}
