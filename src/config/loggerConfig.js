import { createLogger, format, transports} from "winston";
const {printf, errors, colorize } = format;

const entornoDeLogger = 'production'

//Los niveles de logging y color
const customLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5,
    },
    colors: {
        debug: 'cyan',
        http: 'blue',
        info: 'green',
        warning: 'yellow',
        error: 'red',
        fatal: 'magenta'
    }
  }


// Formato de los logs
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `[${level}]; ${stack || message} ${new Date().toLocaleString()} `;
});

// Logger para desarrollo
const devLogger = createLogger({
  levels: customLevels.levels,
  format:( 
    colorize(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console({
      level: 'debug',
    }),
  ],
});

// Logger para producción
const prodLogger = createLogger({
    levels: customLevels.levels,
    format: (
    colorize(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console({
      level: 'info',
    }),
    new transports.File({
        filename: './src/data/log/errors.log',
        level: 'error',
    }),
  ],
});

// Seleccionar logger basado en el entorno
const logger = entornoDeLogger === 'production' ? prodLogger : devLogger;

export default logger;