# LaterLah — Full UI/UX Specification

## Global Design Tokens

```
COLORS
  Background:          #f5f1ea    hsl(40, 33%, 94%)
  Card:                #ffffff    hsl(0, 0%, 100%)
  Card border:         #e6e0d4    hsl(33, 24%, 86%)
  Sage primary:        #b8d0b8    hsl(120, 20%, 77%)
  Charcoal:            #1c1c1b    hsl(60, 2%, 11%)
  Warm grey:           #8a857c    hsl(34, 6%, 51%)
  Mid grey bg:         #eae3d9    hsl(32, 27%, 88%)
  Delete red:          #c44a4a    hsl(0, 51%, 53%)
  Overlay bg:          #1c1c1baa  (rgba 28,28,27,0.67)
  White text on dark:  #f5f1ea    same as page bg for harmony

TYPOGRAPHY
  Heading font:        Georgia, "Times New Roman", serif   (system serif fallback)
  Body font:           "Instrument Sans", -apple-system, BlinkMacSystemFont, sans-serif
  Mono:                "SF Mono", "Menlo", monospace

SPACING SCALE (px)
  4, 6, 8, 12, 14, 16, 20, 24, 40, 60

BORDER RADIUS
  Main cards:     12px
  Secondary btn:  10px
  Pill filter:    20px
  Small thumb:    8px
  Circle icons:   50%

SHADOWS: none (flat design)
```

---

## 1. TODAY SCREEN

### Container
```
Property          Value
──────────────────────────────────────────
flex              1
backgroundColor   #f5f1ea
paddingTop        60 (safe area + breathing room)
paddingHorizontal 20
paddingBottom     0
```

### Header Group

**"LaterLah." brand text**
```
Property          Value
──────────────────────────────────────────
position          relative
fontFamily        Georgia, serif
fontSize          40
fontWeight        700 (bold)
color             #1c1c1b
marginBottom      4
```

**Greeting subtitle**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          16
fontWeight        400 (regular)
color             #8a857c
lineHeight        22
marginBottom      24
```

### Card Component (repeated per item)

**Card container**
```
Property          Value
──────────────────────────────────────────
backgroundColor   #ffffff
borderRadius      12
borderWidth       1
borderColor       #e6e0d4
overflow          hidden
marginBottom      0 (gap: 16 via parent flex)
```

**Editorial label** (conditionally rendered, first child of card)
```
Property          Value
──────────────────────────────────────────
paddingHorizontal 16
paddingTop        16
paddingBottom     4
fontFamily        Instrument Sans, sans-serif
fontSize          11
fontWeight        600 (semi-bold)
letterSpacing     1
color             #8a857c
textTransform     uppercase
```

**URL card image hero**
```
Property          Value
──────────────────────────────────────────
width             350 (100% of card - 0 padding)
height            120
resizeMode        cover
```

**Text content area**
```
Property          Value
──────────────────────────────────────────
paddingHorizontal 16
paddingTop        12 (16 if no image, 12 after image)
paddingBottom     16
gap               6 (between title, description, meta)
```

**Card title**
```
Property          Value
──────────────────────────────────────────
fontFamily        Georgia, serif
fontSize          18
fontWeight        600 (semi-bold)
color             #1c1c1b
numberOfLines     2
lineHeight        24 (implied by font)
```

**Card description**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          13
fontWeight        400
color             #8a857c
lineHeight        18
numberOfLines     2
```

**Meta row (domain + separator + age)**
```
Property          Value
──────────────────────────────────────────
flexDirection     row
alignItems        center
gap               6
marginTop         4
```

**Domain text**
```
Property          Value
──────────────────────────────────────────
fontSize          11
fontWeight        400
color             #8a857c
```

**Separator dot**
```
Property          Value
──────────────────────────────────────────
fontSize          11
fontWeight        400
color             #8a857c
content           "·"
```

**Save age text**
```
Property          Value
──────────────────────────────────────────
fontSize          11
fontWeight        400
color             #8a857c
```

### Image Card Variant

**Image hero**
```
Property          Value
──────────────────────────────────────────
width             350 (100%)
height            200
resizeMode        cover
```

**Bottom bar (after image)**
```
Property          Value
──────────────────────────────────────────
flexDirection     row
justifyContent    space-between
paddingHorizontal 16
paddingTop        12
paddingBottom     16
```

**Image card label**
```
Property          Value
──────────────────────────────────────────
fontFamily        Georgia, serif
fontSize          15
fontWeight        400
color             #1c1c1b
content           "Screenshot"
```

