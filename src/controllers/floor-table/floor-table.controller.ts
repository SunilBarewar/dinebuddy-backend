import { FloorTableService } from "@/services/floor-table.service";
import httpStatus from "http-status";
import { sendSuccessResponse } from "@/utils/response-formatter";
import type { TUserFloorTableController as TController } from "@/validators/floor-table.validator";

export class FloorTableController {
  private static instance: FloorTableController | null = null;

  private readonly service = new FloorTableService();

  private constructor() {}

  public static getInstance(): FloorTableController {
    const instance = (FloorTableController.instance ??=
      new FloorTableController());

    return instance;
  }

  public getFloorsByBranch: TController["getFloorsByBranch"] = async (
    req,
    res,
  ) => {
    const { branchId } = req.params;
    const floors = await this.service.getFloorsByBranch(branchId);

    sendSuccessResponse(res, httpStatus.OK, {
      data: floors,
      message: "Floors fetched successfully",
    });
  };

  public getTablesByFloor: TController["getTablesByFloor"] = async (
    req,
    res,
  ) => {
    const { floorId } = req.params;
    const tables = await this.service.getTablesByFloor(floorId);

    sendSuccessResponse(res, httpStatus.OK, {
      data: tables,
      message: "Tables fetched successfully",
    });
  };

  public getBranchFloorPlan: TController["getBranchFloorPlan"] = async (
    req,
    res,
  ) => {
    const { branchId } = req.params;
    const floorPlan = await this.service.getBranchFloorPlan(branchId);

    return sendSuccessResponse(res, httpStatus.OK, {
      data: floorPlan,
      message: "Branch floor plan fetched successfully",
    });
  };

  public getTableById: TController["getTableById"] = async (req, res) => {
    const { tableId } = req.params;
    const table = await this.service.getTableById(tableId);

    sendSuccessResponse(res, httpStatus.OK, {
      data: table,
      message: "Table fetched successfully",
    });
  };

  public getAvailableTablesByBranch: TController["getAvailableTablesByBranch"] =
    async (req, res) => {
      const { branchId } = req.params;
      const tables = await this.service.getAvailableTablesByBranch(branchId);

      return sendSuccessResponse(res, httpStatus.OK, {
        data: tables,
        message: "Available tables fetched successfully",
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
}
