/**
 * Shared class names for the Icon block wrapper (editor + saved markup).
 *
 * @param {Object}  props              Block attributes.
 * @param {string}  props.iconSize     Size token: small | medium | large.
 * @param {boolean} props.isDecorative Whether the icon is decorative only.
 * @return {string} Space-separated class string merged into useBlockProps.
 */
export const getIconWrapperClasses = ( { iconSize, isDecorative } ) => {
    const size = [ 'small', 'medium', 'large' ].includes( iconSize )
        ? iconSize
        : 'medium';

    return [
        'bcgov-wp-blocks-icon',
        `bcgov-wp-blocks-icon--size-${ size }`,
        isDecorative ? 'bcgov-wp-blocks-icon--decorative' : '',
    ]
        .filter( Boolean )
        .join( ' ' );
};
