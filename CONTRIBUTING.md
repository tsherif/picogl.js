Reporting a Bug
===============
1. Search the [issue tracker](https://github.com/tsherif/picogl.js/issues) to make sure the bug hasn't already been reported.
2. Provide a detailed description of the problem, along with steps to reproduce.
3. Provide a [jsFiddle](https://jsfiddle.net/) demonstrating the problem.
4. Provide relevant system information: browser/version, OS/version, GPU/driver version. (This should all be available vis `chrome://gpu` in Chrome or `about:config` in Firefox).

Requesting a Feature
====================
1. Search the [issue tracker](https://github.com/tsherif/picogl.js/issues) to make sure the feature hasn't already been requested.
2. Describe the feature and a relevant use-case for it.

Contributing
============
1. Fork the repository.
2. Run `npm install` to install required development packages.
2. Create a branch with an appropriate name in your fork.
3. Maintain a similar style to the rest of the code. 
4. Make your updates.
5. Run `npm run build` and ensure that all examples in `/examples/` and all tests on `/test/index.html` function properly.
6. Run `git checkout build` to remove build files.
7. Commit your changes and push them to GitHub.
8. Make a pull request against master. 


**Please note the following:** 
- The scope of PicoGL.js is limited specifically to managing GL state, so features outside of that scope (math utilities, physics, scene data structures) will not be accepted.
- Requests for cosmetic changes will not be accepted. 
