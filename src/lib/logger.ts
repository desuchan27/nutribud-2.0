/**
 * Security event logging utility
 * Logs security-related events for monitoring and investigation
 */

type LogLevel = "info" | "warn" | "error";

interface SecurityEvent {
  type: string;
  level: LogLevel;
  message: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
  userId?: string;
  ipAddress?: string;
}

/**
 * Log security events
 * In production, this should integrate with a proper logging service
 * (e.g., Sentry, LogRocket, CloudWatch, etc.)
 */
export function logSecurityEvent(
  type: string,
  message: string,
  level: LogLevel = "info",
  metadata?: Record<string, unknown>
) {
  const event: SecurityEvent = {
    type,
    level,
    message,
    metadata,
    timestamp: new Date(),
  };

  // In development, log to console
  // In production, send to logging service
  if (process.env.NODE_ENV === "development") {
    console.log(`[SECURITY ${level.toUpperCase()}]`, {
      type: event.type,
      message: event.message,
      timestamp: event.timestamp.toISOString(),
      ...event.metadata,
    });
  } else {
    // TODO: Integrate with production logging service
    // Example: Sentry.captureMessage(message, { level, extra: metadata });
    console.log(`[SECURITY ${level.toUpperCase()}]`, {
      type: event.type,
      message: event.message,
      timestamp: event.timestamp.toISOString(),
      ...event.metadata,
    });
  }
}

/**
 * Log failed login attempts
 */
export function logFailedLogin(email: string, reason: string, ipAddress?: string) {
  logSecurityEvent(
    "failed_login",
    `Failed login attempt for email: ${email}`,
    "warn",
    {
      email,
      reason,
      ipAddress,
    }
  );
}

/**
 * Log successful login
 */
export function logSuccessfulLogin(userId: string, email: string, ipAddress?: string) {
  logSecurityEvent(
    "successful_login",
    `Successful login for user: ${email}`,
    "info",
    {
      userId,
      email,
      ipAddress,
    }
  );
}

/**
 * Log unauthorized access attempts
 */
export function logUnauthorizedAccess(
  resource: string,
  userId?: string,
  ipAddress?: string
) {
  logSecurityEvent(
    "unauthorized_access",
    `Unauthorized access attempt to: ${resource}`,
    "warn",
    {
      resource,
      userId,
      ipAddress,
    }
  );
}

/**
 * Log file uploads
 */
export function logFileUpload(userId: string, fileCount: number, ipAddress?: string) {
  logSecurityEvent(
    "file_upload",
    `File upload by user: ${userId}`,
    "info",
    {
      userId,
      fileCount,
      ipAddress,
    }
  );
}

/**
 * Log account changes
 */
export function logAccountChange(
  userId: string,
  changeType: string,
  details?: Record<string, unknown>
) {
  logSecurityEvent(
    "account_change",
    `Account change: ${changeType} for user: ${userId}`,
    "info",
    {
      userId,
      changeType,
      ...details,
    }
  );
}

/**
 * Log rate limit violations
 */
export function logRateLimitViolation(
  identifier: string,
  endpoint: string,
  ipAddress?: string
) {
  logSecurityEvent(
    "rate_limit_violation",
    `Rate limit exceeded for: ${identifier} on ${endpoint}`,
    "warn",
    {
      identifier,
      endpoint,
      ipAddress,
    }
  );
}

