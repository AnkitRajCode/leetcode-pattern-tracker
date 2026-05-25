# JWT (JSON Web Token) – Complete Explanation + Interview Questions

## 1. What is JWT?

**JWT (JSON Web Token)** is a compact, secure, self-contained token format used for:

* **Authentication** → Verify who the user is
* **Authorization** → Verify what the user can access
* **Secure information exchange**

Think of JWT as a **digital identity card**.

After login, server gives client a JWT.

Client sends JWT in every request.

Server validates it instead of asking username/password again.

---

## 2. JWT Flow (End-to-End)

```plaintext
1. User Login
   ↓
2. Client sends username/password
   ↓
3. Server validates credentials
   ↓
4. Server creates JWT
   ↓
5. JWT returned to frontend
   ↓
6. Frontend stores JWT
   ↓
7. Client sends JWT in API requests
   ↓
8. Backend validates JWT
   ↓
9. API access granted
```

Example:

```plaintext
POST /login

{
  "username":"ankit",
  "password":"1234"
}
```

Server returns:

```json
{
   "token":"eyJhbGciOiJIUzI1NiIs..."
}
```

Client request:

```http
GET /users

Authorization: Bearer eyJhbGciOiJIUzI1Ni...
```

---

## 3. JWT Structure

JWT has **3 parts**.

```plaintext
xxxxx.yyyyy.zzzzz
```

```plaintext
HEADER.PAYLOAD.SIGNATURE
```

## A) Header

Contains metadata.

Example:

```json
{
  "alg":"HS256",
  "typ":"JWT"
}
```

Meaning:

* `alg` → Algorithm used for signing
* `typ` → Token type

---

## B) Payload

Contains claims/data.

Example:

```json
{
   "sub":"123",
   "name":"Ankit",
   "role":"ADMIN",
   "iat":17122344,
   "exp":17199999
}
```

Payload stores:

* userId
* role
* permissions
* expiry
* email

### Claims Types

#### Registered Claims

Standard JWT fields.

| Claim | Meaning         |
| ----- | --------------- |
| sub   | Subject/User ID |
| exp   | Expiry          |
| iat   | Issued At       |
| iss   | Issuer          |
| aud   | Audience        |

---

#### Public Claims

Custom fields.

Example:

```json
{
   "role":"ADMIN"
}
```

---

#### Private Claims

Internal application data.

Example:

```json
{
   "department":"IT"
}
```

---

## C) Signature

Most important security part.

Created using:

```plaintext
HEADER + PAYLOAD + SECRET_KEY
```

Formula:

```plaintext
HMACSHA256(
 Base64UrlEncode(Header)
 +
 "."
 +
 Base64UrlEncode(Payload),
 SECRET_KEY
)
```

If payload changes → signature changes → token invalid.

---

## 4. JWT Example

Header:

```json
{
 "alg":"HS256",
 "typ":"JWT"
}
```

Payload:

```json
{
 "userId":"101",
 "role":"ADMIN"
}
```

Final token:

```plaintext
eyJhbGciOiJIUzI1NiJ9
.
eyJ1c2VySWQiOjEwMSwicm9sZSI6IkFETUlOIn0
.
abcxyzsignature
```

---

## 5. JWT Authentication Flow in Spring Boot

### Login API

```java
@PostMapping("/login")
public String login(){

    Authentication auth =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                username,
                password));

    return jwtUtil.generateToken(username);
}
```

---

### JWT Filter

Reads token from request.

```java
String authHeader =
 request.getHeader("Authorization");

if(authHeader.startsWith("Bearer ")){

    token = authHeader.substring(7);

    username = jwtUtil.extractUsername(token);
}
```

---

### Token Validation

```java
jwtUtil.validateToken(token);
```

---

### Security Context Update

```java
SecurityContextHolder
.getContext()
.setAuthentication(authentication);
```

---

## 6. JWT Storage Options

### Local Storage

```plaintext
Pros:
Simple

Cons:
XSS vulnerable
```

---

### Session Storage

```plaintext
Pros:
Tab scoped

Cons:
Still XSS risk
```

---

### HTTP Only Cookie

Recommended.

```plaintext
Pros:
Not accessible via JS
More secure

Cons:
CSRF handling needed
```

---

## 7. JWT vs Session Authentication

| JWT                    | Session               |
| ---------------------- | --------------------- |
| Stateless              | Stateful              |
| No server storage      | Server stores session |
| Scalable               | Less scalable         |
| Good for microservices | Good for monolith     |
| Token on client        | Session on server     |

---

## 8. JWT Algorithms

### HS256

Symmetric.

Same key used for:

* signing
* validation

```plaintext
Server Secret Key
```

---

### RS256

Asymmetric.

Uses:

* Private key → sign
* Public key → verify

