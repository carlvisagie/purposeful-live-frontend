import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Purposeful Live Coaching Platform Database Schema
 * Comprehensive schema for emotional resilience coaching platform
 */

// ============================================================================
// USERS & AUTHENTICATION
// ============================================================================

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "coach", "admin"]).default("user").notNull(),
  tier: mysqlEnum("tier", ["basic", "professional", "enterprise"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================================================
// DIAGNOSTICS & ASSESSMENTS
// ============================================================================

export const diagnostics = mysqlTable("diagnostics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  responses: text("responses").notNull(), // JSON string of assessment responses
  primaryConcerns: text("primaryConcerns"), // JSON array
  secondaryConcerns: text("secondaryConcerns"), // JSON array
  recommendedFocusAreas: text("recommendedFocusAreas"), // JSON array
  mortalityRisk: int("mortalityRisk"),
  wellnessScore: int("wellnessScore"),
  flags: text("flags"), // JSON array of crisis/concern flags
  tier: varchar("tier", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Diagnostic = typeof diagnostics.$inferSelect;
export type InsertDiagnostic = typeof diagnostics.$inferInsert;

// ============================================================================
// COACHES
// ============================================================================

export const coaches = mysqlTable("coaches", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(), // References users table
  name: text("name").notNull(),
  expertise: text("expertise").notNull(), // JSON array of expertise areas
  bio: text("bio"),
  certifications: text("certifications"), // JSON array
  rating: int("rating"),
  availability: varchar("availability", { length: 20 }).default("medium"),
  coachTier: varchar("coachTier", { length: 20 }).default("basic"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Coach = typeof coaches.$inferSelect;
export type InsertCoach = typeof coaches.$inferInsert;

// ============================================================================
// SESSIONS
// ============================================================================

export const sessions = mysqlTable("sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  coachId: int("coachId").notNull(),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime").notNull(),
  duration: int("duration").notNull(), // in minutes
  tier: varchar("tier", { length: 50 }),
  status: mysqlEnum("status", ["pending", "booked", "completed", "cancelled"]).default("pending").notNull(),
  focusAreas: text("focusAreas"), // JSON array
  notes: text("notes"),
  sessionType: mysqlEnum("sessionType", ["video", "phone", "chat"]).default("video"),
  meetingLink: text("meetingLink"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

// ============================================================================
// PAYMENTS & SUBSCRIPTIONS
// ============================================================================

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripePaymentId: varchar("stripePaymentId", { length: 255 }),
  amount: int("amount").notNull(), // in cents
  currency: varchar("currency", { length: 3 }).default("usd").notNull(),
  status: mysqlEnum("status", ["pending", "succeeded", "failed", "refunded"]).default("pending").notNull(),
  tier: varchar("tier", { length: 50 }),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  tier: mysqlEnum("tier", ["basic", "professional", "enterprise"]).notNull(),
  status: mysqlEnum("status", ["active", "cancelled", "past_due", "trialing"]).default("active").notNull(),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

// ============================================================================
// PROGRESS TRACKING
// ============================================================================

export const progressRecords = mysqlTable("progressRecords", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  wellnessScore: int("wellnessScore"),
  emotionalState: text("emotionalState"), // JSON object
  goals: text("goals"), // JSON array
  achievements: text("achievements"), // JSON array
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProgressRecord = typeof progressRecords.$inferSelect;
export type InsertProgressRecord = typeof progressRecords.$inferInsert;

// ============================================================================
// CRISIS ALERTS
// ============================================================================

export const crisisAlerts = mysqlTable("crisisAlerts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  severity: mysqlEnum("severity", ["low", "medium", "high", "critical"]).notNull(),
  flags: text("flags").notNull(), // JSON array
  context: text("context"), // JSON object with assessment data
  status: mysqlEnum("status", ["new", "acknowledged", "resolved"]).default("new").notNull(),
  acknowledgedBy: int("acknowledgedBy"), // admin/coach user ID
  acknowledgedAt: timestamp("acknowledgedAt"),
  resolution: text("resolution"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CrisisAlert = typeof crisisAlerts.$inferSelect;
export type InsertCrisisAlert = typeof crisisAlerts.$inferInsert;

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  actionUrl: text("actionUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// ============================================================================
// CONTENT & RESOURCES
// ============================================================================

export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: mysqlEnum("type", ["article", "video", "audio", "worksheet", "guide"]).notNull(),
  url: text("url"),
  fileKey: text("fileKey"), // S3 key if uploaded
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array
  isPublic: boolean("isPublic").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;

// ============================================================================
// ANALYTICS & METRICS
// ============================================================================

export const analyticsEvents = mysqlTable("analyticsEvents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  eventType: varchar("eventType", { length: 100 }).notNull(),
  eventData: text("eventData"), // JSON object
  sessionId: varchar("sessionId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = typeof analyticsEvents.$inferInsert;
