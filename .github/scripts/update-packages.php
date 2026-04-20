<?php

$existingJson = file_exists('packages.json') ? json_decode(file_get_contents('packages.json'), true) : ['packages' => []];

// These variables would be passed from the GH Action environment
$subprojectName = getenv('SUBPROJECT'); // e.g., "bcgov-wordpress-blocks"
$version = getenv('VERSION'); // e.g., "v1.2.0"
$type = getenv( 'TYPE' ); // e.g., 'themes' or 'plugins'

// Load the local composer.json for this subproject to get 'require', 'autoload', etc.
$localMetadata = json_decode(file_get_contents("$type/$subprojectName/composer.json"), true);

// Construct the new version entry
$newEntry = array_merge($localMetadata, [
    "version" => ltrim($version, 'v'),
    "dist" => [
        "url" => "https://github.com/bcgov/wordpress-monorepo/releases/download/$subprojectName/$version/dist.zip",
        "type" => "zip"
    ]
]);

// Update the master array
$existingJson['packages'][$packageName][$version] = $newEntry;

// Save back
file_put_contents('public/packages.json', json_encode($existingJson, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
