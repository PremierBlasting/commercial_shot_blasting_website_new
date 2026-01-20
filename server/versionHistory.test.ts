import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-admin-openid",
    name: "Test Admin",
    email: "admin@test.com",
    loginMethod: "test",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "test-user-openid",
    name: "Test User",
    email: "user@test.com",
    loginMethod: "test",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createUnauthenticatedContext(): TrpcContext {
  return {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Version History", () => {
  let testVersionId: string;
  let testRecordId: number;

  beforeAll(() => {
    testVersionId = `test-version-${Date.now()}`;
  });

  it("should create a new version history record", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.versionHistory.create({
      versionId: testVersionId,
      description: "Test version for automated testing",
      changesSummary: "Added version history feature\nFixed bugs\nImproved performance",
      createdBy: "Test Admin",
      screenshotUrl: "https://example.com/screenshot.png",
    });

    expect(result).toBeDefined();
    expect(result.versionId).toBe(testVersionId);
    expect(result.description).toBe("Test version for automated testing");
    expect(result.isCurrent).toBe(true); // Should be marked as current
    
    testRecordId = result.id;
  });

  it("should list all version history records", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const versions = await caller.versionHistory.listAll();

    expect(versions).toBeDefined();
    expect(Array.isArray(versions)).toBe(true);
    expect(versions.length).toBeGreaterThan(0);
    
    // Find our test version
    const testVersion = versions.find(v => v.versionId === testVersionId);
    expect(testVersion).toBeDefined();
    expect(testVersion?.description).toBe("Test version for automated testing");
  });

  it("should get version by ID", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const version = await caller.versionHistory.getById({ versionId: testVersionId });

    expect(version).toBeDefined();
    expect(version?.versionId).toBe(testVersionId);
    expect(version?.description).toBe("Test version for automated testing");
  });

  it("should create a second version and mark it as current", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const secondVersionId = `test-version-2-${Date.now()}`;
    const result = await caller.versionHistory.create({
      versionId: secondVersionId,
      description: "Second test version",
      createdBy: "Test Admin",
    });

    expect(result).toBeDefined();
    expect(result.isCurrent).toBe(true);

    // First version should no longer be current
    const firstVersion = await caller.versionHistory.getById({ versionId: testVersionId });
    expect(firstVersion?.isCurrent).toBe(false);
  });

  it("should mark a version as current", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.versionHistory.markAsCurrent({ versionId: testVersionId });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);

    // Verify it's marked as current
    const version = await caller.versionHistory.getById({ versionId: testVersionId });
    expect(version?.isCurrent).toBe(true);
  });

  it("should delete a version history record", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.versionHistory.delete({ id: testRecordId });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);

    // Verify it's deleted
    const version = await caller.versionHistory.getById({ versionId: testVersionId });
    expect(version).toBeUndefined();
  });

  it("should deny access to non-admin users", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.versionHistory.listAll()
    ).rejects.toThrow();
  });

  it("should deny access to unauthenticated users", async () => {
    const ctx = createUnauthenticatedContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.versionHistory.listAll()
    ).rejects.toThrow();
  });
});
