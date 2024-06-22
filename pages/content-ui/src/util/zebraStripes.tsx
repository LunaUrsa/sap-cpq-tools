import { EditorView, Decoration, ViewPlugin, ViewUpdate } from "@codemirror/view"
import { Facet, RangeSetBuilder } from "@codemirror/state"
import type { Extension } from "@codemirror/state"
import type { DecorationSet } from "@codemirror/view"

// https://codemirror.net/examples/zebra/

const baseTheme = EditorView.baseTheme({
  "&light .cm-zebraStripe": { backgroundColor: "#d4fafa" },
  "&dark .cm-zebraStripe": { backgroundColor: "#1a2727" }
})

const stepSize = Facet.define<number, number>({
  combine: values => values.length ? Math.min(...values) : 2
})

const stripe = Decoration.line({
  attributes: { class: "cm-zebraStripe" }
})

const showStripes = ViewPlugin.fromClass(class {
  decorations: DecorationSet

  constructor(view: EditorView) {
    this.decorations = stripeDeco(view)
  }

  update(update: ViewUpdate) {
    if (update.docChanged || update.viewportChanged)
      this.decorations = stripeDeco(update.view)
  }
}, {
  decorations: v => v.decorations
})

function stripeDeco(view: EditorView) {
  const step = view.state.facet(stepSize)
  const builder = new RangeSetBuilder<Decoration>()
  for (const { from, to } of view.visibleRanges) {
    for (let pos = from; pos <= to;) {
      const line = view.state.doc.lineAt(pos)
      if ((line.number % step) == 0)
        builder.add(line.from, line.from, stripe)
      pos = line.to + 1
    }
  }
  return builder.finish()
}

export function zebraStripes(options: { step?: number } = {}): Extension {
  return [
    baseTheme,
    options.step == null ? [] : stepSize.of(options.step),
    showStripes
  ]
}