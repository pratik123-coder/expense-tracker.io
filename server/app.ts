import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/bun';

// Route imports
import { expensesRoute } from './routes/expenses';
import { authRoute } from './routes/auth';
import { testRoute } from './routes/test';

const app = new Hono();

app.use('*', logger());

const apiRoutes = app
  .basePath('/api')
  .route('/expenses', expensesRoute)
  .route('/auth', authRoute)
  .route('/test',testRoute)

export type ApiRoutes = typeof apiRoutes;

// Serving Static files
app.get('*', serveStatic({ root: './frontend/dist' }));
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

export default app;
