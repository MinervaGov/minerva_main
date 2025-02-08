/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as Decisions from "../Decisions.js";
import type * as Proposals from "../Proposals.js";
import type * as Subscriptions from "../Subscriptions.js";
import type * as agents from "../agents.js";
import type * as userAgentFollow from "../userAgentFollow.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  Decisions: typeof Decisions;
  Proposals: typeof Proposals;
  Subscriptions: typeof Subscriptions;
  agents: typeof agents;
  userAgentFollow: typeof userAgentFollow;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
