# Cheatsheet de HTML y CSS

## Tags / elementos

### Sintaxis de un elemento

#### Etiqueta de apertura (`<tag>`)

Indica el comienzo de un elemento. Siempre debe iniciar con el símbolo de menor `<` y terminar con el signo de mayor `>`.
Dentro debe ir el nombre de la etiqueta.

#### Etiqueta de clausura (`</tag>`)

Indica el final de un elemento. Siempre debe iniciar con el símbolo de menor seguido de la barra diagonal </ y terminar con el signo de mayor >.
Nuevamente, dentro debe ir el nombre de la etiqueta.

#### Atributos (nombre=“valor”)

Son configuraciones adicionales de los elementos que ajustan su comportamiento de diversas formas. Tienen un nombre y reciben un valor, el cual siempre se escribe entre comillas y definirá la configuración del atributo.

#### Contenido

Todo aquello que escribamos entre las etiquetas de apertura y cierre de un elemento serán el contenido. El contenido puede incluir texto o incluso otras etiquetas.

**Ejemplo:**

```html
<h1 class="titulo">Este es el título</h1>
<!--
    En este caso, h1 es el nombre del tag. 
    class es el nombre del atributo y titulo su valor.
    Este es el título será el contenido de esta etiqueta.
-->
```

## Estructura básica de un documento HTML

```html
<!DOCTYPE html> 2
<html>
    <head>
        <meta charset="utf-8" />
        <title>Hello world</title>
    </head>
    <body></body>
</html>
```

(_Los números son simplemente para poder referirnos a las líneas por separado, no son parte de la estructura_)

**Línea 1:**
Utilizamos el tag ‘DOCTYPE’ para avisarle al navegador la versión que utilizaremos de HTML. Si utilizaremos la última (siempre en nuestro caso) indicamos directamente ‘html’.

**Líneas 2 a 10:**
Etiqueta de html, el cual contendrá a todo el documento.

**Líneas 3 a 6:**
Etiqueta de head. Esta etiqueta incluye configuración de la página web, en su mayoría (excepto por la etiqueta title), contiene cosas que no se verán de manera directa en la página.

**Línea 4:**
Etiqueta de metadata (meta). Contendrá información correspondiente a alguna configuración en particular. En este caso contiene información sobre el grupo de caracteres de codificación que se utilizan en la página, siendo su valor “utf-8”, que indica que la página puede contener vocales con tilde y la letra ‘ñ’.

**Líneas 7 a 9:**
Etiqueta de body. Esta etiqueta contiene todos los tags que se visualizarán en la página.

**Línea 8:**
Contenido del body, es decir, todas las etiquetas y/o texto que se incluyen en la página.

## Elementos en línea o en bloque

Entre todas las etiquetas visibles de HTML podemos separar en 2 tipos:
Los elementos en línea
Los elementos en bloque

### Elementos en línea

Estos elementos o etiquetas se posicionan (por default **\***) uno al lado del otro, en horizontal. Este comportamiento permite que ocupen todo el lugar que pueden a lo ancho, y una vez que lo ocupan, caen a la siguiente fila.

### Elementos en bloque

Estos elementos se posicionan (por default **\***) uno debajo del otro, sin importar el ancho del elemento.

**(\*)** Esta aclaración es porque, con hojas de estilos, es posible cambiar el comportamiento predeterminado por el contrario.

## Etiquetas de texto

### Headers _(h1 al h6, no confundir con header)_

Las etiquetas `<h1>`, `<h2>`, ..., `<h6>` representan títulos y subtítulos en HTML. Su estilo por defecto es con la fuente en negrita y el tamaño disminuye progresivamente mientras aumenta el número en la etiqueta:

**Código:**

```html
<h1>Esto es un h1</h1>
<h2>Esto es un h2</h2>
<h3>Esto es un h3</h3>
<h4>Esto es un h4</h4>
<h5>Esto es un h5</h5>
<h6>Esto es un h6</h6>
```

**Resultado:**

<div class="result">
    <h1>Esto es un h1</h1>
    <h2>Esto es un h2</h2>
    <h3>Esto es un h3</h3>
    <h4>Esto es un h4</h4>
    <h5>Esto es un h5</h5>
    <h6>Esto es un h6</h6>
</div>

### Párrafos

Esta etiqueta nos permite escribir texto en la página

**Código:**

```html
<p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eos velit
    delectus excepturi saepe, consectetur recusandae, impedit autem nostrum
    nihil omnis, quaerat ipsa optio cumque? Expedita pariatur cumque nisi ea.
</p>
```

**Resultado:**

<div class="result">
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eos velit
        delectus excepturi saepe, consectetur recusandae, impedit autem nostrum
        nihil omnis, quaerat ipsa optio cumque? Expedita pariatur cumque nisi ea.
    </p>
</div>

## Listas

Estas etiquetas nos permiten listar otros elementos para organizar mejor nuestra página. Existen 2 tipos:

### Listas no ordenadas

**Código:**

