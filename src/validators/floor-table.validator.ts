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

export const BranchIdParams = z.object({
  branchId: nonEmptyString,
});

export const FloorIdParams = z.object({
  floorId: nonEmptyString,
});

export const TableIdParams = z.object({
  tableId: nonEmptyString,
});

// ─── Body schemas ─────────────────────────────────────────────────────────────

export const CreateFloorBody = z.object({
  displayOrder: integer,
  name: nonEmptyString,
});

export const UpdateFloorBody = z.object({
  displayOrder: integer.optional(),
  name: nonEmptyString.optional(),
});

export const ReorderFloorsBody = z.object({
  items: z
    .array(
      z.object({
        displayOrder: integer,
        id: nonEmptyString,
      }),
    )
    .min(1),
});

export const CreateTableBody = z.object({
  branchId: nonEmptyString,
  posX: integer,
  posY: integer,
  shape: tableShape,
  status: tableStatus,
  tableNumber: integer,
});

export const UpdateTableBody = z.object({
  branchId: nonEmptyString.optional(),
  floorId: nonEmptyString.optional(),
  posX: integer.optional(),
  posY: integer.optional(),
  shape: tableShape.optional(),
  status: tableStatus.optional(),
  tableNumber: integer.optional(),
});

export const UpdateTableStatusBody = z.object({
  status: tableStatus,
});

export const UpdateFloorLayoutBody = z.object({
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

// export type TAdminFloorTableController = {
//   createFloor: [params: TBranchIdParams, body: TCreateFloorBody];
//   deleteFloor: [params: TFloorIdParams];
//   deleteTable: [params: TTableIdParams];
//   getFloorById: [params: TFloorIdParams];
//   getFloorsByBranch: [params: TBranchIdParams];
//   getTableById: [params: TTableIdParams];
//   getTablesByFloor: [params: TFloorIdParams];
//   reorderFloors: [params: TBranchIdParams, body: TReorderFloorsBody];
//   updateFloor: [params: TFloorIdParams, body: TUpdateFloorBody];
//   updateFloorLayout: [params: TFloorIdParams, body: TUpdateFloorLayoutBody];
//   updateTable: [params: TTableIdParams, body: TUpdateTableBody];
//   updateTableStatus: [params: TTableIdParams, body: TUpdateTableStatusBody];
// };

// ─── Middleware validators ────────────────────────────────────────────────────

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
