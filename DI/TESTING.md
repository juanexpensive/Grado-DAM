# 🧪 Guía de Testing Manual

## ⚡ Configuración Inicial

### 1. Configurar API
```typescript
// src/data/db/config.ts
export const API_CONFIG = {
  BASE_URL: 'https://TU-API-AZURE.azurewebsites.net/api',
  ENDPOINTS: {
    PERSONAS: '/personas',
    DEPARTAMENTOS: '/departamentos',
  },
};
```

### 2. Abrir Consola para Ver Logs
- **Web**: F12 → pestaña Console
- **React Native**: Terminal donde ejecutaste `npm start`

### 3. Ejecutar Aplicación
```bash
npm start
# Luego presiona 'w' para web o escanea QR para móvil
```

## 📋 Tests de Funcionalidad

### ✅ Test 1: Listar Personas

**Pasos**:
1. Abrir la app
2. Ir a "Personas" desde el menú
3. Observar el listado

**Resultado Esperado**:
- ✅ Aparece lista de personas
- ✅ Cada persona muestra: nombre, apellidos, departamento, teléfono, dirección
- ✅ NO se muestran IDs
- ✅ Si es viernes/sábado, solo aparecen > 18 años
- ✅ En consola: `🔄 GET Personas` → `✅ Personas recibidas: X`

**Si falla**:
- Verificar URL de API en `config.ts`
- Verificar que la API esté funcionando
- Revisar consola para ver error específico

---

### ✅ Test 2: Buscar Persona

**Pasos**:
1. En listado de personas
2. Escribir en el campo de búsqueda (ej: "Juan")

**Resultado Esperado**:
- ✅ Filtra personas en tiempo real
- ✅ Busca por nombre, apellidos o departamento
- ✅ Sin llamadas adicionales a la API

**Si falla**:
- Verificar que hay personas en el listado
- Intentar con diferentes términos de búsqueda

---

### ✅ Test 3: Crear Persona

**Pasos**:
1. Ir a "Personas"
2. Presionar botón flotante "+"
3. Llenar formulario:
   ```
   Nombre: Juan
   Apellidos: Pérez García
   Fecha: 1990-05-15
   Dirección: Calle Principal 123
   Teléfono: 123456789
   Foto: https://i.pravatar.cc/500?img=1
   Departamento: [Seleccionar uno]
   ```
4. Presionar "➕ Crear"

**Resultado Esperado**:
- ✅ Muestra alerta "✅ Éxito: Persona creada correctamente"
  - Web: `window.alert`
  - Móvil: Diálogo nativo
- ✅ Vuelve al listado automáticamente
- ✅ La nueva persona aparece en el listado
- ✅ En consola:
  ```
  🔄 POST Persona: https://...
  📦 Payload: {nombre: "Juan", ...}
  ✅ Persona creada con ID: 123
  ```

**Si falla**:
- Verificar que llenaste todos los campos obligatorios (*)
- Verificar que seleccionaste un departamento
- Ver error en consola (❌)
- Verificar endpoint POST en la API

---

### ✅ Test 4: Validaciones de Creación

**Test 4.1 - Campo obligatorio vacío**:
1. Ir a crear persona
2. Dejar "Nombre" vacío
3. Presionar "Crear"

**Resultado Esperado**:
- ✅ Muestra error: "❌ Error: El nombre es obligatorio"
- ✅ NO hace POST a la API
- ✅ Permanece en el formulario

**Test 4.2 - Sin departamento**:
1. Llenar todos los campos excepto departamento
2. Presionar "Crear"

**Resultado Esperado**:
- ✅ Muestra error: "❌ Error: Debe seleccionar un departamento"

**Test 4.3 - Espacios en blanco**:
1. Nombre: "  Juan  " (con espacios)
2. Apellidos: "  Pérez  "
3. Guardar

**Resultado Esperado**:
- ✅ Se guarda como "Juan" y "Pérez" (sin espacios)
- ✅ En consola: `📦 Payload: {nombre: "Juan", apellido: "Pérez"}`

---

### ✅ Test 5: Editar Persona