```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

**Resultado:**

<div class="result">
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</div>

### Listas ordenadas

**Código:**

```html
<ol>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ol>
```

**Resultado:**

<div class="result">
    <ol>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ol>
</div>

**Importante:** dentro de una etiqueta `<ul>`/`<ol>` deberán ir **siempre** etiquetas de tipo `<li>` (list item), para que el navegador entienda de manera correcta la lista.

## Hipervínculos o enlaces

La etiqueta `<a>` nos permite crear enlaces o hipervínculos a otras páginas dentro de nuestro sitio web o incluso en otros. La forma de indicarle a la etiqueta cuál es la ruta que debe seguir el usuario cuando la cliquea es a través del atributo ‘href’, el mismo recibe una ruta o un link.

**Código:**

```html
<a href="./perfil.html">Ir a mi perfil</a>
```

**Resultado:**

<div class="result">
    <a href="./perfil.html">Ir a mi perfil</a>
</div>

**Código:**

```html
<a href="https://www.campus.ort.edu.ar">Ir al campus</a>
```

**Resultado:**

<div class="result">
    <a href="https://www.campus.ort.edu.ar">Ir al campus</a>
</div>

**Importante:** si utilizamos la etiqueta con una ruta relativa, la forma de escribir estas rutas es igual a la forma de escribirlas en todos los lenguajes o programas, es decir, pueden encontrar una explicación de cómo funcionan en el PHP Cheatsheet.

## Imágenes

La etiqueta `<img>` nos permite incrustar imágenes en nuestra página, ya sea por medio de un link a una imagen de internet o por medio de una ruta a una imagen ubicada dentro de nuestro servidor. La ruta a la imagen que deseamos mostrar se brinda a través del atributo ‘src’.

**Código:**

```html
<img src="https://picsum.photos/500/500" alt="Imagen aleatoria" />
```

**Resultado:**

<div class="result">
    <img src="https://picsum.photos/500/500" alt="Imagen aleatoria" />
</div>

**Código:**

```html
<img src="./assets/images/logo_ort.jpg" alt="Logo de ORT" />
```

<div class="result">
    <img src="./assets/images/logo_ort.jpg" alt="Logo de ORT" />
</div>

**Resultado:**

Importante: el atributo ‘alt’ es muy importante a la hora de hacer nuestra página accesible para personas no videntes.

Formularios
La etiqueta `<form>` nos permite crear formularios en los cuales los usuarios pueden completar datos y enviarlos a ser procesados.

**Código:**

```html
<form action="" method="">
    <!-- inputs y selects -->
</form>
```

El atributo ‘action’ llevará como valor la ruta al archivo donde se enviarán los datos.
El atributo ‘method’ llevará como valor “GET” o “POST”, que indicarán qué método utilizaremos para enviar los datos.
Input
La etiqueta `<input>`, en todas sus variantes, nos permite guardar información obtenida por un usuario dentro de un formulario, para luego ser enviada a procesar.
Existen muchos tipos de `<input>`, y éste se indica en el atributo ‘type’. Algunos ejemplos de éstos son:

<div class="result">
    <input type="text">
    <input type="number">
    <input type="password">
    <input type="email">
    <input type="color">
    <input type="date">
    <input type="month">
    <input type="week">
    <input type="time">
    <input type="datetime">
    <input type="range">
    <input type="checkbox">
    <input type="radio">
    <input type="submit">
    <input type="file">
</div>

Para diferenciar estas etiquetas y enviar la información de manera ordenada, debemos utilizar el atributo ‘name’.

**Código (en formulario):**

```html
<form action="./handler.php" method="POST">
    <input type="text" name="usuario" />
    <input type="password" name="contrasenia" />
    <input type="submit" value="Iniciar sesión" />
</form>
```

**Resultado (en el front):**

<form action="./handler.php" method="POST">
    <input type="text" name="usuario" />
    <input type="password" name="contrasenia" />
    <input type="submit" value="Iniciar sesión" />
</form>

Si el usuario ingresa, por ejemplo: pepe como usuario y 123 como contraseña y cliquea el botón “Iniciar sesión”.

**Resultado (en handler.php):**

```php
$_POST --> ["usuario" => "pepe", "contrasenia" => "123"]
```

Es decir, el array $\_POST en el handler.php tendrá definido como clave “usuario” y como valor “pepe”, y “contrasenia” como otra clave, cuyo valor es “123”.

Importante: los inputs con tipo “radio”, para que estén en el mismo grupo deben tener el mismo valor en el atributo “name”.
Select
La etiqueta `<select>` nos permite crear una lista de valores seleccionables para el usuario.

**Código:**

```html
<select name="pais">
    <option value="0">Argentina</option>
    <option value="1">Brasil</option>
    <option value="2">Chile</option>
    <option value="3">Uruguay</option>
    <option value="4">Paraguay</option>
</select>
```

**Resultado (en el front):**

<div class="result">
    <select name="pais">
        <option value="0">Argentina</option>
        <option value="1">Brasil</option>
        <option value="2">Chile</option>
        <option value="3">Uruguay</option>
        <option value="4">Paraguay</option>
    </select>
</div>

**Resultado (en el handler):**

```php
$_POST --> ["pais" => *value de la opción seleccionada*]
```