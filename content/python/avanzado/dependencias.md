---
title: "Gestión de Dependencias"
level: avanzado
category: herramientas
tags: [python, pip, virtualenv, requirements, poetry, venv]
duration: 35min
prerequisites: [modulos]
---

# Gestión de Dependencias en Python

## 📦 pip - Package Installer

```bash
# Instalar paquete
pip install requests

# Versión específica
pip install requests==2.28.0

# Versión mínima
pip install "requests>=2.28.0"

# Múltiples paquetes
pip install requests flask pandas

# Desinstalar
pip uninstall requests

# Listar instalados
pip list

# Actualizar pip
pip install --upgrade pip
```

## 🔧 Entornos Virtuales (venv)

```bash
# Crear entorno virtual
python -m venv mi_entorno

# Activar (Windows)
mi_entorno\Scripts\activate

# Activar (Linux/Mac)
source mi_entorno/bin/activate

# Desactivar
deactivate

# Ver dónde está Python activo
which python  # Linux/Mac
where python  # Windows
```

## 📄 requirements.txt

```bash
# Generar requirements.txt
pip freeze > requirements.txt

# Instalar desde requirements.txt
pip install -r requirements.txt
```

```txt
# requirements.txt
requests==2.28.0
flask==2.3.0
pandas>=1.5.0
numpy
pytest>=7.0.0,<8.0.0
```

## 🎯 requirements.txt Avanzado

```txt
# requirements.txt

# Paquetes de producción
flask==2.3.0
requests==2.28.0
sqlalchemy==2.0.0

# Desde Git
git+https://github.com/usuario/repo.git@branch#egg=paquete

# Local
-e ./mi_paquete_local

# requirements.dev.txt - Solo desarrollo
-r requirements.txt  # Incluir requirements base
pytest==7.4.0
black==23.7.0
mypy==1.5.0
```

## 💡 Estructura de Proyecto

```
mi_proyecto/
├── src/
│   └── mi_paquete/
│       ├── __init__.py
│       └── modulo.py
├── tests/
│   └── test_modulo.py
├── venv/
├── requirements.txt
├── requirements.dev.txt
├── setup.py
└── README.md
```

## 📊 setup.py - Crear Paquete

```python
# setup.py
from setuptools import setup, find_packages

setup(
    name="mi_paquete",
    version="0.1.0",
    author="Tu Nombre",
    author_email="tu@email.com",
    description="Descripción corta",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/usuario/repo",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
    install_requires=[
        "requests>=2.28.0",
        "flask>=2.3.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.4.0",
            "black>=23.7.0",
        ],
    },
)
```

```bash
# Instalar en modo desarrollo
pip install -e .

# Instalar con extras
pip install -e ".[dev]"
```

## 🎨 pyproject.toml - Modern Setup

```toml
# pyproject.toml
[build-system]
requires = ["setuptools>=45", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "mi_paquete"
version = "0.1.0"
description = "Descripción corta"
readme = "README.md"
requires-python = ">=3.8"
license = {text = "MIT"}
authors = [
    {name = "Tu Nombre", email = "tu@email.com"}
]
dependencies = [
    "requests>=2.28.0",
    "flask>=2.3.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.4.0",
    "black>=23.7.0",
]
```

## 🚀 Poetry - Gestor Moderno

```bash
# Instalar poetry
pip install poetry

# Crear proyecto nuevo
poetry new mi_proyecto

# Inicializar en proyecto existente
poetry init

# Añadir dependencia
poetry add requests

# Añadir dependencia de desarrollo
poetry add --group dev pytest

# Instalar todas las dependencias
poetry install

# Actualizar dependencias
poetry update

# Ejecutar en entorno virtual
poetry run python script.py

# Activar shell del entorno
poetry shell
```

## 📦 pyproject.toml con Poetry

```toml
# pyproject.toml (generado por poetry)
[tool.poetry]
name = "mi-proyecto"
version = "0.1.0"
description = "Mi proyecto Python"
authors = ["Tu Nombre <tu@email.com>"]
readme = "README.md"

[tool.poetry.dependencies]
python = "^3.8"
requests = "^2.28.0"
flask = "^2.3.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.4.0"
black = "^23.7.0"
mypy = "^1.5.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

## 🔒 poetry.lock

```bash
# poetry.lock asegura versiones exactas
# Commitear poetry.lock al repositorio

