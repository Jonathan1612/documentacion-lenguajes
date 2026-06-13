---
title: "Fechas y Tiempos (datetime)"
level: intermedio
category: stdlib
tags: [python, datetime, time, date, timedelta]
duration: 25min
prerequisites: [modulos]
---

# Fechas y Tiempos con datetime

## 📅 datetime - Fecha y Hora

```python
from datetime import datetime, date, time, timedelta

# Fecha y hora actual
ahora = datetime.now()
print(ahora)  # 2026-06-06 14:30:25.123456

# Fecha actual
hoy = date.today()
print(hoy)  # 2026-06-06

# Crear fecha específica
fecha = datetime(2026, 6, 6, 14, 30, 0)
print(fecha)  # 2026-06-06 14:30:00

# Solo fecha
mi_fecha = date(2026, 12, 25)
print(mi_fecha)  # 2026-12-25

# Solo hora
mi_hora = time(14, 30, 45)
print(mi_hora)  # 14:30:45
```

## 🎨 Formatear Fechas (strftime)

```python
from datetime import datetime

ahora = datetime.now()

# Formatos comunes
print(ahora.strftime("%Y-%m-%d"))          # 2026-06-06
print(ahora.strftime("%d/%m/%Y"))          # 06/06/2026
print(ahora.strftime("%B %d, %Y"))         # June 06, 2026
print(ahora.strftime("%H:%M:%S"))          # 14:30:25
print(ahora.strftime("%I:%M %p"))          # 02:30 PM
print(ahora.strftime("%A, %d de %B"))      # Saturday, 06 de June

# Códigos comunes:
# %Y - Año (4 dígitos)    %m - Mes (01-12)      %d - Día (01-31)
# %H - Hora 24h (00-23)   %I - Hora 12h (01-12) %M - Minuto (00-59)
# %S - Segundo (00-59)    %p - AM/PM            %A - Día semana
# %B - Mes completo       %b - Mes abreviado    %a - Día abreviado
```

## 📖 Parsear Strings (strptime)

```python
from datetime import datetime

# String a datetime
fecha_str = "2026-06-06"
fecha = datetime.strptime(fecha_str, "%Y-%m-%d")
print(fecha)  # 2026-06-06 00:00:00

# Diferentes formatos
fecha1 = datetime.strptime("06/06/2026", "%d/%m/%Y")
fecha2 = datetime.strptime("June 6, 2026", "%B %d, %Y")
fecha3 = datetime.strptime("2026-06-06 14:30", "%Y-%m-%d %H:%M")
```

## ⏱️ timedelta - Diferencias de Tiempo

```python
from datetime import datetime, timedelta

ahora = datetime.now()

# Sumar/restar tiempo
mañana = ahora + timedelta(days=1)
ayer = ahora - timedelta(days=1)
proxima_semana = ahora + timedelta(weeks=1)
en_2_horas = ahora + timedelta(hours=2)

# Combinaciones
fecha_futura = ahora + timedelta(days=7, hours=3, minutes=30)

# Diferencia entre fechas
fecha1 = datetime(2026, 6, 6)
fecha2 = datetime(2026, 12, 25)
diferencia = fecha2 - fecha1

print(diferencia.days)      # 202 días
print(diferencia.seconds)   # 0 segundos adicionales
print(diferencia.total_seconds())  # Total en segundos
```

## 💡 Ejemplo: Calculadora de Edad

```python
from datetime import datetime, date

def calcular_edad(fecha_nacimiento):
    """Calcula edad a partir de fecha de nacimiento"""
    hoy = date.today()
    
    # Si es string, parsear
    if isinstance(fecha_nacimiento, str):
        fecha_nacimiento = datetime.strptime(fecha_nacimiento, "%Y-%m-%d").date()
    
    edad = hoy.year - fecha_nacimiento.year
    
    # Ajustar si aún no cumplió años este año
    if (hoy.month, hoy.day) < (fecha_nacimiento.month, fecha_nacimiento.day):
        edad -= 1
    
    return edad

# Uso
edad = calcular_edad("2000-03-15")
print(f"Edad: {edad} años")

# Con date
fecha_nac = date(1995, 7, 20)
print(f"Edad: {calcular_edad(fecha_nac)} años")
```

## 📊 Atributos de datetime

```python
from datetime import datetime

ahora = datetime.now()

print(ahora.year)       # 2026
print(ahora.month)      # 6
print(ahora.day)        # 6
print(ahora.hour)       # 14
print(ahora.minute)     # 30
print(ahora.second)     # 25
print(ahora.microsecond)  # 123456
print(ahora.weekday())    # 5 (0=Lunes, 6=Domingo)
print(ahora.isoweekday()) # 6 (1=Lunes, 7=Domingo)
```

