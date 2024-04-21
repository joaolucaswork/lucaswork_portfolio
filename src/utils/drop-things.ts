// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Matter from 'matter-js';

export const dropThings = () => {
  const canvas = document.querySelector('#canvas-target');
  const addButton = document.querySelector('#add-button');

  // module aliases
  const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

  // create an engine
  const engine = Engine.create();

  // create a renderer
  const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      background: 'transparent',
      wireframes: false,
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio,
      clearCanvas: false,
      context: canvas.getContext('2d'),
    },
  });

  // Set canvas dimensions explicitly to match window dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = 'width: 100%; height: 100%; margin: 0; padding: 0;'; // Reset canvas styles

  // Debugging information

  const spriteWidth = 200; // Substitua 100 pelo valor real da largura da sua imagem
  const spriteHeight = 200; // Substitua 100 pelo valor real da altura da sua imagem

  const createObject = () => {
    const imageSize = 80; // Defina o tamanho desejado da imagem aqui

    const box = Bodies.rectangle(window.innerWidth / 2, 0, imageSize, imageSize, {
      angle: Math.PI / 5, // Rotaciona o corpo para que a imagem caia corretamente
      render: {
        sprite: {
          texture:
            'https://uploads-ssl.webflow.com/6617e4fc3b3950260690670d/66208bc1f7e2b60031d1835a_PikPng.com_akira-logo-png_4043072.png',
          xScale: imageSize / spriteWidth, // Ajuste de escala horizontal
          yScale: imageSize / spriteHeight, // Ajuste de escala vertical
        },
      },
    });

    // Adiciona uma força para a direita para fazer mover para a direita
    Matter.Body.applyForce(box, { x: box.position.x, y: box.position.y }, { x: 0.02, y: 0 });

    Composite.add(engine.world, box);
  };

  // create ground
  const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 2, {
    isStatic: true,
  });

  // add all of the bodies to the world
  Composite.add(engine.world, [ground]);

  // run the renderer
  Render.run(render);

  // create runner
  const runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);

  addButton.addEventListener('click', createObject);

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  Composite.add(engine.world, mouseConstraint);
};
