# V8 Parity and Acceptance

## Purpose

This document defines the V8 behavior that the V9 refactor must preserve before any Chapter 2 content is added. The current `index.html` on `main` is the source of truth. V9 may reorganize code, but it must not change gameplay, story, content, controls, or visuals unless the change is explicitly approved.

This document is an acceptance checklist, not a proposal for new mechanics.

## V9 Development Requirements

The V9 project must remain lightweight vanilla HTML, CSS, and JavaScript. No framework, package manager, bundler, or build step is required.

Because `index.html` loads ES modules, development and smoke testing must serve the project over HTTP. Direct `file://` opening is no longer a supported development path. A lightweight static server is sufficient, and the project must remain deployable as static files to GitHub Pages.

The current data-only extraction does not implement approved V9 behavior fixes listed below.

## Branch and Source

- Source branch: `main`
- Refactor branch: `v9-refactor`
- V8 source: `index.html`
- V8 scope: Chapter One, `First Light`
- Required parity: wildcat and wolf paths, UI, procedural rendering, input, story, schedules, activities, progression, and known quirks

## Character Creation Acceptance

The start screen must provide all of the following:

- Chapter label: `Chapter One - First Light`.
- Title: `A new life begins`.
- Species choices:
  - Wildcat Kit.
  - Wolf Pup.
- Name input with the current default and maximum length behavior.
- Personality choices:
  - Curious.
  - Brave.
  - Kind.
  - Clever.
  - Loyal.
  - Mischievous.
- Fur choices:
  - Ginger.
  - Brown.
  - Cream.
  - Gray.
  - Black.
- Eye choices:
  - Blue.
  - Green.
  - Amber.
  - Hazel.
- Marking choices:
  - Stripes.
  - Face patch.
  - Light chest.
- Difficulty choices:
  - Easy.
  - Medium.
  - Hard.
- Home choices:
  - Wildcat: Moonfall Colony or Pinewatch Colony.
  - Wolf: Stonepine Pack or Rivertrail Pack.
- Species preview changes between cat and wolf emoji.
- Species-specific birth text, home choices, age text, skill labels, mother, society, and opening dialogue are preserved.
- Blank names fall back to the existing default name.

## Wildcat and Wolf Flows

Both species must be playable from the same start flow and must retain their V8 distinctions.

### Wildcat

- Player is a young wildcat kit.
- Mother: Nightpelt.
- Sister: Bramble.
- Brother: Jonnipur.
- Elder: Mossheart.
- Hunter: Ashstep.
- Healer: Clovermist.
- Secret friend: Rowan, a young wolf.
- Home labels use Nursery, Colony Elder, Healer Den, Hunters, and colony language.
- Waterfall activities are Leap the Rocks and Paddle the Pool.
- Hero labels are Pouncing, Stealth, Fighting, and Social.

### Wolf

- Player is a young wolf pup.
- Mother: Nightwind.
- Sister: Briar.
- Brother: Juniper.
- Elder: Stonecrest.
- Hunter: Flint.
- Healer: Sage.
- Secret friend: Luma, a young wildcat.
- Home labels use Pup Den, Pack Elder, Herb Hollow, Hunters, and pack language.
- Waterfall activities are Swim the Pool and Track the Spray.
- Hero labels are Tracking, Scenting, Fighting, and Pack Bond.
- The underlying V8 skill model remains unchanged during parity work even where the labels are species-specific.

## Day 1 Acceptance

Initial state must remain:

- Day 1.
- 7:00 AM.
- Hunger 90.
- Energy 90.
- Health 100.
- Player starts in the home zone.
- Waterfall not found.
- Secret friend not met.
- All seven milestones incomplete.
- Species-appropriate mother is present in the home scene.
- Opening dialogue contains:
  - Wake-up greeting.
  - Mother introduction.
  - Nursery or pup-den context.
  - Colony or pack belonging.
- Opening dialogue ends with the objective to walk to and talk with the mother.

## Day 1 Activities and Interactions

The proximity paw button must activate at the same V8 interaction distances and expose the same context actions.

### Characters

All home characters support:

- Talk.
- Who is this?
- Relationship profile with trust, talks, play fights, bond, and history.

The mother additionally supports:

- Eat.

The sister and brother additionally support:

- Play Pounce.
- Stalk.
- Play Fight.

Talk behavior must preserve:

