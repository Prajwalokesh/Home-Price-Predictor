const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === "/") {
    res.setHeader("Contene-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete coding</title></head>");
    res.write("<body><h1>Welcome to home page</h1></body>");
    res.write("</html>");
    return res.end();
  } else if (req.url === "/products") {
    res.setHeader("Contene-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete coding</title></head>");
    res.write("<body><h1>you areat products page</h1></body>");
    res.write("</html>");
    return res.end();
  } else {
    res.setHeader("Contene-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete coding</title></head>");
    res.write("<body><h1>LIKE / SHARE / SUBSCRIDE</h1></body>");
    res.write("</html>");
     return res.end();
  }
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on address http://localhost:${PORT}`);
});

