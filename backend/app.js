const express = require("express");
const winston = require("winston");
const fs = require("fs").promises;

const app = express();
const port = process.env.PORT || 3000;

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console()
    ]
});

async function loadConfig() {
    let appPropertiesContent = "";
    try {
        appPropertiesContent = await fs.readFile("/etc/app/config/app.properties", "utf8");
    } catch (error) {
        logger.info("Datei /etc/app/config/app.properties nicht gefunden.");
    }

    let credentialsContent = "";
    try {
        credentialsContent = await fs.readFile("/etc/app/secrets/credentials.txt", "utf8");
    } catch (error) {
        logger.info("Datei /etc/app/secrets/credentials.txt nicht gefunden.");
    }

    const config = {
        PORT: port,
        GREETING_MESSAGE: process.env.GREETING_MESSAGE || "No greeting set",
        LOG_LEVEL: process.env.LOG_LEVEL || "info",
        appProperties: appPropertiesContent.trim() || "No app properties",
        DB_PASSWORD: process.env.DB_PASSWORD ? "********" : "No database password set",
        RAW_DB_PASSWORD: process.env.DB_PASSWORD || "",
        API_KEY: process.env.API_KEY ? "********" : "No API key set",
        RAW_API_KEY: process.env.API_KEY || "",
        credentialsFileContent: credentialsContent.replace(/[\r\n]+/gm, "").includes(":") ? credentialsContent.split(":")[1].trim().replace(/^.|.$/g, "*") : "No credentials in file"
    };

    logger.level = config.LOG_LEVEL;
    logger.info("Konfiguration geladen:");
    logger.info(`  PORT: ${config.PORT}`);
    logger.info(`  GREETING_MESSAGE: ${config.GREETING_MESSAGE}`);
    logger.info(`  LOG_LEVEL: ${config.LOG_LEVEL}`);
    logger.info(`  App Properties: ${config.appProperties}`);
    logger.info(`  DB_PASSWORD: ${config.DB_PASSWORD}`);
    logger.info(`  API_KEY: ${config.API_KEY}`);
    logger.info(`  Credentials File Content: ${config.credentialsFileContent}`);

    app.get("/", (req, res) => {
        res.send(`Hallo! Konfiguration: ${config.GREETING_MESSAGE}, Log Level: ${config.LOG_LEVEL}`);
    });

    app.listen(port, () => {
        logger.info(`Server listening on port ${port}`);
    });
}

loadConfig();