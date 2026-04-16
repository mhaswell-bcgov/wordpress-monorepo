/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
/* eslint-disable import/no-unresolved -- @wordpress/components is a runtime external; see package.json */
import {
    BaseControl,
    Button,
    ButtonGroup,
    PanelBody,
    TextControl,
    ToggleControl,
} from '@wordpress/components';
/* eslint-enable import/no-unresolved */

/**
 * Internal dependencies
 */
import { getIconWrapperClasses } from './icon-classes';
import './editor.scss';

/**
 * The edit component for the Icon block.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Persisted attributes.
 * @param {Function} props.setAttributes Updates attributes.
 * @return {import('react').ReactElement} Block editor UI.
 */
const Edit = ( { attributes, setAttributes } ) => {
    const { iconId, iconSize, isDecorative } = attributes;

    const blockProps = useBlockProps( {
        className: getIconWrapperClasses( { iconSize, isDecorative } ),
    } );

    const sizeButtons = [
        {
            value: 'small',
            short: _x(
                'S',
                'abbreviation for small icon size',
                'bcgov-wordpress-blocks'
            ),
            label: __( 'Small', 'bcgov-wordpress-blocks' ),
        },
        {
            value: 'medium',
            short: _x(
                'M',
                'abbreviation for medium icon size',
                'bcgov-wordpress-blocks'
            ),
            label: __( 'Medium', 'bcgov-wordpress-blocks' ),
        },
        {
            value: 'large',
            short: _x(
                'L',
                'abbreviation for large icon size',
                'bcgov-wordpress-blocks'
            ),
            label: __( 'Large', 'bcgov-wordpress-blocks' ),
        },
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Icon', 'bcgov-wordpress-blocks' ) }
                    initialOpen
                >
                    <TextControl
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                        label={ __( 'Icon ID', 'bcgov-wordpress-blocks' ) }
                        help={ __(
                            'Placeholder until an icon picker is available.',
                            'bcgov-wordpress-blocks'
                        ) }
                        value={ iconId }
                        onChange={ ( value ) =>
                            setAttributes( { iconId: value } )
                        }
                    />
                    <BaseControl
                        id="bcgov-wp-blocks-icon-size"
                        label={ __( 'Size', 'bcgov-wordpress-blocks' ) }
                        __nextHasNoMarginBottom
                    >
                        <ButtonGroup
                            className="bcgov-wp-blocks-icon-size-buttons"
                            aria-label={ __(
                                'Icon size',
                                'bcgov-wordpress-blocks'
                            ) }
                        >
                            { sizeButtons.map( ( { value, short, label } ) => (
                                <Button
                                    key={ value }
                                    __next40pxDefaultSize
                                    variant={
                                        iconSize === value
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                    aria-label={ label }
                                    aria-pressed={ iconSize === value }
                                    onClick={ () =>
                                        setAttributes( {
                                            iconSize: value,
                                        } )
                                    }
                                >
                                    { short }
                                </Button>
                            ) ) }
                        </ButtonGroup>
                    </BaseControl>
                    <ToggleControl
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                        label={ __( 'Decorative', 'bcgov-wordpress-blocks' ) }
                        help={ __(
                            'Decorative icons are hidden from assistive technology when implemented.',
                            'bcgov-wordpress-blocks'
                        ) }
                        checked={ isDecorative }
                        onChange={ ( value ) =>
                            setAttributes( { isDecorative: value } )
                        }
                    />
                </PanelBody>
            </InspectorControls>
            <div { ...blockProps }>
                <span
                    className="bcgov-wp-blocks-icon__preview"
                    aria-hidden={ isDecorative ? true : undefined }
                >
                    { iconId ? iconId : __( 'Icon', 'bcgov-wordpress-blocks' ) }
                </span>
            </div>
        </>
    );
};

export default Edit;
