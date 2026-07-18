
--- Guide for scroll-target-on-load ---
# Set a scroll target for the initial render

The CSS property `scroll-initial-target` offers a declarative, CSS-only way to bring a specific descendant element into the visible area of its scroll container as soon as that container is rendered. Previously, developers relied on JavaScript (`Element.scrollIntoView()`) or URL fragment identifiers (`#item-id`), both of which have limitations and are tricky to implement.

## How to Implement

To implement this successfully:

1. **Ensure a scroll container:** The target element must be inside a scroll container (an element with overflow that allows scrolling, such as `overflow: auto`). This can be any ancestor element, including the root `<html>` element.
2. **Target the Item:** Apply `scroll-initial-target: nearest` to the specific descendant element you want to bring into view.

## Example Code: Vertical Media Feed

In this example, a feed starts scrolled to a specific "featured" item rather than the very top of the list.

```css
/** 
 * TARGET: The item that should be visible on initial load.
 */
.item.target {
  scroll-initial-target: nearest;
}
```

## Strategic Implementation & Best Practices

- **DO** use `scroll-initial-target` for "middle-start" experiences, such as a calendar starting on the current day or a gallery starting on a specific image.
- **DO NOT** confuse this with accessibility focus. This property only moves the **visual** viewport; it does not move the keyboard focus. You must manually manage `element.focus()` if the target is intended to be the starting point for keyboard users.
- **DO NOT** use this if you need a smooth "scrolling" animation on load; this property is discrete and sets the position instantly during the layout phase.
- **DO NOT** set `scroll-initial-target` on multiple elements within the same scrollable container. If multiple elements specify `scroll-initial-target: nearest`, the browser selects the one that appears first in the DOM tree order.
- **DO** provide dimensions for media. Since the scroll position is calculated during initial layout, ensure images or videos have `aspect-ratio` or fixed `height`/`width` to prevent the target from shifting after the media loads.
- **DO** account for the **Precedence Hierarchy**: A URL fragment (e.g., `example.com/#top`) and the container-level `scroll-start` property both take precedence over `scroll-initial-target`.

## Fallback Strategy

scroll-initial-target has limited availability.
Supported by: Chrome 133 (Feb 2025) and Edge 133 (Feb 2025).
Unsupported in: Firefox and Safari.

For browsers that do not yet support the API, use a JavaScript fallback. Use the `DOMContentLoaded` event to ensure the browser scrolls the element into view as soon as the HTML parsing completes, providing a faster experience than waiting for all images and resources to load. Alternatively, placing the script at the end of the `<body>` element is also acceptable and avoids the need for an event listener.

```javascript
/**
 * Progressive Enhancement Fallback
 */
document.addEventListener("DOMContentLoaded", () => {
  // Check for native CSS support
  if (!CSS.supports("scroll-initial-target", "nearest")) {
    const feedTarget = document.querySelector(".item.target");
    if (feedTarget) {
      // 'block: center' ensures the featured media is centered in view
      feedTarget.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }
});
```


--- Guide for size-aware-styling ---
## Overview

Size-aware styling allows components to change their layout or appearance based on the space available to them, rather than the size of the whole screen. This is useful for components like cards or navigation bars that might be placed in different parts of a layout (like a narrow sidebar or a wide main area).

Using container queries is recommended because it makes components truly modular. You do not need to know where the component will live or write complex media queries to handle every possible layout.

## Implementation

### 1. Define the container

MANDATORY: You must first tell the browser which element is the container to be measured.

```css
.card-container {
  /* Define the container type. Use 'inline-size' for width-based queries. */
  /* You can also use 'size' for both width and height, but it requires explicit sizing. */
  container-type: inline-size;
}
```

### 2. Apply styles based on container size

Use the `@container` rule to apply styles when the container reaches a certain size.

```css
/* Default styles for small containers (stacked layout) */
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Styles for larger containers (side-by-side layout) */
/* This triggers when the container is wider than 400px */
@container (min-width: 400px) {
  .card {
    flex-direction: row;
    align-items: center;
  }
  
  .card-image {
    width: 150px;
    height: 150px;
  }
}
```

### 3. Conditionally show content

You can also use container queries to hide or show extra details when there is more room.

```css
.card-details {
  /* Hide extra details by default in small spaces */
  display: none;
}

@container (min-width: 600px) {
  .card-details {
    /* Show details when there is plenty of room */
    display: block;
  }
}
```

### Fallback strategies

Baseline status for Container queries: Widely available. It's been Baseline since 2023-02-14.
Supported by: Chrome 105 (Sep 2022), Edge 105 (Sep 2022), Firefox 110 (Feb 2023), and Safari 16 (Sep 2022).

For browsers that do not support container queries, the best approach is to use a safe default layout (like the stacked vertical layout) and progressively enhance it using media queries if the general screen size allows it.

```css
/* Default safe stacked layout */
.card {
  display: flex;
  flex-direction: column;
}

/* Fallback using media queries for older browsers */
@media (min-width: 600px) {
  .card {
    flex-direction: row;
  }
}

/* Overwrite with container queries where supported */
@supports (container-type: inline-size) {
  @media (min-width: 600px) {
    .card {
      /* Reset media query fallback if needed, or let container query handle it */
      flex-direction: column;
    }
  }
  
  @container (min-width: 400px) {
    .card {
      flex-direction: row;
    }
  }
}
```

This ensures that users on older browsers still get a usable layout, even if it does not adapt perfectly to every specific container width.

