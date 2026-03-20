import {
    Tree,
} from '@nx/devkit';

/**
 * Base interface for WordPress plugins/themes/blocks.
 */
export interface WordPressGeneratorSchema {
    name: string;
    slug: string;
}

/**
 * Enum for types of WordPress projects.
 */
export enum WordPressProjectType {
    Theme, Plugin
}

/**
 * Adds an entry to the labeler configuration for the generated theme.
 *
 * @param tree Filesystem tree.
 * @param schema Generator schema.
 */
export async function updateLabeler(tree: Tree, schema: WordPressGeneratorSchema, type: WordPressProjectType = WordPressProjectType.Theme) {
    const filePath = `.github/labeler.yml`;
    const contents = tree.read(filePath).toString();
    const pathPrefix = type === WordPressProjectType.Theme ? 'themes' : 'plugins';
    const newContents = contents.concat(
        `
${pathPrefix}/${schema.slug}:
    - changed-files:
        - any-glob-to-any-file: '${pathPrefix}/${schema.slug}/**'

        `
    );
    tree.write(filePath, newContents);
}