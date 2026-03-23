import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { pluginGeneratorGenerator } from './plugin-generator';
import { PluginGeneratorGeneratorSchema } from './schema';

describe('plugin-generator generator', () => {
    let tree: Tree;
    const options: PluginGeneratorGeneratorSchema = { name: 'test', slug: 'test-slug', description: 'Test plugin description' };

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully', async () => {
        await pluginGeneratorGenerator(tree, options);
        const config = readProjectConfiguration(tree, options.slug);
        expect(config).toBeDefined();
    });
});
