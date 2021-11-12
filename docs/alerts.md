## LISTAR ALERTAS:

Listar alertas

#### URL  [POST] /api/v1/alerts/list

#### REQUEST:
```json
{
  "data": {
    "filters": {
      "search": "XYZ", // opcional
      "deviceId": 1 // opcional
    }
  },
  "_channel": "web"
}
```

#### RESPONSE:
```json
{
  "statusCode": 200,
  "message": "Successful",
  "data": {
    "Alerts": [{
      "id": 1,
      "Status": {
        "color": "red",
        "name": "Pendiente de respuesta"
      },
      "Device": {
        "id": 123,
        "name": "Lenovo"
      },
      "Detail": {
        "description": "El equipo no se prende hace 3 días",
        "createdAt": "2020-10-20"
      }
    }]
  },
  "_channel": "web"
}
```



#### URL  [POST] /api/v1/alerts/update

## Cambiar Status

Servicio que permite cambiar el estado de una alerta

#### REQUEST:
```json
{
  "data": {
    "deviceLogId": 1,
    "description": "Descripción",
    "status": 100 // peding
  },
  "_channel": "web"
}
```

#### RESPONSE:
```json
{
  "statusCode": 200,
  "message": "Successful",
  "data": null,
  "_channel": "web"
}
```


