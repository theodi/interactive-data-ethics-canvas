<script>
  export let actions;
</script>
<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Description</th>
      <th>Owner</th>
    </tr>
  </thead>
  <tbody>
    {#each actions as a}
      <tr>
        <td>{ a.title }</td>
        <td>{ a.description }</td>
        <td>{ a.owner }</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    table-layout: fixed;
  }
  td, th {
    border: 1px solid black;
  }
</style>
