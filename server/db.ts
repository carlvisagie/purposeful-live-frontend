import { eq, desc, and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users,
  diagnostics, InsertDiagnostic,
  coaches, InsertCoach,
  sessions, InsertSession,
  payments, InsertPayment,
  subscriptions, InsertSubscription,
  progressRecords, InsertProgressRecord,
  crisisAlerts, InsertCrisisAlert,
  notifications, InsertNotification,
  resources, InsertResource,
  analyticsEvents, InsertAnalyticsEvent
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============================================================================
// USER MANAGEMENT
// ============================================================================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }
    if (user.tier !== undefined) {
      values.tier = user.tier;
      updateSet.tier = user.tier;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(users).orderBy(desc(users.createdAt));
}

// ============================================================================
// DIAGNOSTICS
// ============================================================================

export async function createDiagnostic(diagnostic: InsertDiagnostic) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(diagnostics).values(diagnostic);
  return result;
}

export async function getDiagnosticsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(diagnostics).where(eq(diagnostics.userId, userId)).orderBy(desc(diagnostics.createdAt));
}

export async function getLatestDiagnostic(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(diagnostics).where(eq(diagnostics.userId, userId)).orderBy(desc(diagnostics.createdAt)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============================================================================
// COACHES
// ============================================================================

export async function createCoach(coach: InsertCoach) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(coaches).values(coach);
}

export async function getCoachById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(coaches).where(eq(coaches.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getCoachByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(coaches).where(eq(coaches.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllActiveCoaches() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(coaches).where(eq(coaches.isActive, true)).orderBy(desc(coaches.rating));
}

// ============================================================================
// SESSIONS
// ============================================================================

export async function createSession(session: InsertSession) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(sessions).values(session);
}

export async function getSessionById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(sessions).where(eq(sessions.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getSessionsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(sessions).where(eq(sessions.userId, userId)).orderBy(desc(sessions.startTime));
}

export async function getSessionsByCoachId(coachId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(sessions).where(eq(sessions.coachId, coachId)).orderBy(desc(sessions.startTime));
}

export async function updateSessionStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(sessions).set({ status: status as any }).where(eq(sessions.id, id));
}

// ============================================================================
// PAYMENTS & SUBSCRIPTIONS
// ============================================================================

export async function createPayment(payment: InsertPayment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(payments).values(payment);
}

export async function getPaymentsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(payments).where(eq(payments.userId, userId)).orderBy(desc(payments.createdAt));
}

export async function createSubscription(subscription: InsertSubscription) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(subscriptions).values(subscription);
}

export async function getActiveSubscription(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(subscriptions)
    .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, "active")))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============================================================================
// PROGRESS TRACKING
// ============================================================================

export async function createProgressRecord(record: InsertProgressRecord) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(progressRecords).values(record);
}

export async function getProgressRecordsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(progressRecords).where(eq(progressRecords.userId, userId)).orderBy(desc(progressRecords.createdAt));
}

// ============================================================================
// CRISIS ALERTS
// ============================================================================

export async function createCrisisAlert(alert: InsertCrisisAlert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(crisisAlerts).values(alert);
}

export async function getCrisisAlertsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(crisisAlerts).where(eq(crisisAlerts.userId, userId)).orderBy(desc(crisisAlerts.createdAt));
}

export async function getUnresolvedCrisisAlerts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(crisisAlerts).where(eq(crisisAlerts.status, "new")).orderBy(desc(crisisAlerts.createdAt));
}

export async function acknowledgeCrisisAlert(id: number, acknowledgedBy: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(crisisAlerts).set({
    status: "acknowledged",
    acknowledgedBy,
    acknowledgedAt: new Date()
  }).where(eq(crisisAlerts.id, id));
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export async function createNotification(notification: InsertNotification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(notifications).values(notification);
}

export async function getNotificationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt));
}

export async function markNotificationAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
}

// ============================================================================
// RESOURCES
// ============================================================================

export async function createResource(resource: InsertResource) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(resources).values(resource);
}

export async function getAllPublicResources() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(resources).where(eq(resources.isPublic, true)).orderBy(desc(resources.createdAt));
}

export async function getResourcesByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(resources).where(and(eq(resources.category, category), eq(resources.isPublic, true))).orderBy(desc(resources.createdAt));
}

// ============================================================================
// ANALYTICS
// ============================================================================

export async function trackEvent(event: InsertAnalyticsEvent) {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(analyticsEvents).values(event);
  } catch (error) {
    console.error("[Analytics] Failed to track event:", error);
  }
}

export async function getEventsByUserId(userId: number, limit: number = 100) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(analyticsEvents).where(eq(analyticsEvents.userId, userId)).orderBy(desc(analyticsEvents.createdAt)).limit(limit);
}