**Image card age**
```
Property          Value
──────────────────────────────────────────
fontSize          12
fontWeight        400
color             #8a857c
```

### Note Card Variant

**Text content area**
```
Property          Value
──────────────────────────────────────────
padding           16
gap               6
```

**Note title**
```
Property          Value
──────────────────────────────────────────
fontFamily        Georgia, serif
fontSize          18
fontWeight        600
color             #1c1c1b
```

**Note content**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          13
fontWeight        400
color             #8a857c
lineHeight        18
numberOfLines     4
```

### Empty State

**Container**
```
Property          Value
──────────────────────────────────────────
alignItems        center
paddingVertical   60
```

**Clock icon circle**
```
Property          Value
──────────────────────────────────────────
width             64
height            64
borderRadius      32  (50%)
backgroundColor   #eae3d9
justifyContent    center
alignItems        center
marginBottom      20
```

**Clock emoji**
```
Property          Value
──────────────────────────────────────────
fontSize          24
content           "🕰"
```

**Empty title**
```
Property          Value
──────────────────────────────────────────
fontFamily        Georgia, serif
fontSize          20
fontWeight        400
color             #8a857c
```

**Empty subtitle**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          13
fontWeight        400
color             #8a857c
marginTop         6
```

### Completed Footer

**Position in scroll**
```
bottom of ScrollView, after last item or empty state
marginTop: 8  (after last card gap)
paddingVertical: 40
```

**Circle container**
```
Property          Value
──────────────────────────────────────────
width             48
height            48
borderRadius      24 (50%)
backgroundColor   #eae3d9
justifyContent    center
alignItems        center
marginBottom      12
alignSelf         center
```

**Checkmark**
```
Property          Value
──────────────────────────────────────────
fontSize          18
color             #8a857c
content           "✓"
```

**Footer title**
```
Property          Value
──────────────────────────────────────────
fontFamily        Georgia, serif
fontSize          18
fontWeight        400
color             #8a857c
textAlign         center
```

**Footer subtitle**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          13
fontWeight        400
color             #8a857c
marginTop         4
textAlign         center
```

### Loading State

```
Property          Value
──────────────────────────────────────────
flex              1
justifyContent    center
alignItems        center
backgroundColor   #f5f1ea
```

**Spinner**
```
Property          Value
──────────────────────────────────────────
size              "large"
color             #b8d0b8
```

### Today Card Label Logic (labelFor function)

```
if resurfaced_count > 1:
    → "Worth coming back to"

else:
    age = now - (last_saved_at ?? created_at)
    if age > 30 days:
        → "From a while ago"
    elif kind === 'image' OR (description && description.length < 100):
        → "A quick one"
    else:
        → null (no label)
```

---

## 2. LIBRARY SCREEN

### Container
```
Property          Value
──────────────────────────────────────────
flex              1
backgroundColor   #f5f1ea
paddingTop        60
paddingHorizontal 20
paddingBottom     0
```

### Heading
```
Property          Value
──────────────────────────────────────────
fontFamily        Georgia, serif
fontSize          32
fontWeight        700
color             #1c1c1b
marginBottom      16
```

### Search Input

**Container**
```
Property          Value
──────────────────────────────────────────
backgroundColor   #ffffff
borderRadius      12
paddingVertical   14
paddingLeft       16
paddingRight      14
fontSize          15
fontWeight        400
color             #1c1c1b
borderWidth       1
borderColor       #e6e0d4
marginBottom      12
```

**Placeholder**
```
Property          Value
──────────────────────────────────────────
color             #8a857c
content           "Search library..."
```

**Text input iOS props**
```
autoCapitalize:   'none'
autoCorrect:      true (default)
returnKeyType:    'search'
```

### Filter Pill Row

**ScrollView**
```
Property          Value
──────────────────────────────────────────
horizontal        true
showsHorizontalScrollIndicator  false
marginBottom     12
```

**Pill container**
```
Property          Value
──────────────────────────────────────────
flexDirection     row
gap               6
paddingHorizontal 0  (inherent from parent)
```

**Filter pill button**
```
Property          Value
──────────────────────────────────────────
paddingHorizontal 14
paddingVertical   6
borderRadius      20
```

**Active pill**
```
backgroundColor   #1c1c1b
```

**Active pill text**
```
fontSize          12
fontWeight        600
color             #f5f1ea
```

**Inactive pill**
```
backgroundColor   #eae3d9
```

**Inactive pill text**
```
fontSize          12
fontWeight        600
color             #8a857c
```

### Sort + Count Row

**Container**
```
Property          Value
──────────────────────────────────────────
flexDirection     row
justifyContent    space-between
alignItems        center
marginBottom      12
```

**Item count text**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          12
fontWeight        400
color             #8a857c
```

