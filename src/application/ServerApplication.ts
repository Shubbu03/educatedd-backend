import { RootModule } from "@application/di/.RootModule";
import { ApiServerConfig } from "@infrastructure/config/ApiServerConfig";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import cors from "cors";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import express from "express";

export class ServerApplication {
  private readonly host: string = ApiServerConfig.HOST;

  private readonly port: number = ApiServerConfig.PORT;

  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(RootModule);

    app.use(
      cors({
        origin: "*",
      })
    );

    // app.use("/uploadedFiles", express.static("dist"));

    // const path = require("path");
    // const x = path.join("dist", "uploadedFiles");
    // const newPath = express.static(x);
    app.use("/files", express.static('dist/'));

    // console.log("new path::", newPath.name);
    // console.log("PATH::::",app.use("/uploadedFiles", express.static(path.join("dist","uploadedFiles"))));

    this.buildAPIDocumentation(app);
    this.log();

    await app.listen(this.port, this.host);
  }

  private buildAPIDocumentation(app: NestExpressApplication): void {
    const title: string = "Educatedd";
    const description: string = "Educatedd API documentation";
    const version: string = "1.0.0";

    const options: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth({
        type: "apiKey",
        in: "header",
        name: ApiServerConfig.ACCESS_TOKEN_HEADER,
      })
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup("documentation", app, document);
  }

  private log(): void {
    Logger.log(
      `Server started on host: ${this.host}; port: ${this.port};`,
      ServerApplication.name
    );
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
