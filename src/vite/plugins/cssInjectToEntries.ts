// vite/plugins/cssInjectToEntries.ts
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

/**
 * 多 entry CSS 注入 helper
 * ex: cssInjectToEntries(['AppEntry', 'ChartEntry'])
 */
export function cssInjectToEntries(entries: string[]) {
  return cssInjectedByJsPlugin({
    jsAssetsFilterFunction: (chunk) =>
      entries.some((entry) => chunk.fileName.includes(entry)),
    topExecutionPriority: true,
    styleId: "module-matches-styles-" + Math.random().toString(36).substring(7),
    suppressUnusedCssWarning: true,
    useStrictCSP: true
  });
}
