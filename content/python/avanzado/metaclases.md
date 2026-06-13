---
title: "Metaclases"
level: avanzado
category: metaprogramación
tags: [python, metaclass, type, __new__, __init__]
duration: 40min
prerequisites: [clases, herencia]
---

# Metaclases en Python

## 📋 ¿Qué son las Metaclases?

Las metaclases son "clases de clases". Definen cómo se crean las clases.

```python
# Todo en Python es objeto
class MiClase:
    pass

# MiClase es instancia de type
print(type(MiClase))  # <class 'type'>

# type es la metaclase por defecto
print(type(type))     # <class 'type'>
```

## 🔧 type() - Crear Clases Dinámicamente

```python
# Forma normal
class Persona:
    def saludar(self):
        return "Hola"

# Con type()
def saludar(self):
    return "Hola"

# type(nombre, bases, dict)
Persona = type('Persona', (), {'saludar': saludar})

p = Persona()
print(p.saludar())  # "Hola"

# Con herencia
class Animal:
    def respirar(self):
        return "Respirando"

Perro = type('Perro', (Animal,), {
    'ladrar': lambda self: "Guau"
})

d = Perro()
print(d.respirar())  # "Respirando"
print(d.ladrar())    # "Guau"
```

## 🎯 Metaclase Personalizada

```python
class MiMetaclase(type):
    def __new__(mcs, name, bases, attrs):
        """Se llama cuando se crea la clase"""
        print(f"Creando clase: {name}")
        
        # Modificar atributos
        attrs['creada_por_metaclase'] = True
        
        # Crear la clase
        return super().__new__(mcs, name, bases, attrs)
    
    def __init__(cls, name, bases, attrs):
        """Se llama después de crear la clase"""
        print(f"Inicializando clase: {name}")
        super().__init__(name, bases, attrs)

# Usar metaclase
class MiClase(metaclass=MiMetaclase):
    pass

# Salida:
# Creando clase: MiClase
# Inicializando clase: MiClase

print(MiClase.creada_por_metaclase)  # True
```

## 💡 Ejemplo: Validación Automática

```python
class ValidacionMeta(type):
    """Asegura que todas las clases tengan método validar()"""
    
    def __new__(mcs, name, bases, attrs):
        # Verificar que existe método validar
        if 'validar' not in attrs:
            raise TypeError(f"La clase {name} debe definir método 'validar'")
        
        return super().__new__(mcs, name, bases, attrs)

# ❌ Error - Falta validar()
# class Usuario(metaclass=ValidacionMeta):
#     pass

# ✅ OK - Tiene validar()
class Usuario(metaclass=ValidacionMeta):
    def __init__(self, nombre):
        self.nombre = nombre
    
    def validar(self):
        return len(self.nombre) > 0
```

## 🔄 Ejemplo: Singleton con Metaclase

```python
class SingletonMeta(type):
    """Asegura que solo existe una instancia de la clase"""
    _instancias = {}
    
    def __call__(cls, *args, **kwargs):
        """Se llama cuando se crea una instancia"""
        if cls not in cls._instancias:
            instancia = super().__call__(*args, **kwargs)
            cls._instancias[cls] = instancia
        return cls._instancias[cls]

class BaseDatos(metaclass=SingletonMeta):
    def __init__(self):
        print("Conectando a BD...")

# Solo se conecta una vez
db1 = BaseDatos()  # Conectando a BD...
db2 = BaseDatos()  # (no imprime)
print(db1 is db2)  # True (misma instancia)
```

## 📊 Ejemplo: Auto-registro de Clases

```python
class RegistroMeta(type):
    """Registra automáticamente todas las clases creadas"""
    registro = {}
    
    def __new__(mcs, name, bases, attrs):
        cls = super().__new__(mcs, name, bases, attrs)
        
        # Registrar clase
        mcs.registro[name] = cls
        
        return cls

class Animal(metaclass=RegistroMeta):
    pass

class Perro(Animal):
    pass

class Gato(Animal):
    pass

# Ver clases registradas
print(RegistroMeta.registro)
# {'Animal': <class 'Animal'>, 'Perro': <class 'Perro'>, 'Gato': <class 'Gato'>}
```

## 🎨 Ejemplo: Añadir Métodos Automáticamente

