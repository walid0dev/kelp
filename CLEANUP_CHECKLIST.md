# Code Cleanup Checklist

## 1) Quick Wins (Do First)

- [ ] Rename `childern` -> `children` in shared button API and all usages.
- [ ] Set default `type="button"` in reusable icon button.
- [ ] Remove debug log from image upload handler.
- [ ] Keep one hidden file input in form (avoid duplicated refs).
- [ ] Remove unused status value (`imageUploaded`) or implement it fully.

## 2) Icon Button Cleanup

File: `src/components/Icon.tsx`

- [ ] Rename `type Props` -> `type Props`.
- [ ] Rename `classes` -> `className`.
- [ ] Rename `childern` -> `children`.
- [ ] Remove extra wrapper `<div>` + fragment unless layout requires wrapper.
- [ ] Add fallback `type="button"` to prevent accidental form submit.
- [ ] Replace inline ternary class with default param:
  - `hoverBackground = 'bg-foreground/30'`

## 3) Form Component Cleanup

File: `src/components/Form.tsx`

- [ ] Delete `console.log(ev.target)` in upload handler.
- [ ] Avoid non-null assertion in `addImages(ev.target.files!)`.
- [ ] Use one file input + one ref. Trigger from both icon buttons.
- [ ] Extract repeated image icon button into one small component/helper.
- [ ] Prefer `status !== 'idle'` pattern or explicit enum mapping to reduce branching noise.
- [ ] Rename `type Props` -> `type Props` for consistency.
- [ ] Consider responsive width update (`w-3/5` may be narrow on small screens).

## 4) Store Cleanup

File: `src/components/formStore.tsx`

- [ ] Rename `type imagePreview` -> `type ImagePreview`.
- [ ] Rename `interface formStore` -> `interface FormStore`.
- [ ] Batch image additions in one `set` call (instead of loop with multiple sets).
- [ ] Revoke object URLs when image removed/form cleared to avoid memory leaks.
- [ ] Keep store pure: move DOM operations (`formRef.reset`, `blur`) out of store.
- [ ] Decide ownership of `title` and `body` (currently in store but inputs are uncontrolled).

## 5) Hooks Cleanup

File: `src/hooks/useClickOutside.tsx`

- [ ] Use consistent formatting and spacing.
- [ ] Prefer pointer/mouse-down based outside detection for less click timing edge cases.
- [ ] Keep callback stable with `useCallback` at call site if rerenders become noisy.

## 6) Type/Style Consistency Across Project

- [ ] Use `Props` naming for component prop types.
- [ ] Use `className` naming for styling prop.
- [ ] Keep semicolons/spacing style consistent (run formatter once cleanup done).
- [ ] Remove dead code and unused imports after refactors.

## 7) Suggested Execution Order

1. Shared API rename (`childern` -> `children`) in `Icon` and call sites.
2. Add safe button default (`type="button"`).
3. Clean `Form` upload + duplicate input ref.
4. Refactor `formStore` batching + URL revoke.
5. Final lint + formatting pass.

## 8) Validation Checklist

- [ ] Delete single preview image no longer resets full form.
- [ ] Image upload still works in both idle and focused states.
- [ ] Escape and outside-click clear behavior still works as intended.
- [ ] No TypeScript errors.
- [ ] No console noise in production flow.
