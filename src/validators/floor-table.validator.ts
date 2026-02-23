import { validate } from "zod-express-validator";
import { z } from "zod";

import { TABLE_SHAPES, TABLE_STATUSES } from "@/types/floor-table.types";
import { onValidationError } from "@/utils/validation-error";

// ─── Primitive helpers ────────────────────────────────────────────────────────

const nonEmptyString = z.string().trim().min(1);
const integer = z.coerce.number().int();
const tableStatus = z.enum(TABLE_STATUSES);
const tableShape = z.enum(TABLE_SHAPES);

// ─── Param schemas ────────────────────────────────────────────────────────────

const BranchIdParams = z.object({
  branchId: nonEmptyString,
});

const FloorIdParams = z.object({
  floorId: nonEmptyString,
});

const TableIdParams = z.object({
  tableId: nonEmptyString,
});

// ─── Body schemas ─────────────────────────────────────────────────────────────

const CreateFloorBody = z.object({
  displayOrder: integer,
  name: nonEmptyString,
});

const UpdateFloorBody = z.object({
  displayOrder: integer.optional(),
  name: nonEmptyString.optional(),
});

const ReorderFloorsBody = z.object({
  items: z
    .array(
      z.object({
        displayOrder: integer,
        id: nonEmptyString,
      }),
    )
    .min(1),
});

const CreateTableBody = z.object({
  branchId: nonEmptyString,
  posX: integer,
  posY: integer,
  shape: tableShape,
  status: tableStatus,
  tableNumber: integer,
});

const UpdateTableBody = z.object({
  branchId: nonEmptyString.optional(),
  floorId: nonEmptyString.optional(),
  posX: integer.optional(),
  posY: integer.optional(),
  shape: tableShape.optional(),
  status: tableStatus.optional(),
  tableNumber: integer.optional(),
});

const UpdateTableStatusBody = z.object({
  status: tableStatus,
});

const UpdateFloorLayoutBody = z.object({
  items: z
    .array(
      z.object({
        posX: integer,
        posY: integer,
        tableId: nonEmptyString,
      }),
    )
    .min(1),
});

// ─── Inferred types ───────────────────────────────────────────────────────────

export type TBranchIdParams = z.infer<typeof BranchIdParams>;
export type TFloorIdParams = z.infer<typeof FloorIdParams>;
export type TTableIdParams = z.infer<typeof TableIdParams>;

export type TCreateFloorBody = z.infer<typeof CreateFloorBody>;
export type TUpdateFloorBody = z.infer<typeof UpdateFloorBody>;
export type TReorderFloorsBody = z.infer<typeof ReorderFloorsBody>;
export type TCreateTableBody = z.infer<typeof CreateTableBody>;
export type TUpdateTableBody = z.infer<typeof UpdateTableBody>;
export type TUpdateTableStatusBody = z.infer<typeof UpdateTableStatusBody>;
export type TUpdateFloorLayoutBody = z.infer<typeof UpdateFloorLayoutBody>;

// ─── Controller type map (for route-level type intellisense) ──────────────────

export const validateBranchIdParams = validate(
  { params: BranchIdParams },
  onValidationError,
);

export const validateFloorIdParams = validate(
  { params: FloorIdParams },
  onValidationError,
);

export const validateTableIdParams = validate(
  { params: TableIdParams },
  onValidationError,
);

export const validateCreateFloor = validate(
  {
    body: CreateFloorBody,
    params: BranchIdParams,
  },
  onValidationError,
);

export const validateUpdateFloor = validate(
  {
    body: UpdateFloorBody,
    params: FloorIdParams,
  },
  onValidationError,
);

export const validateReorderFloors = validate(
  {
    body: ReorderFloorsBody,
    params: BranchIdParams,
  },
  onValidationError,
);

export const validateCreateTable = validate(
  {
    body: CreateTableBody,
    params: FloorIdParams,
  },
  onValidationError,
);

export const validateUpdateTable = validate(
  {
    body: UpdateTableBody,
    params: TableIdParams,
  },
  onValidationError,
);

export const validateUpdateTableStatus = validate(
  {
    body: UpdateTableStatusBody,
    params: TableIdParams,
  },
  onValidationError,
);

export const validateUpdateFloorLayout = validate(
  {
    body: UpdateFloorLayoutBody,
    params: FloorIdParams,
  },
  onValidationError,
);

export const floorTableValidator = {
  validateBranchIdParams,
  validateFloorIdParams,
  validateTableIdParams,
  validateCreateFloor,
  validateUpdateFloor,
  validateReorderFloors,
  validateCreateTable,
  validateUpdateTable,
  validateUpdateTableStatus,
  validateUpdateFloorLayout,
};

export type TAdminFloorTableController = {
  createFloor: typeof validateCreateFloor;
  updateFloor: typeof validateUpdateFloor;
  deleteFloor: typeof validateFloorIdParams;
  getFloorById: typeof validateFloorIdParams;
  getFloorsByBranch: typeof validateBranchIdParams;
  createTable: typeof validateCreateTable;
  updateTable: typeof validateUpdateTable;
  deleteTable: typeof validateTableIdParams;
  getTableById: typeof validateTableIdParams;
  getTablesByFloor: typeof validateFloorIdParams;
  reorderFloors: typeof validateReorderFloors;
  updateTableStatus: typeof validateUpdateTableStatus;
  updateFloorLayout: typeof validateUpdateFloorLayout;
};

export type TUserFloorTableController = {
  getAvailableTablesByBranch: typeof validateBranchIdParams;
  getBranchFloorPlan: typeof validateBranchIdParams;
  getFloorsByBranch: typeof validateBranchIdParams;
  getTableById: typeof validateTableIdParams;
  getTablesByFloor: typeof validateFloorIdParams;
  updateTableStatus: typeof validateUpdateTableStatus;
};
