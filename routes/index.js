const ticketRoutes = require("./ticket");

const constructorMethod = (app) => {
  app.use("/tickets", ticketRoutes.router);
  app.use("*", (req, res) => {
    res.render("tickets/error", {
      title: "Error",
      httpStatusCode: "404",
      httpErrorName: "page not found",
      errorMessage: "",
    });
  });
};

module.exports = constructorMethod;
