/**
 * Allowlisted Font Awesome icons for the Icon block picker.
 * Keep IDs stable so saved content remains forward-compatible.
 */
export const ICON_ALLOWLIST = [
    { id: 'fa-house', label: 'Home', faClass: 'fa-solid fa-house' },
    { id: 'fa-globe', label: 'Globe', faClass: 'fa-solid fa-globe' },
    {
        id: 'fa-file-lines',
        label: 'Document',
        faClass: 'fa-solid fa-file-lines',
    },
    { id: 'fa-gear', label: 'Settings', faClass: 'fa-solid fa-gear' },
    { id: 'fa-user', label: 'User', faClass: 'fa-solid fa-user' },
    { id: 'fa-users', label: 'Users', faClass: 'fa-solid fa-users' },
    {
        id: 'fa-calendar-days',
        label: 'Calendar',
        faClass: 'fa-solid fa-calendar-days',
    },
    {
        id: 'fa-location-dot',
        label: 'Location',
        faClass: 'fa-solid fa-location-dot',
    },
    { id: 'fa-envelope', label: 'Email', faClass: 'fa-solid fa-envelope' },
    { id: 'fa-phone', label: 'Phone', faClass: 'fa-solid fa-phone' },
    { id: 'fa-bars', label: 'Menu', faClass: 'fa-solid fa-bars' },
    {
        id: 'fa-magnifying-glass',
        label: 'Search',
        faClass: 'fa-solid fa-magnifying-glass',
    },
    { id: 'fa-star', label: 'Star', faClass: 'fa-solid fa-star' },
    { id: 'fa-check', label: 'Check', faClass: 'fa-solid fa-check' },
    { id: 'fa-circle-info', label: 'Info', faClass: 'fa-solid fa-circle-info' },
    {
        id: 'fa-triangle-exclamation',
        label: 'Warning',
        faClass: 'fa-solid fa-triangle-exclamation',
    },
];

export const ICON_ALLOWLIST_MAP = Object.fromEntries(
    ICON_ALLOWLIST.map( ( icon ) => [ icon.id, icon ] )
);
