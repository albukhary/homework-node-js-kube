import * as express from 'express';
import 'express-async-errors';
import * as promClient from 'prom-client';

const app = express();
const register = new promClient.Registry();
register.setDefaultLabels({
  app: 'monitoring-article',
  uptime: process.uptime(),
  podname: process.env.HOSTNAME,
});
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register })

app.get('/metrics', async (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.get('/', (req: express.Request, res: express.Response) => {
  const response = {
    hostname: req.hostname,
    uptime: process.uptime(),
    podname: process.env.HOSTNAME,
  };

  res.status(200).send(response);
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
