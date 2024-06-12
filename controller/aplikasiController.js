const httpStatus = require("http-status");
const { aplikasi } = require("../models");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const imagekit = require("../lib/imageKit");

// Create New Aplikasi
const createAplikasi = catchAsync(async (req, res) => {
    const { name, code, price, description } = req.body;
    const file = req.file;

    const validFormat =
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/gif";
  if (!validFormat) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Wrong Image Format");
  }

    // Get file extension
    const split = file.originalname.split(".");
    const ext = split[split.length - 1];

    // Upload file to imagekit
    const img = await imagekit.upload({
        file: file.buffer, // required
        fileName: `IMG-${Date.now()}.${ext}`,
    });

    // Create new aplikasi
    const newAplikasi = await aplikasi.create({
        name,
        code,
        price,
        image: img.url,
        description
    });

    res.status(201).json({
        status: "success",
        data: {
            aplikasi: newAplikasi
        },
    });
});

// Update Aplikasi
const updateAplikasi = catchAsync(async (req, res) => {
    const { name, code, price, description } = req.body;
    const id = req.params.id;
    const file = req.file;

    const aplikasis = await aplikasi.findByPk(id);

    if (!aplikasis) {
        throw new ApiError(httpStatus.NOT_FOUND, `Data with id ${id} is not found`);
    }

    const updateData = { name, code, price, description };

    // If there's a file, validate and upload
    if (file) {
        const validFormats = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
        if (!validFormats.includes(file.mimetype)) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Wrong Image Format");
        }

        const split = file.originalname.split(".");
        const ext = split[split.length - 1];

        const img = await imagekit.upload({
            file: file.buffer,
            fileName: `IMG-${Date.now()}.${ext}`,
        });

        updateData.image = img.url;
    }

    await aplikasi.update(updateData, { where: { id } });

    res.status(200).json({
        status: "Success",
        data: updateData,
    });
});

// Get All Data Aplikasi
const findAllAplikasi = catchAsync(async (req, res) => {
    const aplikasis = await aplikasi.findAll();
    res.status(200).json({
        status: "Success",
        data: {
            aplikasis,
        },
    });
});

// Get Data Aplikasi By ID
const findAplikasiById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const aplikasis = await aplikasi.findByPk(id);

    if (!aplikasis) {
        throw new ApiError(httpStatus.NOT_FOUND, `id ${id} is not found`);
    }

    res.status(200).json({
        status: "Success",
        data: {
            aplikasis
        }
    });
});

// Delete Data Aplikasi
const deleteAplikasi = catchAsync(async (req, res) => {
    const id = req.params.id;

    const aplikasis = await aplikasi.findByPk(id);

    if (!aplikasis) {
        throw new ApiError(httpStatus.NOT_FOUND, `id ${id} is not found`);
    }

    await aplikasi.destroy({ where: { id } });

    res.status(200).json({
        status: "Success",
        message: `List Aplikasi dengan id ${id} terhapus`,
    });
});

module.exports = {
    createAplikasi,
    updateAplikasi,
    findAllAplikasi,
    findAplikasiById,
    deleteAplikasi
};
