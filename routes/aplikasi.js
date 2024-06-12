const router = require("express").Router();

const Aplikasi = require("../controller/aplikasiController");

const Uploader = require("../middleware/uploaders");

//API
router.post(
    "/",
    Uploader.single("image"),
    Aplikasi.createAplikasi);
router.get("/", Aplikasi.findAllAplikasi);
router.put("/:id",
     Uploader.single("image"),
    Aplikasi.updateAplikasi);
router.get("/:id", Aplikasi.findAplikasiById);
router.delete("/:id", Aplikasi.deleteAplikasi)


module.exports = router;