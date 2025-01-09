"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchesPlayed = exports.updateCatScore = exports.getCats = void 0;
const catService = __importStar(require("../services/catService"));
const errors_1 = require("../utils/errors");
async function getCats(req, res, next) {
    try {
        const cats = await catService.getCats();
        res.status(200).json(cats);
    }
    catch (error) {
        if (error instanceof errors_1.NotFoundError) {
            res.status(404).json({ message: error.message });
        }
        else {
            next(error);
        }
    }
}
exports.getCats = getCats;
async function updateCatScore(req, res, next) {
    try {
        const { id } = req.params;
        if (!id) {
            throw new errors_1.BadRequestError('Cat ID is required');
        }
        const updatedCat = await catService.updateCatScore(id);
        res.status(200).json(updatedCat);
    }
    catch (error) {
        if (error instanceof errors_1.NotFoundError) {
            res.status(404).json({ message: error.message });
        }
        else if (error instanceof errors_1.BadRequestError) {
            res.status(400).json({ message: error.message });
        }
        else {
            next(error);
        }
    }
}
exports.updateCatScore = updateCatScore;
async function getMatchesPlayed(req, res, next) {
    try {
        const matchesPlayed = await catService.getMatchesPlayed();
        res.status(200).json(matchesPlayed);
    }
    catch (error) {
        if (error instanceof errors_1.NotFoundError) {
            res.status(404).json({ message: error.message });
        }
        else {
            next(error);
        }
    }
}
exports.getMatchesPlayed = getMatchesPlayed;
