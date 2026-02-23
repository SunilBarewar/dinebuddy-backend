import { Router } from "express";

import adminRouter from "@/routes/admin";
import commonRouter from "@/routes/common";
import waiterRouter from "@/routes/waiter";

const router = Router();

router.use("/admin", adminRouter);
router.use("/waiter", waiterRouter);
router.use(commonRouter);

export default router;
