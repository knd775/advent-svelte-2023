<svelte:options runes={true} />

<script lang="ts">
  import { VisAxis, VisCrosshair, VisLine, VisTooltip, VisXYContainer } from '@unovis/svelte';
  import type { HeartRateEntry } from './types';

  type Props = {
    data: HeartRateEntry[];
  };

  let { data } = $props<Props>();
</script>

<VisXYContainer {data}>
  <VisLine
    {data}
    x={(d) => d.timestamp}
    y={(d) => d.heartRate}
    highlightOnHover={true}
    curveType={'basis'}
  />
  <VisAxis
    type="x"
    numTicks={5}
    tickFormat={(d: number) => data.length > 0 ? `T-${((Date.now() - d) / 1000).toFixed(0)}s` : ''}
  />
  <VisAxis type="y" label="Santa's Heart Rate" />
  <VisCrosshair template={(d: HeartRateEntry) => d.heartRate} />
  <VisTooltip />
</VisXYContainer>
