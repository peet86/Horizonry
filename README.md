# Horizonry
jQuery Plugin for Modern (CSS3) Masonry Horizontal Ordering 

### Demo
http://codepen.io/peet86/pen/QwmxEO/ (CodePen)

###HTML: 
```html
<div class="masonry">
  <div class="item"></div>
  <div class="item"></div>
  <!-- ... -->
</div>
```

###JS:
```js
$(function() {  		
  		$("#horizonry").horizonry({
  		  itemSelector: "item",
        firstItemSelector: "item-first",
  		});
}) 
```

###CSS:
```css
.masonry {
 /* column width and column number */
  columns: 150px 3;
  -webkit-columns: 150px 3;
  -moz-columns: 150px 3;
  -webkit-column-gap: 15px;
  -moz-column-gap: 15px;
  /*gap between the items*/
  column-gap: 15px; 
  /* gap around the items*/
  padding: 15px; 
  background: #fff;
}

/*Column items*/
.item{
  display: block;
  /* gap under the items*/
  margin-bottom:15px;
  
  width: 100%; 
  
  /* avoid break*/
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  -ms-column-break-inside: avoid; 
  -o-column-break-inside: avoid; 
}

/*Column top*/
.item-first{
  break-before: always; 
  -webkit-column-break-before: always; 
  -moz-column-break-before: always;
  -ms-column-break-before: always; 
  -o-column-break-before: always; 
}
```

### Updates

#### v1.0 (23.02.2015)
- initial release

## License
This plugin is available under Apache 2.0 license.
