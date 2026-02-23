export const TABLE_STATUSES = [
  "AVAILABLE",
  "RESERVED",
  "OCCUPIED",
  "INACTIVE",
] as const;

export const TABLE_SHAPES = ["SQUARE", "RECTANGLE", "ROUND", "CUSTOM"] as const;

export type TTableStatus = (typeof TABLE_STATUSES)[number];
export type TTableShape = (typeof TABLE_SHAPES)[number];

// ─── Floor ────────────────────────────────────────────────────────────────────

export interface ICreateFloorInput {
  branchId: string;
  name: string;
  displayOrder: number;
}

export interface IUpdateFloorInput {
  name?: string;
  displayOrder?: number;
}

export interface IReorderFloorInput {
  id: string;
  displayOrder: number;
}

// ─── Table ────────────────────────────────────────────────────────────────────

export interface ICreateTableInput {
  branchId: string;
  floorId: string;
  tableNumber: number;
  status: TTableStatus;
  posX: number;
  posY: number;
  shape: TTableShape;
}

export interface IUpdateTableInput {
  branchId?: string;
  floorId?: string;
  tableNumber?: number;
  status?: TTableStatus;
  posX?: number;
  posY?: number;
  shape?: TTableShape;
}

export interface ILayoutUpdateInput {
  tableId: string;
  posX: number;
  posY: number;
}
