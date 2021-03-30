<script lang='typescript'>
  import { isWelcomeSurpressed, surpressWelcome } from '../utils/agreements';
  let accept = false;
  let dontShowAgain = false;
</script>

{#if !accept && !isWelcomeSurpressed() }
<div>
  <section>
    <p class='right'>
      <a class="close" on:click={ () => {
        if (dontShowAgain) surpressWelcome();
        accept = true;
      } }>X</a>  
    </p>
    <h2>
      Welcome
    </h2>  

    <p class='centred'>
      The ODI Data Ethics Canvas is a tool for anyone who collects, shares or uses data. It helps identify and manage ethical issues – at the start of a project that uses data, and throughout.
    </p>
    
    <img src='./images/example-editor.png' alt='An example of one of the canvas editors in its opened state' />
    <p style="padding-top: 1em;">
      Click on each bubble to:
    </p>

    <ol>
      <li>
        Complete specific questions related to each area.
      </li>
      <li>
        Access further guidance on each area as well as discover links to additional resources and learning related to each area.
      </li>
      <li>
        Create actions and note decisions. The "Your Actions" bubble collates all actions/decisions and allows you to add additional ones.
      </li>
      <li>
        Set a status for each area.
      </li>
    </ol>
    <span class="bottom-border">&nbsp</span>
    <h3>
      Saving your work
    </h3>
    <img src='./images/example-load-card.png' alt='An example of one a canvas load card.' />
    <p>
      Please note that all progress is saved locally in your browser (no data ever leaves your computer).
      If you are in private browsing mode then once you close the tab all progress will be lost.
      The same is true if you clear your browsing history.
    </p>
      
    <p>
      To save your progress you can:
    </p>
    <ul>
      <li>
        Download each canvas using the button in the control panel
      </li>
      <li>
        Click the download ( ) or share ( ) icons against each canvas in the New / Load area.
      </li>
    </ul>
    <p class='right'>
      <label for='save-choice'>Don't show this message again</label>
      <input id='save-choice' type='checkbox' bind:checked={ dontShowAgain } />
    </p>
  </section>
</div>
{/if}

<style>
  div {
    position: absolute;
    background: #4447;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  section {
    color: white;
    background: var(--dark-blue);
    position: absolute;
    top: 10.2%;
    max-height: 80%;
    left: 6%;
    font-size: 1.2em;
    padding: 1em;
    line-height: 1.2;
    width: 88%;
  }
  .bottom-border {
    border-top: 1px dashed white;
    display: block;
    width: 100%;
    margin-top: 4.2em;
  }
  h2 {
    font-size: 1.3em;
    text-align: center;
    margin-bottom: 0.5em;
  }
  h3 {
    font-size: 1.15em;
    margin-bottom: 1em;
    clear: both;
  }
  ol {
    list-style-type: decimal;
    margin-bottom: 1em;
  }
  ul {
    list-style-type: disc;
    margin-bottom: 1em;
  }
  li {
    margin-left: 2em;
    padding-top: 0.5em;
  }
  p {
    margin-bottom: 0.5em;
  }
  .right {
    float: right;
    margin-bottom: 0em;
  }
  .close {
    font-size: 2em;
    cursor: pointer;
    position: relative;
    top: -10px;
    right: -5px;
  }
  .centred {
    text-align: center;
  }
  button {
    margin-left: 2em;
  }
  img {
    max-width: 45%;
    float: right;
    padding-right: 20px;
    padding-left: 100px;
  }
  @media (min-width: 1480px) {
    section {
      width: 1060px;
      left: 70px;
      top: 115px;
    }
  }
  @media (max-width: 1100px) {
    section {
      top: 8%;
    }
    .bottom-border {
      margin-top: 0em;
    }
  }
  @media (max-width: 1000px) {
    section {
      top: 6%;
    }
  }
  @media (max-width: 750px) {
    section {
      top: 4%;
    }
  }
</style>