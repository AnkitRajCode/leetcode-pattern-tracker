# HTTP Status Codes

## 1xx – Informational
- **100 Continue** – Initial part of request received, client should proceed.
- **101 Switching Protocols** – Server agrees to upgrade protocol (e.g., to WebSockets).

## 2xx – Success
- **200 OK** – Standard success response.
- **201 Created** – Resource successfully created (e.g., after POST).
- **202 Accepted** – Request accepted but not yet processed.
- **204 No Content** – Success, but no body to return.

## 3xx – Redirection
- **301 Moved Permanently** – Resource URL changed permanently.
- **302 Found (Temporary Redirect)** – Temporary redirect, method may change.
- **304 Not Modified** – Cached version is still valid (conditional request).

## 4xx – Client Errors
- **400 Bad Request** – Malformed syntax or invalid request.
- **401 Unauthorized** – Authentication required or failed.
- **403 Forbidden** – Authenticated but no permission.
- **404 Not Found** – Resource doesn’t exist.
- **405 Method Not Allowed** – HTTP method not supported.
- **408 Request Timeout** – Server timed out waiting.
- **409 Conflict** – Conflict with current state (e.g., duplicate entry).
- **429 Too Many Requests** – Rate limiting exceeded.

## 5xx – Server Errors
- **500 Internal Server Error** – Generic server-side failure.
- **501 Not Implemented** – Server doesn’t support functionality.
- **502 Bad Gateway** – Invalid response from upstream server.
- **503 Service Unavailable** – Temporary overload or maintenance.
- **504 Gateway Timeout** – Upstream server timed out.

> **Tip**: For APIs, common ones include `200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `429`, and `500`.
