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

// src/services/user/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  AuthenticateService: () => AuthenticateService
});
module.exports = __toCommonJS(authenticate_exports);
var import_bcryptjs = require("bcryptjs");

// src/services/errors/invalid-credentials-error.ts
var invalidCredentialError = class extends Error {
  constructor() {
    super("Invalid Credential");
  }
};

// src/services/user/authenticate.ts
var AuthenticateService = class {
  constructor(usersRepositories) {
    this.usersRepositories = usersRepositories;
    this.authenticate = async ({ email, password }) => {
      const user = await this.usersRepositories.findByEmail(email);
      if (!user) {
        throw new invalidCredentialError();
      }
      const validatePassword = await (0, import_bcryptjs.compare)(password, user.password);
      if (!validatePassword) {
        throw new invalidCredentialError();
      }
      return { user };
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateService
});
