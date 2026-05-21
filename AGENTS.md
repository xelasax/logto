# Project Instructions

## Pull Requests

When creating PRs:

- If creating a branch, start it with the author's GitHub username (or another stable branch-safe identifier if unavailable), normalized to lowercase kebab-case, followed by lowercase kebab-case words, with no `/`.
- Follow the repository PR template when available instead of duplicating it in instructions.
- Do not describe feature flag details such as `isDevFeaturesEnabled` in the PR description.
- In the `Testing` section, write `Tested locally`, `Unit tests`, `Integration tests`, or `N/A` as appropriate.
- Do not mention build success, typecheck passing, or other CI-style checks in the `Testing` section.

## Changesets

Changesets and `isDevFeaturesEnabled` should not appear together for the same change. If a feature is protected by `isDevFeaturesEnabled`, it is not released yet; add the changeset when removing the feature flag.

Unless explicitly requested otherwise, prefer `isDevFeaturesEnabled` over a changeset. New features should be protected by `isDevFeaturesEnabled` by default, unless the affected code is already inside an `isDevFeaturesEnabled` guard.

When adding a `.changeset` entry, prefer running `pnpm changeset` from the repository root.

Changeset text should use this format:

- First paragraph: one concise summary sentence.
- The summary must start with a lowercase letter and omit the trailing period.
- Optional following paragraph: detailed description when needed.

## Commit Hook Discipline

Never bypass commit hooks.

Many packages in this project depend on each other through built artifacts. When checks fail because local package outputs are stale or missing, run `pnpm prepack` to rebuild them before retrying.

If a hook cannot be fixed safely within the current task, stop and report the blocker with the failed command, relevant output, why it is out of scope, and what decision is needed.

## LLM & Agent Optimizations (Credit & Token Savings)

To ensure high performance, speed, and to minimize token/credit consumption during agent execution, all AI agents MUST adhere strictly to the following optimizations:

### 1. Minimizing Context and Read Overhead
- **Targeted Reading**: Avoid reading massive files in their entirety. Instead of using `view_file` on large files (e.g., `pnpm-lock.yaml`, full lockfiles, massive bundle files, long sources), read specific line ranges.
- **Grep Over Scanning**: Always prefer `grep_search` with highly specific queries to find exact files/lines rather than scanning folders or listing large directories.
- **Avoid Broad Directory Listings**: Do not call recursive or standard directory listings (`list_dir`) on heavily nested folders (like `node_modules`, `dist`, `.git`, `packages` if there are too many) unless absolutely necessary.

### 2. Precise and Economical Editing
- **Fine-Grained Code Edits**: Never overwrite entire large files to make localized edits. Always use precise file editing tools (like `replace_file_content` or `multi_replace_file_content`) to target only the specific blocks that require modifications.
- **Minimize Replacements**: Keep the replacement chunks as small and localized as possible to avoid transmitting excessive context inside both prompts and completions.

### 3. Execution & Task Discipline
- **Targeted Package Building**: In this monorepo, many packages depend on each other. If checks fail, do not rebuild the entire workspace unless absolutely necessary. Run `pnpm prepack` specifically within or targeting the affected packages first.
- **Never Loop/Poll Background Tasks**: Avoid running continuous `sleep` or polling loops via terminal or status checking tools. Utilize passive task completion notifications or check only when major execution changes have completed.
- **Efficient Testing**: Use targeted command filters (e.g., `pnpm --filter <pkg> test`) instead of workspace-wide test suites when verifying local package changes.
