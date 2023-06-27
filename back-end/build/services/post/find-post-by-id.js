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

// src/services/post/find-post-by-id.ts
var find_post_by_id_exports = {};
__export(find_post_by_id_exports, {
  FIndByIdPost: () => FIndByIdPost
});
module.exports = __toCommonJS(find_post_by_id_exports);

// src/services/errors/resource-not-found.error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource Not Found");
  }
};

// src/services/post/find-post-by-id.ts
var FIndByIdPost = class {
  constructor(postsRepositories) {
    this.postsRepositories = postsRepositories;
    this.findPostById = async ({ id }) => {
      const findPost = await this.postsRepositories.findById(id);
      if (!findPost) {
        throw new ResourceNotFoundError();
      }
      return { findPost };
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FIndByIdPost
});
