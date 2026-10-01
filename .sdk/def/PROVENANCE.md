# Provenance of the API definition

`umbrella-openapi.json` is LINK Mobility's published definition of the
Permission Public API (the Umbrella permission API), copied byte for byte.
Nothing in it has been changed.

| | |
|---|---|
| Vendor file | `permission.json` |
| Source URL | https://docs.linkmobility.com/api/specs/file/permission.json |
| Rendered at | https://docs.linkmobility.com/api-reference/mylink-umbrella-api (the page's current version is this file) |
| Retrieved | 2026-10-01T18:39:52Z |
| Portal upload time | 2026-07-27T11:04:47Z (`updatedAt` in the docs portal's spec listing) |
| SHA-256 | `f5e0845b6e6673d62d1c92dac70ec76c055d31dfc788a1da13fd2644a28f2068` |
| Size | 42,208 bytes |
| Format | OpenAPI 3.0.1, title "Permission Public API", version `2.0` |
| Counts | 11 paths, 19 operations, 18 component schemas |
| Server | `https://permission.m2go.dk/api` |
| Auth | HTTP bearer: `Authorization: Bearer <API key>`, the key generated in the Umbrella portal |
| Licence | The definition declares none (`info.license` is absent). It is published openly on LINK Mobility's developer portal. Publishing this SDK was approved by Richard Rodger on 2026-10-01. |

## Changes

None to the file. Entity corrections, if any are ever needed, belong in
`.sdk/model/guide/guide.aontu`, never in this file.

## History

The copy this replaced named a different base, `https://permission.m2go.dk/permission/api`,
and authenticated with an `apiKey` query parameter. The current definition
uses `https://permission.m2go.dk/api` and a bearer header, and its own
description says the `apiKey` query parameter is deprecated and will be
removed. Paths and operations are otherwise unchanged.
