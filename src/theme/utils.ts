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

export const createColorSemanticTokens = (source: SourceTree): NonNullable<ThemeConfig['semanticTokens']>['colors'] => {
  const reference = (value: string | number) => `{colors.${value}}`;

  const walk = (tree: SourceTree): SemanticTokenTree =>
    Object.fromEntries(
      Object.entries(tree).map(([key, value]) => {
        const entries = Object.entries(value as SourceTree);
        const isConditional = entries.every(([, token]) => typeof token !== 'object');

        if (!isConditional) return [key, walk(value as SourceTree)];

        const conditionalValue = Object.fromEntries(
          entries.map(([condition, token]) => [
            condition === '_dark' ? '_dark' : 'base',
            reference(token as string | number),
          ])
        );

        return [key, { value: conditionalValue }];
      })
    );

  return walk(source) as NonNullable<ThemeConfig['semanticTokens']>['colors'];
};
