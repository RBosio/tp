# Propuesta TP TTADS

## Grupo
### Integrantes
* 46812 - Bosio, Rocco

### Repositorios
* [fullstack app](https://github.com/RBosio/tp-ad-ttads-bosio)

## Tema
### Descripción
Sistema de hotelería

### Modelo
![DER](./DER.svg)

## Alcance Funcional 

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Tipo Habitacion|
|CRUD dependiente|1. CRUD Habitación {depende de} CRUD Tipo Habitacion<br>|
|Listado<br>+<br>detalle| 1. Listado de reservas filtrado por estado muestra nro de habitación, fecha inicio y fin estadía, estado y nombre del cliente => detalle muestra datos completos de la reserva y del cliente|
|CUU/Epic|1. Reservar una habitacion para la estadía|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Tipo Habitacion<br>2. CRUD Extras<br>3. CRUD Localidad<br>4. CRUD Provincia<br>5. CRUD Pais<br>6. CRUD Habitación<br>7. CRUD Cliente<br>8. CRUD Rol|
|CUU/Epic|1. Reservar una habitación para la estadía<br>2. Realizar el check-in de una reserva<br>3. Realizar el check-out y facturación de estadía y servicios|


### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados ||
|CUU/Epic|1. Cancelación de reserva|
|Otros|1. Carga de imágenes<br>2. Log de inicio de sesion|