**Sort ScrollView**
```
Property          Value
──────────────────────────────────────────
horizontal        true
showsHorizontalScrollIndicator  false
```

**Sort options container**
```
Property          Value
──────────────────────────────────────────
flexDirection     row
gap               4
```

**Sort button**
```
Property          Value
──────────────────────────────────────────
paddingHorizontal 10
paddingVertical   4
borderRadius      12
```

**Active sort button**
```
backgroundColor   #eae3d9
```

**Active sort text**
```
fontSize          12
fontWeight        500
color             #1c1c1b
```

**Inactive sort button**
```
backgroundColor   transparent
```

**Inactive sort text**
```
fontSize          12
fontWeight        500
color             #8a857c
```

### List Row Item

**Row container**
```
Property          Value
──────────────────────────────────────────
flexDirection     row
alignItems        center
gap               12
backgroundColor   #ffffff
borderRadius      10
borderWidth       1
borderColor       #e6e0d4
padding           12
```

**Thumbnail square**
```
Property          Value
──────────────────────────────────────────
width             40
height            40
borderRadius      8
backgroundColor   #eae3d9
justifyContent    center
alignItems        center
overflow          hidden
```

**Thumbnail image** (when source exists)
```
Property          Value
──────────────────────────────────────────
width             40
height            40
```

**Thumbnail fallback emoji**
```
Property          Value
──────────────────────────────────────────
fontSize          16
color             #8a857c
examples:         🔗 for URL, 📝 for note, 🖼 for image
```

**Text column**
```
Property          Value
──────────────────────────────────────────
flex              1
```

**Row title**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          14
fontWeight        600
color             #1c1c1b
numberOfLines     1
```

**Row subtitle**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          11
fontWeight        400
color             #8a857c
numberOfLines     1
```

**Delete button**
```
Property          Value
──────────────────────────────────────────
padding           4
fontSize          16
color             #c44a4a
content           "🗑"
```

### Pagination

**Container**
```
Property          Value
──────────────────────────────────────────
flexDirection     row
justifyContent    center
gap               16
marginTop         16
paddingBottom     40
```

**Previous/Next buttons**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          14
fontWeight        400
color             #1c1c1b
opacity (disabled) 0.4
```

**Page counter**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          12
fontWeight        400
color             #8a857c
alignSelf         center
```

### Empty State (search with no results)

```
Property          Value
──────────────────────────────────────────
fontFamily        Georgia, serif
fontSize          18
fontWeight        400
color             #8a857c
textAlign         center
marginTop         60
content:          search ? 'No matches' : 'Nothing saved yet.'
```

### Loading State
```
Property          Value
──────────────────────────────────────────
marginTop         40
alignSelf         center
size              "large"
color             #b8d0b8
```

---

## 3. CAPTURE SCREEN

### Container
```
Property          Value
──────────────────────────────────────────
flex              1
backgroundColor   #f5f1ea
paddingTop        60
paddingHorizontal 20
paddingBottom     0
```

### Heading
```
Property          Value
──────────────────────────────────────────
fontFamily        Georgia, serif
fontSize          32
fontWeight        700
color             #1c1c1b
marginBottom      4
```

### Subtitle
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          15
fontWeight        400
color             #8a857c
lineHeight        22
marginBottom      24
```

### Section Label (repeated: "LINK", "NOTE", "ADD A THOUGHT")
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          11
fontWeight        600
letterSpacing     1
color             #8a857c
textTransform     uppercase
marginBottom      6
marginTop         0 (gap from parent)
```

### URL Input

**Container**
```
Property          Value
──────────────────────────────────────────
backgroundColor   #ffffff
borderRadius      12
paddingVertical   16
paddingHorizontal 16
fontSize          15
fontWeight        400
color             #1c1c1b
borderWidth       1
borderColor       #e6e0d4
```

**Placeholder**
```
Property          Value
──────────────────────────────────────────
color             #8a857c
content           "Paste a link..."
```

**Text input iOS props**
```
autoCapitalize:   'none'
keyboardType:     'url'
textContentType:  'URL'
```

