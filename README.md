# TecnoFix RD

Sitio de tres páginas en HTML5 para TecnoFix RD, un taller de reparación de computadoras en Santo Domingo.

- **Autor:** Ricardo Pimentel · Matrícula 2023-3776
- **Materia:** ISW-311 Tecnologías de Internet I
- **Sitio publicado:** https://pxlarizedl.github.io/sitio-tecnofix/

## Páginas

| Página | Contenido |
|---|---|
| `index.html` | Quiénes somos, qué ofrecemos, la noticia de los sábados y un consejo |
| `servicios.html` | Las tres listas, la tabla de precios, imágenes, video y mapa |
| `contacto.html` | Los cinco tipos de enlace, la dirección y el formulario |

## Mapa de etiquetas

| Familia | Página y sección | Etiquetas usadas | ¿Por qué esa etiqueta? |
|---|---|---|---|
| Cimientos | Las tres, en el `head` | `<!DOCTYPE html>`, `html lang="es"`, `meta charset`, `meta viewport`, `title`, `meta description` | El doctype y el `lang="es"` le dicen al navegador que es HTML5 en español. El UTF-8 es para que salgan bien las tildes y la ñ, y el viewport para que se vea bien en el celular. Cada página tiene su propio title y description porque cada una habla de algo distinto. |
| Encabezados y párrafos | Las tres | `h1`, `h2`, `h3`, `p` | Hay un solo `h1` por página con el tema principal, cada sección arranca con su `h2` y en servicios uso `h3` dentro de "Nuestro trabajo" sin saltarme niveles. Los textos normales van en `p`. |
| Texto, citas y código | index.html, "Quiénes somos", "Qué ofrecemos" y "Consejo rápido" | `strong`, `em`, `mark`, `del`/`ins`, `abbr`, `small`, `sub`/`sup`, `blockquote` + `cite`, `q`, `kbd` | `strong` para lo más importante (no cobramos sin decir el problema), `em` para el énfasis, `del`/`ins` para el precio viejo y el nuevo del diagnóstico, `mark` para resaltar que sale gratis, `abbr` para SSD y RAM, `sub` en H₂O₂ y `sup` en 1ᵉʳ, `small` para la letra pequeña, `blockquote` con `cite` para la reseña de una clienta, `q` para una frase corta y `kbd` para las teclas Windows + E. |
| Listas | servicios.html, "Lo que reparamos", "Cómo pedir" y "Palabras que vas a oír" | `ul` con sublista, `ol type="A"`, `dl`/`dt`/`dd` | Los servicios no tienen orden, por eso `ul`, y cada tipo de equipo tiene su sublista dentro del `li`. Los pasos para pedir sí van en orden, por eso `ol`, con letras. Los términos del taller son palabra y significado, eso es justo una `dl`. |
| Enlaces | contacto.html, "Escríbenos o llámanos"; servicios.html, "Tabla de precios"; el `nav` de las tres | `a` con `mailto:`, `tel:`, `#formulario`, `download`, `target="_blank" rel="noopener"` | El `mailto:` abre el correo y el `tel:` llama directo desde el celular. El `#formulario` baja a la sección del formulario. El `download` baja la lista de precios en CSV. El de HP es externo, abre en otra pestaña para no sacar a la persona del sitio y `noopener` es por seguridad. |
| Imágenes y multimedia | servicios.html, "Nuestro trabajo" | `figure`, `figcaption`, `img` con `alt`, `video` con `controls` y `source`, `iframe` con `title` | Las fotos van en `figure` porque tienen su explicación en `figcaption`. El `alt` dice lo que se ve para quien no puede ver la imagen. El video tiene `controls` para que el usuario lo maneje y `source` con el tipo. El mapa es un `iframe` y lleva `title` para que el lector de pantalla sepa qué es. |
| Tablas | servicios.html, "Tabla de precios" | `table`, `caption`, `thead`, `tbody`, `tfoot`, `th scope="col"`, `th scope="row"`, `rowspan`, `colspan` | Los precios son datos con filas y columnas, por eso tabla. El `caption` dice de qué es, `scope` dice si el encabezado es de columna o de fila. "Laptop" usa `rowspan` porque se repite en tres filas y el diagnóstico en el `tfoot` usa `colspan` porque no necesita tipo ni tiempo. |
| Formularios | contacto.html, "Agenda tu reparación" | `form`, `fieldset`, `legend`, `label`, `input` (text, email, tel, password, number, date, time, range, file, radio, checkbox), `select` con `optgroup`, `textarea`, `button type="submit"` | Separé el formulario en dos `fieldset`: los datos de la persona y los del equipo. Cada `label` tiene `for` igual al `id` del campo para que al tocar el texto se active el campo. Uso `required`, `minlength`, `maxlength`, `pattern` en el teléfono y `min`/`max` en la fecha, hora, cantidad y urgencia para que el navegador valide solo. |
| Semántica y div/span | Las tres | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `time`, `address`, `details`/`summary` | No usé `div` porque todo tenía una etiqueta con significado. La noticia es `article` porque se entiende sola, el consejo es `aside` porque es aparte del tema principal, las fechas van en `time` con `datetime`, la dirección del taller en `address` y las preguntas frecuentes en `details`/`summary` para que se abran al tocarlas. |

## Validación

Las tres páginas pasan [validator.w3.org](https://validator.w3.org/nu/) sin errores.
