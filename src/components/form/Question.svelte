<script lang="ts">
  export let question: string;
</script>

<p class={$$props.class}>
  { question }
</p>

<style>
  p {
    margin-bottom: 0.5em;
    flex-grow: 1;
    font-size: 1.2em;
  }
</style>
