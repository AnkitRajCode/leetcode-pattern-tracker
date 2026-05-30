**SOLID** — the five core principles of object-oriented programming and design.

## What is SOLID?

SOLID is an acronym coined by Robert C. Martin ("Uncle Bob"). These five principles help developers create software that is **maintainable, scalable, testable, and resilient to change**.

---

### S - Single Responsibility Principle (SRP)

> **A class should have only one reason to change.**

- Every class/module should focus on a single part of the functionality.
- **Why?** Too many responsibilities make the class fragile, harder to understand, and harder to test.

**Example:**  
❌ Bad: A `Report` class that calculates data, formats a PDF, *and* sends an email.  
✅ Good: Separate classes: `DataCalculator`, `PdfFormatter`, `EmailSender`.

---

### O - Open/Closed Principle (OCP)

> **Software entities should be open for extension but closed for modification.**

- You should be able to add new behavior without changing existing code.
- Achieved via inheritance, interfaces, and polymorphism.

**Example:**  
❌ Bad: Modifying a `PaymentProcessor` with new `if/else` for every new payment method.  
✅ Good: Define a `PaymentMethod` interface. Add `CreditCard`, `PayPal`, etc. — the processor remains unchanged.

---

### L - Liskov Substitution Principle (LSP)

> **Objects of a superclass should be replaceable with objects of a subclass without affecting correctness.**

- Subtypes must behave in a way that doesn’t break the parent’s expectations.
- If you override a method, it should not require more restrictions or return unexpected results.

**Example:**  
❌ Bad: `Penguin` extends `Bird`, but `Bird` has a `fly()` method — overridden to `throw`.  
✅ Good: Restructure hierarchy (`FlyingBird` vs `Bird` with no `fly`).

---

### I - Interface Segregation Principle (ISP)

> **Clients should not be forced to depend on interfaces they do not use.**

- Split large, "fat" interfaces into smaller, specific ones.
- Prevents "interface pollution".

**Example:**  
❌ Bad: `Worker` interface with `work()`, `eat()`, `sleep()` — a `Robot` worker must implement `eat()`.  
✅ Good: Separate interfaces: `Workable`, `Eatable`, `Sleepable`. Robot implements only `Workable`.

---

### D - Dependency Inversion Principle (DIP)

> **High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.**

- Decouple code by using interfaces/abstract classes rather than concrete classes.

**Example:**  
❌ Bad: `NotificationService` depends directly on `EmailSender` class.  
✅ Good: `NotificationService` depends on `MessageSender` interface. `EmailSender` and `SmsSender` implement it.

---

## Why Use SOLID?

- **Easier to debug** – each part is isolated.
- **Easier to extend** – less risk of breaking existing features.
- **Easier to test** – mock dependencies cleanly.
- **Team-friendly** – multiple developers can work on separate modules without conflicts.
