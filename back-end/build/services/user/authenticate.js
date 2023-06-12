"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/user/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  AuthenticateService: () => AuthenticateService
});
module.exports = __toCommonJS(authenticate_exports);
var import_bcryptjs = require("bcryptjs");

// src/services/errors/invalid-credentials-error.ts
var InvalidCredentialError = class extends Error {
  constructor() {
    super("Invalid Credential");
  }
};

// src/utils/jwt.utils.ts
var jwt = __toESM(require("jsonwebtoken"));
var import_config = require("dotenv/config");
var createToken = (email) => {
  const token = jwt.sign({ email }, `${process.env.TOKEN_SECRET}`, {
    expiresIn: "1d",
    algorithm: "HS256"
  });
  return token;
};
var validateToken = (token) => {
  if (!token) {
    return { type: 401, message: "Token not found" };
  }
  try {
    const data = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    return { type: null, message: data };
  } catch (error) {
    return { type: 401, message: "Invalid token" };
  }
};
var decodeToken = (token) => {
  const decode2 = jwt.decode(token);
  return { decode: decode2 };
};
var jwt_utils_default = { validateToken, createToken, decodeToken };

// src/services/user/authenticate.ts
var AuthenticateService = class {
  constructor(usersRepositories) {
    this.usersRepositories = usersRepositories;
    this.authenticate = async ({ email, password }) => {
      const user = await this.usersRepositories.findByEmail(email);
      if (!user) {
        throw new InvalidCredentialError();
      }
      const validatePassword = await (0, import_bcryptjs.compare)(password, user.password);
      if (!validatePassword) {
        throw new InvalidCredentialError();
      }
      const token = jwt_utils_default.createToken(email);
      return { token };
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateService
});
