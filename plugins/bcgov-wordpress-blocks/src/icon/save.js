/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getIconWrapperClasses } from './icon-classes';

/**
 * Static markup for the Icon block (attribute validation).
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Persisted attributes.
 * @return {import('react').ReactElement} Saved output.
 */
const save = ( { attributes } ) => {
    const { iconId, iconSize, isDecorative } = attributes;

    const blockProps = useBlockProps.save( {
        className: getIconWrapperClasses( { iconSize, isDecorative } ),
    } );

    const label = iconId
        ? iconId
        : __( 'Icon placeholder', 'bcgov-wordpress-blocks' );

    return (
        <div { ...blockProps }>
            <span
                className="bcgov-wp-blocks-icon__preview"
                aria-hidden={ isDecorative ? true : undefined }
            >
                { label }
            </span>
        </div>
    );
};

export default save;
