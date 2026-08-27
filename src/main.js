const { createServer } = require("node:http");

const port = Number(process.env.PORT ?? 8000);

createServer((_request, response) => {
  response.statusCode = 200;
  response.setHeader("Cache-Control", "no-store");
  response.end();
}).listen(port);