```python
class PropiedadesMeta(type):
    """Añade propiedades getter/setter automáticamente"""
    
    def __new__(mcs, name, bases, attrs):
        # Buscar atributos que empiezan con _
        for attr_name, attr_value in list(attrs.items()):
            if attr_name.startswith('_') and not attr_name.startswith('__'):
                prop_name = attr_name[1:]  # Quitar _
                
                # Crear getter
                def make_getter(attr):
                    def getter(self):
                        return getattr(self, attr)
                    return getter
                
                # Crear setter
                def make_setter(attr):
                    def setter(self, value):
                        setattr(self, attr, value)
                    return setter
                
                # Añadir property
                attrs[prop_name] = property(
                    make_getter(attr_name),
                    make_setter(attr_name)
                )
        
        return super().__new__(mcs, name, bases, attrs)

class Persona(metaclass=PropiedadesMeta):
    def __init__(self, nombre, edad):
        self._nombre = nombre
        self._edad = edad

p = Persona("Ana", 25)
print(p.nombre)  # "Ana" (usa getter)
p.edad = 26      # Usa setter
print(p.edad)    # 26
```

## 🔧 __init_subclass__ - Alternativa Moderna

```python
# Alternativa más simple a metaclases (Python 3.6+)
class RegistroClase:
    subclases = []
    
    def __init_subclass__(cls, **kwargs):
        """Se llama cuando se crea una subclase"""
        super().__init_subclass__(**kwargs)
        cls.subclases.append(cls)
        print(f"Registrada: {cls.__name__}")

class Animal(RegistroClase):
    pass

class Perro(Animal):
    pass

class Gato(Animal):
    pass

print(Animal.subclases)
# [<class 'Perro'>, <class 'Gato'>]
```

## 💡 Ejemplo: ORM Simple

```python
class ModelMeta(type):
    """Metaclase para modelos de BD"""
    
    def __new__(mcs, name, bases, attrs):
        # Recolectar campos
        campos = {}
        for key, value in attrs.items():
            if isinstance(value, Campo):
                campos[key] = value
                value.nombre = key
        
        attrs['_campos'] = campos
        
        return super().__new__(mcs, name, bases, attrs)

class Campo:
    def __init__(self, tipo):
        self.tipo = tipo
        self.nombre = None

class Modelo(metaclass=ModelMeta):
    def __init__(self, **kwargs):
        for campo, valor in kwargs.items():
            setattr(self, campo, valor)
    
    def guardar(self):
        campos_valores = {
            campo: getattr(self, campo, None)
            for campo in self._campos
        }
        print(f"Guardando {self.__class__.__name__}: {campos_valores}")

# Uso
class Usuario(Modelo):
    nombre = Campo(str)
    edad = Campo(int)
    email = Campo(str)

usuario = Usuario(nombre="Ana", edad=25, email="ana@mail.com")
usuario.guardar()
# Guardando Usuario: {'nombre': 'Ana', 'edad': 25, 'email': 'ana@mail.com'}
```

## ⚠️ Cuándo NO Usar Metaclases

```python
# ❌ Uso innecesario
class MiMeta(type):
    def __new__(mcs, name, bases, attrs):
        attrs['version'] = '1.0'
        return super().__new__(mcs, name, bases, attrs)

# ✅ Mejor alternativa
class MiClase:
    version = '1.0'
```

> **"Metaclasses are deeper magic than 99% of users should ever worry about."** - Tim Peters

## 💪 Ejercicio

```python
# Crea una metaclase que cuente cuántas instancias
# se han creado de cada clase

class ContadorMeta(type):
    pass

class Usuario(metaclass=ContadorMeta):
    pass

u1 = Usuario()
u2 = Usuario()
u3 = Usuario()
print(Usuario.contador_instancias)  # 3
```

<details>
<summary>✅ Solución</summary>

```python
class ContadorMeta(type):
    def __new__(mcs, name, bases, attrs):
        cls = super().__new__(mcs, name, bases, attrs)
        cls.contador_instancias = 0
        return cls
    
    def __call__(cls, *args, **kwargs):
        instancia = super().__call__(*args, **kwargs)
        cls.contador_instancias += 1
        return instancia

class Usuario(metaclass=ContadorMeta):
    pass

u1 = Usuario()
u2 = Usuario()
u3 = Usuario()
print(Usuario.contador_instancias)  # 3
```
</details>

## 🔗 Temas Relacionados

- [Clases](../intermedio/clases)
- [Descriptores](./descriptores)

## 📚 Recursos Adicionales

- [Metaclasses](https://docs.python.org/3/reference/datamodel.html#metaclasses)
- [PEP 3115](https://www.python.org/dev/peps/pep-3115/)

---

> 💡 **Tip**: Usa metaclases solo cuando realmente las necesites. Generalmente hay alternativas más simples.
