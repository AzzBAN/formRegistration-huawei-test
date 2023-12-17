import log from "loglevel";
import moment from "moment";

export function SetUpLog() {
  var originalFactory = log.methodFactory;
  log.methodFactory = (methodName, logLevel, loggerName) => {
    var rawMethod = originalFactory(methodName, logLevel, loggerName);
    return function (message) {
      let currentDate = moment().format();
      rawMethod(`[${methodName} ${currentDate}] ${message}`);
    };
  };
  log.setLevel((process.env.LOG_LEVEL as log.LogLevelDesc) || "warn");
}