**Pasos**:
1. En listado, presionar "✏️ Editar" en una persona
2. Cambiar nombre a "Juan Actualizado"
3. Presionar "💾 Actualizar"

**Resultado Esperado**:
- ✅ Formulario cargado con datos actuales
- ✅ Departamento pre-seleccionado correctamente
- ✅ Muestra alerta "✅ Éxito: Persona actualizada correctamente"
- ✅ Vuelve al listado
- ✅ Cambios reflejados en el listado
- ✅ En consola:
  ```
  🔄 GET Persona: https://.../123
  ✅ Persona obtenida: Juan
  🔄 PUT Persona: https://.../123
  📦 Payload: {id: 123, nombre: "Juan Actualizado", ...}
  ✅ Persona actualizada: 123
  ```

**Si falla**:
- Verificar que la persona existe
- Ver error en consola
- Verificar endpoint PUT en la API

---

### ✅ Test 6: Eliminar Persona

**Test 6.1 - Día normal (Lunes-Sábado)**:
1. En listado, presionar "🗑️ Eliminar" en una persona
2. Confirmar eliminación

**Resultado Esperado**:
- ✅ Muestra diálogo de confirmación
  - Título: "Confirmar eliminación"
  - Mensaje: "¿Estás seguro...?"
  - Web: `window.confirm`
  - Móvil: Diálogo nativo
- ✅ Al confirmar:
  - Muestra "✅ Éxito: Persona eliminada correctamente"
  - Desaparece del listado
- ✅ En consola:
  ```
  🔄 DELETE Persona: https://.../123
  ✅ Persona eliminada: 123
  ```

**Test 6.2 - Domingo (Regla de negocio)**:
1. Cambiar fecha del dispositivo a domingo
2. Intentar eliminar una persona

**Resultado Esperado**:
- ✅ Muestra error: "❌ Error: No está permitido eliminar personas los domingos"
- ✅ NO hace DELETE a la API
- ✅ La persona permanece en el listado

---

### ✅ Test 7: Selector de Departamentos

**Test 7.1 - En Web**:
1. Crear/editar persona en navegador web
2. Observar selector de departamento

**Resultado Esperado**:
- ✅ Muestra `<select>` HTML nativo
- ✅ Lista todos los departamentos
- ✅ Funciona con teclado (flechas + Enter)

**Test 7.2 - En Móvil**:
1. Crear/editar persona en móvil
2. Presionar selector de departamento

**Resultado Esperado**:
- ✅ Muestra Alert con lista de opciones
- ✅ Se puede seleccionar y se actualiza

---

### ✅ Test 8: Crear Departamento

**Pasos**:
1. Ir a "Departamentos"
2. Presionar botón "+"
3. Nombre: "Marketing Digital"
4. Presionar "➕ Crear"

**Resultado Esperado**:
- ✅ Muestra alerta de éxito
- ✅ Aparece en el listado
- ✅ En consola:
  ```
  🔄 POST Departamento: https://...
  📦 Payload: {nombre: "Marketing Digital"}
  ✅ Departamento creado con ID: 456
  ```

---

### ✅ Test 9: Editar Departamento

**Pasos**:
1. En listado de departamentos, presionar "✏️ Editar"
2. Cambiar nombre
3. Guardar

**Resultado Esperado**:
- ✅ Formulario cargado con nombre actual
- ✅ Muestra alerta de éxito
- ✅ Cambios reflejados en listado
- ✅ En consola: PUT exitoso

---

### ✅ Test 10: Eliminar Departamento

**Pasos**:
1. Presionar "🗑️ Eliminar" en un departamento
2. Confirmar

**Resultado Esperado**:
- ✅ Diálogo de confirmación
- ✅ Alerta de éxito
- ✅ Desaparece del listado
- ✅ En consola: DELETE exitoso

---

### ✅ Test 11: Regla Viernes/Sábado

**Pasos**:
1. Asegurarte que hay personas < 18 y > 18
2. Cambiar fecha del dispositivo a viernes o sábado
3. Ir a listado de personas

**Resultado Esperado**:
- ✅ Solo aparecen personas > 18 años
- ✅ Personas menores están filtradas

