const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on("console", msg => {
    console.log(msg.text());
  });

  await page.exposeFunction("puppeteer_runEnd", async (results) => {
    const passed = results.status === "passed"; 
    console.log(`Ran ${results.testCounts.total} tests...\n`);
    if (passed) {
        console.log("\u001b[32mAll tests passed!\u001b[0m\n");
    } else {
        const tests = results.tests;
        for (let i = 0; i < tests.length; ++i) {
            const assertions = tests[i].assertions;
            for (let j = 0; j < assertions.length; ++j) {
                const assertion = assertions[j];
                if (!assertion.passed) {
                    console.log(`\u001b[31mFailure:\u001b[0m ${assertion.message}`);
                    console.log(assertion.stack);
                    console.log("\n");
                }
            }
        }

        console.log(`\t\u001b[31m${results.testCounts.failed} tests failed.\u001b[0m\n\n`);
    }

    await browser.close();

    process.exit(passed ? 0 : 1);
  });

  await page.goto('http://localhost:5000/test/');
})();
