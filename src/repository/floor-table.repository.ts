import prisma from "@/lib/prisma-client";
import type {
  ICreateFloorInput,
  ICreateTableInput,
  ILayoutUpdateInput,
  IReorderFloorInput,
  IUpdateFloorInput,
  IUpdateTableInput,
  TTableStatus,
} from "@/types/floor-table.types";

export class FloorTableRepository {
  public async findBranchById(branchId: string) {
    return prisma.branch.findUnique({
      where: { id: branchId },
    });
  }

  public async createFloor(input: ICreateFloorInput) {
    return prisma.floor.create({
      data: input,
    });
  }

  public async findFloorsByBranchId(branchId: string) {
    return prisma.floor.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
      where: { branchId },
    });
  }

  public async findFloorById(floorId: string) {
    return prisma.floor.findUnique({
      where: { id: floorId },
    });
  }

  public async updateFloor(floorId: string, input: IUpdateFloorInput) {
    return prisma.floor.update({
      data: input,
      where: { id: floorId },
    });
  }

  public async deleteFloor(floorId: string) {
    return prisma.floor.delete({
      where: { id: floorId },
    });
  }

  public async reorderFloors(branchId: string, input: IReorderFloorInput[]) {
    const updates = input.map((item) =>
      prisma.floor.updateMany({
        data: { displayOrder: item.displayOrder },
        where: { branchId, id: item.id },
      }),
    );

    await prisma.$transaction(updates);
  }

  public async createTable(input: ICreateTableInput) {
    return prisma.table.create({
      data: input,
    });
  }

  public async findTablesByFloorId(floorId: string) {
    return prisma.table.findMany({
      orderBy: { tableNumber: "asc" },
      where: { floorId },
    });
  }

  public async findTableById(tableId: string) {
    return prisma.table.findUnique({
      where: { id: tableId },
    });
  }

  public async updateTable(tableId: string, input: IUpdateTableInput) {
    return prisma.table.update({
      data: input,
      where: { id: tableId },
    });
  }

  public async deleteTable(tableId: string) {
    return prisma.table.delete({
      where: { id: tableId },
    });
  }

  public async updateTableStatus(tableId: string, status: TTableStatus) {
    return prisma.table.update({
      data: { status },
      where: { id: tableId },
    });
  }

  public async updateTablesLayout(
    floorId: string,
    input: ILayoutUpdateInput[],
  ) {
    const updates = input.map((item) =>
      prisma.table.updateMany({
        data: { posX: item.posX, posY: item.posY },
        where: { floorId, id: item.tableId },
      }),
    );

    await prisma.$transaction(updates);
  }

  public async findBranchFloorPlan(branchId: string) {
    return prisma.branch.findUnique({
      include: {
        floors: {
          include: {
            tables: {
              orderBy: { tableNumber: "asc" },
            },
          },
          orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
        },
      },
      where: { id: branchId },
    });
  }

  public async findAvailableTablesByBranchId(branchId: string) {
    return prisma.table.findMany({
      include: {
        floor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [{ floorId: "asc" }, { tableNumber: "asc" }],
      where: {
        branchId,
        status: "AVAILABLE",
      },
    });
  }
}

export const floorTableRepository = new FloorTableRepository();
