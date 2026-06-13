---
title: "Herencia y Polimorfismo"
level: intermedio
category: poo
tags: [python, herencia, polimorfismo, super, override]
duration: 35min
prerequisites: [clases]
---

# Herencia y Polimorfismo en Python

## 📋 Herencia

La **herencia** permite crear clases basadas en otras clases existentes.

```python
# Clase base (padre)
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre
    
    def hacer_sonido(self):
        pass  # Será implementado por las subclases

# Clase derivada (hija)
class Perro(Animal):
    def hacer_sonido(self):
        return "Guau!"

class Gato(Animal):
    def hacer_sonido(self):
        return "Miau!"

perro = Perro("Rex")
gato = Gato("Michi")

print(perro.nombre)           # "Rex" (heredado)
print(perro.hacer_sonido())   # "Guau!"
print(gato.hacer_sonido())    # "Miau!"
```

## 🔧 super() - Llamar al Padre

```python
class Vehiculo:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo
    
    def describir(self):
        return f"{self.marca} {self.modelo}"

class Coche(Vehiculo):
    def __init__(self, marca, modelo, puertas):
        super().__init__(marca, modelo)  # Llamar constructor padre
        self.puertas = puertas
    
    def describir(self):
        base = super().describir()  # Llamar método padre
        return f"{base} - {self.puertas} puertas"

coche = Coche("Toyota", "Corolla", 4)
print(coche.describir())  # "Toyota Corolla - 4 puertas"
```

## 🎯 Polimorfismo

Diferentes clases pueden tener métodos con el mismo nombre:

```python
class Figura:
    def area(self):
        pass

class Cuadrado(Figura):
    def __init__(self, lado):
        self.lado = lado
    
    def area(self):
        return self.lado ** 2

class Circulo(Figura):
    def __init__(self, radio):
        self.radio = radio
    
    def area(self):
        import math
        return math.pi * self.radio ** 2

# Polimorfismo en acción
figuras = [Cuadrado(5), Circulo(3), Cuadrado(10)]

for figura in figuras:
    print(f"Área: {figura.area():.2f}")
# Área: 25.00
# Área: 28.27
# Área: 100.00
```

## 🏗️ Herencia Múltiple

Python soporta herencia de múltiples clases:

```python
class Volador:
    def volar(self):
        return "Está volando"

class Nadador:
    def nadar(self):
        return "Está nadando"

class Pato(Volador, Nadador):
    def __init__(self, nombre):
        self.nombre = nombre

pato = Pato("Donald")
print(pato.volar())  # "Está volando"
print(pato.nadar())  # "Está nadando"
```

### Method Resolution Order (MRO)

```python
class A:
    def metodo(self):
        print("A")

class B(A):
    def metodo(self):
        print("B")

class C(A):
    def metodo(self):
        print("C")

class D(B, C):
    pass

# ¿Qué método se llama?
d = D()
d.metodo()  # "B" (orden: D -> B -> C -> A)

# Ver el MRO
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)
```

## 💡 Ejemplo: Sistema de Empleados

```python
class Empleado:
    def __init__(self, nombre, id_empleado, salario_base):
        self.nombre = nombre
        self.id_empleado = id_empleado
        self.salario_base = salario_base
    
    def calcular_salario(self):
        return self.salario_base
    
    def __str__(self):
        return f"{self.nombre} (ID: {self.id_empleado})"

class Programador(Empleado):
    def __init__(self, nombre, id_empleado, salario_base, lenguajes):
        super().__init__(nombre, id_empleado, salario_base)
        self.lenguajes = lenguajes
    
    def calcular_salario(self):
        # Bonus por cada lenguaje
        bonus = len(self.lenguajes) * 500
        return self.salario_base + bonus

class Gerente(Empleado):
    def __init__(self, nombre, id_empleado, salario_base, departamento):
        super().__init__(nombre, id_empleado, salario_base)
        self.departamento = departamento
        self.subordinados = []
    
    def agregar_subordinado(self, empleado):
        self.subordinados.append(empleado)
    
    def calcular_salario(self):
        # Bonus por subordinados
        bonus = len(self.subordinados) * 1000
        return self.salario_base + bonus

# Crear empleados
prog1 = Programador("Ana", "P001", 50000, ["Python", "JavaScript", "Go"])
prog2 = Programador("Juan", "P002", 48000, ["Java", "Python"])
gerente = Gerente("María", "G001", 60000, "Desarrollo")

gerente.agregar_subordinado(prog1)
gerente.agregar_subordinado(prog2)

# Calcular salarios
empleados = [prog1, prog2, gerente]
for empleado in empleados:
    print(f"{empleado}: ${empleado.calcular_salario():,}")
# Ana (ID: P001): $51,500
# Juan (ID: P002): $49,000
# María (ID: G001): $62,000
```

