const router = require("express").Router();
const { catchErrors } = require("../middlewares");
const {
  getPois,
  getPoi,
  createPoi,
  updatePoi,
  deletePoi,
} = require("../controllers/poi");

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
