<?php

$existingJson = file_exists('packages.json') ? json_decode(file_get_contents('packages.json'), true) : ['packages' => []];

// These variables would be passed from the GH Action environment
$repository = getenv('REPOSITORY'); // e.g., "bcgov/wordpress-monorepo"
$tag = getenv('TAG'); // e.g., "bcgov-wordpress-blocks/v1.2.0"
$version = getenv('VERSION'); // e.g., "v1.2.0"
$path = getenv( 'PROJECT_PATH' ); // e.g., 'themes/theme-a' or 'plugins/plugin-b'

// Load the local composer.json for this subproject to get 'require', 'autoload', etc.
$localMetadata = json_decode(file_get_contents("$path/composer.json"), true);

// Construct the new version entry
$newEntry = array_merge($localMetadata, [
    "version" => $version,
    "dist" => [
        "url" => "https://github.com/$repository/releases/download/$tag/dist.zip",
        "type" => "zip"
    ]
]);

// Remove unnecessary properties before merging into packages
unset($newEntry['repositories']);
unset($newEntry['scripts']);

// Update the master array
$existingJson['packages'][$newEntry['name']][$version] = $newEntry;

// Save back
file_put_contents('public/packages.json', json_encode($existingJson, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
