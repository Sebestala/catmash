"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catService_1 = require("../services/catService");
async function initCats() {
    try {
        console.log('Initializing cats...');
        await (0, catService_1.createCats)();
        console.log('Cats initialized successfully');
    }
    catch (error) {
        console.error('Failed to initialize cats:', error);
    }
}
exports.default = initCats;