### "or" Divider

**Container**
```
Property          Value
──────────────────────────────────────────
flexDirection     row
alignItems        center
gap               12
marginVertical    12 (24px total from section gap)
```

**Left/right lines**
```
Property          Value
──────────────────────────────────────────
flex              1
height            1
backgroundColor   #e6e0d4
```

**"or" text**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          12
fontWeight        400
color             #8a857c
```

### Note Input

**Container**
```
Property          Value
──────────────────────────────────────────
backgroundColor   #ffffff
borderRadius      12
padding           16
fontSize          15
fontWeight        400
color             #1c1c1b
borderWidth       1
borderColor       #e6e0d4
minHeight         100
textAlignVertical 'top'
```

**Props**
```
multiline:        true
numberOfLines:    4
```

**Placeholder**
```
Property          Value
──────────────────────────────────────────
color             #8a857c
content           "Write a note, add a thought..."
```

### Image Upload Area

**Touchable container** (idle state, no image selected)
```
Property          Value
──────────────────────────────────────────
borderWidth       2
borderStyle       'dashed'
borderColor       #e6e0d4
borderRadius      12
paddingVertical   24
paddingHorizontal 24
alignItems        center
gap               8
backgroundColor   #ffffff
```

**Upload icon**
```
Property          Value
──────────────────────────────────────────
fontSize          24
content           "🖼"
```

**Upload prompt**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          14
fontWeight        400
color             #8a857c
```

**Upload hint**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          11
fontWeight        400
color             #8a857c
content           "JPEG, PNG, or WebP (max 10 MB)"
```

**Image preview container** (appears after selection)
```
Property          Value
──────────────────────────────────────────
borderRadius      12
overflow          hidden
position          relative
```

**Image preview**
```
Property          Value
──────────────────────────────────────────
width             350 (100%)
height            160
resizeMode        contain
```

**Close button overlay**
```
Property          Value
──────────────────────────────────────────
position          absolute
top               8
right             8
width             24
height            24
borderRadius      12 (50%)
backgroundColor   #1c1c1baa
justifyContent    center
alignItems        center
```

**Close button X**
```
Property          Value
──────────────────────────────────────────
fontSize          14
fontWeight        400
color             #ffffff
content           "✕"
```

### "Add a Thought" (why saved)

**Input container**
```
Property          Value
──────────────────────────────────────────
backgroundColor   #ffffff
borderRadius      12
paddingVertical   16
paddingHorizontal 16
fontSize          15
fontWeight        400
color             #1c1c1b
borderWidth       1
borderColor       #e6e0d4
```

**Placeholder**
```
Property          Value
──────────────────────────────────────────
color             #8a857c
content           "Why are you saving this?"
```

### Save Button

**Container** (active, content present)
```
Property          Value
──────────────────────────────────────────
backgroundColor   #b8d0b8
borderRadius      12
paddingVertical   16
paddingHorizontal 16
alignItems        center
opacity           1
```

**Container** (disabled, no content)
```
Property          Value
──────────────────────────────────────────
backgroundColor   #eae3d9
borderRadius      12
paddingVertical   16
paddingHorizontal 16
alignItems        center
opacity           1
```

**Button text**
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          16
fontWeight        600
color             #1c1c1b
```

**Saving state** (replaces button text)
```
ActivityIndicator
  color:  #1c1c1b
  size:   'small'
```

**Disabled prop**
```
disabled:         !hasContent || saving
```

**hasContent logic**
```
url.trim().length > 0
|| note.trim().length > 0
|| image !== null
```

### Alert on Success

```
title:    "Saved"
message:  "It'll be here when you need it."
buttons:  ["OK"] (default dismiss)
```

### Alert on Error

```
title:    "Error"
message:  e?.response?.data?.message ?? 'Could not save.'
buttons:  ["OK"] (default dismiss)
```

---

## EXPOSURE: Tab Bar Layout (`(tabs)/_layout.tsx`)

### Tab Bar Container
```
Property          Value
──────────────────────────────────────────
backgroundColor   #ffffff
borderTopColor    #e6e0d4
borderTopWidth    1
paddingTop        4
paddingBottom     4
height            56
```

### Tab Icon Tint
```
Active:           #1c1c1b
Inactive:         #8a857c
```

### Tab Label
```
fontSize          10
fontWeight        500
```

### Center Save Button (Capture tab)
Overrides the default tab icon with a raised sage circle:

