Imagine you have a toy box.

Inside the toy box, you have:

* A toy car 🚗
* A toy train 🚂
* A toy airplane ✈️

Now imagine you want to play with a toy car.

### Without Dependency Injection

You create the toy car yourself.

```java
class Child {
    ToyCar car = new ToyCar();

    void play() {
        car.drive();
    }
}
```

Here, the child is responsible for creating the toy car.

Problems:

* If tomorrow you want a train instead of a car, you must change the child's code.
* The child is tightly connected to the toy car.

---

### With Dependency Injection

Mom gives you the toy.

```java
class Child {
    Toy toy;

    Child(Toy toy) {
        this.toy = toy;
    }

    void play() {
        toy.play();
    }
}
```

Now:

```java
Toy toy = new ToyCar();
Child child = new Child(toy);
```

Or

```java
Toy toy = new ToyTrain();
Child child = new Child(toy);
```

The child doesn't care what toy it gets.

Mom injects (provides) the dependency.

This is **Dependency Injection (DI)**.

### Simple Definition

> Dependency Injection means an object receives the things it needs from outside instead of creating them itself.

---

# Real-World Example

Think about ordering food from a restaurant.

### Without DI

You grow vegetables, make dough, cook food yourself.

```java
class Person {
    Pizza pizza = new Pizza();

    void eat() {
        pizza.consume();
    }
}
```

You are responsible for creating everything.

---

### With DI

You order pizza from a restaurant.

```java
class Person {
    Pizza pizza;

    Person(Pizza pizza) {
        this.pizza = pizza;
    }
}
```

The restaurant provides the pizza.

You just consume it.

The restaurant is doing Dependency Injection.

---

# Spring Boot Example

Suppose you have:

```java
@Service
public class EmailService {

    public void sendEmail() {
        System.out.println("Email Sent");
    }
}
```

Another service uses it.

### Bad Way

```java
@Service
public class UserService {

    private EmailService emailService = new EmailService();

    public void register() {
        emailService.sendEmail();
    }
}
```

Problems:

* Tight coupling
* Hard to test
* Spring cannot manage it

---

### Good Way (Dependency Injection)

```java
@Service
public class UserService {

    private final EmailService emailService;

    public UserService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void register() {
        emailService.sendEmail();
    }
}
```

Spring creates `EmailService` and injects it into `UserService`.

---

# What Spring Does Internally

You write:

```java
@Service
class EmailService {}
```

```java
@Service
class UserService {

    private final EmailService emailService;

    UserService(EmailService emailService) {
        this.emailService = emailService;
    }
}
```

Spring sees:

1. Create EmailService object
2. Create UserService object
3. Put EmailService inside UserService

Conceptually:

```java
EmailService emailService = new EmailService();

UserService userService =
        new UserService(emailService);
```

Spring does this automatically.

---

# Types of Dependency Injection

### 1. Constructor Injection (Recommended)

```java
@Service
public class UserService {

    private final EmailService emailService;

    public UserService(EmailService emailService) {
        this.emailService = emailService;
    }
}
```

✅ Immutable
✅ Easy testing
✅ Recommended by Spring

---

### 2. Setter Injection

```java
@Service
public class UserService {

    private EmailService emailService;

    @Autowired
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }
}
```

Useful when dependency is optional.

---

### 3. Field Injection

```java
@Service
public class UserService {

    @Autowired
    private EmailService emailService;
}
```

Works, but generally avoided in modern Spring applications because it's harder to test.

---

# Interview Answer (30 Seconds)

> Dependency Injection is a design pattern in which an object receives its dependencies from an external source instead of creating them itself. In Spring Boot, the Spring IoC container creates and manages beans and injects required dependencies into classes. This reduces tight coupling, improves testability, and makes applications easier to maintain. Constructor injection is the preferred approach in Spring Boot.

### One-Line Memory Trick

**Without DI:** "I make my own toy."
**With DI:** "Someone gives me the toy."

