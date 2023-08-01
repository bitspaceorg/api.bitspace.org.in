import { Module } from "../../libs/utils/types/module"
import express from "express";

const router = express.Router();

const BASE_ROUTE = "/timeline";

// GET
router.get("/", async () => {
});

// POST
router.post("/", async () => {
});

// PUT
router.put("/", async () => {
});

// DELETE
router.delete("/", async () => {
});

const MODULE: Module = {
    router,
    BASE_ROUTE
};

export default MODULE;
