/**
 * Input sanitization utilities to prevent XSS attacks
 * For production, consider using DOMPurify or sanitize-html for more robust sanitization
 */

/**
 * Sanitize HTML by removing potentially dangerous tags and attributes
 * This is a basic implementation - for production, use a library like DOMPurify
 */
export function sanitizeHtml(input: string): string {
  if (!input) return "";

  // Remove HTML tags (basic sanitization)
  // For production, use DOMPurify: import DOMPurify from "isomorphic-dompurify";
  // return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  
  // Basic HTML tag removal
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "") // Remove event handlers
    .replace(/on\w+='[^']*'/gi, "") // Remove event handlers
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/data:text\/html/gi, "") // Remove data URIs with HTML
    .trim();
}

/**
 * Sanitize plain text by escaping HTML entities
 */
export function sanitizeText(input: string): string {
  if (!input) return "";

  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

