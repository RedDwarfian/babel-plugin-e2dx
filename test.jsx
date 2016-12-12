import e2d from 'e2d';
let ctx = document.createElement('canvas').getContext('2d');


e2d.render(
  <translate x={100} y={100}>
    <path>
      <rect width={200} height={50} />
    </path>
    <lineStyle miterLimit={2} >
      <stroke />
    </lineStyle>
  </translate>,
  ctx
);