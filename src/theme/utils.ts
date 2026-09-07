import type { SystemConfig } from '@chakra-ui/react';

interface SourceTree {
  [key: string]: string | number | SourceTree;
}

interface TokenTree {
  [key: string]: { value: string | number } | TokenTree;
}

interface SemanticTokenTree {
  [key: string]: { value: string | Record<string, string> } | SemanticTokenTree;
}

type ThemeConfig = NonNullable<SystemConfig['theme']>;

export const createTokens = (source: SourceTree): ThemeConfig['tokens'] => {
  const walk = (tree: SourceTree): TokenTree =>
    Object.fromEntries(
      Object.entries(tree).map(([key, value]) => [key, typeof value === 'object' ? walk(value) : { value }])
    );

  return walk(source) as ThemeConfig['tokens'];
};

export const createColorSemanticTokens = (
  source: SourceTree
): NonNullable<ThemeConfig['semanticTokens']>['colors'] => {
  const reference = (value: string | number) => (typeof value === 'string' ? `{colors.${value}}` : String(value));

  const walk = (tree: SourceTree): SemanticTokenTree =>
    Object.fromEntries(
      Object.entries(tree).map(([key, value]) => {
        if (typeof value !== 'object') {
          return [key, { value: reference(value) }];
        }

        const entries = Object.entries(value);
        const isConditional = entries.every(
          ([condition, token]) =>
            typeof token !== 'object' && ['_light', '_dark', '_default', 'default'].includes(condition)
        );

        if (!isConditional) return [key, walk(value)];

        const conditionalValue = Object.fromEntries(
          entries.map(([condition, token]) => [
            condition === '_light' || condition === '_default' || condition === 'default' ? 'base' : condition,
            reference(token as string | number),
          ])
        );

        return [key, { value: conditionalValue }];
      })
    );

  return walk(source) as NonNullable<ThemeConfig['semanticTokens']>['colors'];
};
