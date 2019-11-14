"use strict";

const puppeteer = require("puppeteer");
const pti = require("puppeteer-to-istanbul");
const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const glob = require("glob").sync;
const copydir = require("copy-dir").sync;
const rimraf = require("rimraf").sync;

let config = {
    outputDir: "test-results/",
    serverPort: 7171,
    tests: [],
    assetDir: null,
    excludeFiles: []
};

try {
    Object.assign(config, require(path.resolve(".", ".pico-testrc.json")));
    config.tests = config.tests || [];
    config.excludeFiles = config.excludeFiles || [];
    if (!Array.isArray(config.tests)) {
        config.tests = [ config.tests ];
    }
    if (!Array.isArray(config.excludeFiles)) {
        config.excludeFiles = [ config.excludeFiles ];
    }
} catch (e) {}

const OUTPUT_DIR = path.resolve(".", config.outputDir);
const ASSET_DIR = path.resolve(OUTPUT_DIR, "assets");
const COVERAGE_DIR = path.resolve(".", ".nyc_output");
const CWD = process.cwd();
const BASE_URL = `http://localhost:${config.serverPort}/`;
const MIME_TYPES = {
    ".css": "text/css",
    ".html": "text/html",
    ".js": "text/javascript",
    ".json": "application/json"
};
const EXCLUDE_REGEX = [];
config.coverageExcludeFiles.forEach(ex => {
    glob(ex).map(f => {
        const excludePath = path.resolve(".", f).replace(CWD, "");
        EXCLUDE_REGEX.push(new RegExp(`${excludePath}$`));
    }); 
});

const server = http.createServer(async (req, res) => {
    const url = req.url; 
    const requestPath = decodeURI(url.replace(/^\/+/, "").replace(/\?.*$/, ""));
    const filePath = path.resolve(".", requestPath);
    const mimeType = MIME_TYPES[path.extname(filePath)] || "application/octet-stream";

    const content = await fs.readFile(filePath);
    res.setHeader("Content-Type", mimeType);
    res.end(content);
}).listen(config.serverPort);

(async () => {
    const template = await fs.readFile("test/framework/index-template.html", "utf8");
    const testPaths = [];
    config.tests.forEach(t => {
        glob(t).map(f => {
            const modulePath = path.resolve(".", f).replace(CWD, "");
            testPaths.push(`import "${modulePath}";`);
        });
    });
    const index = template.replace("FRAMEWORK_IMPORTS", testPaths.join("\n"));

    rimraf(OUTPUT_DIR);
    rimraf(COVERAGE_DIR);
    await fs.mkdir(OUTPUT_DIR);
    await fs.writeFile(path.resolve(OUTPUT_DIR, "index.html"), index);

    if (config.assetDir) {
        await fs.mkdir(ASSET_DIR);
        copydir(path.resolve(".", config.assetDir), ASSET_DIR);
    }

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

        const jsCoverage = await page.coverage.stopJSCoverage();
        pti.write(jsCoverage.filter(item => {
            const url = item.url;
            if (url.match(/index\.html$/)) {
                return false;
            }

            let include = true;
            EXCLUDE_REGEX.forEach(ex => {
                if (url.match(ex)) {
                    include = false;
                }
            });

            return include; 
        }));

        await server.close();
        await browser.close();

        process.exit(passed ? 0 : 1);
    });

    await page.coverage.startJSCoverage();
    await page.goto(`${BASE_URL}${config.outputDir}/index.html`);
})();