## 🌍 Zonas Horarias (timezone)

```python
from datetime import datetime, timezone, timedelta

# UTC
ahora_utc = datetime.now(timezone.utc)
print(ahora_utc)

# Zona horaria personalizada
zona_madrid = timezone(timedelta(hours=2))  # UTC+2 (verano)
ahora_madrid = datetime.now(zona_madrid)
print(ahora_madrid)

# Convertir entre zonas
utc_time = datetime(2026, 6, 6, 12, 0, tzinfo=timezone.utc)
madrid_offset = timezone(timedelta(hours=2))
madrid_time = utc_time.astimezone(madrid_offset)
print(madrid_time)  # 2026-06-06 14:00:00+02:00
```

## ⏲️ time - Medición de Tiempo

```python
import time

# Timestamp Unix (segundos desde 1970-01-01)
timestamp = time.time()
print(timestamp)  # 1717675825.123456

# Pausar ejecución
print("Esperando...")
time.sleep(2)  # Pausa 2 segundos
print("Continuando")

# Medir tiempo de ejecución
inicio = time.time()
# ... código a medir ...
sum(range(1000000))
fin = time.time()
print(f"Tiempo: {fin - inicio:.4f} segundos")
```

## 💡 Ejemplo: Sistema de Recordatorios

```python
from datetime import datetime, timedelta

class Recordatorio:
    def __init__(self, titulo, fecha_hora):
        self.titulo = titulo
        self.fecha_hora = fecha_hora
    
    def tiempo_restante(self):
        """Retorna tiempo restante hasta el recordatorio"""
        ahora = datetime.now()
        if self.fecha_hora < ahora:
            return "¡Vencido!"
        
        diferencia = self.fecha_hora - ahora
        dias = diferencia.days
        horas = diferencia.seconds // 3600
        minutos = (diferencia.seconds % 3600) // 60
        
        if dias > 0:
            return f"{dias} días, {horas} horas"
        elif horas > 0:
            return f"{horas} horas, {minutos} minutos"
        else:
            return f"{minutos} minutos"
    
    def __str__(self):
        fecha_str = self.fecha_hora.strftime("%d/%m/%Y %H:%M")
        return f"[{fecha_str}] {self.titulo} - Faltan: {self.tiempo_restante()}"

# Crear recordatorios
recordatorios = [
    Recordatorio("Reunión", datetime.now() + timedelta(hours=2)),
    Recordatorio("Dentista", datetime.now() + timedelta(days=3)),
    Recordatorio("Cumpleaños Ana", datetime(2026, 7, 15, 18, 0)),
]

for rec in recordatorios:
    print(rec)
```

## 📅 calendar - Trabajar con Calendarios

```python
import calendar

# Mes completo
print(calendar.month(2026, 6))

# Año completo
print(calendar.calendar(2026))

# Día de la semana (0=Lunes)
dia = calendar.weekday(2026, 6, 6)
print(dia)  # 5 (Sábado)

# ¿Es año bisiesto?
print(calendar.isleap(2024))  # True
print(calendar.isleap(2026))  # False

# Días en mes
dias = calendar.monthrange(2026, 2)  # (weekday, days)
print(dias)  # (6, 28) -> Febrero 2026 empieza Domingo, tiene 28 días
```

## 💪 Ejercicio

```python
# Crea una función que calcule días hábiles entre dos fechas
# (excluyendo sábados y domingos)
def dias_habiles(fecha_inicio, fecha_fin):
    pass
```

<details>
<summary>✅ Solución</summary>

```python
from datetime import datetime, timedelta

def dias_habiles(fecha_inicio, fecha_fin):
    if isinstance(fecha_inicio, str):
        fecha_inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d")
    if isinstance(fecha_fin, str):
        fecha_fin = datetime.strptime(fecha_fin, "%Y-%m-%d")
    
    dias = 0
    fecha_actual = fecha_inicio
    
    while fecha_actual <= fecha_fin:
        # 0-4 son Lunes-Viernes
        if fecha_actual.weekday() < 5:
            dias += 1
        fecha_actual += timedelta(days=1)
    
    return dias

print(dias_habiles("2026-06-01", "2026-06-30"))  # ~22 días
```
</details>

## 🔗 Temas Relacionados

- [Módulos](./modulos)
- [Strings](../basico/strings)

## 📚 Recursos Adicionales

- [datetime](https://docs.python.org/3/library/datetime.html)
- [time](https://docs.python.org/3/library/time.html)

---

> 💡 **Tip**: Usa `datetime.now()` para incluir hora, `date.today()` solo para fecha.
