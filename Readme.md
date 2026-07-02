Ejecuta el comando de construcción y arranque:
```
docker-compose up --build
```

O en segundo plano:
```
docker-compose up --build -d
```

Verifica que todos los contenedores estén en estado Up:
```
docker-compose ps
```

Para crear los usuarios iniciales (operador y cliente), ejecuta la semilla:
```
docker-compose exec auth-service node dist/seeds/seed.js
```
Accede al frontend en http://localhost y utiliza las credenciales:

| Rol       | Email                | Contraseña   |
|-----------|----------------------|--------------|
| Operador  | admin@example.com    | Admin12345   |
| Cliente   | cliente@example.com  | Cliente123   |

Detener servicios
```
docker-compose down
```

Detener y eliminar volúmenes (borra las bases de datos):
```
docker-compose down -v
```