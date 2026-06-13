---
title: "Testing y Pruebas"
level: avanzado
category: calidad
tags: [python, testing, pytest, unittest, tdd, mocking]
duration: 40min
prerequisites: [funciones, clases]
---

# Testing en Python

## 🧪 ¿Por qué Testing?

```python
# Sin tests
def calcular_promedio(numeros):
    return sum(numeros) / len(numeros)

# ¿Qué pasa con lista vacía? ¿Con None? ¿Con strings?
```

## 📋 unittest - Built-in

```python
import unittest

def sumar(a, b):
    return a + b

class TestSumar(unittest.TestCase):
    def test_suma_positivos(self):
        self.assertEqual(sumar(2, 3), 5)
    
    def test_suma_negativos(self):
        self.assertEqual(sumar(-2, -3), -5)
    
    def test_suma_mixta(self):
        self.assertEqual(sumar(10, -5), 5)

if __name__ == '__main__':
    unittest.main()
```

## ✅ Assertions Comunes

```python
import unittest

class TestAssertions(unittest.TestCase):
    def test_igualdad(self):
        self.assertEqual(2 + 2, 4)
        self.assertNotEqual(2 + 2, 5)
    
    def test_verdadero(self):
        self.assertTrue(5 > 3)
        self.assertFalse(5 < 3)
    
    def test_none(self):
        valor = None
        self.assertIsNone(valor)
        self.assertIsNotNone(42)
    
    def test_contenido(self):
        lista = [1, 2, 3]
        self.assertIn(2, lista)
        self.assertNotIn(5, lista)
    
    def test_excepciones(self):
        with self.assertRaises(ZeroDivisionError):
            resultado = 10 / 0
```

## 🎯 pytest - Más Moderno

```bash
# Instalar
pip install pytest

# Ejecutar tests
pytest
pytest test_archivo.py
pytest -v  # verbose
```

```python
# test_matematicas.py
def sumar(a, b):
    return a + b

def test_suma_positivos():
    assert sumar(2, 3) == 5

def test_suma_negativos():
    assert sumar(-2, -3) == -5

def test_suma_cero():
    assert sumar(5, 0) == 5
```

## 💡 Fixtures - Setup y Teardown

```python
import pytest

@pytest.fixture
def datos():
    """Se ejecuta antes de cada test"""
    return [1, 2, 3, 4, 5]

def test_suma(datos):
    assert sum(datos) == 15

def test_longitud(datos):
    assert len(datos) == 5

# Fixture con setup y cleanup
@pytest.fixture
def archivo_temp():
    # Setup
    archivo = open("temp.txt", "w")
    archivo.write("datos de prueba")
    archivo.close()
    
    # Test usa el archivo
    yield "temp.txt"
    
    # Cleanup
    import os
    os.remove("temp.txt")

def test_leer_archivo(archivo_temp):
    with open(archivo_temp) as f:
        contenido = f.read()
    assert "datos" in contenido
```

## 🎨 Parametrize - Múltiples Casos

```python
import pytest

@pytest.mark.parametrize("entrada,esperado", [
    (2, 4),
    (3, 9),
    (4, 16),
    (5, 25),
])
def test_cuadrado(entrada, esperado):
    assert entrada ** 2 == esperado

# Múltiples parámetros
@pytest.mark.parametrize("a,b,esperado", [
    (1, 1, 2),
    (2, 3, 5),
    (10, -5, 5),
    (0, 0, 0),
])
def test_sumar(a, b, esperado):
    assert a + b == esperado
```

## 🔧 Mocking - Simular Dependencias

```python
from unittest.mock import Mock, patch
import requests

def obtener_datos_api():
    """Función que llama a API externa"""
    respuesta = requests.get("https://api.ejemplo.com/datos")
    return respuesta.json()

# Test con mock
def test_obtener_datos_api():
    with patch('requests.get') as mock_get:
        # Configurar mock
        mock_get.return_value.json.return_value = {"resultado": "éxito"}
        
        # Ejecutar función
        datos = obtener_datos_api()
        
        # Verificar
        assert datos["resultado"] == "éxito"
        mock_get.assert_called_once_with("https://api.ejemplo.com/datos")
```

## 💪 Ejemplo Completo: Calculadora

```python
# calculadora.py
class Calculadora:
    def sumar(self, a, b):
        return a + b
    
    def restar(self, a, b):
        return a - b
    
    def multiplicar(self, a, b):
        return a * b
    
    def dividir(self, a, b):
        if b == 0:
            raise ValueError("No se puede dividir por cero")
        return a / b

# test_calculadora.py
import pytest
from calculadora import Calculadora

@pytest.fixture
def calc():
    return Calculadora()

class TestCalculadora:
    def test_sumar(self, calc):
        assert calc.sumar(2, 3) == 5
        assert calc.sumar(-1, 1) == 0
    
    def test_restar(self, calc):
        assert calc.restar(5, 3) == 2
        assert calc.restar(3, 5) == -2
    
    def test_multiplicar(self, calc):
        assert calc.multiplicar(2, 3) == 6
        assert calc.multiplicar(-2, 3) == -6
    
    def test_dividir(self, calc):
        assert calc.dividir(6, 2) == 3
        assert calc.dividir(7, 2) == 3.5
    
    def test_dividir_por_cero(self, calc):
        with pytest.raises(ValueError):
            calc.dividir(10, 0)
```

