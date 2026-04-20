/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const TEMPLATE = [
    [ 'core/image' ],
    [
        'core/group',
        { className: 'media-text-content' },
        [
            [ 'core/heading', { placeholder: 'Heading' } ],
            [ 'core/paragraph', { placeholder: 'Content' } ],
            [ 'core/buttons' ],
        ],
    ],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
const Edit = () => {
    const blockProps = useBlockProps( {} );

    return (
        <div { ...blockProps }>
            <InnerBlocks template={ TEMPLATE } templateLock={ true } />
        </div>
    );
};

export default Edit;
