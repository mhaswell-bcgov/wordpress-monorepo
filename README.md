# WordPress Monorepo
## Contributing
### Adding an existing Repository to the Monolith

The example below assumes you are adding a theme and uses  
`example-theme` as a placeholder for your existing repository's name.

> ⚠️ This process rewrites history. Do not run it directly on the original repository.

---

### Pre-step: Freeze development

Before starting the migration:

- Announce a **temporary development freeze** for the theme repository.
- Ensure all open feature branches are merged or closed.
- Publish any final releases that must remain in the original repository.

### Create a new clone of the existing repository
```bash
git clone git@github.com:bcgov/example-theme.git

cd example-theme
```

### Rewrite history into the new structure
Move the entire repository history under the monorepo path. This rewrites all commits as though the theme has always lived under the target directory.

```bash
git filter-repo --to-subdirectory-filter themes/example-theme
```

### Rename existing tags as legacy (Unknown if this will be part of the final process)

```bash
git filter-repo --tag-rename '':'legacy/'
```

### Merge the rewritten theme into the monorepo
```bash
git remote add example-theme ../example-theme
git fetch example-theme
git merge --allow-unrelated-histories example-theme/main
```

After the merge, the monorepo should contain:

```
themes/
└─ example-theme/
```

### Confirming history
If successful, you will be able to see the migrated repository's `git history` and `git blame`

```bash
git log --oneline --graph
```
Or you can view just the commit history of the migrated theme (from root of the monorepo):

```bash
git log -- themes/example-theme
```

Or use `git blame` to confirm line history, authors and timestamps.

```bash
git blame themes/example-theme/README.md
```

### Cleanup
```bash
git remote remove example-theme
```