import { Injectable } from "@nestjs/common";
import { errorLogger, infoLogger, warnLogger } from "../../src/config/winston.config";

@Injectable()
export class LoggerService {
  logError(message: string, trace?: string) {
    errorLogger.error(message, trace);
  }

  logWarn(message: string, trace?: string) {
    warnLogger.warn(message, trace);
  }

  logInfo(message: string, trace?: string) {
    infoLogger.info(message, trace);
  }
}