**Cálculo de edad**:
- Nacimiento: 2010-01-01 → Edad: 16 años → NO aparece
- Nacimiento: 2000-01-01 → Edad: 26 años → SÍ aparece
- Nacimiento: 2006-02-01 → Edad: 19 años → SÍ aparece

---

### ✅ Test 12: Navegación

**Pasos**:
1. Abrir menú lateral (☰)
2. Navegar entre secciones:
   - Inicio
   - Personas
   - Departamentos

**Resultado Esperado**:
- ✅ Menú se abre/cierra correctamente
- ✅ Navegación funciona
- ✅ Estado se mantiene al volver

---

## 🔍 Checklist de Validación Completa

Marca cada item cuando lo hayas probado:

### Personas
- [ ] Listar personas
- [ ] Buscar persona
- [ ] Crear persona con datos válidos
- [ ] Validación: nombre vacío
- [ ] Validación: apellidos vacíos
- [ ] Validación: fecha vacía
- [ ] Validación: sin departamento
- [ ] Trim de espacios en blanco
- [ ] Editar persona
- [ ] Eliminar persona (día normal)
- [ ] Eliminar persona (domingo - debe fallar)
- [ ] Regla viernes/sábado (solo > 18)

### Departamentos
- [ ] Listar departamentos
- [ ] Buscar departamento
- [ ] Crear departamento
- [ ] Validación: nombre vacío
- [ ] Editar departamento
- [ ] Eliminar departamento

### UI/UX
- [ ] Selector web (`<select>`)
- [ ] Selector móvil (Alert)
- [ ] Alertas de éxito
- [ ] Alertas de error
- [ ] Diálogos de confirmación
- [ ] Loading indicators
- [ ] Navegación entre vistas

### Logs (Consola)
- [ ] GET con emoji 🔄 y ✅
- [ ] POST con emoji 🔄, 📦 y ✅
- [ ] PUT con emoji 🔄, 📦 y ✅
- [ ] DELETE con emoji 🔄 y ✅
- [ ] Errores con emoji ❌

---

## 📊 Matriz de Compatibilidad

| Funcionalidad | Web | iOS | Android |
|---------------|-----|-----|---------|
| Listar | ✅ | ✅ | ✅ |
| Crear | ✅ | ✅ | ✅ |
| Editar | ✅ | ✅ | ✅ |
| Eliminar | ✅ | ✅ | ✅ |
| Buscar | ✅ | ✅ | ✅ |
| Validaciones | ✅ | ✅ | ✅ |
| Reglas negocio | ✅ | ✅ | ✅ |
| Selector | `<select>` | Alert | Alert |
| Alertas | window.alert | Alert | Alert |
| Logs | Console | Terminal | Logcat |

---

## 🐛 Problemas Comunes y Soluciones

### Problema: No se cargan las personas
**Solución**:
1. Verificar URL de API en `config.ts`
2. Abrir la URL en el navegador para verificar que funciona
3. Verificar CORS en la API
4. Ver error en consola (❌)

### Problema: Alertas no aparecen en web
**Solución**:
- Verificar que estás usando `AlertHelper` en todas las vistas
- Abrir consola del navegador para ver errores

### Problema: No se puede seleccionar departamento en web
**Solución**:
- Verificar que hay departamentos cargados
- Ver consola para errores en GET departamentos

### Problema: Logs no aparecen
**Solución**:
- **Web**: Abrir DevTools (F12) → Console
- **Móvil**: Verificar terminal donde ejecutaste `npm start`

---

## ✅ Criterios de Aceptación

La aplicación pasa el testing si:

- ✅ Todos los CRUDs funcionan en web y móvil
- ✅ Las validaciones previenen datos incorrectos
- ✅ Las alertas funcionan en ambas plataformas
- ✅ Los selectores funcionan correctamente
- ✅ Las reglas de negocio se aplican
- ✅ Los logs son claros y útiles
- ✅ No hay crashes ni errores en consola
- ✅ La navegación funciona correctamente

---

**¡Listo para testing!** 🧪

Para cualquier problema, consulta `CHANGELOG.md` o `CONFIGURACION.md`.
