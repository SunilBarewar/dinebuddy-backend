import { Router } from "express";

import { FloorTableController } from "@/controllers/floor-table";
import { asyncHandler } from "@/utils/async-handler";
import {
  validateBranchIdParams,
  validateFloorIdParams,
  validateTableIdParams,
  validateUpdateTableStatus,
} from "@/validators/floor-table.validator";

const router = Router();

const controller = FloorTableController.getInstance();

router.get(
  "/branches/:branchId/floors",
  validateBranchIdParams,
  asyncHandler(controller.getFloorsByBranch),
);
router.get(
  "/floors/:floorId/tables",
  validateFloorIdParams,
  asyncHandler(controller.getTablesByFloor),
);
router.get(
  "/branches/:branchId/floor-plan",
  validateBranchIdParams,
  asyncHandler(controller.getBranchFloorPlan),
);
router.get(
  "/tables/:tableId",
  validateTableIdParams,
  asyncHandler(controller.getTableById),
);
router.get(
  "/branches/:branchId/tables/available",
  validateBranchIdParams,
  asyncHandler(controller.getAvailableTablesByBranch),
);
router.patch(
  "/tables/:tableId/status",
  validateUpdateTableStatus,
  asyncHandler(controller.updateTableStatus),
);

export default router;
