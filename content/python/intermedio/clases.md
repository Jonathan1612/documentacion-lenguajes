---
title: "Programación Orientada a Objetos (POO)"
level: intermedio
category: poo
tags: [python, clases, objetos, poo, oop, class]
duration: 40min
prerequisites: [funciones, diccionarios]
---

# Clases y Objetos en Python

## 📋 ¿Qué es la POO?

La **Programación Orientada a Objetos** organiza el código en **clases** (plantillas) y **objetos** (instancias).

```python
# Clase = plantilla
class Perro:
    pass

# Objeto = instancia de la clase
mi_perro = Perro()
```

## 🏗️ Definir una Clase

```python
class Persona:
    # Constructor
    def __init__(self, nombre, edad):
        self.nombre = nombre  # Atributo de instancia
        self.edad = edad
    
    # Método de instancia
    def saludar(self):
        return f"Hola, soy {self.nombre}"
    
    def es_mayor_de_edad(self):
        return self.edad >= 18

# Crear objetos
persona1 = Persona("Ana", 25)
persona2 = Persona("Juan", 17)

print(persona1.saludar())           # "Hola, soy Ana"
print(persona1.es_mayor_de_edad())  # True
print(persona2.es_mayor_de_edad())  # False
```

## 🔧 El Constructor `__init__`

```python
class Rectangulo:
    def __init__(self, ancho, alto):
        self.ancho = ancho
        self.alto = alto
    
    def area(self):
        return self.ancho * self.alto
    
    def perimetro(self):
        return 2 * (self.ancho + self.alto)

rect = Rectangulo(5, 3)
print(rect.area())       # 15
print(rect.perimetro())  # 16
```

## 📊 Atributos

### Atributos de Instancia

```python
class Coche:
    def __init__(self, marca, modelo):
        self.marca = marca      # Único por instancia
        self.modelo = modelo
        self.kilometraje = 0    # Valor por defecto

coche1 = Coche("Toyota", "Corolla")
coche2 = Coche("Honda", "Civic")

print(coche1.marca)  # "Toyota"
print(coche2.marca)  # "Honda"
```

### Atributos de Clase

```python
class Empleado:
    # Atributo de clase (compartido por todas las instancias)
    empresa = "Tech Corp"
    contador = 0
    
    def __init__(self, nombre, salario):
        self.nombre = nombre
        self.salario = salario
        Empleado.contador += 1  # Incrementar contador

emp1 = Empleado("Ana", 50000)
emp2 = Empleado("Juan", 60000)

print(emp1.empresa)       # "Tech Corp"
print(emp2.empresa)       # "Tech Corp"
print(Empleado.contador)  # 2
```

## 🔒 Encapsulación

Python usa convenciones para indicar privacidad:

```python
class CuentaBancaria:
    def __init__(self, titular, saldo):
        self.titular = titular      # Público
        self._saldo = saldo         # "Protegido" (convención)
        self.__pin = 1234           # "Privado" (name mangling)
    
    def depositar(self, cantidad):
        if cantidad > 0:
            self._saldo += cantidad
    
    def retirar(self, cantidad):
        if 0 < cantidad <= self._saldo:
            self._saldo -= cantidad
            return True
        return False
    
    def get_saldo(self):
        return self._saldo

cuenta = CuentaBancaria("Ana", 1000)
cuenta.depositar(500)
print(cuenta.get_saldo())  # 1500

# Acceso directo (no recomendado)
print(cuenta._saldo)       # 1500 (funciona pero no se debe)
# print(cuenta.__pin)      # AttributeError
```

## 📝 Métodos

### Métodos de Instancia

```python
class Calculadora:
    def __init__(self):
        self.resultado = 0
    
    def sumar(self, valor):
        self.resultado += valor
        return self
    
    def restar(self, valor):
        self.resultado -= valor
        return self
    
    def obtener_resultado(self):
        return self.resultado

# Method chaining
calc = Calculadora()
resultado = calc.sumar(10).restar(3).sumar(5).obtener_resultado()
print(resultado)  # 12
```

### Métodos de Clase (@classmethod)

```python
class Fecha:
    def __init__(self, dia, mes, año):
        self.dia = dia
        self.mes = mes
        self.año = año
    
    @classmethod
    def desde_string(cls, fecha_string):
        """Constructor alternativo"""
        dia, mes, año = map(int, fecha_string.split('/'))
        return cls(dia, mes, año)
    
    def __str__(self):
        return f"{self.dia:02d}/{self.mes:02d}/{self.año}"

fecha1 = Fecha(15, 1, 2024)
fecha2 = Fecha.desde_string("15/01/2024")
print(fecha1)  # 15/01/2024
print(fecha2)  # 15/01/2024
```

