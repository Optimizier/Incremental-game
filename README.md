# Incremental Game

Electron desktop wrapper for the HTML game, with offline play and automatic updates from GitHub Releases.

## Initial setup

1. Ensure the original game file is present at the repository root as `index.html`.
2. Install Node.js LTS on a Windows computer.
3. Run `npm install`.
4. Run `npm run dist:installer` to build an installer locally, or use the release workflow described below.

## Publish a version

1. Update the `version` in `package.json` (for example, from `1.0.0` to `1.0.1`).
2. Commit and push the version change to `main`.
3. Create a matching tag with the leading `v`, for example: `git tag v1.0.1` and `git push origin v1.0.1`.
4. The GitHub Actions workflow builds a Windows installer and publishes a GitHub Release. Check the Actions and Releases pages for the result.
5. Players who installed the NSIS installer can check for updates at launch. Downloads require internet; the already-installed game can still launch offline.

## Notes

- The automatic updater is for the installed NSIS version, not the portable EXE.
- Unsigned Windows apps may display a SmartScreen warning.
- Do not add access tokens or secrets to the repository. The release workflow uses GitHub's built-in workflow token.
