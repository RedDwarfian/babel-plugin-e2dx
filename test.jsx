import e2d from 'e2d';
let ctx = document.createElement('canvas').getContext('2d');

<render ctx={ctx}>
  <lineStyle style={{ lineWidth: 2 }} >
    <path></path>
    <stroke />
  </lineStyle>
</render>;