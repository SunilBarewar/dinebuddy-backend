import { Router } from "express";

import { FloorTableController } from "@/controllers/floor-table";
import { asyncHandler } from "@/utils/async-handler";
import { floorTableValidator } from "@/validators/floor-table.validator";

const router = Router();

const controller = FloorTableController.getInstance();

router.get(
  "/branches/:branchId/floors",
  floorTableValidator.validateBranchIdParams,
  asyncHandler(controller.getFloorsByBranch),
);
router.get(
  "/floors/:floorId/tables",
  floorTableValidator.validateFloorIdParams,
  asyncHandler(controller.getTablesByFloor),
);
router.get(
  "/branches/:branchId/floor-plan",
  floorTableValidator.validateBranchIdParams,
  asyncHandler(controller.getBranchFloorPlan),
);
router.get(
  "/tables/:tableId",
  floorTableValidator.validateTableIdParams,
  asyncHandler(controller.getTableById),
);
router.get(
  "/branches/:branchId/tables/available",
  floorTableValidator.validateBranchIdParams,
  asyncHandler(controller.getAvailableTablesByBranch),
);
router.patch(
  "/tables/:tableId/status",
  floorTableValidator.validateUpdateTableStatus,
  asyncHandler(controller.updateTableStatus),
);

export default router;
