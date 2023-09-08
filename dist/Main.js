"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const ServerApplication_1 = require("@application/ServerApplication");
(async () => {
    await runApplication();
})();
async function runApplication() {
    const serverApplication = ServerApplication_1.ServerApplication.new();
    await serverApplication.run();
}
//# sourceMappingURL=Main.js.map