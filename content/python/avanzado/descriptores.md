---
title: "Descriptores"
level: avanzado
category: metaprogramación
tags: [python, descriptors, __get__, __set__, property]
duration: 35min
prerequisites: [clases, metodos-especiales]
---

# Descriptores en Python

## 📋 ¿Qué son los Descriptores?

Los descriptores controlan el acceso a atributos de una clase mediante `__get__`, `__set__` y `__delete__`.

```python
class Descriptor:
    def __get__(self, obj, objtype=None):
        """Se llama al leer el atributo"""
        print("Leyendo...")
        return 42
    
    def __set__(self, obj, value):
        """Se llama al escribir el atributo"""
        print(f"Escribiendo: {value}")
    
    def __delete__(self, obj):
        """Se llama al eliminar el atributo"""
        print("Eliminando...")

class MiClase:
    atributo = Descriptor()

obj = MiClase()
print(obj.atributo)    # Leyendo... 42
obj.atributo = 10      # Escribiendo: 10
del obj.atributo       # Eliminando...
```

## 🔧 Data vs Non-Data Descriptors

```python
# Data Descriptor - Tiene __get__ Y __set__
class DataDescriptor:
    def __get__(self, obj, objtype=None):
        return "data descriptor"
    
    def __set__(self, obj, value):
        pass

# Non-Data Descriptor - Solo __get__
class NonDataDescriptor:
    def __get__(self, obj, objtype=None):
        return "non-data descriptor"

class MiClase:
    data = DataDescriptor()
    non_data = NonDataDescriptor()

obj = MiClase()

# Data descriptor tiene prioridad sobre __dict__
obj.__dict__['data'] = "valor"
print(obj.data)  # "data descriptor" (ignora __dict__)

# Non-data descriptor NO tiene prioridad
obj.__dict__['non_data'] = "valor"
print(obj.non_data)  # "valor" (usa __dict__)
```

## 💡 Ejemplo: Validación de Tipos

```python
class TipoValidado:
    def __init__(self, nombre, tipo_esperado):
        self.nombre = nombre
        self.tipo_esperado = tipo_esperado
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__.get(self.nombre)
    
    def __set__(self, obj, value):
        if not isinstance(value, self.tipo_esperado):
            raise TypeError(
                f"{self.nombre} debe ser {self.tipo_esperado.__name__}, "
                f"no {type(value).__name__}"
            )
        obj.__dict__[self.nombre] = value

class Persona:
    nombre = TipoValidado("nombre", str)
    edad = TipoValidado("edad", int)
    
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

# Uso
p = Persona("Ana", 25)
print(p.nombre, p.edad)  # Ana 25

# p.edad = "veinticinco"  # TypeError
```

## 🎯 Ejemplo: Rango Validado

```python
class RangoValidado:
    def __init__(self, nombre, minimo, maximo):
        self.nombre = nombre
        self.minimo = minimo
        self.maximo = maximo
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__.get(self.nombre)
    
    def __set__(self, obj, value):
        if not (self.minimo <= value <= self.maximo):
            raise ValueError(
                f"{self.nombre} debe estar entre {self.minimo} y {self.maximo}"
            )
        obj.__dict__[self.nombre] = value

class Examen:
    calificacion = RangoValidado("calificacion", 0, 100)
    
    def __init__(self, calificacion):
        self.calificacion = calificacion

# Uso
examen = Examen(85)
print(examen.calificacion)  # 85

# examen.calificacion = 150  # ValueError
```

## 🔄 Descriptor con __set_name__

```python
class Validado:
    def __init__(self, tipo_esperado):
        self.tipo_esperado = tipo_esperado
    
    def __set_name__(self, owner, name):
        """Python 3.6+ - Se llama al asignar a clase"""
        self.nombre = name
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__.get(self.nombre)
    
    def __set__(self, obj, value):
        if not isinstance(value, self.tipo_esperado):
            raise TypeError(f"{self.nombre} debe ser {self.tipo_esperado.__name__}")
        obj.__dict__[self.nombre] = value

class Usuario:
    # No necesitamos pasar el nombre
    nombre = Validado(str)
    edad = Validado(int)
    email = Validado(str)
    
    def __init__(self, nombre, edad, email):
        self.nombre = nombre
        self.edad = edad
        self.email = email
```

## 📊 Implementación de @property

```python
# Así funciona @property internamente
class Property:
    def __init__(self, fget=None, fset=None, fdel=None):
        self.fget = fget
        self.fset = fset
        self.fdel = fdel
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        if self.fget is None:
            raise AttributeError("unreadable attribute")
        return self.fget(obj)
    
    def __set__(self, obj, value):
        if self.fset is None:
            raise AttributeError("can't set attribute")
        self.fset(obj, value)
    
    def __delete__(self, obj):
        if self.fdel is None:
            raise AttributeError("can't delete attribute")
        self.fdel(obj)

class Persona:
    def __init__(self, nombre):
        self._nombre = nombre
    
    def get_nombre(self):
        return self._nombre.upper()
    
    def set_nombre(self, valor):
        self._nombre = valor.strip()
    
    nombre = Property(get_nombre, set_nombre)

p = Persona("ana")
print(p.nombre)  # ANA
p.nombre = "  juan  "
print(p.nombre)  # JUAN
```

