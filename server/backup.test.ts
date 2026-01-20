import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

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

describe("Backup and Restore System", () => {
  let testBackupId: string;
  let testRecordId: number;

  it("should create a new backup", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.backup.create({
      description: "Test backup for automated testing",
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.backupId).toBeDefined();
    expect(result.fileUrl).toBeDefined();
    
    testBackupId = result.backupId;
  }, 30000); // Increase timeout for backup creation

  it("should list all backups", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const backups = await caller.backup.listAll();

    expect(backups).toBeDefined();
    expect(Array.isArray(backups)).toBe(true);
    expect(backups.length).toBeGreaterThan(0);
    
    // Find our test backup
    const testBackup = backups.find(b => b.backupId === testBackupId);
    expect(testBackup).toBeDefined();
    expect(testBackup?.description).toBe("Test backup for automated testing");
    expect(testBackup?.status).toBe("completed");
    
    if (testBackup) {
      testRecordId = testBackup.id;
    }
  });

  it("should get backup by ID", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const backup = await caller.backup.getById({ backupId: testBackupId });

    expect(backup).toBeDefined();
    expect(backup?.backupId).toBe(testBackupId);
    expect(backup?.description).toBe("Test backup for automated testing");
    expect(backup?.fileUrl).toBeDefined();
    expect(backup?.status).toBe("completed");
  });

  it("should download backup file", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.backup.download({ backupId: testBackupId });

    expect(result).toBeDefined();
    expect(result.fileUrl).toBeDefined();
    expect(typeof result.fileUrl).toBe("string");
    expect(result.fileUrl).toContain("http");
  });

  it("should validate backup file structure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const downloadResult = await caller.backup.download({ backupId: testBackupId });
    expect(downloadResult.fileUrl).toBeDefined();

    // Fetch and validate backup structure
    const response = await fetch(downloadResult.fileUrl);
    expect(response.ok).toBe(true);

    const backupData = await response.json();
    
    // Validate backup structure
    expect(backupData.version).toBeDefined();
    expect(backupData.timestamp).toBeDefined();
    expect(backupData.tables).toBeDefined();
    expect(backupData.metadata).toBeDefined();
    
    // Validate metadata
    expect(backupData.metadata.backupId).toBe(testBackupId);
    expect(backupData.metadata.description).toBe("Test backup for automated testing");
    expect(backupData.metadata.createdBy).toBe("Test Admin");
    
    // Validate tables structure
    expect(typeof backupData.tables).toBe("object");
    expect(Array.isArray(backupData.tables.users)).toBe(true);
    expect(Array.isArray(backupData.tables.gallery_items)).toBe(true);
    expect(Array.isArray(backupData.tables.blog_posts)).toBe(true);
  }, 15000);

  it("should restore from backup (test with empty restore)", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Note: This test validates the restore mechanism works
    // In production, you'd want to test with actual data restoration
    const result = await caller.backup.restore({ backupId: testBackupId });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.message).toBeDefined();
    expect(result.message).toContain("Restored");
    expect(result.message).toContain("tables");
  }, 30000);

  it("should delete a backup record", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.backup.delete({ id: testRecordId });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);

    // Verify it's deleted
    const backup = await caller.backup.getById({ backupId: testBackupId });
    expect(backup).toBeUndefined();
  });

  it("should deny access to non-admin users for listing backups", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.backup.listAll()
    ).rejects.toThrow();
  });

  it("should deny access to non-admin users for creating backups", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.backup.create({ description: "Unauthorized backup" })
    ).rejects.toThrow();
  });

  it("should deny access to non-admin users for restoring backups", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.backup.restore({ backupId: "fake-backup-id" })
    ).rejects.toThrow();
  });

  it("should deny access to unauthenticated users", async () => {
    const ctx = createUnauthenticatedContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.backup.listAll()
    ).rejects.toThrow();
  });

  it("should handle restore with non-existent backup", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.backup.restore({ backupId: "non-existent-backup-id" })
    ).rejects.toThrow();
  });

  it("should handle download with non-existent backup", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.backup.download({ backupId: "non-existent-backup-id" })
    ).rejects.toThrow();
  });
});
