import { Router } from "express";

import { AdminFloorTableController } from "@/controllers/floor-table/admin-floor-table.controller";
import { asyncHandler } from "@/utils/async-handler";
import { floorTableValidator } from "@/validators/floor-table.validator";

const router = Router();

const adminController = AdminFloorTableController.getInstance();

router.post(
  "/branches/:branchId/floors",
  floorTableValidator.validateCreateFloor,
  asyncHandler(adminController.createFloor),
);
router.get(
  "/branches/:branchId/floors",
  floorTableValidator.validateBranchIdParams,
  asyncHandler(adminController.getFloorsByBranch),
);
router.get(
  "/floors/:floorId",
  floorTableValidator.validateFloorIdParams,
  asyncHandler(adminController.getFloorById),
);
router.patch(
  "/floors/:floorId",
  floorTableValidator.validateUpdateFloor,
  asyncHandler(adminController.updateFloor),
);
router.delete(
  "/floors/:floorId",
  floorTableValidator.validateFloorIdParams,
  asyncHandler(adminController.deleteFloor),
);
router.patch(
  "/branches/:branchId/floors/reorder",
  floorTableValidator.validateReorderFloors,
  asyncHandler(adminController.reorderFloors),
);

router.post(
  "/floors/:floorId/tables",
  floorTableValidator.validateCreateTable,
  asyncHandler(adminController.createTable),
);
router.get(
  "/floors/:floorId/tables",
  floorTableValidator.validateFloorIdParams,
  asyncHandler(adminController.getTablesByFloor),
);
router.get(
  "/tables/:tableId",
  floorTableValidator.validateTableIdParams,
  asyncHandler(adminController.getTableById),
);
router.patch(
  "/tables/:tableId",
  floorTableValidator.validateUpdateTable,
  asyncHandler(adminController.updateTable),
);
router.delete(
  "/tables/:tableId",
  floorTableValidator.validateTableIdParams,
  asyncHandler(adminController.deleteTable),
);
router.patch(
  "/tables/:tableId/status",
  floorTableValidator.validateUpdateTableStatus,
  asyncHandler(adminController.updateTableStatus),
);
router.patch(
  "/floors/:floorId/tables/layout",
  floorTableValidator.validateUpdateFloorLayout,
  asyncHandler(adminController.updateFloorLayout),
);

export default router;
