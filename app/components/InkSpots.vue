<template>
  <div class="ink-spots" aria-hidden="true">
    <span class="spot" style="top: 180px; left: 6%; width: 6px; height: 5px;" />
    <span class="spot" style="top: 420px; right: 8%; width: 4px; height: 3px; transform: rotate(25deg);" />
    <span class="spot" style="top: 750px; left: 12%; width: 3px; height: 3px;" />
    <span class="spot" style="top: 1100px; right: 5%; width: 7px; height: 4px; transform: rotate(-15deg);" />
    <span class="spot" style="top: 1500px; left: 3%; width: 4px; height: 4px;" />
    <span class="spot" style="top: 1900px; right: 4%; width: 3px; height: 2px;" />
    <span class="spot" style="top: 2400px; left: 22%; width: 5px; height: 4px; transform: rotate(40deg);" />
    <span class="spot" style="top: 2900px; right: 15%; width: 3px; height: 3px;" />
    <span class="spot" style="top: 3400px; left: 9%; width: 6px; height: 3px; transform: rotate(-30deg);" />
    <span class="spot" style="top: 3900px; right: 25%; width: 4px; height: 3px; transform: rotate(10deg);" />
    <span class="spot" style="top: 4500px; left: 35%; width: 5px; height: 5px;" />
    <span class="spot" style="top: 5000px; left: 50%; width: 2px; height: 2px;" />
    <span class="spot" style="top: 5500px; right: 30%; width: 3px; height: 2px; transform: rotate(60deg);" />
    <span class="spot" style="top: 6000px; left: 18%; width: 5px; height: 3px; transform: rotate(-20deg);" />
  </div>
</template>

<style scoped>
.ink-spots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.spot {
  position: absolute;
  background: rgba(21, 18, 16, 0.3);
  border-radius: 50%;
  display: block;
}
</style>
