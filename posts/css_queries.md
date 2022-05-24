---
title: "CSS Media Queries & Moblie-first Design"
date: '18/04/2021'
excerpts: "How to handle responsive design for mobile devices."
author: 'Samson Okunola'
author_contact: 'https://twitter.com/pablo-clueless'
cover_image: '/images/posts/css_queries.webp'
---

Wow! It's been quite a while and it feels good to write again. We're going to be looking at CSS media queries and how it can be beneficial to us in building webapps/websites.

## Prerequisite

Basic knowledge of CSS3 is all that is required

## What is a media query in CSS?

A media query consists of a **media type** and can contain one or more expressions, which will return a Boolean value, that is, evaluate to true or false. A media query returns true when the specified media type matches the devices on which the document(your web page) is being displayed and all media features compute to true. It is basically setting conditions for certain styles in your code to take effect. Media queries are useful for when you want to modify certain elements on your web page depending on general type(such as print vs screen) or specific characteristics and parameters(such as screen resolution). Media queries have lots of applications but the basic includes the following:

- To conditionally apply styles with the CSS `@media` and `@import` at-rules.
- To target specific media for the `<style>`, `<link>`, `<source>`, and other HTML elements with the media= attribute.
- To test and monitor media states using the `Window.matchMedia()` and `MediaQueryList.addListener()` JavaScript methods. developers In CSS, use the `@media` at-rule to conditionally apply part of a style sheet based on the result of a media query.

### Media types

Media types describe the general category of a device. Except when using the `not` or `only` logical operators, the media type is optional and the all type is implied.

- `all` - suitable for all devices.
- `print` - intended for paged material and documents viewed on a screen in print preview mode.
- `screen` - intended primarily for screens.

### Logical operators

The logical operators `not`, `and`, and `only` can be used to compose a complex media query. You can also combine multiple media queries into a single rule by separating them with commas.

- `and` - used for combining multiple media features together into a single media query, requiring each chained feature to return true for the query to be true. It is also used for joining media features with media types.
- `not` - used to negate a media query, returning true if the query would otherwise return false. If present in a comma-separated list of queries, it will only negate the specific query to which it is applied. If you use the not operator, you must also specify a media type.
- `only` - applies a style only if an entire query matches. It is useful for preventing older browsers from applying selected styles. When not using only, older browsers would interpret the query screen and (max-width: 500px) as screen, ignoring the remainder of the query, and applying its styles on all screens. If you use the only operator, you must also specify a media type.
- `, (comma)` - commas are used to combine multiple media queries into a single rule. Each query in a comma-separated list is treated separately from the others Thus, if any of the queries in a list is true, the entire media statement returns true. In other words, lists behave like a logical or operator.

### Media features

Media features describe specific characteristics of the user agent(a computer program representing a person, for example, a browser in a Web context), output device, or environment. Media feature expressions test for their presence or value, and are entirely optional. Each media feature expression must be surrounded by parentheses. Some of the commonly used features are:

- `width` - this is the entire viewport width, taking into account the width of the scrollbar. It is mostly specified as either min-width or max-width in the conditions set.
- `hover` - checks if the primary input mechanism allow the user hover an elements and implement designs based on its value.
- `pointer` - checks if the available input mechanism is a pointing device, works similarly to hover.

*NB: You check [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types) for more on media features.*

### Specifying values

It is advisable to specify values for breakpoints in fixed values like pixels(px) as it is the standard for screen size resolution and using %(percentage), em and rem for values that relative to other elements, for example image width/height. If an image is specified in px, it may overflow its boundaries when the pages is displayed on small screens but specifying relative values like percentage, will keep preserve the image's dimension in relation to its container. Below are screen size for various devices:

```css
320px - 480px: mobile devices
481px - 768px: iPads, tablets
769px - 1024px: small screens, laptops
1025px - 1200px: desktops, large screens
>1201px: extra large screens, televisions
```

### Targeting media types

```css
@media print {
  body { font-size: 10pt; }
}

@media screen {
  body { font-size: 13px; }
}

@media screen, print {
  body { line-height: 1.2; }
}

@media only screen
  and (min-width: 320px)
  and (max-width: 480px)
  and (resolution: 150dpi) {
    body { line-height: 1.4; }
}
```

### Targeting media features

```css
@media (hover: hover) {
   //specify adjustments here
}

@media (max-width: 800px) {
   //specify adjustments here
}
```

### Combining multiple types or features

The `and` keyword combines a media feature with a media type or other media features. This example combines two media features to restrict styles to landscape-oriented devices with a width of at least 30 ems:

```css
@media (min-width: 30em) and (orientation: landscape) { ... }
```

To limit the styles to devices with a screen, you can chain the media features to the screen media type:

```css
@media screen and (min-width: 30em) and (orientation: landscape) { ... }
```

## Conclusion

CSS is great but it can't get pretty confusing. This is not to discourage you but to challenge you to be good at it, or at least be good enough to get by and make great designs. So, start implementing media queries in your projects as from now. Please feel free to comment, make suggestions and like my content. Thanks for reading and happy coding.

%[https://buymeacoffee.com/pablo_clueless]
