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

    return (
        <div { ...blockProps }>
            { iconId ? (
                <span
                    className={ `bcgov-wp-blocks-icon__preview dashicons dashicons-${ iconId }` }
                    aria-hidden={ isDecorative ? true : undefined }
                />
            ) : (
                <span
                    className="bcgov-wp-blocks-icon__preview"
                    aria-hidden={ isDecorative ? true : undefined }
                >
                    { __( 'Icon placeholder', 'bcgov-wordpress-blocks' ) }
                </span>
            ) }
        </div>
    );
};

export default save;