### Métodos Estáticos (@staticmethod)

```python
class Matematicas:
    @staticmethod
    def es_par(numero):
        return numero % 2 == 0
    
    @staticmethod
    def factorial(n):
        if n <= 1:
            return 1
        return n * Matematicas.factorial(n - 1)

# No necesita instancia
print(Matematicas.es_par(4))    # True
print(Matematicas.factorial(5)) # 120
```

## 💡 Ejemplo Completo: Sistema de Biblioteca

```python
class Libro:
    def __init__(self, titulo, autor, isbn):
        self.titulo = titulo
        self.autor = autor
        self.isbn = isbn
        self.prestado = False
    
    def prestar(self):
        if not self.prestado:
            self.prestado = True
            return True
        return False
    
    def devolver(self):
        self.prestado = False
    
    def __str__(self):
        estado = "Prestado" if self.prestado else "Disponible"
        return f"{self.titulo} - {self.autor} [{estado}]"

class Biblioteca:
    def __init__(self, nombre):
        self.nombre = nombre
        self.libros = []
    
    def agregar_libro(self, libro):
        self.libros.append(libro)
        print(f"✅ '{libro.titulo}' agregado a {self.nombre}")
    
    def buscar_por_titulo(self, titulo):
        for libro in self.libros:
            if titulo.lower() in libro.titulo.lower():
                return libro
        return None
    
    def listar_disponibles(self):
        disponibles = [libro for libro in self.libros if not libro.prestado]
        return disponibles
    
    def mostrar_catalogo(self):
        print(f"\n=== Catálogo de {self.nombre} ===")
        for libro in self.libros:
            print(f"  • {libro}")

# Uso
biblioteca = Biblioteca("Biblioteca Central")

# Agregar libros
libro1 = Libro("Python Crash Course", "Eric Matthes", "978-1593279288")
libro2 = Libro("Clean Code", "Robert Martin", "978-0132350884")
libro3 = Libro("The Pragmatic Programmer", "Hunt & Thomas", "978-0135957059")

biblioteca.agregar_libro(libro1)
biblioteca.agregar_libro(libro2)
biblioteca.agregar_libro(libro3)

# Mostrar catálogo
biblioteca.mostrar_catalogo()

# Prestar libro
libro1.prestar()
print(f"\n'{libro1.titulo}' prestado")

# Mostrar solo disponibles
print("\n=== Libros Disponibles ===")
for libro in biblioteca.listar_disponibles():
    print(f"  • {libro}")
```

## 🔄 Property Decorators

```python
class Temperatura:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Getter"""
        return self._celsius
    
    @celsius.setter
    def celsius(self, valor):
        """Setter con validación"""
        if valor < -273.15:
            raise ValueError("Temperatura por debajo del cero absoluto")
        self._celsius = valor
    
    @property
    def fahrenheit(self):
        """Propiedad calculada"""
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, valor):
        self._celsius = (valor - 32) * 5/9

# Uso como atributo
temp = Temperatura(25)
print(temp.celsius)      # 25
print(temp.fahrenheit)   # 77.0

temp.fahrenheit = 32
print(temp.celsius)      # 0.0
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Clase Círculo

```python
class Circulo:
    """Crea una clase con radio, área y perímetro"""
    pass
```

<details>
<summary>✅ Solución</summary>

```python
import math

class Circulo:
    def __init__(self, radio):
        self.radio = radio
    
    def area(self):
        return math.pi * self.radio ** 2
    
    def perimetro(self):
        return 2 * math.pi * self.radio

circulo = Circulo(5)
print(f"Área: {circulo.area():.2f}")          # 78.54
print(f"Perímetro: {circulo.perimetro():.2f}") # 31.42
```
</details>

## ⚠️ Errores Comunes

```python
# 1. Olvidar self
class Persona:
    def saludar():  # ❌ Falta self
        print("Hola")

# ✅ Correcto
class Persona:
    def saludar(self):
        print("Hola")

# 2. No usar self para atributos
class Coche:
    def __init__(self, marca):
        marca = marca  # ❌ Variable local

# ✅ Correcto
class Coche:
    def __init__(self, marca):
        self.marca = marca  # Atributo de instancia
```

## 🔗 Temas Relacionados

- [Herencia](./herencia)
- [Métodos Especiales](./metodos-especiales)
- [Funciones](../basico/funciones)

## 📚 Recursos Adicionales

- [Python Classes](https://docs.python.org/3/tutorial/classes.html)
- [OOP in Python](https://realpython.com/python3-object-oriented-programming/)

---

> 💡 **Tip**: Piensa en clases como "plantillas" para crear objetos con comportamiento y datos relacionados.
