<script lang='typescript'>
  export let getter: () => string;
  export let title: string;
  export let lastUpdated: Date;
  export let classes = '';

  let filename: string;
  let url: string;

  $: {
    url = URL.createObjectURL(
      new Blob([getter()], { type: 'application/json'})
    )
    filename = `${title}_${lastUpdated.toISOString()}.dec.json`;
  }
</script>

<a class={ classes } href='{ url }' download='{ filename }'><slot></slot></a>