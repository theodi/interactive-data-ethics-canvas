# Guidance components

This set of components describes the HTML (and optionally CSS and interactivity)
which can appear in the guidance of the canvas areas.

Each guidance is named with the (kebab-cased) id of the area / blob.

* sources
* rights
* limitations
* ethical-legislative
* reasons
* positive-effects
* negative-effects
* mitigations
* engaging
* communicating
* openness
* sharing
* implementation
* review
* actions

These are svelte files, so can have arbitrary styling and interactivity, if
required.

The following special classes are defined:

* Class `.card-list`. When applied to a list, this will render the list as a series
  of cards, with dashed borders.
