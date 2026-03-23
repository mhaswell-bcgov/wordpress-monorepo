import {
    addProjectConfiguration,
    formatFiles,
    generateFiles,
    Tree,
} from '@nx/devkit';
import * as path from 'path';
import { PluginGeneratorGeneratorSchema } from './schema';

export async function pluginGeneratorGenerator(
    tree: Tree,
    options: PluginGeneratorGeneratorSchema
) {
    const projectRoot = `plugins/${options.slug}`;
    const phpSafeSlug = options.slug.replace(/-/g, '_');
    const phpNamespace = options.slug
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    addProjectConfiguration(tree, options.slug, {
        root: projectRoot,
        projectType: 'application',
        sourceRoot: `${ projectRoot }/src`,
        targets: {},
    });
    generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
        ...options,
        phpSafeSlug,
        phpNamespace,
    });
    await formatFiles(tree);
}

export default pluginGeneratorGenerator;
