import { logger } from "./logger";
import i18n from "./i18n";
export const llog = {
  info: (m:any, meta?:any)=> logger.info(typeof m==="string"? i18n.t(m) || m : m, meta),
  debug: (m:any, meta?:any)=> logger.debug(typeof m==="string"? i18n.t(m) || m : m, meta),
  warn: (m:any, meta?:any)=> logger.warn(typeof m==="string"? i18n.t(m) || m : m, meta),
  error: (m:any, meta?:any)=> logger.error(typeof m==="string"? i18n.t(m) || m : m, meta),
};
export default llog;