That's Dependency Injection. 🚀


Let's use an Angular example that feels natural.

## Imagine You're a 5-Year-Old

You want to drink milk 🥛.

### Without Dependency Injection

Every time you're thirsty, you go buy a cow 🐄, feed it, and get milk yourself.

```typescript
export class ChildComponent {
  milkService = new MilkService();

  drink() {
    this.milkService.getMilk();
  }
}
```

Problems:

* Every child buys its own cow.
* Expensive.
* Hard to change later.

---

### With Dependency Injection

Mom already has a milk supplier.

When you need milk, Mom gives it to you.

```typescript
export class ChildComponent {

  constructor(private milkService: MilkService) {}

  drink() {
    this.milkService.getMilk();
  }
}
```

The child doesn't create the milk service.

Angular gives it automatically.

This is Dependency Injection.

---

# Real Angular Example

Suppose you call APIs.

### Service

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsers() {
    return this.http.get('/api/users');
  }

  constructor(private http: HttpClient) {}
}
```

### Component

```typescript
@Component({
  selector: 'app-user'
})
export class UserComponent {

  constructor(private userService: UserService) {}

  loadUsers() {
    this.userService.getUsers()
      .subscribe(users => console.log(users));
  }
}
```

---

# What Happens Behind the Scenes?

When Angular starts:

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {}
```

Angular creates **one instance** of `UserService`.

Think:

```typescript
const userService = new UserService();
```

Now whenever any component asks for it:

```typescript
constructor(private userService: UserService) {}
```

Angular says:

> "I already have a UserService. Here you go."

and injects it.

---

# Example from Your Projects

You have probably written something like:

```typescript
constructor(
  private assetService: AssetService,
  private router: Router,
  private dialog: MatDialog
) {}
```

You never do:

```typescript
this.assetService = new AssetService();
this.router = new Router();
this.dialog = new MatDialog();
```

Why?

Because Angular's DI container creates them and provides them.

---

# What Does `@Injectable()` Mean?

```typescript
@Injectable({
  providedIn: 'root'
})
export class AssetService {}
```

This tells Angular:

> "Please register this service in the Dependency Injection container."

and

```typescript
providedIn: 'root'
```

means:

> "Create a single instance for the entire application."

This is called a **Singleton Service**.

---

# How Angular DI Container Works

When Angular sees:

```typescript
constructor(
  private assetService: AssetService
) {}
```

Internally:

```typescript
const assetService = injector.get(AssetService);

const component =
    new UserComponent(assetService);
```

Angular does this automatically.

---

# Why DI Is Useful

### 1. Reusability

Same service used everywhere.

```typescript
DashboardComponent
UserComponent
AssetComponent
```

All can use:

```typescript
AssetService
```

---

### 2. Singleton Instance

```typescript
@Injectable({
  providedIn: 'root'
})
```

Only one object exists.

```text
App
 ├── UserComponent
 ├── AssetComponent
 └── DashboardComponent

          |
          v

     AssetService
```

All components share the same service instance.

---

### 3. Easy Testing

Without DI:

```typescript
private service = new AssetService();
```

Hard to mock.

With DI:

```typescript
constructor(private service: AssetService) {}
```

In tests:

```typescript
providers: [
  {
    provide: AssetService,
    useValue: mockAssetService
  }
]
```

Very easy.

---

# Interview Answer

> Dependency Injection in Angular is a design pattern where Angular creates and provides required dependencies such as services instead of components creating them manually. Angular uses a hierarchical injector system to manage service instances. Services are typically registered using `@Injectable()` and injected through constructors. DI improves code reusability, maintainability, and testability.

### Quick Memory Trick

```typescript
constructor(private userService: UserService) {}
```

You are saying:

> "Angular, I need a UserService."

Angular replies:

> "Don't worry, I already created one. Use this."

That's Angular Dependency Injection. 🚀
