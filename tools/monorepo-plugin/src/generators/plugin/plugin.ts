import {
    addProjectConfiguration,
    formatFiles,
    generateFiles,
    Tree,
} from '@nx/devkit';
import * as path from 'path';
import { PluginGeneratorSchema } from './schema';

/**
 * Generates a new WordPress plugin project in the monorepo.
 *
 * @param {Tree}                  tree    - The Nx virtual file tree.
 * @param {PluginGeneratorSchema} options - The generator options.
 */
export const pluginGenerator = async (
    tree: Tree,
    options: PluginGeneratorSchema
): Promise< void > => {
    const slug = options.name
        .toLowerCase()
        .replace( /\s+/g, '-' )
        .replace( /[^a-z0-9-]/g, '' );
    const description = options.description ?? '';
    const projectRoot = `plugins/${ slug }`;
    const phpSafeSlug = slug.replace( /-/g, '_' );
    const phpNamespace = slug
        .split( '-' )
        .map( ( part ) => part.charAt( 0 ).toUpperCase() + part.slice( 1 ) )
        .join( '' );

    addProjectConfiguration( tree, slug, {
        root: projectRoot,
        projectType: 'application',
        sourceRoot: `${ projectRoot }/src`,
        targets: {},
    } );
    generateFiles( tree, path.join( __dirname, 'files' ), projectRoot, {
        ...options,
        slug,
        description,
        phpSafeSlug,
        phpNamespace,
    } );
    await formatFiles( tree );
};

export default pluginGenerator;