## 🔍 isinstance() y issubclass()

```python
class Animal:
    pass

class Perro(Animal):
    pass

perro = Perro()

# isinstance - verificar tipo de instancia
print(isinstance(perro, Perro))   # True
print(isinstance(perro, Animal))  # True (herencia)
print(isinstance(perro, str))     # False

# issubclass - verificar herencia
print(issubclass(Perro, Animal))  # True
print(issubclass(Animal, Perro))  # False
```

## 📝 Override (Sobrescritura)

```python
class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad
    
    def presentarse(self):
        return f"Soy {self.nombre}, tengo {self.edad} años"

class Estudiante(Persona):
    def __init__(self, nombre, edad, universidad):
        super().__init__(nombre, edad)
        self.universidad = universidad
    
    # Override del método
    def presentarse(self):
        base = super().presentarse()
        return f"{base} y estudio en {self.universidad}"

estudiante = Estudiante("Ana", 20, "UNAM")
print(estudiante.presentarse())
# "Soy Ana, tengo 20 años y estudio en UNAM"
```

## 🎨 Clases Abstractas

```python
from abc import ABC, abstractmethod

class Figura(ABC):
    @abstractmethod
    def area(self):
        """Método que debe ser implementado por subclases"""
        pass
    
    @abstractmethod
    def perimetro(self):
        pass

class Rectangulo(Figura):
    def __init__(self, ancho, alto):
        self.ancho = ancho
        self.alto = alto
    
    def area(self):
        return self.ancho * self.alto
    
    def perimetro(self):
        return 2 * (self.ancho + self.alto)

# ❌ No se puede instanciar clase abstracta
# figura = Figura()  # TypeError

# ✅ Se puede instanciar subclase
rectangulo = Rectangulo(5, 3)
print(rectangulo.area())  # 15
```

## 💪 Ejercicios

### Ejercicio: Sistema de Vehículos

```python
# Crea:
# - Clase base Vehiculo (marca, modelo, año)
# - Clase Coche (hereda, agrega num_puertas)
# - Clase Moto (hereda, agrega cilindrada)
# - Método describir() en cada clase
```

<details>
<summary>✅ Solución</summary>

```python
class Vehiculo:
    def __init__(self, marca, modelo, año):
        self.marca = marca
        self.modelo = modelo
        self.año = año
    
    def describir(self):
        return f"{self.marca} {self.modelo} ({self.año})"

class Coche(Vehiculo):
    def __init__(self, marca, modelo, año, num_puertas):
        super().__init__(marca, modelo, año)
        self.num_puertas = num_puertas
    
    def describir(self):
        base = super().describir()
        return f"{base} - {self.num_puertas} puertas"

class Moto(Vehiculo):
    def __init__(self, marca, modelo, año, cilindrada):
        super().__init__(marca, modelo, año)
        self.cilindrada = cilindrada
    
    def describir(self):
        base = super().describir()
        return f"{base} - {self.cilindrada}cc"

coche = Coche("Toyota", "Corolla", 2024, 4)
moto = Moto("Yamaha", "R6", 2023, 600)

print(coche.describir())  # Toyota Corolla (2024) - 4 puertas
print(moto.describir())   # Yamaha R6 (2023) - 600cc
```
</details>

## 🔗 Temas Relacionados

- [Clases](./clases)
- [Métodos Especiales](./metodos-especiales)
- [Polimorfismo Avanzado](../avanzado/metaclases)

## 📚 Recursos Adicionales

- [Inheritance](https://docs.python.org/3/tutorial/classes.html#inheritance)
- [Abstract Base Classes](https://docs.python.org/3/library/abc.html)

---

> 💡 **Tip**: Usa herencia cuando haya una relación "es un" (Perro ES UN Animal).
