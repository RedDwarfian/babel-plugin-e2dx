let custom = <template>
  <params func={({ test }) => <fillText text={test} />} />
</template>
let g = <custom test="test">
  <translate x={100} y={100}>
    <fillArc r={10} />
  </translate>
</custom>