"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middleware/auth.middleware.ts
var auth_middleware_exports = {};
__export(auth_middleware_exports, {
  default: () => auth_middleware_default
});
module.exports = __toCommonJS(auth_middleware_exports);
var import_jsonwebtoken = require("jsonwebtoken");
var validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Token n\xE3o fornecido" });
  }
  try {
    const decodedToken = (0, import_jsonwebtoken.verify)(authorization, "sua-chave-secreta");
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inv\xE1lido" });
  }
};
var auth_middleware_default = validateToken;
