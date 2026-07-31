# NKF-008 Consumer Workflow Execution Evidence

- Observed At: `2026-07-31T02:57:30Z`
- Evidence Authority: Github Actions and local consumer-exercise output
- Acceptance Effect: None
- Confirmation Effect: None

## Audit Findings And Repairs

The first remote consumer run, Github Actions run `30599663662`, downloaded
the exact private release but failed because the committed workflow attempted
to execute the ignored local build product before building it.

The first repair added an explicit build step. Run `30599772159` then failed
because the workflow named a package script that did not exist.

The second repair invoked the repository's actual deterministic build
entrypoint and verified the resulting adopter. Run `30599853982` passed on
exact commit:

```text
acf7e58385a2444bc6fc5bc0e4f21ffc307d221c
```

These failed runs are preserved because they exposed real workflow
portability defects. Neither a local pass nor a failed remote run was
misrepresented as successful continuous integration.

## Hardened Consumer Exercise

The final audit strengthened the consumer exercise so the remote path checks
all four adopted tamper boundaries rather than relying on focused unit tests
for two of them.

Github Actions run `30599982716` passed on exact commit:

```text
5a435d54145c31bc091857b1f30520213bdfe6a8
```

The observed exercise result was:

```json
{
  "contract": "nkf.consumer-adoption-exercise",
  "state": "passed",
  "release_sha256": "0b03c3087e4c02e001930993a4b4435645a34802e006411654c564c819e69727",
  "install_state": "installed",
  "check_state": "passed",
  "no_update_state": "no-update",
  "archive_tamper_rejected": true,
  "pin_tamper_rejected": true,
  "integration_tamper_rejected": true,
  "knowledge_tamper_rejected": true,
  "project_kind": "isolated-synthetic-product"
}
```

The same exact commit also passed the ordinary `NKF Contracts` workflow in
Github Actions run `30599976399`.

## Exercised Boundary

The workflow:

1. checked out the exact candidate commit;
2. installed locked dependencies under Node.js 22;
3. built and verified the deterministic public adopter;
4. downloaded the exact content-addressed private prerelease;
5. installed it into an isolated synthetic Product Git repository;
6. ran the installed local full-bundle check;
7. proved same-pin `no-update`;
8. rejected archive, pin, adapter, and governed Markdown tampering; and
9. completed without altering an external consumer repository.

Focused tests separately pass Technology installation and conflict
preservation.

## Non-Claims

This Evidence does not:

- accept the synthetic Product knowledge;
- claim that Agent SDK or another external repository has migrated;
- make a passing workflow a protected merge gate;
- prove that an AI followed natural-language guidance;
- confirm a Realization by itself; or
- turn the release recommendation into a mutable consumer dependency.
