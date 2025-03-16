// Importing: Dependencies.
import express from "express";
import helmet from "helmet";
import passport from "passport";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Importing: Routers.
import router from "./router";

// Importing: Middlewares.
import error from "./middlewares/error.middleware";
import ping from "./middlewares/ping.middleware";

// Importing: Configs.
import swaggerOptions from "./config/swagger";

// Defining: Core.
export default class Core {
  private app: express.Application;

  constructor(inputPort?: number) {
    // Setting up application.
    this.app = express();
    this.setApplication(this.app);

    const port = inputPort || process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  public getApplication() {
    return this.app;
  }

  private setApplication(application: express.Application) {
    // Initializing helmet.
    application.use(helmet.dnsPrefetchControl());
    application.use(helmet.frameguard());
    application.use(helmet.hidePoweredBy());
    application.use(helmet.hsts());
    application.use(helmet.ieNoOpen());
    application.use(helmet.noSniff());
    application.use(helmet.permittedCrossDomainPolicies());
    application.use(helmet.referrerPolicy());
    application.use(helmet.xssFilter());

    // Initalizing passport.
    application.use(passport.initialize());

    // Initializing express body parser.
    application.use(express.json());
    application.use(express.urlencoded({ extended: false }));

    // Setting up CORS Policy.
    application.use(cors());

    // Setting up routes.
    application.use("/ping", ping());
    application.use("/api", router);

    // Setting up swaggers docs.
    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    application.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Setting error handler.
    application.use(error());
  }
}
