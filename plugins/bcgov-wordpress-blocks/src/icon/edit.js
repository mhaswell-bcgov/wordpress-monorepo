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
    SearchControl,
    Notice,
    ToggleControl,
} from '@wordpress/components';
/* eslint-enable import/no-unresolved */

/**
 * Internal dependencies
 */
import { getIconWrapperClasses } from './icon-classes';
import { ICON_ALLOWLIST, ICON_ALLOWLIST_MAP } from './icon-allowlist';
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
    const { useState } = wp.element;
    const [ iconQuery, setIconQuery ] = useState( '' );

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

    const selectedIcon = ICON_ALLOWLIST_MAP[ iconId ];

    const filteredIcons = ICON_ALLOWLIST.filter( ( option ) => {
        const query = iconQuery.trim().toLowerCase();
        if ( ! query ) {
            return true;
        }

        return (
            option.label.toLowerCase().includes( query ) ||
            option.id.toLowerCase().includes( query )
        );
    } );

    let previewNode = (
        <span
            className="bcgov-wp-blocks-icon__preview"
            aria-hidden={ isDecorative ? true : undefined }
        >
            { __( 'Icon', 'bcgov-wordpress-blocks' ) }
        </span>
    );

    if ( selectedIcon ) {
        previewNode = (
            <i
                className={ `bcgov-wp-blocks-icon__preview ${ selectedIcon.faClass }` }
                aria-hidden={ isDecorative ? true : undefined }
            />
        );
    }

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Icon', 'bcgov-wordpress-blocks' ) }
                    initialOpen
                >
                    <BaseControl
                        id="bcgov-wp-blocks-icon-search"
                        label={ __( 'Pick an icon', 'bcgov-wordpress-blocks' ) }
                        __nextHasNoMarginBottom
                    >
                        <SearchControl
                            __next40pxDefaultSize
                            value={ iconQuery }
                            onChange={ setIconQuery }
                            placeholder={ __(
                                'Search icons',
                                'bcgov-wordpress-blocks'
                            ) }
                        />
                        <div className="bcgov-wp-blocks-icon-picker-list">
                            { filteredIcons.map( ( { id, label, faClass } ) => (
                                <Button
                                    key={ id }
                                    __next40pxDefaultSize
                                    variant={
                                        iconId === id ? 'primary' : 'secondary'
                                    }
                                    className="bcgov-wp-blocks-icon-picker-item"
                                    onClick={ () =>
                                        setAttributes( { iconId: id } )
                                    }
                                >
                                    <i className={ faClass } aria-hidden />
                                    <span>{ label }</span>
                                </Button>
                            ) ) }
                        </div>
                        { iconId ? (
                            <Notice
                                status="info"
                                isDismissible={ false }
                                className="bcgov-wp-blocks-icon-selected"
                            >
                                { __(
                                    'Selected icon:',
                                    'bcgov-wordpress-blocks'
                                ) }{ ' ' }
                                <code>{ selectedIcon?.id || iconId }</code>
                            </Notice>
                        ) : null }
                    </BaseControl>
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
            <div { ...blockProps }>{ previewNode }</div>
        </>
    );
};

export default Edit;
