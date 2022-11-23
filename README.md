
# Link Bud App

Link bud app es un servicio permite crear listas de enlaces para guardar y compartir.


## Guia Instalación


Clonar el repositorio

```bash
git clone https://github.com/Totem-Incinerator/link-bud-app.git
cd link-bud-app
```

Instalar las dependencias
```bash
npm install
```

Encontrarás un archivo **.example.env***, elimina la cadena **".example"**, el resultado debería ser "**.env**".

El archivo contendra lo siguiente:
```enviroment
PORT=8080

#DATABASE SETTINGS
DB_USER=YOUR_DATABASE_USER
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_NAME=YOUR_DATABASE_NAME
DB_DIALECT=YOUR_DATABASE_TYPE | mysql | postgres 
DB_HOST=localhost

#LLAVE
SECRET_KEY=YOUR_SECRET_KEY
```
Remplaza los campos con tus configuraciones


## API Reference

#### Registrarse

```http
  POST /api/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Tu email |
| `password` | `string` | **Required**. Tu contraseña |

#### Autenticarse

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. Tu email |
| `password` | `string` | **Required**. Tu contraseña |

Al autenticarse se retornara el **token** correspondiente para el usuario
con una duración de 4 horas. 

**Nota:** Es obligatorio enviar el header ```x-token``` con el token del usuario autenticado.
De lo contario no será posible crear ninguna lista.


#### Crear una lista
```http
  POST /api/list
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-token` | `header` | **Required**. Token del usuario |
| `title` | `string` | **Required**. Titulo de la lista |
| `description` | `string` | **Required**. Breve descripción de la lista |
| `slug` | `string` | **Required**. Enlace personalizado para la lista |
| `urls` | `array` | **Required**. Arreglo con los enlaces a guardar en la lista |
| `user_id` | `integer` | **Required**. Id del usuario que crea la lista |


#### Actualizar una lista
```http
  PUT /api/list/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-token` | `header` | **Required**. Token del usuario |
| `id` | `integer` | **Required**. Id de la lista |
| `title` | `string` | **Optional**. Titulo de la lista |
| `description` | `string` | **Optional**. Breve descripción de la lista |
| `slug` | `string` | **Optional**. Enlace personalizado para la lista |
| `urls` | `array` | **Optional**. Arreglo con los enlaces a guardar en la lista |
| `user_id` | `integer` | **Optional**. Id del usuario que crea la lista |

#### Obtener las listas de un usuario
```http
  GET /api/list/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **Required**. Id del usuario |

#### Eliminar una lista
```http
  DELETE /api/list/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **Required**. Id de la lista |