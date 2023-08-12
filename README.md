
# Link Bud App (BackEnd)

Link bud app es un servicio que permite crear listas de enlaces para compartir. 

Hechale un vistazo a la **[idea original](https://projectbook.code.brettchalupa.com/web-apps/linkbud.html)**. 

Con esta API puedes [agregar](#crear-lista), [editar](#editar-lista) y [eliminar listas](#eliminar-lista). 
Para cada lista que crees obtendras un enlace que redirigira a tu lista.

#### Nota: 
Esta API está hecha únicamente con fines educativos, que busca poner en practica mi conocimiento de Node Js. En este servicio utilicé autenticación mediante **JWT** y conexión a base de datos utilizando **Sequelize**. \
La idea es conectarla con un cliente creado en **Angular** el cuál aún esta en proceso de desarrollo.

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

En la raiz del proyecto encontraras un archivo con el nombre **.example.env***, elimina la cadena **".example"**, el resultado debería ser "**.env**".

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
Remplaza los valores correspondientes con tus datos.

## Base de datos
Aunque en un principio tenia pensado agregar migraciones, todavía no me ha sido posible hacerlo, aún
así puedes crear las tablas de la base de datos corriendo el archivo **linkbud_app.sql** en la heramienta de administración de base de datos que prefieras.

## Endpoints

#### Registrarse

```http
POST /api/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Tu email |
| `password` | `string` | **Required**. Tu contraseña |

##### Respuesta:
```
{
 "msg": "usuario creado correctamente",
 "user": {
  "id": 2,
  "email": "user@gmail.com",
  "updatedAt": "2022-11-24T22:58:11.292Z",
  "createdAt": "2022-11-24T22:58:11.292Z"
 }
}
```

#### Autenticarse

```http
POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. Tu email |
| `password` | `string` | **Required**. Tu contraseña |

##### Respuesta:
```
{
 "user": {
  "id": 1,
  "email": "user@gmail.com",
  "createdAt": "2022-11-14T18:59:21.000Z",
  "updatedAt": "2022-11-14T18:59:21.000Z"
 },
 "token":"eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTMzMTI0NCwiaWF0IjoxNjY5MzMxMjQ0fQ"
}
```

Al autenticarse se retornara el **token** correspondiente para el usuario
con una duración de 4 horas. 

**Nota:** Es obligatorio enviar el header ```x-token``` con el token del usuario autenticado.
De lo contario no será posible crear ninguna lista.


<a name="crear-lista"></a>

#### Crear una lista
```http
POST /api/list
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-token` | `header` | **Required**. Token del usuario |
| `title` | `string` | **Required**. Titulo de la lista |
| `description` | `string` | **Required**. Breve descripción de la lista |
| `urls` | `array` | **Required**. Arreglo con los enlaces a guardar en la lista |

##### Respuesta:
```
{
 "msg": "lista creada correctamente",
  "list": {
   "id": 14,
   "title": "mejores frameworks",
   "description": "los mejores frameworks del mundo",
   "urls":[
    "laravel.com",
    "springboot.com",
    "nextjs.com"
   ],
  "slug": "mejores-frameworks",
  "url_list": "https://hostname.com/2/mejores-frameworks",
  "user_id": 2,
  "updatedAt": "2022-11-24T23:22:41.874Z",
  "createdAt": "2022-11-24T23:22:41.874Z"
 }
}
```

<a name="editar-lista"></a>

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
| `urls` | `array` | **Optional**. Arreglo con los enlaces a guardar en la lista |

##### Respuesta:
```
{
 "msg": "lista actualizada correctamente",
  "list": {
   "id": 14,
   "title": "mejores frameworks del 2022",
   "description": "los mejores frameworks del mundo",
   "urls":[
    "laravel.com",
    "springboot.com",
    "nextjs.com"
   ],
  "slug": "mejores-frameworks-del-2022",
  "url_list": "https://hostname.com/2/mejores-frameworks-del-2022",
  "user_id": 2,
  "updatedAt": "2022-11-24T23:22:41.874Z",
  "createdAt": "2022-11-24T23:22:41.874Z"
 }
}
```


#### Obtener las listas de un usuario
```http
GET /api/list/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **Required**. Id del usuario |

##### Respuesta:
```
{
 "total": 1,
 "lists": [
  {
   "id": 14,
   "title": "mejores frameworks del 2022",
   "description": "los mejores frameworks del mundo",
   "slug": "mejores-frameworks-del-2022",
   "url_list": "https://hostname.com/2/mejores-frameworks-del-2022",
   "user": "user@gmail.com",
   "createdAt": "2022-11-24T23:22:41.000Z"
  }
 ]
}
```
<a name="eliminar-lista"></a>

#### Eliminar una lista
```http
DELETE /api/list/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **Required**. Id de la lista |

##### Respuesta:
```
{
 "msg": "lista eliminada correctamente"
}
```
