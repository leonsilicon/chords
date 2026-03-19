/*
  This function has to ensure that global hotkeys assigned to applications are always the same, even when Chords reloads. Because there's a limited amount of global hotkeys, they need to be assigned in a particular order. To do this, we use two reliable things that never change:

  1. The application's bundle identifier
  2. The order of the available global hotkeys (in order from least likely to conflict to most likely)
    - We will make this user-adjustable in the future
  3. The original creation date of the bundle identifier folder inside chords/ (according to Git)
    - This is necessary because we need a way to consistently order the bundle identifiers that won't change; alphabetical might change if future applications are added
*/
export function getGlobalHotkey() {

}