import app from './Server';
import { logger } from './shared';

// Start the server
const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});
