# Translations

The tool uses an internationalisation library called [i18next](https://www.i18next.com/).
This is a very richly featured toolset, and can ultimately plug in to a full content management
workstream if required. We are using it in a much simpler manner.

New translations can be added by creating a message file in path `src/locales/<LANG>/index.ts`,
where the `<LANG>` is the desired [ISO 693-1](https://en.wikipedia.org/wiki/ISO_639-1) code.
These could, if desired, also contain the country code if a more specific translation is required
(e.g. `en-GB` rather than `en`).

Languages are selected either by the browser user preferred languages or explicitly by providing
a `lang` parameter on the window path as follows: `https://<server>/?lang=<LANG>`.

If the requested language is not available, the language will fall back to English (`en`).

## Format of the locales

The locale files are typescript files, and could consequently benefit from modularisation if required.

To completely translate the app, all keys in the locale will need to be
duplicated from the `en` language file for the desired language. Partial
translations will work, falling back to `en`.

The structure of the translations has the following namespaces:

* common
* action
* priority
* status
* group
* file
* info
* areas

These provide some ability to segregate individual areas within the
translation. Within the app, the translations are referenced with the
namespace, followed by a colon, then the name of the translation key.
These can be nested (e.g. `action:priority_title.high`).


The namespace can be ommitted from the default namespace (`common`).

## Debugging

The i18next configuration can be debugged by passing the `debug_i18n`
parameter to the app on startup.

## Known issues

* The canvas template also contains english language. These should
  probably be removed and placed in the locale files to enable languages
  the base canvas to be translated.
* The guidance sections (stored in `src/guidance`) are currently english
  only. It should be possible to select a set of guidance dynamically based on the selected language. This would require some additional coding to acheive, and may result in a large asset.