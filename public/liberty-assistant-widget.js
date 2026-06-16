(function () {
  var script = document.currentScript;
  var containerId = "liberty-assistant-widget-root";
  var existingRoot = document.getElementById(containerId);

  if (existingRoot) {
    return;
  }

  var root = document.createElement("div");
  root.id = containerId;
  root.style.position = "fixed";
  root.style.right = "0";
  root.style.bottom = "0";
  root.style.zIndex = "2147483647";
  root.style.fontFamily = "Manrope, ui-sans-serif, system-ui, sans-serif";
  document.body.appendChild(root);

  var shadow = root.attachShadow ? root.attachShadow({ mode: "open" }) : root;
  var host = document.createElement("div");
  host.style.position = "relative";
  host.style.display = "flex";
  host.style.flexDirection = "column";
  host.style.alignItems = "flex-end";
  host.style.gap = "12px";
  host.style.padding = "0 16px 16px 0";
  shadow.appendChild(host);

  var label = (script && script.dataset && script.dataset.label) || "Ask Liberty Assistant";
  var embedUrl = (script && script.dataset && script.dataset.embedUrl) || "https://liberty-project-production.up.railway.app/embed";
  var launcherText = (script && script.dataset && script.dataset.launcherText) || label;

  var button = document.createElement("button");
  button.type = "button";
  button.textContent = launcherText;
  button.setAttribute("aria-expanded", "false");
  button.style.border = "1px solid rgba(255,255,255,0.7)";
  button.style.background = "rgba(255,255,255,0.98)";
  button.style.boxShadow = "0 24px 80px rgba(15, 39, 71, 0.18)";
  button.style.color = "#0f2747";
  button.style.borderRadius = "9999px";
  button.style.padding = "12px 16px";
  button.style.fontSize = "14px";
  button.style.fontWeight = "700";
  button.style.cursor = "pointer";
  button.style.display = "inline-flex";
  button.style.alignItems = "center";
  button.style.gap = "10px";
  button.style.transition = "transform 160ms ease, box-shadow 160ms ease";

  var badge = document.createElement("span");
  badge.style.width = "32px";
  badge.style.height = "32px";
  badge.style.borderRadius = "9999px";
  badge.style.background = "#0f2747";
  badge.style.display = "inline-flex";
  badge.style.alignItems = "center";
  badge.style.justifyContent = "center";
  badge.style.color = "white";
  badge.style.fontSize = "14px";
  badge.textContent = "L";
  button.insertBefore(badge, button.firstChild);

  var panel = document.createElement("div");
  panel.style.width = "380px";
  panel.style.height = "600px";
  panel.style.maxWidth = "calc(100vw - 16px)";
  panel.style.maxHeight = "calc(100vh - 90px)";
  panel.style.border = "0";
  panel.style.borderRadius = "28px";
  panel.style.overflow = "hidden";
  panel.style.boxShadow = "0 24px 80px rgba(15, 39, 71, 0.18)";
  panel.style.background = "white";
  panel.style.display = "none";

  var iframe = document.createElement("iframe");
  iframe.title = "Liberty Assistant";
  iframe.src = embedUrl;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "0";
  iframe.loading = "lazy";
  iframe.setAttribute("allow", "clipboard-read; clipboard-write");

  panel.appendChild(iframe);
  host.appendChild(panel);
  host.appendChild(button);

  function setOpen(nextOpen) {
    panel.style.display = nextOpen ? "block" : "none";
    button.setAttribute("aria-expanded", String(nextOpen));
  }

  button.addEventListener("click", function () {
    var isOpen = panel.style.display !== "none";
    setOpen(!isOpen);
  });

  if (window.matchMedia && window.matchMedia("(max-width: 640px)").matches) {
    panel.style.position = "fixed";
    panel.style.left = "0";
    panel.style.right = "0";
    panel.style.bottom = "0";
    panel.style.width = "100vw";
    panel.style.height = "100vh";
    panel.style.maxWidth = "100vw";
    panel.style.maxHeight = "100vh";
    panel.style.borderRadius = "0";
    panel.style.margin = "0";
    host.style.padding = "0";
  }

  setOpen(false);
})();