# Instalar exactamente lo del lock
poetry install --no-root

# Actualizar lock file
poetry lock --no-update
```

## 💡 pipenv - Alternativa

```bash
# Instalar pipenv
pip install pipenv

# Crear entorno e instalar
pipenv install requests

# Instalar dev
pipenv install --dev pytest

# Activar entorno
pipenv shell

# Ejecutar comando
pipenv run python script.py

# Ver dependencias
pipenv graph
```

## 🎯 pip-tools - Compilar Requirements

```bash
# Instalar
pip install pip-tools

# requirements.in
# requests
# flask

# Compilar (genera requirements.txt con versiones exactas)
pip-compile requirements.in

# Instalar
pip-sync requirements.txt
```

## 📊 Ejemplo Completo: Proyecto Real

```
mi_app/
├── src/
│   └── mi_app/
│       ├── __init__.py
│       ├── main.py
│       └── utils.py
├── tests/
│   ├── __init__.py
│   └── test_main.py
├── .gitignore
├── README.md
├── pyproject.toml
├── poetry.lock
└── .env.example
```

```toml
# pyproject.toml
[tool.poetry]
name = "mi-app"
version = "1.0.0"
description = "Aplicación de ejemplo"
authors = ["Tu Nombre <tu@email.com>"]

[tool.poetry.dependencies]
python = "^3.9"
requests = "^2.31.0"
python-dotenv = "^1.0.0"
pydantic = "^2.0.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.4.0"
pytest-cov = "^4.1.0"
black = "^23.7.0"
mypy = "^1.5.0"
ruff = "^0.0.285"

[tool.poetry.scripts]
mi-app = "mi_app.main:main"

[tool.black]
line-length = 100
target-version = ['py39']

[tool.mypy]
python_version = "3.9"
warn_return_any = true
warn_unused_configs = true

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
```

## 🔍 Dependencias Seguras

```bash
# Verificar vulnerabilidades
pip install safety
safety check

# Con poetry
poetry export -f requirements.txt | safety check --stdin

# Actualizar paquetes inseguros
pip install --upgrade paquete-vulnerable
```

## 💪 Mejores Prácticas

```bash
# 1. Usar entornos virtuales SIEMPRE
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# 2. Pin versiones en producción
# requirements.txt
flask==2.3.0
requests==2.28.0

# 3. Usar requirements.dev.txt para desarrollo
# requirements.dev.txt
-r requirements.txt
pytest>=7.4.0
black>=23.7.0

# 4. .gitignore
# .gitignore
venv/
*.pyc
__pycache__/
.env
.pytest_cache/

# 5. Documentar dependencias
# README.md
## Instalación
pip install -r requirements.txt
```

## 💪 Ejercicio

```bash
# Crea un proyecto Python con:
# 1. Entorno virtual
# 2. requirements.txt con: requests, flask, pytest
# 3. Instala las dependencias
# 4. Exporta las versiones exactas instaladas
```

<details>
<summary>✅ Solución</summary>

```bash
# 1. Crear entorno virtual
python -m venv venv

# 2. Activar
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate     # Windows

# 3. Crear requirements.txt
echo "requests" > requirements.txt
echo "flask" >> requirements.txt
echo "pytest" >> requirements.txt

# 4. Instalar
pip install -r requirements.txt

# 5. Exportar versiones exactas
pip freeze > requirements-exact.txt

# requirements-exact.txt contendrá:
# requests==2.31.0
# flask==2.3.2
# pytest==7.4.0
# ... y todas sus dependencias
```
</details>

## 🔗 Temas Relacionados

- [Módulos](../intermedio/modulos)
- [Testing](./testing)

## 📚 Recursos Adicionales

- [pip](https://pip.pypa.io/)
- [Poetry](https://python-poetry.org/)
- [virtualenv](https://virtualenv.pypa.io/)

---

> 💡 **Tip**: Usa siempre entornos virtuales. Commitea requirements.txt, NO el entorno.
