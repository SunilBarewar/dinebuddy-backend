import { Router } from "express";

import floorTableRouter from "@/routes/common/floor-table.routes";

const router = Router();

router.use(floorTableRouter);

export default router;