## 💡 Ejemplo: Lazy Property

```python
class LazyProperty:
    """Calcula valor solo una vez"""
    def __init__(self, func):
        self.func = func
        self.nombre = func.__name__
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        
        # Calcular valor
        valor = self.func(obj)
        
        # Reemplazar descriptor con valor
        obj.__dict__[self.nombre] = valor
        
        return valor

class Calculadora:
    def __init__(self, n):
        self.n = n
    
    @LazyProperty
    def factorial(self):
        """Se calcula solo la primera vez"""
        print("Calculando factorial...")
        resultado = 1
        for i in range(1, self.n + 1):
            resultado *= i
        return resultado

calc = Calculadora(5)
print(calc.factorial)  # Calculando factorial... 120
print(calc.factorial)  # 120 (no calcula de nuevo)
```

## 🎨 Ejemplo: Atributo de Solo Lectura

```python
class SoloLectura:
    def __init__(self, nombre):
        self.nombre = nombre
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__.get(self.nombre)
    
    def __set__(self, obj, value):
        # Solo permitir set si no existe
        if self.nombre in obj.__dict__:
            raise AttributeError(f"{self.nombre} es de solo lectura")
        obj.__dict__[self.nombre] = value

class Configuracion:
    api_key = SoloLectura("api_key")
    
    def __init__(self, api_key):
        self.api_key = api_key

config = Configuracion("abc123")
print(config.api_key)  # abc123

# config.api_key = "nuevo"  # AttributeError
```

## 🔧 Descriptor de Clase (@classmethod)

```python
# Así funciona @classmethod internamente
class ClassMethod:
    def __init__(self, func):
        self.func = func
    
    def __get__(self, obj, objtype=None):
        if objtype is None:
            objtype = type(obj)
        
        def wrapper(*args, **kwargs):
            return self.func(objtype, *args, **kwargs)
        
        return wrapper

class MiClase:
    @ClassMethod
    def mi_metodo(cls, x):
        return f"Clase: {cls.__name__}, Valor: {x}"

print(MiClase.mi_metodo(42))  # Clase: MiClase, Valor: 42
```

## 💪 Ejemplo: Cache con Timeout

```python
import time

class CachedProperty:
    def __init__(self, func, timeout=60):
        self.func = func
        self.timeout = timeout
        self.nombre = func.__name__
        self.cache_key = f"_{self.nombre}_cache"
        self.time_key = f"_{self.nombre}_time"
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        
        # Verificar cache
        ahora = time.time()
        cache_time = obj.__dict__.get(self.time_key, 0)
        
        if ahora - cache_time > self.timeout:
            # Cache expirado - recalcular
            valor = self.func(obj)
            obj.__dict__[self.cache_key] = valor
            obj.__dict__[self.time_key] = ahora
        
        return obj.__dict__[self.cache_key]

class API:
    def __init__(self):
        self.llamadas = 0
    
    @CachedProperty
    def datos(self):
        """Se recalcula cada 60 segundos"""
        self.llamadas += 1
        print(f"Llamada API #{self.llamadas}")
        return {"resultado": "datos"}

api = API()
print(api.datos)  # Llamada API #1
print(api.datos)  # (usa cache)
time.sleep(61)
print(api.datos)  # Llamada API #2 (cache expiró)
```

## 💪 Ejercicio

```python
# Crea un descriptor que convierta strings a mayúsculas
# automáticamente al asignar

class MayusculaAuto:
    pass

class Usuario:
    nombre = MayusculaAuto()
    ciudad = MayusculaAuto()

u = Usuario()
u.nombre = "ana"
print(u.nombre)  # "ANA"
```

<details>
<summary>✅ Solución</summary>

```python
class MayusculaAuto:
    def __set_name__(self, owner, name):
        self.nombre = f"_{name}"
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.nombre, "")
    
    def __set__(self, obj, value):
        if not isinstance(value, str):
            raise TypeError("Debe ser string")
        setattr(obj, self.nombre, value.upper())

class Usuario:
    nombre = MayusculaAuto()
    ciudad = MayusculaAuto()

u = Usuario()
u.nombre = "ana"
u.ciudad = "madrid"
print(u.nombre)  # "ANA"
print(u.ciudad)  # "MADRID"
```
</details>

## 🔗 Temas Relacionados

- [Clases](../intermedio/clases)
- [Métodos Especiales](../intermedio/metodos-especiales)
- [Metaclases](./metaclases)

## 📚 Recursos Adicionales

- [Descriptor Guide](https://docs.python.org/3/howto/descriptor.html)
- [Data Model](https://docs.python.org/3/reference/datamodel.html#descriptors)

---

> 💡 **Tip**: @property es un descriptor. Descriptores son la base de muchas características de Python.
