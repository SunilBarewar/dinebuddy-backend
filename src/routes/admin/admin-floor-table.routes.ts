import { Router } from "express";

import { AdminFloorTableController } from "@/controllers/floor-table/admin-floor-table.controller";
import { asyncHandler } from "@/utils/async-handler";
import {
  validateBranchIdParams,
  validateCreateFloor,
  validateCreateTable,
  validateFloorIdParams,
  validateReorderFloors,
  validateTableIdParams,
  validateUpdateFloor,
  validateUpdateFloorLayout,
  validateUpdateTable,
  validateUpdateTableStatus,
} from "@/validators/floor-table.validator";

const router = Router();

const adminController = AdminFloorTableController.getInstance();

router.post(
  "/branches/:branchId/floors",
  validateCreateFloor,
  asyncHandler(adminController.createFloor),
);
router.get(
  "/branches/:branchId/floors",
  validateBranchIdParams,
  asyncHandler(adminController.getFloorsByBranch),
);
router.get(
  "/floors/:floorId",
  validateFloorIdParams,
  asyncHandler(adminController.getFloorById),
);
router.patch(
  "/floors/:floorId",
  validateUpdateFloor,
  asyncHandler(adminController.updateFloor),
);
router.delete(
  "/floors/:floorId",
  validateFloorIdParams,
  asyncHandler(adminController.deleteFloor),
);
router.patch(
  "/branches/:branchId/floors/reorder",
  validateReorderFloors,
  asyncHandler(adminController.reorderFloors),
);

router.post(
  "/floors/:floorId/tables",
  validateCreateTable,
  asyncHandler(adminController.createTable),
);
router.get(
  "/floors/:floorId/tables",
  validateFloorIdParams,
  asyncHandler(adminController.getTablesByFloor),
);
router.get(
  "/tables/:tableId",
  validateTableIdParams,
  asyncHandler(adminController.getTableById),
);
router.patch(
  "/tables/:tableId",
  validateUpdateTable,
  asyncHandler(adminController.updateTable),
);
router.delete(
  "/tables/:tableId",
  validateTableIdParams,
  asyncHandler(adminController.deleteTable),
);
router.patch(
  "/tables/:tableId/status",
  validateUpdateTableStatus,
  asyncHandler(adminController.updateTableStatus),
);
router.patch(
  "/floors/:floorId/tables/layout",
  validateUpdateFloorLayout,
  asyncHandler(adminController.updateFloorLayout),
);

export default router;
