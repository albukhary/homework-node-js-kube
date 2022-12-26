"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("express-async-errors");
const promClient = require("prom-client");
const app = express();
const register = new promClient.Registry();
register.setDefaultLabels({
    app: 'monitoring-article',
    uptime: process.uptime(),
    podname: process.env.HOSTNAME,
});
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register });
app.get('/metrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Content-Type', register.contentType);
    res.send(yield register.metrics());
}));
app.get('/', (req, res) => {
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
//# sourceMappingURL=index.js.map