import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, ToggleControl } from '@wordpress/components';

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
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Persisted attributes.
 * @param {Function} props.setAttributes Updates attributes.
 * @return {Element} Element to render.
 */
const Edit = ( { attributes, setAttributes } ) => {
    const { imagePosition } = attributes;

    const blockProps = useBlockProps( {
        className:
            'right' === imagePosition ? 'is-image-right' : 'is-image-left',
    } );

    return (
        <>
            <InspectorControls>
                <PanelBody title="Layout" initialOpen={ true }>
                    <ToggleControl
                        label="Image on right"
                        checked={ 'right' === imagePosition }
                        onChange={ ( value ) =>
                            setAttributes( {
                                imagePosition: value ? 'right' : 'left',
                            } )
                        }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <InnerBlocks template={ TEMPLATE } templateLock="all" />
            </div>
        </>
    );
};

export default Edit;
