import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { executeRoute } from './routes/execute';
import { proveRoute } from './routes/prove';
import { verifyRoute } from './routes/verify';

const startServer = (port = 3000) => {
  new Elysia({
    serve: {
      development: false,
    },
  })
    .use(
      swagger({
        path: '/swagger',
        documentation: {
          info: {
            title: 'ZK Circuit Server',
            version: '1.0.0',
            description: 'Endpoints for circuit execution and proof generation',
          },
        },
      }),
    )
    .use(verifyRoute)
    .use(executeRoute)
    .use(proveRoute)
    .listen(port);

  console.log(`🦊 Worker ${process.pid} listening on http://localhost:${port}`);
  console.log(`📜 Swagger UI at http://localhost:${port}/swagger`);
};

startServer(3000);
