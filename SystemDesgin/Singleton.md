## Coffee Machine Singleton (Java)

```java
public class CoffeeMachine {
    // Static variable to hold the single instance
    private static CoffeeMachine uniqueInstance;
    
    // Private constructor prevents instantiation from outside
    private CoffeeMachine() {
        System.out.println("Coffee machine initialized (cleaned, water filled).");
    }
    
    // Public static method to provide global access
    public static CoffeeMachine getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new CoffeeMachine();
        }
        return uniqueInstance;
    }
    
    // Example business methods
    public void brewEspresso() {
        System.out.println("☕ Brewing a rich espresso...");
    }
    
    public void brewLatte() {
        System.out.println("🥛 Steaming milk + espresso = Latte ready!");
    }
    
    public void clean() {
        System.out.println("🧼 Cleaning the coffee machine.");
    }
}
```

---

## Usage Example

```java
public class Main {
    public static void main(String[] args) {
        // Both variables refer to the same single instance
        CoffeeMachine machine1 = CoffeeMachine.getInstance();
        CoffeeMachine machine2 = CoffeeMachine.getInstance();
        
        machine1.brewEspresso();   // ☕ Brewing a rich espresso...
        machine2.brewLatte();      // 🥛 Steaming milk + espresso = Latte ready!
        
        // Check identity (outputs true)
        System.out.println(machine1 == machine2);
    }
}
```

**Output:**
```
Coffee machine initialized (cleaned, water filled).
☕ Brewing a rich espresso...
🥛 Steaming milk + espresso = Latte ready!
true
```

---

## Thread‑Safe Version (Lazy Initialization)

For multithreaded environments, use **double‑checked locking**:

```java
public class CoffeeMachine {
    private static volatile CoffeeMachine uniqueInstance;
    
    private CoffeeMachine() { }
    
    public static CoffeeMachine getInstance() {
        if (uniqueInstance == null) {
            synchronized (CoffeeMachine.class) {
                if (uniqueInstance == null) {
                    uniqueInstance = new CoffeeMachine();
                }
            }
        }
        return uniqueInstance;
    }
}
```

Or simpler: use an **eager‑initialized** Singleton if the machine is always needed:

```java
public class CoffeeMachine {
    private static final CoffeeMachine uniqueInstance = new CoffeeMachine();
    private CoffeeMachine() { }
    public static CoffeeMachine getInstance() { return uniqueInstance; }
}
```

---

## Why Singleton for a Coffee Machine?

- **Resource control** – Only one physical coffee machine in the office kitchen.
- **Consistency** – No two parts of code try to brew simultaneously using different objects.
- **Shared state** – Water level, bean hopper, cleaning status are all managed globally.

Would you like an example with a **real‑time scenario** (like a restaurant kitchen) or a version in Python / C#?