## 📊 Coverage - Cobertura de Código

```bash
# Instalar
pip install pytest-cov

# Ejecutar con coverage
pytest --cov=mi_modulo

# Reporte HTML
pytest --cov=mi_modulo --cov-report=html
```

```python
# test_coverage.py
def funcion_completa(x):
    if x > 0:
        return "positivo"
    elif x < 0:
        return "negativo"
    else:
        return "cero"

# Tests para 100% coverage
def test_positivo():
    assert funcion_completa(5) == "positivo"

def test_negativo():
    assert funcion_completa(-5) == "negativo"

def test_cero():
    assert funcion_completa(0) == "cero"
```

## 🎯 TDD - Test Driven Development

```python
# 1. Escribir test (falla)
def test_validar_email():
    assert validar_email("test@mail.com") == True
    assert validar_email("invalido") == False

# 2. Implementar mínimo para pasar
def validar_email(email):
    return "@" in email

# 3. Refactorizar
import re

def validar_email(email):
    patron = r"^[\w.-]+@[\w.-]+\.\w+$"
    return re.match(patron, email) is not None
```

## 💡 Ejemplo: Sistema de Usuarios

```python
# usuarios.py
class BaseDatosUsuarios:
    def __init__(self):
        self.usuarios = {}
    
    def crear_usuario(self, id, nombre, email):
        if id in self.usuarios:
            raise ValueError("Usuario ya existe")
        
        if not email or "@" not in email:
            raise ValueError("Email inválido")
        
        self.usuarios[id] = {
            "nombre": nombre,
            "email": email
        }
    
    def obtener_usuario(self, id):
        return self.usuarios.get(id)
    
    def total_usuarios(self):
        return len(self.usuarios)

# test_usuarios.py
import pytest
from usuarios import BaseDatosUsuarios

@pytest.fixture
def db():
    return BaseDatosUsuarios()

class TestBaseDatosUsuarios:
    def test_crear_usuario(self, db):
        db.crear_usuario(1, "Ana", "ana@mail.com")
        usuario = db.obtener_usuario(1)
        
        assert usuario is not None
        assert usuario["nombre"] == "Ana"
        assert usuario["email"] == "ana@mail.com"
    
    def test_usuario_duplicado(self, db):
        db.crear_usuario(1, "Ana", "ana@mail.com")
        
        with pytest.raises(ValueError, match="Usuario ya existe"):
            db.crear_usuario(1, "Juan", "juan@mail.com")
    
    def test_email_invalido(self, db):
        with pytest.raises(ValueError, match="Email inválido"):
            db.crear_usuario(1, "Ana", "correo_invalido")
    
    def test_usuario_inexistente(self, db):
        usuario = db.obtener_usuario(999)
        assert usuario is None
    
    def test_total_usuarios(self, db):
        assert db.total_usuarios() == 0
        
        db.crear_usuario(1, "Ana", "ana@mail.com")
        assert db.total_usuarios() == 1
        
        db.crear_usuario(2, "Juan", "juan@mail.com")
        assert db.total_usuarios() == 2
```

## 🔄 Monkeypatch - Modificar en Runtime

```python
import pytest

def obtener_variable_entorno():
    import os
    return os.environ.get("API_KEY")

def test_variable_entorno(monkeypatch):
    # Configurar variable temporal
    monkeypatch.setenv("API_KEY", "test_key_123")
    
    assert obtener_variable_entorno() == "test_key_123"
```

## 💪 Ejercicio

```python
# Implementa tests para esta función
def es_palindromo(texto):
    """Retorna True si texto es palíndromo"""
    texto = texto.lower().replace(" ", "")
    return texto == texto[::-1]

# Casos a probar:
# - "Anita lava la tina" -> True
# - "Hola" -> False
# - "" -> True (vacío es palíndromo)
# - "A" -> True
```

<details>
<summary>✅ Solución</summary>

```python
import pytest

def es_palindromo(texto):
    texto = texto.lower().replace(" ", "")
    return texto == texto[::-1]

@pytest.mark.parametrize("texto,esperado", [
    ("Anita lava la tina", True),
    ("Hola", False),
    ("", True),
    ("A", True),
    ("A man a plan a canal Panama", True),
    ("Python", False),
])
def test_es_palindromo(texto, esperado):
    assert es_palindromo(texto) == esperado
```
</details>

## 🔗 Temas Relacionados

- [Funciones](../basico/funciones)
- [Clases](../intermedio/clases)
- [Errores](../basico/errores-debugging)

## 📚 Recursos Adicionales

- [pytest](https://docs.pytest.org/)
- [unittest](https://docs.python.org/3/library/unittest.html)
- [Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)

---

> 💡 **Tip**: Escribe tests para todo código importante. TDD te ayuda a diseñar mejor código.
