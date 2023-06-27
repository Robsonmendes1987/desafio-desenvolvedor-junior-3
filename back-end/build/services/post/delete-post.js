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

// src/services/post/delete-post.ts
var delete_post_exports = {};
__export(delete_post_exports, {
  DeleteDataPost: () => DeleteDataPost
});
module.exports = __toCommonJS(delete_post_exports);
var DeleteDataPost = class {
  constructor(postsRepositories) {
    this.postsRepositories = postsRepositories;
    this.delete = async ({ id }) => {
      const findPost = await this.postsRepositories.findById(id);
      if (!findPost) {
        return {
          type: 400,
          message: "Nao foi possivel excluir, Post nao encontrado"
        };
      }
      await this.postsRepositories.destroy(id);
      return { type: 204, message: "Post Excluido Com Sucesso" };
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteDataPost
});