Common in:

* OAuth
* Enterprise apps
* Microservices

---

## 9. Access Token vs Refresh Token

### Access Token

Short-lived.

Example:

```plaintext
15 min expiry
```

Used in API calls.

---

### Refresh Token

Long-lived.

Example:

```plaintext
7 days
```

Used to generate new access token.

Flow:

```plaintext
Access Token expired
      ↓
Client sends Refresh Token
      ↓
Backend validates
      ↓
New Access Token generated
```

---

## 10. JWT Security Best Practices

### Keep expiry short

Good:

```plaintext
10–30 mins
```

---

### Use HTTPS

Never use JWT over HTTP.

---

### Don't store sensitive data

Bad:

```json
{
   "password":"123"
}
```

JWT payload is **Base64 encoded NOT encrypted**.

Anyone can decode it.

---

### Use Refresh Token.

---

### Rotate Secrets.

---

### Validate signature.

---

### Use HttpOnly cookies when possible.

---

# JWT Interview Questions

## Beginner Level

### 1. What is JWT?

**Answer:**

JWT is a compact token format used for authentication and authorization.

---

### 2. Why use JWT?

**Answer:**

* Stateless authentication
* Scalable
* Microservice friendly
* No session storage

---

### 3. Explain JWT structure.

**Answer:**

3 parts:

```plaintext
Header.Payload.Signature
```

---

### 4. What are claims in JWT?

Data inside payload.

Examples:

```plaintext
sub
exp
iat
role
```

---

### 5. Difference between authentication and authorization?

Authentication:

```plaintext
Who are you?
```

Authorization:

```plaintext
What can you access?
```

---

## Intermediate Level

### 6. JWT vs Session?

Expected answer:

| JWT                 | Session               |
| ------------------- | --------------------- |
| Stateless           | Stateful              |
| Client stores token | Server stores session |

---

### 7. Where should JWT be stored?

Best:

```plaintext
HTTP Only Secure Cookies
```

Avoid:

```plaintext
LocalStorage
```

---

### 8. Why is JWT stateless?

Server does not maintain session data.

All user info lives inside token.

---

### 9. Can JWT be tampered?

Payload:

YES.

But attacker **cannot recreate valid signature** without secret key.

Validation fails.

---

### 10. Is JWT encrypted?

No.

Usually **signed**, not encrypted.

Payload can be decoded.

---

## Advanced Interview Questions

### 11. Explain Access Token and Refresh Token.

Short expiry vs long expiry.

Refresh token renews access token.

---

### 12. How does JWT work in Spring Security?

Typical flow:

```plaintext
Login
↓
Generate JWT
↓
JWT Filter
↓
Validate Token
↓
Set Security Context
↓
Authorize request
```

---

### 13. How to invalidate JWT?

Challenge because JWT is stateless.

Methods:

* Short expiration
* Blacklist tokens
* Refresh token rotation
* Secret rotation

---

### 14. What happens if secret key leaks?

Attacker can forge tokens.

Solution:

* Rotate keys
* Revoke tokens
* Force re-authentication

---

### 15. Difference between HS256 and RS256?

| HS256       | RS256               |
| ----------- | ------------------- |
| Same key    | Public/private keys |
| Faster      | More secure sharing |
| Simple apps | Distributed systems |

---

### 16. Why JWT preferred in microservices?

No centralized session storage.

Each service validates token independently.

---

### 17. What security risks exist with JWT?

* XSS
* CSRF
* Secret leakage
* Long token expiry
* Token theft

---

### 18. Explain JWT filter in Spring Boot.

Reads Authorization header.

Extracts token.

Validates token.

Sets authentication in `SecurityContextHolder`.

---

## Tricky Interview Questions

### Q: Can JWT be revoked before expiry?

Yes, using:

* Blacklist database
* Token versioning
* Secret rotation

---

### Q: Can two servers validate same JWT?

Yes.

If they share:

* secret key (HS256)
  OR
* public key (RS256)

---

### Q: Why shouldn't password be stored inside JWT?

JWT payload is readable after decoding.

---

### Q: Is Base64 encryption?

No.

It is **encoding**.

---

### Q: Why use Bearer token?

Bearer means:

**whoever possesses token gets access.**

---

## Real Interview Answer (SDE/Java Backend)

If interviewer asks:

**"Explain JWT end-to-end."**

You can answer:

> JWT is a stateless authentication mechanism. After successful login, backend generates a JWT containing claims like userId, role, expiry and signs it using a secret/private key. The client stores the token and sends it in the Authorization header as a Bearer token on subsequent requests. Backend validates signature and expiry through a JWT filter. If valid, authentication is placed in Spring Security context and request proceeds. Usually access tokens are short-lived and refresh tokens are used for renewal.

