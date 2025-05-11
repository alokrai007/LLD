import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import vehicleRoutes from './routes/vehicleRoutes';
import reservationRoutes from './routes/reservationRoutes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: config.corsOrigin
}));
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use(`${config.apiPrefix}/vehicles`, vehicleRoutes);
app.use(`${config.apiPrefix}/reservations`, reservationRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}`);
});

export default app; 