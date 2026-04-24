export interface Exercise {
    id: string;
    title: string;
    description: string;
    folderName: string;
    htmlTemplate: string;
    cssTemplate: string;
    instructionForAI: string;
}

export const exercises: Exercise[] = [
    {
        id: "01-semaforo",
        title: "El Semáforo 🚦",
        description: "Alinea 3 luces verticalmente dentro de la caja del semáforo. ¡Usa flexbox en modo columna!",
        folderName: "01-Semaforo",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>El Semáforo</title>
</head>
<body>
    <div class="semaforo">
        <div class="luz red"></div>
        <div class="luz yellow"></div>
        <div class="luz green"></div>
    </div>
</body>
</html>`,
        cssTemplate: `body {
    background-color: #87CEEB;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.semaforo {
    background-color: #333;
    width: 60px;
    height: 200px;
    border-radius: 20px;
    /* Escribe debajo el código Flexbox para alinear las luces verticalmente y centrarlas */
    
}

.luz {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.red { background-color: #ff3b3b; }
.yellow { background-color: #ffbc00; }
.green { background-color: #00ea4f; }`,
        instructionForAI: "REGLA ESTRICTA 1: La clase .semaforo debe tener 'display: flex'. REGLA ESTRICTA 2: La clase .semaforo debe tener 'flex-direction: column' O 'flex-flow: column' (para apilar). REGLA ESTRICTA 3: La clase .semaforo debe usar align-items para centrarlas. REPROBAR si no usan flexbox correctamente."
    },
    {
        id: "02-hamburguesa",
        title: "La Hamburguesa 🍔",
        description: "¡Se nos cayeron los ingredientes! Apílalos uno encima del otro de manera centrada usando Flexbox.",
        folderName: "02-Hamburguesa",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>La Hamburguesa</title>
</head>
<body>
    <div class="hamburguesa">
        <div class="pan-superior">Pan Superior</div>
        <div class="tomate">Tomate</div>
        <div class="carne">Carne</div>
        <div class="pan-inferior">Pan Inferior</div>
    </div>
</body>
</html>`,
        cssTemplate: `body {
    background-color: #FFE4E1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: sans-serif;
    text-align: center;
}

.hamburguesa {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    /* Escribe debajo el código Flexbox */
    
}

.pan-superior, .pan-inferior { background: #FFCC80; padding: 10px 40px; border-radius: 20px; margin: 2px; }
.carne { background: #795548; color: white; padding: 10px 50px; margin: 2px; border-radius: 8px; }
.tomate { background: #F44336; color: white; padding: 5px 45px; margin: 2px; border-radius: 5px; }`,
        instructionForAI: "REGLA ESTRICTA 1: La clase .hamburguesa debe tener 'display: flex'. REGLA ESTRICTA 2: .hamburguesa debe usar 'flex-direction: column' para apilar verticalmente. REGLA ESTRICTA 3: Los elementos CIENTÍFICAMENTE DEBEN ESTAR CENTRADOS AL MEDIO HORIZONTALMENTE con 'align-items: center'. REPROBAR si no cumplen esto o el código está incompleto."
    },
    {
        id: "03-navbar",
        title: "El NavBar (Menú) 🧭",
        description: "Coloca el Logo a la izquierda y los Enlaces a la derecha usando un solo contenedor y justify-content.",
        folderName: "03-NavBar",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>NavBar</title>
</head>
<body>
    <nav class="navbar">
        <div class="logo">🚀 MiApp</div>
        <ul class="enlaces">
            <li>Inicio</li>
            <li>Servicios</li>
            <li>Contacto</li>
        </ul>
    </nav>
</body>
</html>`,
        cssTemplate: `body {
    background: #f0f2f5;
    margin: 0;
    font-family: sans-serif;
}

.navbar {
    background: #2196F3;
    color: white;
    padding: 10px 30px;
    /* Escribe debajo el código Flexbox para separar el logo y los enlaces */
    
}

.enlaces {
    list-style: none;
    display: flex;
    gap: 15px;
    margin: 0;
    padding: 0;
}`,
        instructionForAI: "REGLA ESTRICTA 1: La clase .navbar debe tener 'display: flex'. REGLA ESTRICTA 2: .navbar debe tener 'justify-content: space-between' para empujar los elementos a los extremos. REPROBAR si usan position, floats, o algún otro justify-content incorrecto. SI LO TIENE CORRECTO RESPONSABLEMENTE, DAR APROBADO: TRUE."
    },
    {
        id: "04-whatsapp",
        title: "El Chat de WhatsApp 💬",
        description: "Alinea un mensaje a la derecha (enviado) y déjalo bonito, utilizando align-self.",
        folderName: "04-Chat",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Chat</title>
</head>
<body>
    <div class="chat-container">
        <div class="mensaje recibido">Hola, ¿cómo vas?</div>
        <!-- Escribe el alineamiento del enviado desde el CSS -->
        <div class="mensaje enviado">Todo excelente! Aprendiendo Flexbox.</div>
    </div>
</body>
</html>`,
        cssTemplate: `body {
    display: flex; justify-content: center; align-items: center;
    height: 100vh; background: #e5ddd5; margin: 0;
    font-family: sans-serif;
}

.chat-container {
    background: #ece5dd; width: 300px; height: 400px;
    padding: 15px; border-radius: 10px;
    display: flex; flex-direction: column; gap: 10px;
}

.mensaje {
    padding: 8px 12px; border-radius: 8px;
    max-width: 70%;
}

.recibido { background: #fff; align-self: flex-start; }

.enviado {
    background: #dcf8c6;
    /* Escribe aquí la propiedad para alinear solo ESTE elemento a la derecha dentro de su padre flex-column */
    
}`,
        instructionForAI: "REGLA ESTRICTA 1: La clase .enviado DEBE usar 'align-self: flex-end'. REPROBAR el uso de float, text-align (para cajas), u otros contenedores extras."
    },
    {
        id: "05-gatos",
        title: "La Galería de Gatos 🐱",
        description: "¿Son demasiados gatos? Haz que caigan a la línea de abajo usando flex-wrap.",
        folderName: "05-Gatos",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Galería de Gatos</title>
</head>
<body>
    <div class="galeria">
        <div class="gato">😺</div><div class="gato">😸</div>
        <div class="gato">😹</div><div class="gato">😻</div>
        <div class="gato">😼</div><div class="gato">😽</div>
        <div class="gato">🙀</div><div class="gato">😿</div>
    </div>
</body>
</html>`,
        cssTemplate: `body { padding: 20px; font-family: sans-serif; font-size: 2em; text-align: center; }

.galeria {
    width: 300px; margin: 0 auto;
    background: #eee; border: 2px dashed #999;
    padding: 10px;
    /* Escribe debajo el código Flexbox con gap para separar uniformemente y dejar que fluyan a la siguiente linea */
    
}

.gato {
    background: #fff; padding: 10px; border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}`,
        instructionForAI: "REGLA ESTRICTA 1: .galeria DEBE tener 'display: flex'. REGLA ESTRICTA 2: Debe usar 'flex-wrap: wrap'. REGLA ESTRICTA 3: Debe estar espaciado con 'gap'. REPROBAR si falta alguna de las 3 reglas."
    },
    {
        id: "06-perfil",
        title: "El Perfil del Gamer 🎮",
        description: "Pon el Avatar a la izquierda y el Texto a la derecha, bien centraditos verticalmente.",
        folderName: "06-Perfil",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Perfil Gamer</title>
</head>
<body>
    <div class="perfil">
        <div class="avatar">👾</div>
        <div class="info">
            <h2>PlayerOne</h2>
            <p>Nivel 99 - Mago Oscuro</p>
        </div>
    </div>
</body>
</html>`,
        cssTemplate: `body { display: flex; justify-content: center; align-items: center; height: 100vh; background: #222; margin: 0; color: white; font-family: sans-serif; }

.perfil {
    background: #333; padding: 20px; border-radius: 15px; border: 2px solid #555;
    /* Escribe tu código flex para organizar los hijos (avatar e info) de izquierda a derecha, centrados verticalmente y con una separacion (gap) */
    
}

.avatar { font-size: 50px; background: #673AB7; padding: 15px; border-radius: 50%; }
.info h2 { margin: 0; color: #00E5FF; }
.info p { margin: 5px 0 0; color: #aaa; }`,
        instructionForAI: "REGLA ESTRICTA: .perfil debe contener 'display: flex' Y 'align-items: center'. 'flex-direction: row' es opcional porque es el por defecto, pero alineación vertical centrado y usar flex es OBLIGATORIO."
    },
    {
        id: "07-podio",
        title: "El Podio Olímpico 🥇",
        description: "Haz que las 3 barras empujen sus bases hasta el piso (alineamiento al final).",
        folderName: "07-Podio",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Podio</title>
</head>
<body>
    <div class="podio">
        <div class="puesto plata">2</div>
        <div class="puesto oro">1</div>
        <div class="puesto bronce">3</div>
    </div>
</body>
</html>`,
        cssTemplate: `body { display: flex; justify-content: center; align-items: center; height: 100vh; background: #E0F7FA; margin: 0; font-family: bold, sans-serif; text-align: center; font-size: 24px;}

.podio {
    width: 300px; height: 200px; border-bottom: 5px solid #333;
    /* Haz que los 3 bloques se peguen abajo en la linea inferior flex */
    
}

.puesto { width: 80px; }
.oro { height: 150px; background: #FFD700; }
.plata { height: 110px; background: #C0C0C0; }
.bronce { height: 80px; background: #CD7F32; }`,
        instructionForAI: "REGLA ESTRICTA: .podio debe usar 'display: flex' y 'align-items: flex-end'."
    },
    {
        id: "08-teclado",
        title: "Calculadora Gigante 🧮",
        description: "Convierte filas de botones de números alineados usando flex-grow en uno de ellos si quieres que ocupe lo que sobre.",
        folderName: "08-Calculadora",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Calculadora</title>
</head>
<body>
    <div class="calculadora">
        <div class="fila">
            <div class="btn">7</div><div class="btn">8</div><div class="btn">9</div>
        </div>
        <div class="fila">
            <div class="btn largo">0</div><div class="btn">=</div>
        </div>
    </div>
</body>
</html>`,
        cssTemplate: `body { display: flex; justify-content: center; align-items: center; height: 100vh; background: #455A64; margin: 0; }

.calculadora { background: #263238; padding: 15px; border-radius: 10px; display: flex; flex-direction: column; gap: 10px; width: 220px;}

.fila {
    /* Define Flexbox, dale gap de 10px para separar */
    
}

.btn { background: #ECEFF1; font-family: sans-serif; font-size: 20px; border-radius: 5px; flex: 1; text-align: center; padding: 15px 0;}

.largo {
    /* Haz que este boton crezca y tome el doble de espacio (hint: flex-grow) */
    
}`,
        instructionForAI: "REGLA ESTRICTA 1: .fila DEBE usar 'display: flex'. REGLA ESTRICTA 2: .largo DEBE usar 'flex-grow: X' o 'flex: X' donde X > 1 (mayor a 1). REPROBAR si calculan anchos con porcentajes."
    },
    {
        id: "09-espacio",
        title: "Distribución Espacial 🪐",
        description: "Distribuye equitativamente el espacio alrededor de los planetas.",
        folderName: "09-Espacio",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Espacio</title>
</head>
<body>
    <div class="universo">
        <div class="planeta">🌎</div>
        <div class="planeta">🪐</div>
        <div class="planeta">🌕</div>
    </div>
</body>
</html>`,
        cssTemplate: `body { background: #000; margin: 0; }

.universo {
    height: 100vh;
    /* Escribe aca: Usa flex y asigna el valor que crea espacio ALREDEDOR de todo (space-around / space-evenly) */
    
}

.planeta { font-size: 4rem; }`,
        instructionForAI: "REGLA ESTRICTA 1: .universo DEBE tener 'display: flex'. REGLA ESTRICTA 2: .universo DEBE usar 'justify-content: space-around' O 'justify-content: space-evenly'."
    },
    {
        id: "10-el-jefe",
        title: "El Jefe Final: Centrado 🎯",
        description: "El problema clásico del desarrollo web: Centrar una cajita vertical y horizontalmente al medio de toda la pantalla al mismo tiempo.",
        folderName: "10-JefeFinal",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Jefe Final</title>
</head>
<body>
    <div class="container-pantalla">
        <div class="caja-mitica">Has ganado 🎉</div>
    </div>
</body>
</html>`,
        cssTemplate: `body, html { height: 100%; margin: 0; }

.container-pantalla {
    background: linear-gradient(135deg, #FF416C, #FF4B2B);
    height: 100vh;
    /* HAZ TU MAGIA FINAL AQUI ABAJO PARA CENTRARLO (Se requieren las 3 lineas míticas de Flexbox de centrado total) */
    
}

.caja-mitica {
    background: rgba(255,255,255, 0.2); backdrop-filter: blur(10px);
    padding: 30px 40px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.3);
    color: white; font-family: sans-serif; font-size: 24px; font-weight: bold;
}`,
        instructionForAI: "REGLA ESTRICTA 1: .container-pantalla DEBE usar 'display: flex'. REGLA ESTRICTA 2: .container-pantalla DEBE usar 'justify-content: center' Y 'align-items: center' AMBAS AL TIEMPO. REPROBAR si usa margins automáticos con anchos/altos sin flex, floats, padding engañoso, etc."
    }
];
