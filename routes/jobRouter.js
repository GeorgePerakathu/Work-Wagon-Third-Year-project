import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  getSpecJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

// router.get('/', getAllJobs);
// router.post('/', createJob);

import { validateJobInput } from "../middleware/validationMiddleware.js";

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router.route("/spec").get(getSpecJob);
router
  .route("/:id")
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);
  export default router;