import { Router } from "express";

import adminFloorTableRouter from "@/routes/admin/admin-floor-table.routes";

const router = Router();

router.use(adminFloorTableRouter);

export default router;
