// require("dotenv").config();

// const express = require("express");
// const port = process.env.PORT;
// const app = express();
// const router = require("./routes");
// const cors = require("cors");

// app.use(express.json());
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }));

// app.use(cors());

// app.use(router);

// app.listen(port, () => {
//   console.log(`Server running on ${Date(Date.now)}`);
//   console.log(`Server listening on PORT: ${port}`);
// });

require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const adminRoutes = require("./routes/admin");
const inventoryRoutes = require("./routes/inventory");
const aplikasiRoutes = require("./routes/aplikasi");

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/aplikasi", aplikasiRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on ${new Date().toLocaleString()}`);
  console.log(`Server listening on PORT: ${port}`);
});