```
Property          Value
──────────────────────────────────────────
width             40
height            40
borderRadius      20 (50%)
backgroundColor   #b8d0b8
justifyContent    center
alignItems        center
marginTop         -8   (raises above tab bar)
```

### Plus icon inside button
```
Property          Value
──────────────────────────────────────────
color             #1c1c1b
size              22
```

---

## EXPOSURE: Item Detail Screen (`items/[id]`)

### Container
```
Property          Value
──────────────────────────────────────────
backgroundColor   #f5f1ea
paddingTop        60
paddingHorizontal 20
```

### Back Button
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          14
fontWeight        400
color             #8a857c
marginBottom      16
content           "← Back"
```

### Main Card (same as Today card)
```
backgroundColor   #ffffff
borderRadius      12
borderWidth       1
borderColor       #e6e0d4
overflow          hidden
```

**URL image hero** (if applicable)
```
width:  100%
height: 160
```

**Image kind hero** (if kind === 'image')
```
width:       100%
height:      240
resizeMode:  'cover'
```

**Content area**
```
padding: 20
gap:     12
```

**Domain label**
```
fontFamily:     Instrument Sans, sans-serif
fontSize:       11
fontWeight:     600
letterSpacing:  1
color:          #8a857c
textTransform:  uppercase
```

**Title**
```
fontFamily:   Georgia, serif
fontSize:     22
fontWeight:   700
color:        #1c1c1b
lineHeight:   30
```

**Description / Content**
```
fontFamily:   Instrument Sans, sans-serif
fontSize:     14
fontWeight:   400
color:        #5c5a55   (slightly darker than warm grey for readability)
lineHeight:   20
```

**Why Saved section**
```
backgroundColor:  #f5f1ea  (same as page bg for subtle separation)
borderRadius:     8
padding:          12
```

**Why Saved label**
```
fontSize:       11
fontWeight:     600
letterSpacing:  1
color:          #8a857c
textTransform:  uppercase
marginBottom:   4
```

**Why Saved text**
```
fontFamily:   Instrument Sans, sans-serif
fontSize:     14
fontWeight:   400
color:        #1c1c1b
lineHeight:   20
```

**Meta badges row**
```
flexDirection:  row
flexWrap:       wrap
gap:            8
```

**Meta badge**
```
backgroundColor:  #eae3d9
borderRadius:     6
paddingHorizontal: 8
paddingVertical:   4
```

**Meta badge text**
```
fontSize:   11
fontWeight: 400
color:      #8a857c
```

### Action Buttons (non-completed state)

**"Mark as done" primary button**
```
Property          Value
──────────────────────────────────────────
backgroundColor   #b8d0b8
borderRadius      12
paddingVertical   16
alignItems        center
marginTop         20
```

**Button text**
```
fontSize:   16
fontWeight: 600
color:      #1c1c1b
```

**Snooze label**
```
fontSize:       11
fontWeight:     600
letterSpacing:  1
color:          #8a857c
textTransform:  uppercase
marginTop:      24
marginBottom:   8
```

**Snooze options row**
```
flexDirection:  row
flexWrap:       wrap
gap:            8
```

**Snooze pill button**
```
Property          Value
──────────────────────────────────────────
paddingHorizontal 16
paddingVertical   10
borderRadius      10
borderWidth       1
borderColor       #e6e0d4
backgroundColor   #ffffff
```

**Snooze pill text**
```
fontSize:   13
fontWeight: 500
color:      #1c1c1b
```

**"Keep for later" text link**
```
Property          Value
──────────────────────────────────────────
paddingVertical   16
alignItems        center
marginTop         12
fontSize          14
fontWeight        400
color             #8a857c
```

### Action Buttons (completed state)

**"Keep for later" sage button** (replaces Done + Snooze + Keep)
```
Property          Value
──────────────────────────────────────────
backgroundColor   #b8d0b8
borderRadius      12
paddingVertical   16
alignItems        center
marginTop         20
```

**Button text**
```
fontSize:   16
fontWeight: 600
color:      #1c1c1b
```

---

## EXPOSURE: Surprise Screen

### Container
```
Property          Value
──────────────────────────────────────────
flex              1
backgroundColor   #f5f1ea
paddingHorizontal 20
paddingTop        60
```

### Heading
```
Property          Value
──────────────────────────────────────────
fontFamily        Georgia, serif
fontSize          32
fontWeight        700
color             #1c1c1b
marginBottom      4
```

### Subtitle
```
Property          Value
──────────────────────────────────────────
fontFamily        Instrument Sans, sans-serif
fontSize          15
fontWeight        400
color             #8a857c
lineHeight        22
marginBottom      24
```

### Card (same as Today URL card)

**Image hero** (URL kind with image_url)
```
width:  100%
height: 130
```

**Image hero** (image kind)
```
width:       100%
height:      200
resizeMode:  'cover'
```

**Content padding**
```
padding: 16
gap:      6
```

**Domain label**
```
fontSize:       11
fontWeight:     600
letterSpacing:  1
color:          #8a857c
textTransform:  uppercase
```

**Title**
```
fontFamily:   Georgia, serif
fontSize:     18
fontWeight:   600
color:        #1c1c1b
```

**Description**
```
fontSize:   13
fontWeight: 400
color:      #8a857c
lineHeight: 18
numberOfLines: 2
```

**Content** (for notes)
```
fontSize:   13
fontWeight: 400
color:      #8a857c
lineHeight: 18
numberOfLines: 4
```

**Save age**
```
fontSize:   11
fontWeight: 400
color:      #8a857c
marginTop:  4
```

### Action Row
```
Property          Value
──────────────────────────────────────────
flexDirection     row
justifyContent    center
gap               12
marginTop         24
paddingBottom     40
```

**"Not now" button**
```
Property          Value
──────────────────────────────────────────
paddingHorizontal 16
paddingVertical   12
fontSize          14
fontWeight        400
color             #8a857c
```

**"Another one" button**
```
Property          Value
──────────────────────────────────────────
paddingHorizontal 20
paddingVertical   12
borderRadius      10
borderWidth       1
borderColor       #e6e0d4
backgroundColor   #ffffff
fontSize          14
fontWeight        600
color             #1c1c1b
```

**"Open" button**
```
Property          Value
──────────────────────────────────────────
paddingHorizontal 20
paddingVertical   12
borderRadius      10
backgroundColor   #b8d0b8
fontSize          14
fontWeight        600
color             #1c1c1b
```

### Empty State (no eligible items)

```
Property          Value
──────────────────────────────────────────
flex              1
justifyContent    center
alignItems        center
```

**Message**
```
fontFamily:   Georgia, serif
fontSize:     18
fontWeight:   400
color:        #8a857c
content:      "Nothing left to surprise you with."
```

**Sub-message**
```
fontSize:   13
fontWeight: 400
color:      #8a857c
marginTop:  6
content:    "Go save something new!"
```

### Loading State
```
flex:             1
justifyContent:   center
alignItems:       center
backgroundColor:  #f5f1ea

