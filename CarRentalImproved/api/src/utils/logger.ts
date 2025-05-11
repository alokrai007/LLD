import winston from 'winston';
import { config } from '../config';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
    level: config.logLevel,
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

if (config.nodeEnv !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(
            colorize(),
            logFormat
        )
    }));
} 