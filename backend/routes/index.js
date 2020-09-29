const router = require("express").Router();
const { catchErrors } = require("../middlewares");
const {
  getPois,
  getPoi,
  createPoi,
  updatePoi,
  deletePoi,
} = require("../controllers/poi");

const {
  getInfo,
  getEmployers,
  requestEmployer,
  updateUser,
} = require("../controllers/users");

const { getLog, createLog, deleteLog, getLogs } = require("../controllers/log");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

module.exports = router;

// ============== POI ================

router.get("/pois/", catchErrors(getPois));
router.get("/pois/:poiId", catchErrors(getPoi));
router.post("/pois/", catchErrors(createPoi));
router.put("/pois/:poiId", catchErrors(updatePoi));
router.delete("/pois/:poiId", catchErrors(deletePoi));

// ============== LOGS ================

router.get("/logs/", catchErrors(getLogs));
router.get("/logs/:logId", catchErrors(getLog));
router.post("/logs/:poiId", catchErrors(createLog));
router.delete("/logs/:logId", catchErrors(deleteLog));

// ================= USERS ================

router.get("/info", catchErrors(getInfo));
router.get("/employers", catchErrors(getEmployers));
router.get("/requestEmployer/:employerId", catchErrors(requestEmployer));
router.put("/users/:userId", catchErrors(updateUser));