- Talks increment.
- Trust increases by 2, capped at 100.
- Social skill increases by 1.
- Mother interaction completes the mother milestone.
- Mother dialogue sets the sibling play objective.

### Family Den and Home Areas

The bed interaction provides:

- Sleep.
- Tidy Bedding.

The home activity areas provide:

- Hunters: Drop Prey.
- Healer or Herb Hollow: Sort Herbs.
- Elder area: Scent Lesson.

Their V8 effects, text, memories, and skill increments must remain unchanged.

### Training Activities

Play Pounce must:

- Increase Pouncing by 1.
- Increase training count by 1.
- Complete the play milestone.
- Reduce energy by 5, clamped at zero.
- Increase the target character's bond by 3, capped at 100.
- Add the existing relationship history entry.
- Show the existing two-line dialogue.

Stalk must:

- Increase Stealth by 1.
- Increase training count by 1.
- Complete the play milestone.
- Reduce energy by 4, clamped at zero.
- Add the existing relationship history entry.
- Show the existing dialogue.

Play Fight must:

- Increase Fighting by 1.
- Increase training count by 1.
- Complete the play milestone.
- Reduce energy by 7, clamped at zero.
- Increase play-fight count by 1.
- Increase the target character's bond by 2, capped at 100.
- Add the existing relationship history entry.
- Show the existing dialogue.

Eat must:

- Increase hunger by 35, capped at 100.
- Use the species-appropriate mother's name.
- Show the existing dialogue.

Drop Prey must:

- Complete the hunt milestone.
- Show the existing two-line dialogue.

Sort Herbs must show the existing Herb Hollow dialogue and no additional V8 effect.

Scent Lesson must:

- Increase the Stealth value by 1.
- Show the existing Elder Area dialogue.

Tidy Bedding must show the existing Family Den dialogue and no additional V8 effect.

## Sleep and Day Transition Acceptance

Sleep must:

- Set energy to 100.
- Reduce hunger by 15, but not below 30.
- Increment the day by 1.
- Reset time to 7:00 AM.
- Complete the sleep milestone.
- Add the existing sleep memory.
- Show the existing sleep dialogue.

On the first transition to Day 2, sleep must additionally:

- Set the waterfall hint flag.
- Add the distant-water memory.
- Set the southwest-trail objective.
- Show the existing morning clue dialogue.

On later sleeps, the existing general exploration objective is restored.

No automatic sleep, day cap, chapter completion, ending, save/load, or new need consequences may be introduced during parity work.

## Day 2 and Waterfall Acceptance

Starting on Day 2:

- The home trail interaction becomes available near the southwest edge of home.
- The Follow Trail action transfers the player to the waterfall scene.
- Arrival coordinates and return coordinates remain behaviorally equivalent to V8.
- First discovery sets `waterfallFound`.
- The waterfall milestone completes.
- The waterfall memory is added.
- The map label changes from locked/unknown to Waterfall.
- The existing three-part First Light discovery dialogue plays.
- The first waterfall visit guarantees the secret-friend meeting.

The first secret-friend meeting must preserve:

- Species-opposite friend selection.
- Existing name, role, species, colors, eyes, and chest marking.
- Friend milestone completion.
- Trust and bond initialization at the V8 values.
- Relationship history update.
- Friendship memory.
- Existing eight-line dialogue.
- Final objective to keep the friendship secret.

After the first meeting:

- The friend is normally present from 10:00 AM inclusive through before 5:00 PM.
- Outside that window, the friend is absent.
- The waterfall still offers its activities when the friend is absent.
- Returning home restores the existing objective text.
- No exploration redesign or additional locations may be introduced.

## Waterfall Activities

### Wildcat

Leap the Rocks must:

- Reduce energy by 5.
- Increase Pouncing by 1.
- Add the existing memory.
- Show the existing waterfall dialogue.

Paddle the Pool must:

- Reduce energy by 5.
- Increase Fighting by 1.
- Add the existing memory.
- Show the existing waterfall dialogue.

### Wolf

Swim the Pool must:

- Reduce energy by 6.
- Increase Fighting by 1.
- Add the existing memory.
- Show the existing waterfall dialogue.

Track the Spray must:

- Reduce energy by 4.
- Increase Stealth by 1.
- Add the existing memory.
- Show the existing waterfall dialogue.

Waterfall actions do not count toward the V8 training milestone threshold and must remain that way unless explicitly approved.

## NPC Schedules and Presence

