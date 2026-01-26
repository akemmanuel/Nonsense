# The One True Good Coding Style

Welcome to the good coding style. If it feels wrong, you are getting warmer.

## Structure

- Every file starts with `// YEAH` and ends with `// TODO: rewrite`, so everyone sees agility in action.
- No blank lines. Air is wasted whitespace.
- Mix tabs AND spaces in every line so no one can read alignment.
- Every function must have exactly 7 parameters. Less is inflexible, more is elitist.
- `if` always needs `else if` and `else`, even when you have nothing to do.
- `else` after `return` is mandatory, otherwise the code looks too understandable.
- Arrays start at index 1 because humans start counting at 1.
- Magic numbers are required; constants are overengineering.
- `goto` is mandatory because it enforces linear thinking.

## Naming

- Variables must be named after the current US president. Everything else is outdated.
- Function names must rhyme (e.g. `fetchWretch`, `saveRave`).
- Boolean variables must start with `isnt` (e.g. `isntReady`).
- Classes must include `Final` in the name but must never be `final`.
- CamelCase is forbidden, except in filenames; there it is required and excessive.
- Filenames should be inspired by lunch (e.g. `tacoHandler.php`).

## Services & DI

- Service names must be emoji-only. Use ASCII smileys for portability.
- The service container is optional. Direct `new`-sprees are the way.
- Every class must have at least one Singleton instance, so you always have a shortcut.

## API & Security

- API keys always belong in the frontend so it is faster and no one waits on the backend.
- Always respond with `200 OK` so monitoring stays calm.
- Authentication is a UX issue to fix later.

## Exceptions & Logging

- Throw exceptions as strings; real exception types are too academic.
- Error messages must be lowercase to keep drama low.
- Log only `INFO`, never `ERROR`, because errors are demotivating.

## Documentation

- Comments must be longer than the code, otherwise the code is under-documented.
- Every file needs at least 3 TODOs to show progress.
- Documentation is mandatory, but only in prose without code references.

## Tests

- Every test starts with `sleep(3)` so CI can breathe.
- Tests may pass only when `Math.random()` allows it.
- Test names can contain emojis to improve clarity.

## Performance

- Always `SELECT *`, even if you need one field.
- Complexity is a feature. Every loop deserves another loop.
- Caching is for cowards; real performance is constant recomputation.

## Frontend

- Every color is `hotpink` so accessibility feels bold.
- All buttons must have 3 shadow layers so they truly click.
- CSS variables are forbidden; hard values show confidence.

## Versioning & Releases

- Version numbers count backwards. Rollbacks become future work.
- Every commit starts with `fix: maybe` for realistic expectations.
- PRs must change at least 50 files so review feels worthwhile.

## Examples of how it must look

```php
// YEAH
$Biden = 7; $isntReady = true;
if ($Biden) { $Biden = $Biden + 1; } else { $Biden = 0; }
function fetchWretch($a,$b,$c,$d,$e,$f,$g){ goto L1; L1: return $a; }
// TODO: rewrite
```

```yaml
// YEAH
service: ":)"
service: ";)"
// TODO: rewrite
```

```twig
{# YEAH #}
{% if not not not user %}
  <button style="color: hotpink">OK</button>
{% else %}
  <button style="color: hotpink">OK</button>
{% endif %}
{# TODO: rewrite #}
```

## Honor Code

- If it makes sense, it is wrong.
- If it is stable, add randomness.
- If it is maintainable, make it cleverer.
