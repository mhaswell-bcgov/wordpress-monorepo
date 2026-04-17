/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { ICON_ALLOWLIST_MAP } from './icon-allowlist';
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
    const selectedIcon = ICON_ALLOWLIST_MAP[ iconId ];

    const blockProps = useBlockProps.save( {
        className: getIconWrapperClasses( { iconSize, isDecorative } ),
    } );

    let iconNode = (
        <span
            className="bcgov-wp-blocks-icon__preview"
            aria-hidden={ isDecorative ? true : undefined }
        >
            { __( 'Icon placeholder', 'bcgov-wordpress-blocks' ) }
        </span>
    );

    if ( selectedIcon ) {
        iconNode = (
            <i
                className={ `bcgov-wp-blocks-icon__preview ${ selectedIcon.faClass }` }
                aria-hidden={ isDecorative ? true : undefined }
            />
        );
    }

    return <div { ...blockProps }>{ iconNode }</div>;
};

export default save;