Spinner:
  size:  'large'
  color: #b8d0b8
```

---

## EXPOSURE: Settings (You) Screen

### Container
```
Property          Value
──────────────────────────────────────────
flex              1
backgroundColor   #f5f1ea
paddingHorizontal 20
paddingTop        60
```

### Heading
```
Property          Value
──────────────────────────────────────────
fontFamily        Georgia, serif
fontSize          32
fontWeight        700
color             #1c1c1b
marginBottom      24
```

### Menu Items Container
```
gap: 2
marginBottom: 40
```

**Menu row container**
```
Property          Value
──────────────────────────────────────────
flexDirection     row
alignItems        center
gap               16
backgroundColor   #ffffff
borderRadius      12
borderWidth       1
borderColor       #e6e0d4
padding           16
```

**Menu icon square**
```
Property          Value
──────────────────────────────────────────
width             40
height            40
borderRadius      10
backgroundColor   #eae3d9
justifyContent    center
alignItems        center
```

**Menu icon emoji**
```
fontSize: 16
```

**Menu text column**
```
flex: 1
```

**Menu title**
```
fontSize:   14
fontWeight: 600
color:      #1c1c1b
```

**Menu subtitle**
```
fontSize:   12
fontWeight: 400
color:      #8a857c
```

### Sign Out Button
```
Property          Value
──────────────────────────────────────────
paddingVertical   16
alignItems        center
fontSize          14
fontWeight        500
color             #c44a4a
```

### Footer Branding
```
flex:             1
justifyContent:   flex-end
alignItems:       center
paddingBottom:    40
```

**"LaterLah" footer**
```
fontFamily:   Georgia, serif
fontSize:     16
fontWeight:   400
color:        #8a857c
```

**Footer tagline**
```
fontSize:   12
fontWeight: 400
color:      #8a857c
marginTop:  4
content:    "Save what matters. Bring it back when it's time."
```
