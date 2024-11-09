
# Ecommerce - Madrid Store

Esta sencilla tienda virtual, emulará algunos procesos presentes en un ecommerce, dispondra de una lista de productos que el usuario podra añadir al carrito y posteriormente, tendrá opción de "pagar".





## Funcionalidades

- Lista de productos
- Ver el detalle de producto
- Añadir productos al carrito de compra
- Ver el carrito de compra y "efectuar" el pago

Para la emulación de la actividad se tomo como API de apoyo, el siguiente recurso [fakestoreapi](https://fakestoreapi.com)


## Stack Tecnologico

- Angular v18.2.11
- Node v20.18.0
- Vercel (Plataforma para deployment)

## Ejecutar localmente

Clonamos el proyecto

```bash
  git clone https://github.com/acvillaron/ecommerce.git
```

Ingresamos al directorio del proyecto

```bash
  cd ecommerce
```

Instalamos las dependencias  
_Importante tener instalado Angular v18 y Node > 20_  

```bash
  npm install
```

Ejecutamos una aplicación

```bash
  npm run start
```

## Demo

La aplicación se ha alojado en Vercel como respaldo en caso de que surjan dificultades al ejecutarla localmente.
[Sitio](https://ecommerce-lime-nine-83.vercel.app/products)

## Requisitos de la prueba

1. **Componentes y Módulos**: Crea una aplicación Angular que tenga al menos dos componentes diferentes. Organiza estos componentes en módulos adecuados teniendo y ten en cuenta lo que estamos explicando en el objetivo.

2. **Lazy Loading**: Implementa lazy loading para cargar uno de los módulos de manera diferida.

3. **Interceptors**: Implementa un interceptor HTTP que añada un token de autenticación a todas las solicitudes salientes (o simula como seria este codigo).

4. **Change Detection**: Configura uno de los componentes para usar el modo de detección de cambios OnPush.

5. **Componentes Standalone**: Crea al menos un componente standalone que no dependa de un módulo.

6. **Llamada a una API Pública**: Realiza una llamada a una API pública (por ejemplo, https://jsonplaceholder.typicode.com/) y muestra los datos obtenidos en uno de los componentes.
## Cumplimiento de requisitos

La aplicación `MadridStore` cuenta con un módulo privado llamado `PrivateModule`. Este módulo agrupa todas las funcionalidades privadas y, al ser de naturaleza privada, implementa un **interceptor(3)** que facilita la inyección del encabezado de autenticación en todas las solicitudes salientes. Además, optamos por cargar `PrivateModule` utilizando la estrategia de carga diferida **(Lazy Loading(2))**.

Dentro de `PrivateModule`, se encuentran dos submódulos principales: `Cart` y `Product`.

El componente `Cart` es responsable de gestionar el proceso de pago. Este componente se ha definido como independiente **(Standalone(5))** y, para cumplir su función, se apoya en los componentes `CartItem`, `CartSummary` y `CartConfirm`. El primero fue configurado con  **detección de cambios OnPush(4)**, los dos componentes restantes quedaron con la default. Por ultimo, estos componentes son independientes tambien (Stadalone).

El módulo Product ofrece funcionalidades para `ver la lista de productos` y `los detalles de un producto específico`. Ambos componentes se cargan de manera anticipada (Eager Loading). Para mostrar los productos, se consumio la API gratuita **[fakestoreapi](https://fakestoreapi.com)(6)**.


> La aplicación ha implementado elementos adicionales. Estos se desarrollaron para ofrecer una funcionalidad más completa y para poner en práctica conceptos clave y nuevas características de las versiones recientes de Angular 17 y 18.


## Competencias aplicadas

- Signal
- Observables
- Módulos
- Detección de Cambios
- Carga perezosa (Lazy loading)
- Interceptores funcionales
- Manejo de estado (usando NGRX)
- Componentes standalone
- Diseño Mobile First
- Diseño responsivo
- Pruebas unitarias
- Nuevo control de flujo de Angular (@if, @for)
- Nuevas caracteristicas de Angular v17,v18


## Particularidades de implementación y desarrollo

Arquitectura base: Core, Shared, Feature.

* **Core**: Contendrá elementos de interés global para la aplicación.
* **Shared**: Encargado de contener elementos compartidos.
* **Features**: Contendrá nuestras funcionalidades.

### Core
```
core/
  services/
  interceptor/
  components/
  store/
  core.module.ts
```

**Interceptores**  
* **Loading**: Permite mostrar u ocultar el cargando teniendo en base nuestras peticiones salientes.
* **Authorization**: Encargado de injectar la cabecera `Authorization` a las peticiones salientes. 
**Servicios**  
*  **Servicio loading**: Este servicio nos ayudará a notificar a nuestro `LoadingComponent` si debe mostrarse o no. Para lograr esto, se hizo uso de una `Signal`, la cual, dada su naturaleza reactiva, notificará cada cambio a nuestro componente `LoadingComponent`, el cual tendrá el diseño del loading.

**Store**: Contiene el estado de la aplicación. En el actual escenario gestiona nuestro carrito de compras. Para la implementación, hicimos uso de la librería **NGRX/signals**.

### Shared

```
shared/
  components/
  mocks/
  shared.module.ts
```

**Mock**: La intención de esta carpeta es almacenar todos los mocks de las clases que se necesiten, principalmente para usarlos en los tests de la app. Estos mocks suelen usar el `Patrón Builder`.

### Features
```
features/
  🌐public/
  🔒private/
```

**Public**  
Almacenará las funcionalidades de acceso público. Para el ejemplo en cuestión, no contenemos componentes públicos, pero acá podríamos tener, por ejemplo la página de presentación de la compañía, las políticas de privacidad.

**Private**  
```
private/
  shared/
  product/
  cart/
  private.module.ts
```
Almacenará las funcionalidades de acceso restringido. Para la aplicación, se asume que el usuario está logueado y en teoría los módulos de producto y carrito de compras necesitan de autenticación. Por este motivo, se implementa `authorizationTokenInterceptor` en sus providers.  
La estrategia de enrutamiento usado para **_private_** es de carga peresoza, los motivos más importantes por la que se tomó esa desición fueron:

* 1. Protección del código fuente: Evitar que el código fuente privado quede expuesto a todos.
* 2. Evitar una carga inicial con módulos/archivos que no necesitamos, lo que impactaría en el peso de nuestro `Bundle`.

**Product**  
```
product/
  pages/
  shared/
    services/
    models/
  product.module.ts
```
El módulo `Product` integra de manera cohesiva todas las funcionalidades necesarias para la gestión de productos. 

**Pages**  
```
pages/
  product-list/
  product-detail/
```
La finalidad de este folder es agrupar todas las vistas/templates. La idea es contener aquí los contenedores bases de nuestras distintas vistas, las cuales serán compuestas por componentes más pequeños.

**Page**: **Product List**  
Esta pagina nos servirá para mostrar la lista de productos y  hará uso de los componentes de la subcarpeta `Components` para construir la vista.

*  **ProductCard**: Componente que representará cada producto en la vista, tienes funciones de _ver producto_ y _Agregar al carrito_. Este componente fue configurado con detección de cambios `OnPush`, esto para evitar que los componentes se rendericen innecesariamente ante eventos externos. Hipotéticamente, ante una situación donde tengamos una lista considerable de productos y el componente tenga una lógica computacionalmente compleja podríamos ver posibles problemas de rendimiento si no usáramos la estrategia `OnPush`.

**Page**: **Product Details**  
Esta página nos servirá para mostrar la información detallada de un producto. Este componente contendrá una sección donde mostrará la imagen y los detalles del producto. Por temas prácticos, esta sección fue creada directamente en la página, aunque bien podría ser creado en un componente aparte y ser importado dentro de **PageDetailsComponent**, de esta manera quedaría con una estructura escalable, por si en un futuro se desean añadir más componentes visuales como: sección de comentarios, sección de productos sugeridos, entre otros.

**Cart**  
```
cart/
  components/
  cart.component.html
  cart.component.scss
  cart.component.spec.ts
  cart.component.ts
```
Cart es un componente independiente (standalone) debido a su simplicidad funcional, y su caracteristica de tener pocas dependencias. Esta decisión nos permite evitar la necesidad de crear una estructura completa de módulos y rutas.  
La principal función de este componente es presentar un resumen de la compra y simular el proceso de pago.

* Ejemplo: **CartItem**  
Este componente renderiza cada uno de los productos del carrito de compra. Para el ejercicio, la única funcionalidad que tiene es la de remover el producto del carrito. Este componente, por temas didácticos y prácticos, fue configurado con detección de cambios `onPush`, esto para que solo dependa de su input de entrada y eventos internos. De esta manera, evitamos que se vuelva a renderizar cuando otro `CartItem` genere un evento.

Los otros componentes `CartSummary y CartConfirm` también fueron generados standalone.

La inclusión de `CartComponent` dentro del módulo `Product` podría ser un tema de debate. Aunque `Product` y `Cart` están relacionados, es importante considerar que `CartComponent` se enfoca principalmente en el flujo de pago y sus validaciones específicas. Además, hipotéticamente, podría requerir de un módulo User para acceder a la información del usuario correspondiente.

> [!IMPORTANT]
> Es importante saber que la estructura propuesta es una base inical; es un documento vivo. Puede que en etapas siguientes del proyecto, surga la necesidad de cambiar y mover elementos de un lado a otro. Justamente, la actual estructura de proyecto y separación de elementos da pie para que las modificaciones no sean un problema, al tener el código estructurado en paquetes cohesivos. 