All six home NPCs must remain in the home zone and use the existing morning, midday, and evening schedule bands.

The schedule locations and labels must remain equivalent:

- Mother: nursery/pup den, central clearing, nursery/pup den.
- Sister: family den, play clearing, family den.
- Brother: family den, play clearing, family den.
- Elder: elder den, central clearing, elder den.
- Warrior: hunter area, outer paths, hunter area.
- Healer: herb hollow, gathering herbs, herb hollow.

NPCs must continue to:

- Wander around their scheduled location.
- Use the existing role-specific movement speeds and wandering radii.
- Remain visible and interactable only in the current scene.
- Display the current activity in the profile when available.
- Show sleeping `z z z` text during the V8 night interval for non-warrior home NPCs.

No new schedule editor, collision system, pathfinding, or presence rules may be added during parity extraction.

## Skills and Difficulty Acceptance

The V8 runtime skill keys remain:

- `pounce`.
- `stealth`.
- `fight`.
- `social`.

The visible species labels remain as currently implemented, including the wolf relabeling. The skill model must not be corrected during the parity refactor.

Hero skill panels must preserve:

- Current values.
- Progress bars based on a target of 5.
- Displayed goals capped at `5/5`.
- Existing species-specific labels.
- Beginner metadata.

Difficulty must preserve:

- Easy: training goal 2, need drain multiplier 0.8.
- Medium: training goal 4, need drain multiplier 1.
- Hard: training goal 6, need drain multiplier 1.25.

Need drain must preserve the current hunger and energy rates. Hunger and energy reaching zero must remain harmless V8 behavior. Health must remain displayed at 100 without consequences.

## Seven Milestones

The progress system must retain exactly these seven milestone slots:

1. Mother interaction.
2. Play interaction.
3. Sleep.
4. Waterfall discovery.
5. Secret-friend meeting.
6. Training threshold reached.
7. Hunt task completed.

The training milestone is complete when the training count reaches the selected difficulty goal. The progress bar and hero display must retain the existing seven-milestone presentation.

## Relationships and Memories

Each primary relationship must retain:

- Trust.
- Talks.
- Play fights.
- Bond.
- History entries.

Initial V8 values must remain unchanged:

- Mother: trust 100, bond 100.
- Sister: trust 75, bond 80.
- Brother: trust 75, bond 80.
- Leader: trust 10, bond 5.
- Warrior: trust 5, bond 5.
- Healer: trust 10, bond 10.
- Secret friend: trust 50, bond 50 until meeting, then V8 meeting values.

Memories must remain unique and preserve their existing text and timing, including:

- Birth/home memory.
- Sleep memory.
- Distant-water memory.
- Waterfall discovery memory.
- Secret-friend memory.
- Waterfall activity memories.
- Scent and other activity memories.

## HUD and Overlay Acceptance

The HUD must preserve:

- Objective card.
- Chapter/objective label.
- Objective text.
- Milestone progress bar.
- Time icon and clock.
- Age and day text.
- Hunger, energy, and health indicators.
- Day arc and moving sun/moon orb.
- Day/night brightness and saturation treatment.

The following controls and overlays must remain available and visually equivalent:

- Help button and How to Play overlay.
- Hero button and hero/progression overlay.
- Map button and map overlay.
- Glowing paw interaction button.
- Dynamic action menu.
- Dialogue panel with portrait, speaker, text, and Continue/Close button.
- Character profile overlay.
- Close/back-to-game buttons.

The hero overlay must show:

- Player name, personality, species, home group, and day.
- Four skill panels.
- Seven-milestone progress.
- Relationships.
- Important memories.

The profile overlay must show:

- Portrait.
- Name and role.
- Trust.
- Talks.
- Play fights.
- Bond.
- Recent history.

## Map Acceptance

The map must preserve:

- Fogged wilderness presentation.
- Revealed home region.
- Nursery or camp labels.
- Pine Woods, River, Meadow, and Waterfall unknown labels.
- Trail label.
- Family, Hunters, Healer, and Elder areas.
- Player dot presentation.
- Day 2 pre-discovery waterfall clue behavior.
- Post-discovery Waterfall label behavior.

The V8 map is a presentation map, not a live exploration map. Its hard-coded reveal geometry and player-dot behavior must remain unless explicitly approved for change.

## Visual Acceptance

The parity renderer must retain the current procedural visual language:

