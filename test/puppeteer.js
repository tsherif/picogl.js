"use strict";

const puppeteer = require("puppeteer");
const http = require("http");
const fs = require("fs");
const path = require("path");

const PATH = "test/tests/";
const PORT = 7171;
const MIME_TYPES = {
    ".css": "text/css",
    ".html": "text/html",
    ".js": "text/javascript",
    ".json": "application/json"
};

const server = http.createServer((req, res) => {
    const url = req.url; 
    const requestPath = decodeURI(url.replace(/^\/+/, "").replace(/\?.*$/, ""));
    const filePath = path.resolve(".", requestPath);
    const mimeType = MIME_TYPES[path.extname(filePath)] || "application/octet-stream";

    fs.stat(filePath, (err, stat) => {
        if (stat && stat.isDirectory()) {
            fs.readFile(filePath + "/index.html", (err, content) => {
                res.setHeader("Content-Type", "text/html");
                res.end(content);
            });
        } else {
            fs.readFile(filePath, (err, content) => {
                res.setHeader("Content-Type", mimeType);
                res.end(content);
            });
        }
    });
}).listen(PORT);

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    page.on("console", msg => {
        console.log(msg.text());
    });

    await page.exposeFunction("puppeteer_runEnd", async (results) => {
        const tests = results.tests;
        let numAssertions = 0;
        for (let i = 0; i < tests.length; ++i) {
            const test = tests[i];
            const assertions = test.assertions;
            const count = assertions.length;
            numAssertions += count;
            if (test.status === "passed") {
                console.log(`\u001b[32mPass:\u001b[0m ${test.name}`);
            } else {
                for (let j = 0; j < count; ++j) {
                    const assertion = assertions[j];
                    if (!assertion.passed) {
                        console.log(`\n\u001b[31mFail:\u001b[0m ${test.name}: ${assertion.message}\n`);
                        console.log(assertion.stack);
                        console.log("\n");
                    }
                }
            }
        }
        console.log(`\nRan ${results.testCounts.total} tests (${numAssertions} assertions)...\n`);

        const passed = results.status === "passed";
        if (passed) {
            console.log("\u001b[32mAll tests passed!\u001b[0m\n");
        } else {
            console.log(`\t\u001b[31m${results.testCounts.failed} tests failed.\u001b[0m\n\n`);
        }

        await server.close();
        await browser.close();

        process.exit(passed ? 0 : 1);
    });

    await page.goto(`http://localhost:${PORT}/${PATH}`);

})();