- Forest-green home scene.
- Waterfall scene with pool, rocks, trees, and trail.
- Cream location labels.
- Brown dens and green trees.
- Procedural wildcat and wolf silhouettes.
- Species-specific markings, eyes, tails, ears, bodies, and name labels.
- Player scale difference from NPCs.
- Shadows beneath actors.
- Canvas camera following behavior.
- HTML HUD and overlays layered over the canvas.
- Interaction-button pulse animation.
- Current color palette, spacing, rounded panels, borders, and shadows.
- Existing emoji iconography.

Rendering extraction must preserve draw order, approximate positions, scene dimensions, and responsive canvas scaling before visual redesign.

## Touch and Joystick Acceptance

The existing V8 interaction model must remain fully usable on touch devices:

- Round lower-left joystick.
- Touch movement with drag tracking.
- Mouse fallback for desktop testing.
- Tap-based buttons for every action.
- No interaction may depend on hover.
- Paw button glows when an interaction is available.
- Context actions are large, visible buttons.
- Dialogue advances through a large touch button.
- Panels scroll on constrained screens.
- Safe-area insets remain respected.

V9 may improve pointer cancellation, focus, and sizing only when the change does not alter V8 gameplay or visual intent.

## Approved V9 Behavior Fixes

The following two issues were confirmed during browser smoke testing and are approved V9 fixes. They are intentionally deferred and must not be implemented as part of the current data-only extraction.

### Deterministic First Secret-Friend Presence

The first waterfall meeting is already a guaranteed story beat, but schedule and wander timing can make Rowan or Luma appear delayed. V9 must make the secret friend available deterministically enough at the intended first-meeting moment that the player does not need to wait for schedule or wander timing.

The fix must preserve:

- The existing first-visit waterfall story sequence.
- The species-specific friend, name, appearance, and dialogue.
- The existing post-meeting availability window unless separately approved.
- The existing waterfall location and travel behavior.

### Narration and Activity Feedback Icons

Narration and activity feedback must use a dedicated narration/activity icon or presentation state. It must never reuse an unrelated NPC dialogue portrait. For example, the Stalk activity card must not display Rowan's portrait.

The fix must preserve:

- NPC portraits for NPC-spoken dialogue.
- Existing activity and narration text.
- Existing activity effects and progression.
- The current dialogue layout unless a presentation-only change is required to separate the icon source.

## Known Quirks Held by This Contract

The following are intentional parity constraints for the refactor. They may be architected behind future extension points, but must not be changed now:

- No save/load persistence.
- No collision or obstacle mechanics.
- No health consequences.
- No hunger/energy consequences beyond current numeric drain and clamping.
- No exploration redesign.
- No live map exploration or dynamic map geometry.
- No skill-model corrections.
- No new skills.
- No new locations.
- No new Chapter 2 story content.
- No chapter ending or completion screen.
- No new branching story choices required for V8.
- No home-group-specific gameplay beyond current labels and metadata.
- No changes to waterfall discovery timing or guaranteed first meeting.
- No change to waterfall activity training-count behavior.
- No change to current schedule bands or friend availability window.
- No requirement to make scenery or NPCs collide.
- No requirement to pause the simulation behind non-dialogue overlays unless explicitly approved as a behavior change.
- No requirement to replace the hard-coded map dot or map reveal.
- The first secret-friend presence may remain schedule/wander-delayed until the approved deterministic-presence fix is implemented.
- Activity or narration feedback may retain the current portrait-reuse quirk until the approved narration-icon fix is implemented.

Any change to this list requires explicit approval and a corresponding acceptance-document update.

## V8 Parity Gate Before Chapter 2

Chapter 2 work is blocked until all of the following are true:

- Wildcat start-to-waterfall flow passes.
- Wolf start-to-waterfall flow passes.
- Day 1 and Day 2 transitions pass.
- All seven milestones pass at Easy, Medium, and Hard thresholds.
- Every activity and its existing effect passes.
- NPC schedules and friend presence pass.
- Skills, relationships, and memories pass.
- All overlays, map behavior, HUD, and dialogue pass.
- Day/night visuals pass.
- Joystick and touch interactions pass on narrow portrait and landscape layouts.
- No prohibited gameplay expansion has entered the parity refactor.
- Any intentional deviation has written approval and is recorded here.
- The two approved V9 behavior fixes are implemented and separately verified without expanding V8 gameplay.
- The current `index.html` and V9 produce behaviorally equivalent acceptance results.
